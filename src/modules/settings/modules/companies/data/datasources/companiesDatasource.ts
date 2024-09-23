import { CompanyModel, companyModelFromJson } from '../models/companyModel';
import { ServerException } from 'src/core/helpers/exceptions';
import { api } from 'src/boot/axios';

export abstract class CompaniesDatasource {
    abstract getCompany(serial: string, accessToken: string): Promise<CompanyModel>;
    abstract getAllCompanies(accessToken: string): Promise<CompanyModel[]>;
    abstract createCompany(data: any, accessToken: string): Promise<void>;
    abstract updateCompany(serial: string, data: any, accessToken: string): Promise<void>;
    abstract deleteCompany(serial: string, accessToken: string): Promise<void>;
    abstract cloneCompany(serial: string, groupNumber: number, accessToken: string ): Promise<any>;
  }
  
  export class CompaniesDatasourceImpl implements CompaniesDatasource{

      async getCompany(serial: string, accessToken: string): Promise<CompanyModel> {
        try {
            const resp= await api(accessToken).get(`/company/${serial}`);
            if(resp.status !== 200){
              throw new Error(`${resp.status}`)
            }
            const company: CompanyModel= companyModelFromJson(resp.data);
            
            return company;
        } catch (err) {
          const error = err as any;
          throw new ServerException({code: error?.status , data: error}); 
        }
      }
      async getAllCompanies(accessToken: string): Promise<CompanyModel[]> {
        try {
          const resp= await api(accessToken).get('/companies');
          if(resp.status !== 200){
            throw new Error(`${resp.status}`)
          }
          const companies: CompanyModel[]= (resp.data as Array<any>).map((company)=> companyModelFromJson(company));
          
          return companies;
        } catch (err) {
          const error = err as any;
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async createCompany(data: any, accessToken: string): Promise<void> {
        try {
          //TODO REVIEW THIS
          await api(accessToken).post('/create-company', data);
          
        } catch (err) {
          const error = err as any;
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async updateCompany(serial: string, data: any, accessToken: string): Promise<void> {
        try {
            //TODO REVIEW THIS
            await api(accessToken).put(`/update-company/${serial}`, data);
            
        } catch (err) {
          const error = err as any;
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async deleteCompany(serial: string, accessToken: string): Promise<void> {
        try {
          await api(accessToken).delete(`/delete-company/${serial}`);
          
        } catch (err) {
          const error = err as any;
          throw new ServerException({code: error?.status , data: error});
        }
      }

      async cloneCompany(serial: string, groupNumber: number, accessToken: string): Promise<any> {
        try {
          await api(accessToken).post('/clone-company',
            {empresa_serial: serial, numero_ficha: groupNumber} 
          );

        } catch (err) {
          const error = err as any;
          throw new ServerException({code: error?.status , data: error});
        }
      }
  }