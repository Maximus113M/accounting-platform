import { ServerException } from 'src/core/helpers/exceptions';
import { CompaniesRepository } from '../../domain/repositories/companiesRepository';
import { CompaniesDatasource } from '../datasources/companiesDatasource';
import { CompanyModel } from '../models/companyModel';
import { EconomicActivity, FiscalResponsibilities, Tax } from '../models/taxData';
import { ThirdModel } from '../models/thrid/thirdModel';

export class CompaniesRepositoryImpl implements CompaniesRepository{
    private companiesDatasource: CompaniesDatasource;
    constructor(companiesDatasource: CompaniesDatasource){
        this.companiesDatasource= companiesDatasource;
    }
    async getCompany(serial: number, accessToken: string): Promise<CompanyModel> {
        try {
            return await this.companiesDatasource.getCompany(serial, accessToken); 
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
    async updateCompany(serial: number, data: any, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.updateCompany(serial, data, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async deleteCompany(serial: number, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.deleteCompany(serial, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async cloneCompany(serial: number, groupNumber: number, accessToken: string): Promise<any> {
        try {
            return await this.companiesDatasource.cloneCompany(serial, groupNumber, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getEconomicActivities(accessToken: string): Promise<EconomicActivity[]> {
        try {
            return await this.companiesDatasource.getEconomicActivities(accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getFiscalResponsabilities(accessToken: string): Promise<FiscalResponsibilities[]> {
        try {
            return await this.companiesDatasource.getFiscalResponsabilities(accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getTaxes(accessToken: string): Promise<Tax[]> {
        try {
            return await this.companiesDatasource.getTaxes(accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }    
    }

    //THRIDS
    async getThird(companyId: number, thirdId: number, accessToken: string): Promise<ThirdModel> {
        try {
            return await this.companiesDatasource.getThird(companyId, thirdId, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getAllThirds(companyId: number, accessToken: string): Promise<ThirdModel[]> {
        try {
            return await this.companiesDatasource.getAllThirds(companyId, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async createThird(data: any, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.createThird(data, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async updateThird(thirdId: number, data: any, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.updateThird(thirdId, data, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async deleteThird(thirdId: number, companyId: number, accessToken: string): Promise<void> {
        try {
            return await this.companiesDatasource.deleteThird(thirdId, companyId, accessToken); 
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
}