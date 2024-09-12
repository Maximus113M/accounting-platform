import { CompaniesRepository } from '../repositories/companiesRepository';

export class CompaniesUseCases{

    private companiesRepository: CompaniesRepository;
    constructor(companiesRepository: CompaniesRepository){
        this.companiesRepository = companiesRepository;
    }

    getCompany= (id: string) => this.companiesRepository.getCompany(id);
    getAllCompanies= () => this.companiesRepository.getAllCompanies();
    createCompany= (data: any) => this.companiesRepository.createCompany(data);
    updateCompany= (id: string, data: any) => this.companiesRepository.updateCompany(id, data);
    deleteCompany= (id: string) => this.companiesRepository.deleteCompany(id);
}