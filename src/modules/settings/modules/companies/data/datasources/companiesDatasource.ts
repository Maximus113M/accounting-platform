import { CompanyModel, companyModelFromJson } from '../models/companyModel';
import { ServerException } from 'src/core/helpers/exceptions';
import { api } from 'src/boot/axios';

export abstract class CompaniesDatasource {
    abstract getCompany(serial: string, accessToken: string): Promise<any>;
    abstract getAllCompanies(accessToken: string): Promise<any>;
    abstract createCompany(data: any, accessToken: string): Promise<void>;
    abstract updateCompany(serial: string, data: any, accessToken: string): Promise<void>;
    abstract deleteCompany(serial: string, accessToken: string): Promise<void>;
    abstract cloneCompany(serial: string, groupNumber: number, accessToken: string ): Promise<any>;
  }
  
  export class CompaniesDatasourceImpl implements CompaniesDatasource{

      async getCompany(serial: string, accessToken: string): Promise<any> {
        try {
            const resp= await api(accessToken).get(`/company/${serial}`);
            if(resp.status !== 200){
              throw new Error(`${resp.status}`)
            }
            const company: CompanyModel= companyModelFromJson(resp.data);
            
            return company;
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
      async getAllCompanies(accessToken: string): Promise<any> {
        try {
          const resp= await api(accessToken).get('/companies');
          if(resp.status !== 200){
            throw new Error(`${resp.status}`)
          }
          const companies: CompanyModel[]= (resp.data as Array<any>).map((company)=> companyModelFromJson(company));
          
          return companies;
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
      async createCompany(data: any, accessToken: string): Promise<void> {
        try {
          //TODO REVIEW THIS
          const resp= await api(accessToken).post('/create-company', data);
          if(resp.status !== 201){
            throw new Error(`${resp.status}`)
          }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
      async updateCompany(serial: string, data: any, accessToken: string): Promise<void> {
        try {
            //TODO REVIEW THIS
            const resp= await api(accessToken).put(`/update-company/${serial}`, data);
            if(resp.status !== 201){
              throw new Error(`${resp.status}`)
            }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
      async deleteCompany(serial: string, accessToken: string): Promise<void> {
        try {
          const resp= await api(accessToken).delete(`/delete-company/${serial}`);
          if(resp.status !== 201){
            throw new Error(`${resp.status}`)
          }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }

      async cloneCompany(serial: string, groupNumber: number, accessToken: string): Promise<any> {
        try {
          const resp= await api(accessToken).post('/clone-company',
            {empresa_serial: serial, numero_ficha: groupNumber} 
          );
          if(resp.status !== 201){
            throw new Error(`${resp.status}`)
          }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
  }