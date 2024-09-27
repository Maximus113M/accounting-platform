import { AuthRepository } from '../repositories/authRepository';

export class AuthUseCases{
    private authRepository: AuthRepository;
    
    constructor(authRepository: AuthRepository){
        this.authRepository = authRepository;
    }

    logIn= (data: any) => this.authRepository.logIn(data);
    getSignInUser= (acessToken: string) => this.authRepository.getSignInUser(acessToken);
    resetPassword= (data: any) => this.authRepository.resetPassword(data);
    logOut= (accessToken: string) => this.authRepository.logOut(accessToken);
}