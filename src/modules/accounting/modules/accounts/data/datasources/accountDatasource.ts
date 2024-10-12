import { Account, accountFromJson } from 'src/modules/accounting/modules/accounts/data/models/account';
import { ServerException } from 'src/core/helpers/exceptions';
import { api } from 'boot/axios';

export abstract class AccountDatasource {
  abstract getPuc(accessToken: string, serial: number): Promise<Account[]>;
}

export class AccountDatasourceImpl extends AccountDatasource {

  async getPuc(accessToken: string, serial: number): Promise<Account[]> {
    try {
      const apiResp= await api(accessToken)
        .get('/puc/'+serial);
      return (apiResp.data as []).map(function(value) {
        return accountFromJson(value);
      });
    } catch (error: any) {
      throw new ServerException({code: error?.status , data: error});
    }
  }


}
