import { ServerException } from 'src/core/helpers/exceptions';
import { api } from 'src/boot/axios';
import { UserModel, userModelFromJson } from 'src/models/userModel';

export abstract class AuthDatasource {
    abstract logIn(data: any): Promise<string>;
    abstract getSignInUser(acessToken: string): Promise<UserModel>;
    abstract logOut(accessToken: string): Promise<void>;
    abstract resetPassword(data: any): Promise<void>;
  }
  
  export class AuthDatasourceImpl implements AuthDatasource{
    
    async logIn(data: any): Promise<string> {
      try {
        const apiResp= await api('').post('/login', {correo_electronico: data.email,contrasena: data.password});
        
        return apiResp.data.access_token;
      } catch (error: any) {
        throw new ServerException({code: error?.status , data: error});
      }
    }
    async getSignInUser(acessToken: string): Promise<UserModel> {
      try {
        const apiResp= await api(acessToken).get('/user');
        
        const signInUser= userModelFromJson(apiResp.data);
        signInUser.accessToken = acessToken;

        return signInUser;
      } catch (error: any) {
        throw new ServerException({code: error?.status , data: error});
      }
    }
    async logOut(accessToken: string): Promise<void> {
      try {
        await api(accessToken).get('/logout');

      } catch (error: any) {
        throw new ServerException({code: error?.status , data: error});
      }
    }
    async resetPassword(data: any): Promise<void> {
      try {
        await api('').post('/reset-password', data);
        
      } catch (error: any) {
        throw new ServerException({code: error?.status , data: error});
      }
    }
  }