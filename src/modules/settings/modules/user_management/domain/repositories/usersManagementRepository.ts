import { UserModel } from 'src/models/userModel';
import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';


export abstract class UsersManagementRepository{
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
    abstract getStudentsByClassGroup(number: number, accessToken: string): Promise<UserModel[]>;
    abstract uploadStudents(formData: FormData, accessToken: string) : Promise<string>;

    abstract getClassGroups(accessToken: string): Promise<ClassGroup[] | Error>;
    abstract createClassGroup(accessToken:string, data: ClassGroup): Promise<ClassGroup>;
    abstract deleteClassGroup(accessToken: string, number: number): Promise<string>;
    abstract updateClassGroup(number: number, data: ClassGroup, accessToken:string): Promise<ClassGroup>;


}

