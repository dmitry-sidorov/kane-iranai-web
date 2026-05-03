import { FC } from 'react';
import {
  Button,
  PasswordInput,
  Paper,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpPage: FC = () => {
  const form = useForm<SignUpFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => {
        const trimmed = value.trim();

        if (!trimmed) {
          return 'Email is required';
        }

        if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
          return 'Invalid email address';
        }

        return null;
      },

      password: (value) => {
        if (!value) {
          return 'Password is required';
        }

        if (value.length < 8) {
          return 'Password must be at least 8 characters';
        }

        return null;
      },

      confirmPassword: (value, values) => {
        if (!value) {
          return 'Please confirm your password';
        }

        if (value !== values.password) {
          return 'Passwords do not match';
        }

        return null;
      },
    },
  });

  return (
    <Paper maw={400} mx="auto" mt="xl" p="xl" radius="md" shadow="sm" withBorder>
      <form noValidate onSubmit={form.onSubmit(() => {})}>
        <Stack gap="md">
          <Title order={2}>Sign up</Title>
          <TextInput
            autoComplete="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            autoComplete="new-password"
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            autoComplete="new-password"
            label="Confirm password"
            placeholder="Confirm your password"
            {...form.getInputProps('confirmPassword')}
          />
          <Button fullWidth type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
