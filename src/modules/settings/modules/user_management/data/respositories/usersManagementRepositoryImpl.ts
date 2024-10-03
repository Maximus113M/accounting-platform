import { ServerException } from 'src/core/helpers/exceptions';
import { UsersManagementRepository } from '../../domain/repositories/usersManagementRepository';
import { UsersManagementDatasource } from '../datasources/usersManagementDatasource';
import { UserModel } from 'src/models/userModel';
import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';

export class UsersManagementRepositoryImpl implements UsersManagementRepository {

  usersManagementDatasource: UsersManagementDatasource;

  constructor(usersManagementDatasource: UsersManagementDatasource) {
    this.usersManagementDatasource = usersManagementDatasource;
  }

  async getInstructor(id: number, acessToken: string): Promise<UserModel> {
    try {
      return await this.usersManagementDatasource.getInstructor(id, acessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async getAllInstructors(acessToken: string): Promise<UserModel[]> {
    try {

      return await this.usersManagementDatasource.getAllInstructors(acessToken);

    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async createInstructor(data: any, acessToken: string): Promise<void> {
    try {

      return await this.usersManagementDatasource.createInstructor(data, acessToken);

    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async updateInstructor(id: number, data: any, acessToken: string): Promise<void> {
    try {
      return await this.usersManagementDatasource.updateInstructor(id, data, acessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async deleteInstructor(id: number, acessToken: string): Promise<void> {
    try {
      return await this.usersManagementDatasource.deleteInstructor(id, acessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async getStudent(id: string): Promise<UserModel> {
    try {
      return await this.usersManagementDatasource.getStudent(id);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async getAllStudents(): Promise<UserModel[]> {
    try {
      return await this.usersManagementDatasource.getAllStudents();
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async createStudent(data: any): Promise<void> {
    try {
      return await this.usersManagementDatasource.createStudent(data);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async updateStudent(data: UserModel, accessToken: string): Promise<UserModel> {
    try {
      return await this.usersManagementDatasource.updateStudent(data, accessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async deleteStudent(id: number, accessToken: string): Promise<string> {
    try {
      return this.usersManagementDatasource.deleteStudent(id, accessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async getStudentsByClassGroup(number: number, accessToken: string): Promise<UserModel[]> {
    try {
      return await this.usersManagementDatasource.getStudentsByClassGroup(number, accessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async uploadStudents(formData: FormData, accessToken: string) : Promise<string> {
    try {
      return await this.usersManagementDatasource.uploadStudents(formData, accessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }


  async getClassGroups(accessToken: string): Promise<ClassGroup[] | Error> {
    try {
      return await this.usersManagementDatasource.getClassGroups(accessToken);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async createClassGroup(accessToken: string, data: ClassGroup): Promise<ClassGroup> {
    try {
      return await this.usersManagementDatasource.createClassGroup(accessToken, data);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async deleteClassGroup(accessToken: string, number: number): Promise<string> {
    try {
      return await this.usersManagementDatasource.deleteClassGroup(accessToken, number);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async updateClassGroup(number: number, data: ClassGroup, accessToken: string): Promise<ClassGroup> {
    try {
      return await this.usersManagementDatasource.updateClassGroup(number, data, accessToken);
    } catch (error: any) {
      throw new ServerException({ code: error?.status, data: error });
    }
  }
}
