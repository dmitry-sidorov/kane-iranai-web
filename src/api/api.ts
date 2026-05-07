import { SingInUserRequestDto, SingUpUserRequestDto } from '@api';

const getJsonRequestOptions = (body: any) => {
  const jsonBody = body ? { body: JSON.stringify(body) } : {};

  return {
    headers: {
      'content-type': 'application/json',
    },
    ...jsonBody,
  };
};

const unwrapResult = (response: Response, errorMessage = 'Unknown error') => {
  if (!response.ok) {
    throw new Error(`${errorMessage} ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return null;
};

export const signUp = async (payload: SingUpUserRequestDto) => {
  const response = await fetch('/api/users/create', {
    method: 'POST',
    ...getJsonRequestOptions(payload),
  });

  return unwrapResult(response, 'Sign up failed with status');
};

export const signIn = async (payload: SingInUserRequestDto) => {
  const response = await fetch('/api/users/sign_in', {
    method: 'POST',
    ...getJsonRequestOptions(payload),
  });

  return unwrapResult(response, 'Sign in failed with status');
};
