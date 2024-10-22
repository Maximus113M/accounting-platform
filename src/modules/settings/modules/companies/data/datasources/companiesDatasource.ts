import { CompanyModel, companyModelFromJson } from '../models/companyModel';
import { ServerException } from 'src/core/helpers/exceptions';
import { _headers, api } from 'src/boot/axios';
import { EconomicActivity, FiscalResponsibilities, Tax } from '../models/taxData';
import { ThirdModel } from '../models/thrid/thirdModel';

export abstract class CompaniesDatasource {
    abstract getCompany(serial: number, accessToken: string): Promise<CompanyModel>;
    abstract getAllCompanies(accessToken: string): Promise<CompanyModel[]>;
    abstract createCompany(data: any, accessToken: string): Promise<void>;
    abstract updateCompany(serial: number, data: any, accessToken: string): Promise<void>;
    abstract deleteCompany(serial: number, accessToken: string): Promise<void>;
    abstract cloneCompany(serial: number, groupNumber: number, accessToken: string ): Promise<any>;
    
    abstract getEconomicActivities(accessToken: string ): Promise<EconomicActivity[]>;
    abstract getFiscalResponsabilities(accessToken: string): Promise<FiscalResponsibilities[]>;
    abstract getTaxes(accessToken: string): Promise<Tax[]>;

    //Thirds
    abstract getThird( companyId: number, thirdId: number, accessToken: string): Promise<ThirdModel>;
    abstract getAllThirds(companyId: number, accessToken: string): Promise<ThirdModel[]>;
    abstract createThird(data: ThirdModel, accessToken: string): Promise<void>;
    abstract updateThird(thirdId: number, data: ThirdModel, accessToken: string): Promise<void>;
    abstract deleteThird(thirdId: number, companyId: number, accessToken: string): Promise<void>;
  }
  
  export class CompaniesDatasourceImpl implements CompaniesDatasource{
      async getCompany(serial: number, accessToken: string): Promise<CompanyModel> {
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
          const header:_headers = {
            ContentType: 'multipart/form-data',

          }
          console.log(data);
          await api(accessToken, header).post('/company', data);

          
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async updateCompany(serial: number, data: any, accessToken: string): Promise<void> {
        try {
            //TODO REVIEW THIS
            const header:_headers = {
              ContentType: 'multipart/form-data',
  
            }
            await api(accessToken, header).post('/update-company/'+serial+'?_method=PUT', data);
            
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async deleteCompany(serial: number, accessToken: string): Promise<void> {
        try {
          await api(accessToken).delete(`/delete-company/${serial}`);
          
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async cloneCompany(serial: number, groupNumber: number, accessToken: string): Promise<any> {
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
      async getTaxes(accessToken: string): Promise<Tax[]> {
        try {
          const apiResp= await api(accessToken).get('/tributos');
          return (apiResp.data as any[]).map((item)=> new Tax({key: item.id, value: item.nombre }));
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      

      async getThird(companyId: number, thirdId: number, accessToken: string): Promise<ThirdModel> {
        try {
          const apiResp= await api(accessToken).get('/third/'+companyId+'/'+thirdId);
          return ThirdModel.thirdModelFromJson(apiResp.data) ;
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async getAllThirds(companyId: number, accessToken: string): Promise<ThirdModel[]> {
        try {
          const apiResp= await api(accessToken).get('/thirds/'+companyId);
          return (apiResp.data as any[])?.map((third)=> ThirdModel.thirdModelFromJson(third)) ;
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      } 
      async createThird(data: ThirdModel, accessToken: string): Promise<void> {
        try {
          await api(accessToken).post('/create-third', ThirdModel.thirdModelToJson(data));
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      } 
      async updateThird(thirdId: number, data: ThirdModel, accessToken: string): Promise<void> {
        try {
          await api(accessToken).put('/update-third/'+thirdId, ThirdModel.thirdModelToJson(data));
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
      async deleteThird(thirdId: number, companyId: number, accessToken: string): Promise<void> {
        try {
          await api(accessToken).delete('/delete-third/'+thirdId, {
            data: {empresa_serial: companyId}
          });
        } catch (error: any) {
          throw new ServerException({code: error?.status , data: error});
        }
      }
  }