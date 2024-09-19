export abstract class CompaniesRepository{
    abstract getCompany(serial: string, accessToken: string): Promise<any>;
    abstract getAllCompanies(accessToken: string): Promise<any>;
    abstract createCompany(data: any, accessToken: string): Promise<void>;
    abstract updateCompany(serial: string, data: any, accessToken: string): Promise<void>;
    abstract deleteCompany(serial: string, accessToken: string): Promise<void>;
    abstract cloneCompany(serial: string, groupNumber: number, accessToken: string ): Promise<any>;
}