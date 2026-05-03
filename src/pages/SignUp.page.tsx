import { FC, FormEvent, useState } from 'react';
import {
  Button,
  PasswordInput,
  Paper,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';

export const SignUpPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const next: typeof errors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      next.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      next.email = 'Invalid email address';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      next.confirmPassword = 'Passwords do not match';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
  };

  return (
    <Paper maw={400} mx="auto" mt="xl" p="xl" radius="md" shadow="sm" withBorder>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Title order={2}>Sign up</Title>
          <TextInput
            autoComplete="email"
            error={errors.email}
            label="Email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
          <PasswordInput
            autoComplete="new-password"
            error={errors.password}
            label="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Your password"
            value={password}
          />
          <PasswordInput
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirm password"
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            placeholder="Confirm your password"
            value={confirmPassword}
          />
          <Button fullWidth type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
