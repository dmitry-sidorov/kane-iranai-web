type SignUpRequest = {
  user: {
    email: string;
    username: string;
    hash_password: string;
  };
};

export type SignUpInput = {
  email: string;
  username: string;
  password: string;
};

export const signUp = async (input: SignUpInput) => {
  const payload: SignUpRequest = {
    user: {
      email: input.email,
      username: input.username,
      hash_password: input.password,
    },
  };

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
