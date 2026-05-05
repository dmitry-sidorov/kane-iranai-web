import type { SignUpApiDto } from '@api';

export type SignUpModel = {
  email: string;
  username: string;
  password: string;
};

export const mapSignUpModelToApiDto = (signUpModel: SignUpModel): SignUpApiDto => ({
  user: {
    email: signUpModel.email,
    username: signUpModel.username,
    hash_password: signUpModel.password,
  },
});
