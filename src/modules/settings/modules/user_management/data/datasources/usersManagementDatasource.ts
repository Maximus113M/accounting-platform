import axios from 'axios';

export abstract class UsersManagementDatasource {
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
  }
  
  export class UsersManagementDatasourceImpl implements UsersManagementDatasource{
    //Instructors
    async getInstructor(id: string): Promise<any> {
        try {
            axios.get('', {});
            id;
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async getAllInstructors(): Promise<any[]> {
        try {
            return [];
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async createInstructor(data: any): Promise<void> {
        try {
            data
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async updateInstructor(id: string, data: any): Promise<void> {
        try {
            id
            data
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async deleteInstructor(id: string): Promise<void> {
        try {
            id
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    
    //Students
    async getStudent(id: string): Promise<any> {
        try {
            id
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async getAllStudents(): Promise<any[]> {
        try {
            return [];
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async createStudent(data: any): Promise<void> {
        try {
            data
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async updateStudent(id: string, data: any): Promise<void> {
        try {
            id
            data
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
    async deleteStudent(id: string): Promise<void> {
        try {
            id
        } catch (error) {
            throw new Error('Method not implemented.');
        }
    }
  }