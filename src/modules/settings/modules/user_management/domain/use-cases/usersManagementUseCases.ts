import { UsersManagementRepository } from '../repositories/usersManagementRepository';
import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';
import { UserModel } from 'src/models/userModel';
export class UsersManagementUseCases{

    private usersManagementRepository: UsersManagementRepository;
    constructor(usersManagementRepository: UsersManagementRepository){
        this.usersManagementRepository = usersManagementRepository;
    }
    
    getInstructor= (id: number, accessToken: string) => this.usersManagementRepository.getInstructor(id, accessToken);
    getAllInstructors= (accessToken: string) => this.usersManagementRepository.getAllInstructors(accessToken);
    createInstructor= (data: any, accessToken: string) => this.usersManagementRepository.createInstructor(data, accessToken);
    updateInstructor= (id: number, data: any, accessToken: string) => this.usersManagementRepository.updateInstructor(id, data, accessToken);
    deleteInstructor= (id: number, accessToken: string) => this.usersManagementRepository.deleteInstructor(id, accessToken);

    getStudent= (id: string) => this.usersManagementRepository.getStudent(id);
    getAllStudents= () => this.usersManagementRepository.getAllStudents();
    createStudent= (data: any) => this.usersManagementRepository.createStudent(data);
    updateStudent= (data: any, accessToken: string) : Promise<UserModel> => this.usersManagementRepository.updateStudent(data, accessToken);
    deleteStudent= (id: number, accessToken :string) : Promise<string> => this.usersManagementRepository.deleteStudent(id, accessToken);
    getStudentsByClassGroup= (number: number, accessToken: string) : Promise<UserModel[]>  => this.usersManagementRepository.getStudentsByClassGroup(number, accessToken);
    uploadStudents= (formData: FormData, accessToken: string) : Promise<string> => this.usersManagementRepository.uploadStudents(formData, accessToken);

    getClassGroups= (accessToken: string): Promise<ClassGroup[] | Error> => this.usersManagementRepository.getClassGroups(accessToken);
    createClassGroup= (accessToken: string, data: ClassGroup): Promise<ClassGroup> => this.usersManagementRepository.createClassGroup(accessToken, data);
    deleteClassGroup= (accessToken: string, number: number): Promise<string> => this.usersManagementRepository.deleteClassGroup(accessToken, number);
    updateClassGroup= (number:number, data: ClassGroup, accessToken: string): Promise<ClassGroup> => this.usersManagementRepository.updateClassGroup(number, data, accessToken);
}
