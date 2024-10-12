import { AccountRepository } from 'src/modules/accounting/modules/accounts/domain/repositories/accountRepository';
import { Account } from 'src/modules/accounting/modules/accounts/data/models/account';
import { ServerException } from 'src/core/helpers/exceptions';
import { AccountDatasource } from 'src/modules/accounting/modules/accounts/data/datasources/accountDatasource';

export class AccountRepositoryImpl implements AccountRepository {
  private readonly accountDataSource: AccountDatasource;

  constructor(accountDataSource: AccountDatasource) {
    this.accountDataSource = accountDataSource;
  }

  async getPuc(accessToken: string, serial: number): Promise<Account[]> {
    try {
      return await this.accountDataSource.getPuc(accessToken, serial);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }

  async createAccount(accessToken: string, account: Account): Promise<string> {
    try {
      return await this.accountDataSource.createAccount(accessToken, account);
    } catch (err) {
      const error = err as ServerException;
      throw new ServerException({ ...error });
    }
  }
}
