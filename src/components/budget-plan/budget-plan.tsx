import { FC, useState } from 'react';
import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import type { PlannedOperation, RealOperation } from '@models';

type OperationFormValues = {
  title: string;
  amount: number;
};

const createId = () => crypto.randomUUID();

const formatAmount = (amount: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount);

const PlusIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const BudgetPlan: FC = () => {
  const [plannedOperations, setPlannedOperations] = useState<PlannedOperation[]>([]);
  const [addPlannedOpened, { open: openAddPlanned, close: closeAddPlanned }] = useDisclosure(false);
  const [addRealOpened, { open: openAddReal, close: closeAddReal }] = useDisclosure(false);
  const [activePlannedOperationId, setActivePlannedOperationId] = useState<string | null>(null);

  const plannedForm = useForm<OperationFormValues>({
    initialValues: { title: '', amount: 0 },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : 'Title is required'),
      amount: (value) => (value >= 0 ? null : 'Amount must be zero or greater'),
    },
  });

  const realForm = useForm<OperationFormValues>({
    initialValues: { title: '', amount: 0 },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : 'Title is required'),
      amount: (value) => (value >= 0 ? null : 'Amount must be zero or greater'),
    },
  });

  const handleAddPlannedOperation = ({ title, amount }: OperationFormValues) => {
    const plannedOperation: PlannedOperation = {
      id: createId(),
      title: title.trim(),
      amount,
      realOperations: [],
    };

    setPlannedOperations((current) => [...current, plannedOperation]);
    plannedForm.reset();
    closeAddPlanned();
  };

  const handleOpenAddRealOperation = (plannedOperationId: string) => {
    setActivePlannedOperationId(plannedOperationId);
    realForm.reset();
    openAddReal();
  };

  const handleAddRealOperation = ({ title, amount }: OperationFormValues) => {
    if (!activePlannedOperationId) {
      return;
    }

    const realOperation: RealOperation = {
      id: createId(),
      title: title.trim(),
      amount,
      plannedOperationId: activePlannedOperationId,
    };

    setPlannedOperations((current) =>
      current.map((plannedOperation) =>
        plannedOperation.id === activePlannedOperationId
          ? {
              ...plannedOperation,
              realOperations: [...plannedOperation.realOperations, realOperation],
            }
          : plannedOperation,
      ),
    );

    realForm.reset();
    setActivePlannedOperationId(null);
    closeAddReal();
  };

  const handleCloseAddPlanned = () => {
    plannedForm.reset();
    closeAddPlanned();
  };

  const handleCloseAddRealOperation = () => {
    realForm.reset();
    setActivePlannedOperationId(null);
    closeAddReal();
  };

  return (
    <>
      <Card padding="lg" radius="md" shadow="sm" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>Budget plan</Title>
          <ActionIcon
            aria-label="Add planned operation"
            size="lg"
            variant="light"
            onClick={openAddPlanned}
          >
            <PlusIcon />
          </ActionIcon>
        </Group>

        {plannedOperations.length === 0 ? (
          <Text c="dimmed" size="sm">
            No planned operations yet. Click + to add one.
          </Text>
        ) : (
          <Accordion variant="contained">
            {plannedOperations.map((plannedOperation) => (
              <Accordion.Item key={plannedOperation.id} value={plannedOperation.id}>
                <Accordion.Control>
                  <Group justify="space-between" wrap="nowrap" pr="sm">
                    <Text fw={500}>{plannedOperation.title}</Text>
                    <Text c="dimmed" size="sm">
                      {formatAmount(plannedOperation.amount)}
                    </Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="sm">
                    {plannedOperation.realOperations.length === 0 ? (
                      <Text c="dimmed" size="sm">
                        No real operations linked yet.
                      </Text>
                    ) : (
                      plannedOperation.realOperations.map((realOperation) => (
                        <Group key={realOperation.id} justify="space-between" wrap="nowrap">
                          <Text size="sm">{realOperation.title}</Text>
                          <Text c="dimmed" size="sm">
                            {formatAmount(realOperation.amount)}
                          </Text>
                        </Group>
                      ))
                    )}
                    <Group justify="flex-end">
                      <ActionIcon
                        aria-label="Add real operation"
                        size="sm"
                        variant="subtle"
                        onClick={() => handleOpenAddRealOperation(plannedOperation.id)}
                      >
                        <PlusIcon size={16} />
                      </ActionIcon>
                    </Group>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Card>

      <Modal opened={addPlannedOpened} title="Add planned operation" onClose={handleCloseAddPlanned}>
        <form onSubmit={plannedForm.onSubmit(handleAddPlannedOperation)}>
          <Stack gap="md">
            <TextInput
              label="Title"
              placeholder="Rent, groceries, savings..."
              {...plannedForm.getInputProps('title')}
            />
            <NumberInput
              label="Amount"
              min={0}
              decimalScale={2}
              fixedDecimalScale
              prefix="$"
              {...plannedForm.getInputProps('amount')}
            />
            <Button leftSection={<PlusIcon size={16} />} type="submit">
              Add planned operation
            </Button>
          </Stack>
        </form>
      </Modal>

      <Modal opened={addRealOpened} title="Add real operation" onClose={handleCloseAddRealOperation}>
        <form onSubmit={realForm.onSubmit(handleAddRealOperation)}>
          <Stack gap="md">
            <TextInput
              label="Title"
              placeholder="Payment, purchase, transfer..."
              {...realForm.getInputProps('title')}
            />
            <NumberInput
              label="Amount"
              min={0}
              decimalScale={2}
              fixedDecimalScale
              prefix="$"
              {...realForm.getInputProps('amount')}
            />
            <Button leftSection={<PlusIcon size={16} />} type="submit">
              Add real operation
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
