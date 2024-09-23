import { ServerException } from 'src/core/helpers/exceptions';
import { CompaniesRepository } from '../../domain/repositories/companiesRepository';
import { CompaniesDatasource } from '../datasources/companiesDatasource';
import { CompanyModel } from '../models/companyModel';

export class CompaniesRepositoryImpl implements CompaniesRepository{
    private companiesDatasource: CompaniesDatasource;
    constructor(companiesDatasource: CompaniesDatasource){
        this.companiesDatasource= companiesDatasource;
    }
    async getCompany(id: string, accessToken: string): Promise<CompanyModel> {
        try {
            return await this.companiesDatasource.getCompany(id, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getAllCompanies(accessToken: string): Promise<CompanyModel[]> {
        try {
            return await this.companiesDatasource.getAllCompanies(accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async createCompany(data: any, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.createCompany(data, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async updateCompany(id: string, data: any, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.updateCompany(id, data, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async deleteCompany(id: string, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.deleteCompany(id, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async cloneCompany(serial: string, groupNumber: number, accessToken: string): Promise<any> {
        try {
            return await this.companiesDatasource.cloneCompany(serial, groupNumber, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
}