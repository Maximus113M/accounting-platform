import { AccountRepository } from 'src/modules/accounting/modules/accounts/domain/repositories/accountRepository';

export class AccountUseCases {
  private readonly accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  getPuc = (accessToken: string, serial: number) => this.accountRepository.getPuc(accessToken, serial);
}
