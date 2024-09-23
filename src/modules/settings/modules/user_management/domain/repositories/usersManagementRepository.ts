import { UserModel } from "src/models/userModel";

export abstract class UsersManagementRepository{
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

}