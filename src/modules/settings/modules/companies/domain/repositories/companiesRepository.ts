export abstract class CompaniesRepository{
    abstract getCompany(id: string): Promise<any>;
    abstract getAllCompanies(): Promise<any>;
    abstract createCompany(data: any): Promise<void>;
    abstract updateCompany(id: string, data: any): Promise<void>;
    abstract deleteCompany(id: string): Promise<void>;
}