import { useUsersManagementStore } from '.';
import { UsersManagementDatasourceImpl } from '../../data/datasources/usersManagementDatasource';
import { UsersManagementRepositoryImpl } from '../../data/respositories/usersManagementRepositoryImpl';
import { UsersManagementUseCases } from '../../domain/use-cases/usersManagementUseCases';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { exceptiosResponseHandler } from 'src/core/helpers/exceptions';
import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';

const usersManagementRepositoryImp = new UsersManagementRepositoryImpl(
  new UsersManagementDatasourceImpl()
);
const usersManagementUseCases = new UsersManagementUseCases(usersManagementRepositoryImp);

const createStudent = async () => {
  try {
    useUsersManagementStore
    await usersManagementUseCases.createStudent({});

    return { status: 'success', message: 'success' };
  } catch (error: any) {
     //const { code, message, details } = "response" in error ? error.r  esponse.data.error : error;
     //return { status: statusMessages.fail, error: new CustomError(code, message, details) };
  }
};

const getStudentsByClassGroup = async (number: number) => {
  try {
    const userManagementStore = useUsersManagementStore();

    const token = sessionStorage.getItem('token');
    userManagementStore.studentsByClassGroup = await usersManagementUseCases.getStudentsByClassGroup(number, token!);

    return { status: statusMessages.success, message: 'Aprendices obtenidos'};
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
}

const uploadStudents = async (formData: FormData,) => {
  try {
    const token= sessionStorage.getItem('token');
    const res = await usersManagementUseCases.uploadStudents(formData, token!);
    return { status: statusMessages.success, message: res};
  } catch (error: any) {
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
}

const getClassGroups = async () => {
  try {
    const userManagementStore = useUsersManagementStore();

    const token = sessionStorage.getItem('token');
    const resp = await usersManagementUseCases.getClassGroups(token!);

    if (!resp || resp instanceof Error) {
      return { status: statusMessages.fail, message: (resp as Error).message ?? 'Error al obtener las fichas'};
    }
    userManagementStore.classGroups = resp;
    return { status: statusMessages.success, message: 'Datos obtenidos'};
  } catch (error: any) {
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
}

const createClassGroup = async (data: ClassGroup) => {
  try {
    const token= sessionStorage.getItem('token');
    const res = await usersManagementUseCases.createClassGroup(token!, data);
    return { status: statusMessages.success, message: 'Ficha creada correctamente.', classGroup: res };
  } catch (error: any) {
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
}

const deleteClassGroup = async (number: number) => {
  try {
    const token= sessionStorage.getItem('token');
    const res = await usersManagementUseCases.deleteClassGroup(token!, number);
    return { status: statusMessages.success, message: res };
  } catch (error: any) {
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
}

const updateClassGroup = async (number: number, data: ClassGroup) => {
  try {
    const token= sessionStorage.getItem('token');
    const res = await usersManagementUseCases.updateClassGroup(number, data, token!);
    return { status: statusMessages.success, message: 'Ficha actualizada correctamente', classGroup: res };
  } catch (error: any) {
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
}



export { createStudent, getClassGroups, createClassGroup, getStudentsByClassGroup, deleteClassGroup, updateClassGroup, uploadStudents };
