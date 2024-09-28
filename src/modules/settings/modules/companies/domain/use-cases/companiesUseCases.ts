import { CompaniesRepository } from '../repositories/companiesRepository';

export class CompaniesUseCases{
    private companiesRepository: CompaniesRepository;
    
    constructor(companiesRepository: CompaniesRepository){
        this.companiesRepository = companiesRepository;
    }

    getCompany= (id: string, accessToken: string) => this.companiesRepository.getCompany(id, accessToken);
    getAllCompanies= (accessToken: string) => this.companiesRepository.getAllCompanies(accessToken);
    createCompany= (data: any, accessToken: string) => this.companiesRepository.createCompany(data, accessToken);
    updateCompany= (id: string, data: any, accessToken: string) => this.companiesRepository.updateCompany(id, data, accessToken);
    deleteCompany= (id: string, accessToken: string) => this.companiesRepository.deleteCompany(id, accessToken);
    
    getEconomicActivities= (accessToken: string ) => this.companiesRepository.getEconomicActivities(accessToken);
    getFiscalResponsabilities= (accessToken: string) => this.companiesRepository.getFiscalResponsabilities(accessToken);

}