import { CompanyModel } from '../../data/models/companyModel';

export abstract class CompaniesRepository{
    abstract getCompany(serial: string, accessToken: string): Promise<CompanyModel>;
    abstract getAllCompanies(accessToken: string): Promise<CompanyModel[]>;
    abstract createCompany(data: any, accessToken: string): Promise<void>;
    abstract updateCompany(serial: string, data: any, accessToken: string): Promise<void>;
    abstract deleteCompany(serial: string, accessToken: string): Promise<void>;
    abstract cloneCompany(serial: string, groupNumber: number, accessToken: string ): Promise<any>;
}