import { UserModel } from '@/models';
import type { SingUpUserRequestDto } from '@api';

export const mapUserModelToDto = (signUpModel: UserModel): SingUpUserRequestDto => ({
  user: {
    email: signUpModel.email,
    username: signUpModel.username,
    hash_password: signUpModel.password,
  },
});
