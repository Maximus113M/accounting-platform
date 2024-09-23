import { UserModel } from 'src/models/userModel';

export const useAuthState = () => {
  return {
    signInUser: new UserModel({})
  };
};
