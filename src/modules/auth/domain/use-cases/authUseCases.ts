import { AuthRepository } from '../repositories/authRepository';

export class AuthUseCases{
    private authRepository: AuthRepository;
    
    constructor(authRepository: AuthRepository){
        this.authRepository = authRepository;
    }

    logIn= (data: any) => this.authRepository.logIn(data);
    getSignInUser= (acessToken: string) => this.authRepository.getSignInUser(acessToken);
    getAllCompanies= (id: string, accessToken: string) => this.authRepository.logOut(id, accessToken);
    resetPassword= (data: any) => this.authRepository.resetPassword(data);
}