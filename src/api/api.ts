import { TokenService } from '@/services';
import { SingInUserRequestDto, SingUpUserRequestDto } from '@api';

interface JsonRequestOptionsParams {
  body?: any;
  isAuthorized?: boolean;
}

const getJsonRequestOptions = ({ body, isAuthorized }: JsonRequestOptionsParams = {}) => {
  const jsonBody = body ? { body: JSON.stringify(body) } : {};
  let authorizationHeader = {};

  if (isAuthorized) {
    const token = TokenService.getToken();

    if (!token) console.error('Authorization token is missing!');

    authorizationHeader = isAuthorized && token
      ? { authorization: `Bearer ${TokenService.getToken()}` }
      : {};
  }

  return {
    headers: {
      'content-type': 'application/json',
      ...authorizationHeader,
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
    ...getJsonRequestOptions({ body: payload }),
  });

  return unwrapResult(response, 'Sign up failed with status');
};

export const signIn = async (payload: SingInUserRequestDto) => {
  const response = await fetch('/api/users/sign_in', {
    method: 'POST',
    ...getJsonRequestOptions({ body: payload }),
  });

  return unwrapResult(response, 'Sign in failed with status');
};
