import { UsersManagementRepository } from '../repositories/usersManagementRepository';
import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';
import { UserModel } from 'src/models/userModel';
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
    getStudentsByClassGroup= (number: number, accessToken: string) : Promise<UserModel[]>  => this.usersManagementRepository.getStudentsByClassGroup(number, accessToken);

    getClassGroups= (accessToken: string): Promise<ClassGroup[] | Error> => this.usersManagementRepository.getClassGroups(accessToken);
    createClassGroup= (accessToken: string, data: ClassGroup): Promise<ClassGroup> => this.usersManagementRepository.createClassGroup(accessToken, data);
    deleteClassGroup= (accessToken: string, number: number): Promise<string> => this.usersManagementRepository.deleteClassGroup(accessToken, number);
    updateClassGroup= (number:number, data: ClassGroup, accessToken: string): Promise<ClassGroup> => this.usersManagementRepository.updateClassGroup(number, data, accessToken);
}
