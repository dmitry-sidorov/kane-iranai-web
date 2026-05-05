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
import { type UserModel } from '@models';
import { UserService } from '@/services';
import { FormValidator } from '@/utils';

const SignUpFormField = {
  username: 'username',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
} as const;

type SignUpFormFieldEnum = typeof SignUpFormField[keyof typeof SignUpFormField];

type SignUpFormValues = Record<SignUpFormFieldEnum, string>;

const initialFormValues = {
  [SignUpFormField.username]: '',
  [SignUpFormField.firstName]: '',
  [SignUpFormField.lastName]: '',
  [SignUpFormField.email]: '',
  [SignUpFormField.password]: '',
  [SignUpFormField.confirmPassword]: '',
};

export const SignUpPage: FC = () => {
  const { onSuccess, onFailure } = useNotification();

  const form = useForm<SignUpFormValues>({
    initialValues: initialFormValues,
    validate: {
      [SignUpFormField.username]: FormValidator.validateUsername,
      [SignUpFormField.email]: FormValidator.validateEmail,
      [SignUpFormField.password]: FormValidator.validatePassword,
      [SignUpFormField.confirmPassword]: (value, { password }) =>
        FormValidator.validateConfirmPassword(value, password),
    },
  });

  const handleSignUpSubmit = async (values: SignUpFormValues) => {
    const userModel: UserModel = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
    };

    try {
      await UserService.signUp(userModel);
      onSuccess('Sign up successful', 'Your account has been created.');
    } catch (error) {
      console.error('Sign up failed', error);
      onFailure('Sign up failed', 'Unable to create your account. Please try again.');
    }
  };

  return (
    <Paper maw={400} mx="auto" mt="xl" p="xl" radius="md" shadow="sm" withBorder>
      <form noValidate onSubmit={form.onSubmit(handleSignUpSubmit)}>
        <Stack gap="md">
          <Title order={2}>Sign up</Title>
          <TextInput
            required
            autoComplete="username"
            label="Username"
            placeholder="Your username"
            {...form.getInputProps(SignUpFormField.username)}
          />
          <TextInput
            required
            autoComplete="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...form.getInputProps(SignUpFormField.email)}
          />
          <PasswordInput
            required
            autoComplete="new-password"
            label="Password"
            placeholder="Your password"
            {...form.getInputProps(SignUpFormField.password)}
          />
          <PasswordInput
            required
            autoComplete="new-password"
            label="Confirm password"
            placeholder="Confirm your password"
            {...form.getInputProps(SignUpFormField.confirmPassword)}
          />
          <TextInput
            autoComplete="given-name"
            label="First name"
            placeholder="Optional"
            {...form.getInputProps(SignUpFormField.firstName)}
          />
          <TextInput
            autoComplete="family-name"
            label="Last name"
            placeholder="Optional"
            {...form.getInputProps(SignUpFormField.lastName)}
          />
          <Button fullWidth type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
