export abstract class SettingsDatasource {
    abstract create(data: any, file: File | null): Promise<string>;
    abstract basicUpdate(id: string, data: any): Promise<boolean>;
  }
  
  export class SettingsDatasourceImpl implements SettingsDatasource{
    
      create(data: any, file: File | null): Promise<string> {
          throw new Error("Method not implemented.");
      }
      basicUpdate(id: string, data: any): Promise<boolean> {
          throw new Error("Method not implemented.");
      }

  }