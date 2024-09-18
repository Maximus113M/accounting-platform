import axios from 'axios';
import { CompanyModel, companyModelFromJson } from '../models/companyModel';
import { ServerException } from 'src/core/helpers/exceptions';

export abstract class CompaniesDatasource {
    abstract getCompany(serial: string): Promise<any>;
    abstract getAllCompanies(): Promise<any>;
    abstract createCompany(data: any): Promise<void>;
    abstract updateCompany(serial: string, data: any): Promise<void>;
    abstract deleteCompany(serial: string): Promise<void>;
    abstract cloneCompany(serial: string, groupNumber: number ): Promise<any>;
  }
  
  export class CompaniesDatasourceImpl implements CompaniesDatasource{
      baseUrl= 'http://127.0.0.1:8000';

      async getCompany(serial: string): Promise<any> {
        try {
            const resp= await axios.get(`${this.baseUrl}/api/company/${serial}`);
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
      async getAllCompanies(): Promise<any> {
        try {
          const resp= await axios.get(`${this.baseUrl}/api/companies`);
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
      async createCompany(data: any): Promise<void> {
        try {
          //TODO REVIEW THIS
          const resp= await axios.post(`${this.baseUrl}/api/create-company`, data);
          if(resp.status !== 201){
            throw new Error(`${resp.status}`)
          }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
      async updateCompany(serial: string, data: any): Promise<void> {
        try {
            //TODO REVIEW THIS
            const resp= await axios.put(`${this.baseUrl}/api/update-company/${serial}`, data, {});
            if(resp.status !== 201){
              throw new Error(`${resp.status}`)
            }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
      async deleteCompany(serial: string): Promise<void> {
        try {
          const resp= await axios.delete(`${this.baseUrl}/api/delete-company/${serial}`);
          if(resp.status !== 201){
            throw new Error(`${resp.status}`)
          }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }

      async cloneCompany(serial: string, groupNumber: number): Promise<any> {
        try {
          const resp= await axios.delete(`${this.baseUrl}/api/clone-company`,{
            data: {empresa_serial: serial, numero_ficha: groupNumber} 
          });
          if(resp.status !== 201){
            throw new Error(`${resp.status}`)
          }
        } catch (err) {
          const error = err as Error;
          throw new ServerException(error.message);
        }
      }
  }