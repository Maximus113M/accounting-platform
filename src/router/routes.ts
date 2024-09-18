import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      { 
        path: '', 
        meta: {
          requiresAuth: true,
        },
        component: () => import('../modules/settings/display/views/SettingsView.vue'),
        children:[
          
        ] 
      },
      { 
        path: 'users-management', 
        meta: {
          requiresAuth: true,
        },
        component: () => import('../modules/settings/modules/user_management/display/views/UsersManagementMainView.vue'), 
      },
      { 
        path: 'group-management', 
        meta: {
          requiresAuth: true,
        },
        component: () => import('../modules/settings/modules/user_management/display/views/GroupManagementView.vue'), 
      },
      //Company
      { 
        path: 'company', 
        meta: {
          requiresAuth: true,
        },
        component: () => import('../modules/settings/modules/companies/display/views/CompaniesView.vue'), 
      },
      
      { 
        path: 'test', 
        meta: {
          requiresAuth: true,
        },
        component: () => import('../xpagesx/IndexPage.vue'), 
      },
      { 
        path: 'NoRoute', 
        meta: {
          requiresAuth: true,
        },
        component: () => import('../xpagesx/ErrorNotFound.vue'), 
      },
      

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
