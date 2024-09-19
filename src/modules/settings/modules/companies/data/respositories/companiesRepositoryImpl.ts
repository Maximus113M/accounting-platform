import { ServerException } from 'src/core/helpers/exceptions';
import { CompaniesRepository } from '../../domain/repositories/companiesRepository';
import { CompaniesDatasource } from '../datasources/companiesDatasource';

export class CompaniesRepositoryImpl implements CompaniesRepository{
    private companiesDatasource: CompaniesDatasource;
    constructor(companiesDatasource: CompaniesDatasource){
        this.companiesDatasource= companiesDatasource;
    }
    async getCompany(id: string, accessToken: string): Promise<any> {
        try {
            await this.companiesDatasource.getCompany(id, accessToken); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async getAllCompanies(accessToken: string): Promise<any> {
        try {
            await this.companiesDatasource.getAllCompanies(accessToken); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async createCompany(data: any, accessToken: string): Promise<void> {
        try {
            await this.companiesDatasource.createCompany(data, accessToken); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async updateCompany(id: string, data: any, accessToken: string): Promise<void> {
        try {
            await this.companiesDatasource.updateCompany(id, data, accessToken); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async deleteCompany(id: string, accessToken: string): Promise<void> {
        try {
            await this.companiesDatasource.deleteCompany(id, accessToken); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
    async cloneCompany(serial: string, groupNumber: number, accessToken: string): Promise<any> {
        try {
            await this.companiesDatasource.cloneCompany(serial, groupNumber, accessToken); 
        } catch (err) {
            const error= err as Error;
            throw new ServerException(error.message);
        }
    }
}