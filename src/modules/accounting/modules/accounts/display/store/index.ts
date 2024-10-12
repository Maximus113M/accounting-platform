import { defineStore } from 'pinia';
import * as actions from './actions';
import { useAccountState } from 'src/modules/accounting/modules/accounts/display/store/state';

export const useAccountStore = defineStore('account-store', {
  state: () => ({ ...useAccountState() }),
  actions: { ...actions },
  getters: {}
})
