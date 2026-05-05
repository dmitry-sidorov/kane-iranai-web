import { mapSignUpModelToApiDto, type SignUpModel } from '@mappers';

export type SignUpInput = SignUpModel;

export const signUp = async (input: SignUpInput) => {
  const payload = mapSignUpModelToApiDto(input);

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
