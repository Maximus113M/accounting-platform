import { exceptiosResponseHandler } from 'src/core/helpers/exceptions';
import { useAuthStore } from '.';
import { AuthDatasourceImpl } from '../../data/datasources/authDatasource';
import { AuthRepositoryImpl } from '../../data/respositories/authRepositoryImpl';
import { AuthUseCases } from '../../domain/use-cases/authUseCases';
import { statusMessages } from 'src/core/helpers/generalHelpers';

const authRepositoryImp = new AuthRepositoryImpl(new AuthDatasourceImpl());
const authUseCases = new AuthUseCases(authRepositoryImp);

export const logIn = async (data: Record<string, any>) => {
  try {
    const resp= await authUseCases.logIn(data);

    if (!resp) {
      return { status: statusMessages.fail, message: 'Credenciales invalidas' };
    }

    sessionStorage.setItem('token', resp);

    return { status: statusMessages.success, data: resp, message: 'Sesión iniciada'};
  }  catch (error) {
    console.log(error);
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
};

export const getSignInUser = async (accessToken: string) => {
  try {
    const authStore= useAuthStore();
    const resp= await authUseCases.getSignInUser(accessToken);

    if (!resp) {
      return { status: statusMessages.fail, message: 'Ocurrió un error al intentar obtener al usuario' };
    }
    authStore.signInUser= resp;

    return { status: statusMessages.success, message: 'Datos obtenidos'};
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
};