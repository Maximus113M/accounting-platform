import { CompanyModel, companyModelFromJson } from '../models/companyModel';
import { ServerException } from 'src/core/helpers/exceptions';
import { api } from 'src/boot/axios';
import { EconomicActivity, FiscalResponsibilities } from '../models/taxData';

export abstract class CompaniesDatasource {
    abstract getCompany(serial: string, accessToken: string): Promise<CompanyModel>;
    abstract getAllCompanies(accessToken: string): Promise<CompanyModel[]>;
    abstract createCompany(data: any, accessToken: string): Promise<void>;
    abstract updateCompany(serial: string, data: any, accessToken: string): Promise<void>;
    abstract deleteCompany(serial: string, accessToken: string): Promise<void>;
    abstract cloneCompany(serial: string, groupNumber: number, accessToken: string ): Promise<any>;
    
    abstract getEconomicActivities(accessToken: string ): Promise<EconomicActivity[]>;
    abstract getFiscalResponsabilities(accessToken: string): Promise<FiscalResponsibilities[]>;
  }
  
  export class CompaniesDatasourceImpl implements CompaniesDatasource{
      async getCompany(serial: string, accessToken: string): Promise<CompanyModel> {
        try {
            const resp= await api(accessToken).get(`/company/${serial}`);
            
            const company: CompanyModel= companyModelFromJson(resp.data);
            
            return company;
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error}); 
        }
      }
      async getAllCompanies(accessToken: string): Promise<CompanyModel[]> {
        try {
          const resp= await api(accessToken).get('/companies');
          
          const companies: CompanyModel[]= (resp.data as Array<any>).map((company)=> companyModelFromJson(company));
          
          return companies;
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error}); 
        }
      }
      async createCompany(data: any, accessToken: string): Promise<void> {
        try {
          //TODO REVIEW THIS
          await api(accessToken).post('/create-company', data);
          
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async updateCompany(serial: string, data: any, accessToken: string): Promise<void> {
        try {
            //TODO REVIEW THIS
            await api(accessToken).put(`/update-company/${serial}`, data);
            
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async deleteCompany(serial: string, accessToken: string): Promise<void> {
        try {
          await api(accessToken).delete(`/delete-company/${serial}`);
          
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }

      async cloneCompany(serial: string, groupNumber: number, accessToken: string): Promise<any> {
        try {
          await api(accessToken).post('/clone-company',
            {empresa_serial: serial, numero_ficha: groupNumber} 
          );

        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }

      async getEconomicActivities(accessToken: string): Promise<EconomicActivity[]> {
        try {
          const apiResp= await api(accessToken).get('/actividades-economicas');
          return (apiResp.data as any[]).map((item)=> new EconomicActivity({key: item.codigo_ciiu, value: item.descripcion }));
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async getFiscalResponsabilities(accessToken: string): Promise<FiscalResponsibilities[]> {
        try {
          const apiResp= await api(accessToken).get('/resp-fiscal');
          return (apiResp.data as any[]).map((item)=> new FiscalResponsibilities({key: item.codigo, value: item.descripcion }));
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }

  }