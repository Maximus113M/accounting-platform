import { Account, accountFromJson, accountToJson } from 'src/modules/accounting/modules/accounts/data/models/account';
import { ServerException } from 'src/core/helpers/exceptions';
import { api } from 'boot/axios';

export abstract class AccountDatasource {
  abstract getPuc(accessToken: string, serial: number): Promise<Account[]>;
  abstract createAccount(accessToken: string, account: Account): Promise<string>;
}

export class AccountDatasourceImpl extends AccountDatasource {
  async getPuc(accessToken: string, serial: number): Promise<Account[]> {
    try {
      const apiResp = await api(accessToken).get('/puc/' + serial);
      return (apiResp.data as []).map(function (value) {
        return accountFromJson(value);
      });
    } catch (error: any) {
      throw new ServerException({ code: error?.status, data: error });
    }
  }

  async createAccount(accessToken: string, account: Account): Promise<string> {
    try {
      console.log(account);
      const res = await api(accessToken).post('/create-account/', accountToJson(account));
      return res.data['message'];
    } catch (error: any) {
      throw new ServerException({ code: error?.status, data: error });
    }
  }
}
