import { Account } from 'src/modules/accounting/modules/accounts/data/models/account';

export abstract class AccountRepository {
  abstract getPuc(accessToken:string, serial:number) : Promise<Account[]>;
  abstract createAccount(accessToken:string, account:Account) : Promise<string>;
}
