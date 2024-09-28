import { defineStore } from 'pinia';
import { useCompaniesState } from './state';
import * as actions from './actions';
export const useCompaniesStore = defineStore('companies-store', {
  state: () => ({ ...useCompaniesState() }),
  actions: { ...actions },
  getters: {},
});
