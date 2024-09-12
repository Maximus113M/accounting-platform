import { useUsersManagementStore } from '.';

//const salesRepositoryImp = new SalesRepositoryImpl(new SalesDatasourceImpl());
//const salesUseCase = new SalesUseCase(salesRepositoryImp);

export const createStudent = async () => {
  try {
    useUsersManagementStore
    // const res = await salesUseCase.create(toFirebaseSales(sale), file);
    // return { status: statusMessages.success, message: "success", id: res };
  } catch (error: any) {
    // const { code, message, details } = "response" in error ? error.response.data.error : error;
    // return { status: statusMessages.fail, error: new CustomError(code, message, details) };
  }
};