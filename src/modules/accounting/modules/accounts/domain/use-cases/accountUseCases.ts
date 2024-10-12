import { AccountRepository } from 'src/modules/accounting/modules/accounts/domain/repositories/accountRepository';
import { Account } from 'src/modules/accounting/modules/accounts/data/models/account';

export class AccountUseCases {
  private readonly accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  getPuc = (accessToken: string, serial: number) => this.accountRepository.getPuc(accessToken, serial);
  createAccount = (accessToken: string, account: Account) => this.accountRepository.createAccount(accessToken, account);
}
