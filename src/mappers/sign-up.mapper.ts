import type { SignUpApiDto } from '@api';

export type UserModel = {
  email: string;
  username: string;
  password: string;
};

export const mapSignUpModelToApiDto = (signUpModel: UserModel): SignUpApiDto => ({
  user: {
    email: signUpModel.email,
    username: signUpModel.username,
    hash_password: signUpModel.password,
  },
});
