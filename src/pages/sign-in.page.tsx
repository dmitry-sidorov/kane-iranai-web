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
import { useNotification } from '@/hooks';
import { UserService } from '@/services';
import { FormValidator } from '@/utils';

const SignInFormField = {
  email: 'email',
  password: 'password',
} as const;

type SignInFormFieldEnum = typeof SignInFormField[keyof typeof SignInFormField];
type SignInFormValues = Record<SignInFormFieldEnum, string>;

const initialFormValues = {
  [SignInFormField.email]: '',
  [SignInFormField.password]: '',
};

export const SignInPage: FC = () => {
  const { addSuccessNotification, addFailureNotification } = useNotification();

  const form = useForm<SignInFormValues>({
    initialValues: initialFormValues,
    validate: {
      [SignInFormField.email]: FormValidator.validateEmail,
      [SignInFormField.password]: FormValidator.validatePassword,
    },
  });

  const handleSignInSubmit = async ({ email, password }: SignInFormValues) => {
    try {
      const response = await UserService.signIn({ email, password });

      if (!response?.token) {
        addFailureNotification('Sign in failed', 'Invalid email or password.');
        return;
      }

      addSuccessNotification('Sign in successful', 'Welcome back.');
    } catch (error) {
      console.error('Sign in failed', error);
      addFailureNotification('Sign in failed', 'Unable to sign in. Please try again.');
    }
  };

  return (
    <Paper maw={400} mx="auto" mt="xl" p="xl" radius="md" shadow="sm" withBorder>
      <form noValidate onSubmit={form.onSubmit(handleSignInSubmit)}>
        <Stack gap="md">
          <Title order={2}>Sign in</Title>
          <TextInput
            required
            autoComplete="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...form.getInputProps(SignInFormField.email)}
          />
          <PasswordInput
            required
            autoComplete="current-password"
            label="Password"
            placeholder="Your password"
            {...form.getInputProps(SignInFormField.password)}
          />
          <Button fullWidth type="submit">
            Sign in
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
