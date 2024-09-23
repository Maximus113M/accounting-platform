import { ServerException } from 'src/core/helpers/exceptions';
import { UsersManagementRepository } from '../../domain/repositories/usersManagementRepository';
import { UsersManagementDatasource } from '../datasources/usersManagementDatasource';
import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';

export class UsersManagementRepositoryImpl implements UsersManagementRepository{

    usersManagementDatasource: UsersManagementDatasource;
    constructor(usersManagementDatasource: UsersManagementDatasource){
        this.usersManagementDatasource = usersManagementDatasource;
    }
    async getInstructor(id: string): Promise<any> {
        try {
            await this.usersManagementDatasource.getInstructor(id);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getAllInstructors(): Promise<any> {
        try {
            await this.usersManagementDatasource.getAllInstructors();
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async createInstructor(data: any): Promise<void> {
        try {
            await this.usersManagementDatasource.createInstructor(data);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async updateInstructor(id: string, data: any): Promise<void> {
        try {
            await this.usersManagementDatasource.updateInstructor(id, data);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async deleteInstructor(id: string): Promise<void> {
        try {
            await this.usersManagementDatasource.deleteInstructor(id);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }

    async getStudent(id: string): Promise<any> {
        try {
            await this.usersManagementDatasource.getStudent(id);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async getAllStudents(): Promise<any> {
        try {
            await this.usersManagementDatasource.getAllStudents();
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async createStudent(data: any): Promise<void> {
        try {
            await this.usersManagementDatasource.createStudent(data);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async updateStudent(id: string, data: any): Promise<void> {
        try {
            await this.usersManagementDatasource.updateStudent(id, data);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }
    async deleteStudent(id: string): Promise<void> {
        try {
            await this.usersManagementDatasource.deleteStudent(id);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }

    async getClassGroups(accessToken: string) : Promise<ClassGroup[] | Error> {
        try {
            return await this.usersManagementDatasource.getClassGroups(accessToken);
        } catch (err) {
            const error= err as ServerException;
            throw new ServerException({...error});
        }
    }

}
