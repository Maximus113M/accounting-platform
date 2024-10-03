import axios from 'axios';
import { ServerException } from 'src/core/helpers/exceptions';
import { UserModel, userModelFromJson, userModelToJson } from 'src/models/userModel';
import {
  ClassGroup,
  classGroupFromJson,
  classGroupToJson
} from 'src/modules/settings/modules/user_management/data/models/classGroup';
import { _headers, api } from 'boot/axios';

export abstract class UsersManagementDatasource {
    abstract getInstructor(id: number, accessToken: string): Promise<UserModel>;
    abstract getAllInstructors(accessToken: string): Promise<UserModel[]>;
    abstract createInstructor(data: any, accessToken: string): Promise<void>;
    abstract updateInstructor(id: number, data: any, accessToken: string): Promise<void>;
    abstract deleteInstructor(id: number, accessToken: string): Promise<void>;

    abstract getStudent(id: string): Promise<UserModel>;
    abstract getAllStudents(): Promise<UserModel[]>;
    abstract createStudent(data: any): Promise<void>;
    abstract updateStudent(data: UserModel, accessToken: string): Promise<UserModel>;
    abstract deleteStudent(id: number, accessToken: string): Promise<string>;
    abstract getStudentsByClassGroup(number: number, accessToken:string): Promise<UserModel[]>;
    abstract uploadStudents(formData: FormData, accessToken: string) : Promise<string>;

    abstract getClassGroups(accessToken: string): Promise<ClassGroup[] | Error>;
    abstract createClassGroup(accessToken: string, data: ClassGroup): Promise<ClassGroup>;
    abstract deleteClassGroup(accessToken: string, number: number): Promise<string>;
    abstract updateClassGroup(number: number, data: ClassGroup, accessToken:string): Promise<ClassGroup>;


}

  export class UsersManagementDatasourceImpl implements UsersManagementDatasource{
    //Instructors
    async getInstructor(id: number, accessToken: string): Promise<UserModel> {
        try {
            axios.get('instructores', {});
            id;
            //TODO Verify
            return new UserModel({});
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async getAllInstructors(accessToken: string): Promise<UserModel[]> {
        try {
            const resp = await api(accessToken).get('/instructores');
            return (resp.data as any[]).map((student) => userModelFromJson(student));
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async createInstructor(data: any, accessToken: string): Promise<void> {
        try {
            data
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async updateInstructor(id: number, data: any, accessToken: string): Promise<void> {
        try {
            id
            data
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async deleteInstructor(id: number, accessToken: string): Promise<void> {
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
    async updateStudent(data: UserModel, accessToken: string): Promise<UserModel> {
        try {
            const res = await api(accessToken).put('/update-aprendiz/'+data.id, userModelToJson(data));
            return userModelFromJson(res.data['aprendiz']);
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async deleteStudent(id: number, accessToken: string): Promise<string> {
        try {
            const res = await api(accessToken).delete('/delete-aprendiz/'+id);
            return res.data['message'];
        } catch (error: any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async getStudentsByClassGroup(number: number, accessToken: string): Promise<UserModel[]> {
        try {
            const { data } = await api(accessToken).get('/ficha/'+number);
            return (data['users'] as []).map(function (student: any) {
              student['ficha'] = number;
              return userModelFromJson(student);
            });
        } catch (error: any) {
            console.log(error);
            throw new ServerException({code: error?.status , data: error});
        }
    }
    async uploadStudents(formData: FormData, accessToken: string) : Promise<string> {
        try {
            const headers : _headers = { ContentType : 'multipart/form-data' };
            const { data } = await api(accessToken, headers)
                .post('/upload-aprendices/', formData);
            const res = data['repeated'] as [];
            if (res.length === 0) return '';
            return res.reduce(function(acc, currentValue) {
              const user = userModelFromJson(currentValue);
              acc += user.documentNumber + ': ' + user.names + ' ';
              return acc;
            }, 'Los siguientes usuarios estan repetidos: ');

        } catch (error: any) {
            console.log(error);
            throw new ServerException({code: error?.status , data: error});
        }
    }


    // Class Groups
    async getClassGroups(accessToken: string): Promise<ClassGroup[]|Error> {
        try {
            const { data } = await api(accessToken).get('/ficha');
            return (data as []).map(function (data) {
                return classGroupFromJson(data);
            });
        } catch (error : any) {
            throw new ServerException({code: error?.status , data: error});
        }
    }

    async createClassGroup(accessToken: string, data: ClassGroup): Promise<ClassGroup> {
        try {
            const res = await api(accessToken).post('/ficha', classGroupToJson(data));
            return classGroupFromJson(res.data['ficha']);
        }  catch (error : any) {
            console.log(error);
            throw new ServerException({code: error?.status , data: error});
        }
    }

    async deleteClassGroup(accessToken: string, number: number): Promise<string> {
        try {
            const res = await api(accessToken).delete('/ficha/'+number);
            return res.data['message'];
        } catch (error : any) {
          throw new ServerException({code: error?.status , data: error});
        }
    }

    async updateClassGroup(number: number, data: ClassGroup, accessToken:string): Promise<ClassGroup> {
        try {
          const res = await api(accessToken).put('/ficha/'+number, classGroupToJson(data));
          return classGroupFromJson(res.data['ficha']);
        } catch (error : any) {
          console.log(error);
          throw new ServerException({code: error?.status , data: error});
        }
    }

  }
