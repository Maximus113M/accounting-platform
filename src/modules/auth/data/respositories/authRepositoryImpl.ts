import { ServerException } from 'src/core/helpers/exceptions';
import { AuthRepository } from '../../domain/repositories/authRepository';
import { AuthDatasource } from '../datasources/authDatasource';
import { UserModel } from 'src/models/userModel';

export class AuthRepositoryImpl implements AuthRepository{
    private authDatasource: AuthDatasource;
    constructor(authDatasource: AuthDatasource){
        this.authDatasource= authDatasource;
    }
    
    async logIn(data: any): Promise<string> {
        try {
            return await this.authDatasource.logIn(data); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getSignInUser(acessToken: string): Promise<UserModel> {
        try {
            return await this.authDatasource.getSignInUser(acessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async logOut(id: string, accessToken: string): Promise<void> {
        try {
            return await this.authDatasource.logOut(id, accessToken);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async resetPassword(data: any): Promise<void> {
        try {
           return await this.authDatasource.resetPassword(data); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
}