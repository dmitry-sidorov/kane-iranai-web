export interface UserDto {
  email: string;
  username: string;
  hash_password: string;
  first_name?: string;
  last_name?: string;
};

export interface SingUpUserRequestDto {
  user: UserDto;
}

export interface SingUpUserResponseDto {
  id: string; // uuid
  token: string; // jwt
  email: string;
}
