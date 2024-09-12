export abstract class CompaniesDatasource {
    abstract getCompany(id: string): Promise<any>;
    abstract getAllCompanies(): Promise<any>;
    abstract createCompany(data: any): Promise<void>;
    abstract updateCompany(id: string, data: any): Promise<void>;
    abstract deleteCompany(id: string): Promise<void>;
  }
  
  export class CompaniesDatasourceImpl implements CompaniesDatasource{
      async getCompany(id: string): Promise<any> {
        try {
            id;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
      }
      async getAllCompanies(): Promise<any> {
        try {
            
        } catch (error) {
            throw new Error('Method not implemented.');
        }
      }
      async createCompany(data: any): Promise<void> {
        try {
            data;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
      }
      async updateCompany(id: string, data: any): Promise<void> {
        try {
            id;
            data;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
      }
      async deleteCompany(id: string): Promise<void> {
        try {
            id;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
      }
  }