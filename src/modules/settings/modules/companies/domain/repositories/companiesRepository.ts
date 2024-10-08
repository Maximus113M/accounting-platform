import { CompanyModel } from '../../data/models/companyModel';
import { EconomicActivity, FiscalResponsibilities, Tax } from '../../data/models/taxData';

export abstract class CompaniesRepository{
    abstract getCompany(serial: number, accessToken: string): Promise<CompanyModel>;
    abstract getAllCompanies(accessToken: string): Promise<CompanyModel[]>;
    abstract createCompany(data: any, accessToken: string): Promise<void>;
    abstract updateCompany(serial: number, data: any, accessToken: string): Promise<void>;
    abstract deleteCompany(serial: number, accessToken: string): Promise<void>;
    abstract cloneCompany(serial: number, groupNumber: number, accessToken: string ): Promise<any>;
    
    abstract getEconomicActivities(accessToken: string ): Promise<EconomicActivity[]>;
    abstract getFiscalResponsabilities(accessToken: string): Promise<FiscalResponsibilities[]>;
    abstract getTaxes(accessToken: string): Promise<Tax[]>;
}