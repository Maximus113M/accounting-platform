import { useUsersManagementStore } from '.';
import { UsersManagementDatasourceImpl } from '../../data/datasources/usersManagementDatasource';
import { UsersManagementRepositoryImpl } from '../../data/respositories/usersManagementRepositoryImpl';
import { UsersManagementUseCases } from '../../domain/use-cases/usersManagementUseCases';

const usersManagementRepositoryImp = new UsersManagementRepositoryImpl(new UsersManagementDatasourceImpl());
const usersManagementUseCases = new UsersManagementUseCases(usersManagementRepositoryImp);

export const createStudent = async () => {
  try {
    useUsersManagementStore
    await usersManagementUseCases.createStudent({});
    
    return { status: 'success', message: 'success' };
  } catch (error: any) {
     //const { code, message, details } = "response" in error ? error.response.data.error : error;
     //return { status: statusMessages.fail, error: new CustomError(code, message, details) };
  }
};