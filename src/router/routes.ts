import { RouteRecordRaw } from 'vue-router';
import { accessRols, checkIfAuthenticated } from './guards/authGuard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    beforeEnter: [checkIfAuthenticated],
    component: () => import('../modules/auth/display/views/AuthView.vue'),
    meta: {
      requiresAuth: false,
      access: accessRols.all
    },
    children: [

    ]
  },
  {
    path: '/main/',
    beforeEnter: [checkIfAuthenticated],
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      access: accessRols.all
    },
    children: [
      { 
        path: '', 
        beforeEnter: [checkIfAuthenticated],
        component: () => import('../modules/settings/display/views/SettingsView.vue'),
        meta: {
          requiresAuth: true,
          access: accessRols.all,
        },
        children:[
          
        ] 
      },
      { 
        path: 'users-management', 
        beforeEnter: [checkIfAuthenticated],
        component: () => import('../modules/settings/modules/user_management/display/views/UsersManagementMainView.vue'), 
        meta: {
          requiresAuth: true,
          access: accessRols.adminAndTeachers

        },
      },
      //Groups
      { 
        path: 'group-management',
        beforeEnter: [checkIfAuthenticated], 
        component: () => import('../modules/settings/modules/user_management/display/views/GroupManagementView.vue'), 
        meta: {
          requiresAuth: true,
          access: accessRols.adminAndTeachers
        },
      },
      //Instructors
      { 
        path: 'instructors-management',
        beforeEnter: [checkIfAuthenticated], 
        component: () => import('../modules/settings/modules/user_management/display/views/InstructorsManagementView.vue'), 
        meta: {
          requiresAuth: true,
          access: accessRols.adminAndTeachers
        },
      },
      //Company
      { 
        path: 'company', 
        beforeEnter: [checkIfAuthenticated],
        component: () => import('../modules/settings/modules/companies/display/views/CompaniesView.vue'), 
        meta: {
          requiresAuth: true,
          access: accessRols.all
        },
      },
      //ACCOUNTING
      { 
        path: 'accounts', 
        beforeEnter: [checkIfAuthenticated],
        component: () => import('../modules/accounting/modules/accounts/display/views/CompaniesAccountView.vue'), 
        meta: {
          requiresAuth: true,
          access: accessRols.all
        },
      },
      { 
        path: 'company-account', 
        beforeEnter: [checkIfAuthenticated],
        component: () => import('../modules/accounting/modules/accounts/display/views/CompaniesAccountView.vue'), 
        meta: {
          requiresAuth: true,
          access: accessRols.all
        },
      },
      { 
        path: 'NoRoute', 
        meta: {
          requiresAuth: false,
          access:  accessRols.all
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
