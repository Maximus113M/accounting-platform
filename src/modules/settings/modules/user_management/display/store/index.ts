import { defineStore } from 'pinia';
import { useUsersManagementState } from './state';
import * as actions from './actions';

export const useUsersManagementStore = defineStore('users-management-store', {
  state: () => ({ ...useUsersManagementState() }),
  actions: { ...actions },
  getters: {},
});

