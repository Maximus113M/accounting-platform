import { CompaniesRepository } from '../repositories/companiesRepository';

export class CompaniesUseCases{
    private companiesRepository: CompaniesRepository;
    
    constructor(companiesRepository: CompaniesRepository){
        this.companiesRepository = companiesRepository;
    }

    getCompany= (serial: number, accessToken: string) => this.companiesRepository.getCompany(serial, accessToken);
    getAllCompanies= (accessToken: string) => this.companiesRepository.getAllCompanies(accessToken);
    createCompany= (data: any, accessToken: string) => this.companiesRepository.createCompany(data, accessToken);
    updateCompany= (serial: number, data: any, accessToken: string) => this.companiesRepository.updateCompany(serial, data, accessToken);
    deleteCompany= (serial: number, accessToken: string) => this.companiesRepository.deleteCompany(serial, accessToken);
    cloneCompany= (serial: number, groupNumber: number, accessToken: string) => this.companiesRepository.cloneCompany(serial, groupNumber, accessToken);
    
    getEconomicActivities= (accessToken: string ) => this.companiesRepository.getEconomicActivities(accessToken);
    getFiscalResponsabilities= (accessToken: string) => this.companiesRepository.getFiscalResponsabilities(accessToken);
    getTaxes= (accessToken: string) => this.companiesRepository.getTaxes(accessToken);


}