import { ServerException } from 'src/core/helpers/exceptions';
import { CompaniesRepository } from '../../domain/repositories/companiesRepository';
import { CompaniesDatasource } from '../datasources/companiesDatasource';

export class CompaniesRepositoryImpl implements CompaniesRepository{
    private companiesDatasource: CompaniesDatasource;
    constructor(companiesDatasource: CompaniesDatasource){
        this.companiesDatasource= companiesDatasource;
    }

    async getCompany(id: string): Promise<any> {
        try {
            await this.companiesDatasource.getCompany(id); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async getAllCompanies(): Promise<any> {
        try {
            await this.companiesDatasource.getAllCompanies(); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async createCompany(data: any): Promise<void> {
        try {
            await this.companiesDatasource.createCompany(data); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async updateCompany(id: string, data: any): Promise<void> {
        try {
            await this.companiesDatasource.updateCompany(id, data); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async deleteCompany(id: string): Promise<void> {
        try {
            await this.companiesDatasource.deleteCompany(id); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
}