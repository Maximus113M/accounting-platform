import { UserModel } from 'src/models/userModel';

export abstract class AuthRepository{
    abstract logIn(data: any): Promise<string>;
    abstract getSignInUser(acessToken: string): Promise<UserModel>;
    abstract logOut(accessToken: string): Promise<void>;
    abstract resetPassword(data: any): Promise<void>;
}