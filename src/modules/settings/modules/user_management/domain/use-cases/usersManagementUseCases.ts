import { UsersManagementRepository } from '../repositories/usersManagementRepository';
export class UsersManagementUseCases{
    
    private usersManagementRepository: UsersManagementRepository;
    constructor(usersManagementRepository: UsersManagementRepository){
        this.usersManagementRepository = usersManagementRepository;
    }

    getInstructor= (id: string) => this.usersManagementRepository.getInstructor(id);
    getAllInstructors= () => this.usersManagementRepository.getAllInstructors();
    createInstructor= (data: any) => this.usersManagementRepository.createInstructor(data);
    updateInstructor= (id: string, data: any) => this.usersManagementRepository.updateInstructor(id, data);
    deleteInstructor= (id: string) => this.usersManagementRepository.deleteInstructor(id);

    getStudent= (id: string) => this.usersManagementRepository.getStudent(id);
    getAllStudents= () => this.usersManagementRepository.getAllStudents();
    createStudent= (data: any) => this.usersManagementRepository.createStudent(data);
    updateStudent= (id: string, data: any) => this.usersManagementRepository.updateStudent(id, data);
    deleteStudent= (id: string) => this.usersManagementRepository.deleteStudent(id);
}