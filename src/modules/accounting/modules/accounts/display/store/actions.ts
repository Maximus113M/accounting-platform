import { statusMessages } from 'src/core/helpers/generalHelpers';
import { exceptiosResponseHandler } from 'src/core/helpers/exceptions';
import { AccountUseCases } from 'src/modules/accounting/modules/accounts/domain/use-cases/accountUseCases';
import { AccountRepositoryImpl } from 'src/modules/accounting/modules/accounts/data/repositories/accountRepositoryImpl';
import { AccountRepository } from 'src/modules/accounting/modules/accounts/domain/repositories/accountRepository';
import { AccountDatasourceImpl } from 'src/modules/accounting/modules/accounts/data/datasources/accountDatasource';

const accountRepository :AccountRepository = new AccountRepositoryImpl(new AccountDatasourceImpl());
const accountUseCases = new AccountUseCases(accountRepository);

const getPuc = async (serial: number) => {
  try {
    const token = sessionStorage.getItem('token');
    const resp= await accountUseCases.getPuc(token!, serial);

    return { status: statusMessages.success, message: 'Sesión iniciada', data: resp};
  }  catch (error) {
    console.log(error);
    return { status: statusMessages.fail, error: error, message: exceptiosResponseHandler({error: error})};
  }
}

export { getPuc }
