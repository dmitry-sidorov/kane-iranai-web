import {
  signIn,
  signUp,
  SingInUserResponseDto,
  SingUpUserResponseDto,
} from "@api";
import { mapUserModelToDto } from "@mappers";
import { UserModel } from "@models";
import { TokenService } from ".";

class UserService {
  async signUp(user: UserModel): Promise<void> {
    const dto = mapUserModelToDto(user);
    const response = await signUp(dto);

    TokenService.setToken(response.token);

    console.log('sign in response: ', response);
  }

  async signIn(user: Pick<UserModel, 'email' | 'password'>): Promise<SingInUserResponseDto> {
    return await signIn({
      email: user.email,
      password: user.password,
    });
  }

  isAuthorized() {
    const token = TokenService.getToken();

    if (!token) return false;

    // TODO: add check token validity on api

    return true;
  }
}

export const UserServiceInstance = new UserService();