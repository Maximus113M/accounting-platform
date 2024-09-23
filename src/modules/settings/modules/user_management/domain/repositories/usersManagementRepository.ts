import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';

export abstract class UsersManagementRepository{
    abstract getInstructor(id: string): Promise<any>;
    abstract getAllInstructors(): Promise<any[]>;
    abstract createInstructor(data: any): Promise<void>;
    abstract updateInstructor(id: string, data: any): Promise<void>;
    abstract deleteInstructor(id: string): Promise<void>;

    abstract getStudent(id: string): Promise<any>;
    abstract getAllStudents(): Promise<any[]>;
    abstract createStudent(data: any): Promise<void>;
    abstract updateStudent(id: string, data: any): Promise<void>;
    abstract deleteStudent(id: string): Promise<void>;

    abstract getClassGroups(accessToken: string): Promise<ClassGroup[] | Error>;

}
