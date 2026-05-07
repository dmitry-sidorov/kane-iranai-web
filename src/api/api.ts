import { SingInUserRequestDto, SingUpUserRequestDto } from '@api';

export const signUp = async (payload: SingUpUserRequestDto) => {
  const response = await fetch('/api/users/create', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Sign up failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return null;
};

export const signIn = async (payload: SingInUserRequestDto) => {
  const response = await fetch('/api/users/sign_in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Sign in failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return null;
};
