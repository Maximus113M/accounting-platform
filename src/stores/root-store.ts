import { defineStore } from 'pinia';

export const useRootStore = defineStore('root', {
  state: () => ({
    currentRoute: '/',
  }),
  getters: {
    
  },
  actions: {
    changeRoute(route: string) {
      this.currentRoute = route;
      this.router.push(this.currentRoute);
      console.log('Route: '+this.currentRoute)
    },
  },
});
