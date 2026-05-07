import {
  signIn,
  signUp,
  SingInUserResponseDto,
  SingUpUserResponseDto,
} from "@api";
import { mapUserModelToDto } from "@mappers";
import { UserModel } from "@models";

class UserService {
  async signUp(user: UserModel): Promise<SingUpUserResponseDto> {
    const dto = mapUserModelToDto(user);
  
    return await signUp(dto);
  }

  async signIn(user: Pick<UserModel, 'email' | 'password'>): Promise<SingInUserResponseDto> {
    return await signIn({
      email: user.email,
      password: user.password,
    });
  }
}

export const UserServiceInstance = new UserService();