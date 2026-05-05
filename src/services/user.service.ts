import { signUp, SingUpUserResponseDto } from "@api";
import { mapUserModelToDto } from "@mappers";
import { UserModel } from "@models";

class UserService {
  async signUp(user: UserModel): Promise<SingUpUserResponseDto> {
    const dto = mapUserModelToDto(user);
  
    return await signUp(dto);
  }
}

export const UserServiceInstance = new UserService();