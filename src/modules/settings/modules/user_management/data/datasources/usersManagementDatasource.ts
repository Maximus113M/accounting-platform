import axios from 'axios';
import { ServerException } from 'src/core/helpers/exceptions';
import { UserModel } from 'src/models/userModel';
import { ClassGroup, classGroupFromJson } from 'src/modules/settings/modules/user_management/data/models/classGroup';
import { api } from 'boot/axios';

export abstract class UsersManagementDatasource {
    abstract getInstructor(id: string): Promise<UserModel>;
    abstract getAllInstructors(): Promise<UserModel[]>;
    abstract createInstructor(data: any): Promise<void>;
    abstract updateInstructor(id: string, data: any): Promise<void>;
    abstract deleteInstructor(id: string): Promise<void>;

    abstract getStudent(id: string): Promise<UserModel>;
    abstract getAllStudents(): Promise<UserModel[]>;
    abstract createStudent(data: any): Promise<void>;
    abstract updateStudent(id: string, data: any): Promise<void>;
    abstract deleteStudent(id: string): Promise<void>;

    abstract getClassGroups(accessToken: string): Promise<ClassGroup[] | Error> ;
  }

  export class UsersManagementDatasourceImpl implements UsersManagementDatasource{
    //Instructors
    async getInstructor(id: string): Promise<UserModel> {
        try {
            axios.get('', {});
            id;
            //TODO Verify
            return new UserModel({});
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async getAllInstructors(): Promise<UserModel[]> {
        try {
            return [];
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async createInstructor(data: any): Promise<void> {
        try {
            data
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async updateInstructor(id: string, data: any): Promise<void> {
        try {
            id
            data
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async deleteInstructor(id: string): Promise<void> {
        try {
            id
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }

    //Students
    async getStudent(id: string): Promise<UserModel> {
        try {
            id
            //TODO Verify
            return new UserModel({});
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async getAllStudents(): Promise<UserModel[]> {
        try {
            //TODO Verify
            return [];
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async createStudent(data: any): Promise<void> {
        try {
            data
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async updateStudent(id: string, data: any): Promise<void> {
        try {
            id
            data
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async deleteStudent(id: string): Promise<void> {
        try {
            id
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }

    // Class Groups
    async getClassGroups(accessToken: string): Promise<ClassGroup[]|Error> {
        try {
          console.log(accessToken);
            const { data } = await api(accessToken).get('/ficha');
            return (data as Array<any>).map(function (data) {
                return classGroupFromJson(data);
            });
        } catch (error : any) {
            console.log(error);
            throw new ServerException({code: error?.status , data: error});
        }
    }
  }
