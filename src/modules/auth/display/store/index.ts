import { defineStore } from 'pinia';
import { useAuthState } from './state';
import * as actions from './actions';
export const useAuthStore = defineStore('auth-store', {
  state: () => ({ ...useAuthState() }),
  actions: { ...actions },
  getters: {},
});
