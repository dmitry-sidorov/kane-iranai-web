export type SignUpModel = {
  email: string;
  username: string;
  password: string;
};

export type SignUpApiDto = {
  user: {
    email: string;
    username: string;
    hash_password: string;
  };
};

export const mapSignUpModelToApiDto = (signUpModel: SignUpModel): SignUpApiDto => ({
  user: {
    email: signUpModel.email,
    username: signUpModel.username,
    hash_password: signUpModel.password,
  },
});
