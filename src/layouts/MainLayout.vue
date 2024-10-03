<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2 ">
    <!-- q-pt-md q-px-lg -->
    <q-header class="bg-white" elevated>
      <q-toolbar>
        <q-btn dense flat round color="primary" icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="text-primary text-bold text-capitalize text-h4">SenaCont</div>
          <div class="text-caption text-weight-medium text-grey-10">Hola ¡Bienvenido!</div>
        </q-toolbar-title>
        <div class="text-weight-medium text-grey-10">Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="230" class="q-px-sm bg-primary">
      <q-scroll-area style="height: calc(100% - 70px);">
        <q-list>
          <q-item-label class="column items-center" header>
            <q-avatar size="90px" color="white">
              <img src="../assets/quasar-logo-vertical.svg" alt="">
            </q-avatar>
            <q-item-label class="q-mt-sm text-white text-bold text-subtitle2">
              {{ authStore.signInUser.names + ' ' + authStore.signInUser.lastNames }}
            </q-item-label>
          </q-item-label>

          <SideBarItem v-for="item in menuItemList" :key="item.title" v-bind="item"
            @click="layoutStore.changeRoute(item.route)" :is-selected="item.route === layoutStore.currentRoute" />

        </q-list>

      </q-scroll-area>

      <SideBarItem :key="logOutItem.title" v-bind="logOutItem" @click="logOut" />



    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideBarItem, { SideBarItemProps } from 'components/SideBarItem.vue';
import { useRootStore } from 'src/stores/root-store';
import { useAuthStore } from 'src/modules/auth/display/store';
import { customNotify } from 'src/core/utils/notifications';
import { useRouter } from 'vue-router';
import { statusMessages } from 'src/core/helpers/generalHelpers';

const router = useRouter();
const authStore = useAuthStore();
const layoutStore = useRootStore();
defineOptions({
  name: 'MainLayout'
});

const menuItemList = ref<SideBarItemProps[]>([
  {
    title: 'Configuración',
    icon: 'settings',
    route: '/main/',
    isSelected: true,
  },
  {
    title: 'Contabilidad',
    icon: 'receipt_long',
    route: '/main/test',
    isSelected: false,
  },
  {
    title: 'Inventarios',
    icon: 'inventory',
    route: '/NoRoute',
    isSelected: false,
  },
  {
    title: 'Facturación',
    icon: 'point_of_sale',
    route: '/NoRoute',
    isSelected: false,
  }
]);

const logOutItem = {
  title: 'Salir',
  icon: 'logout',
  route: '/logout',
  isSelected: true,
}

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logOut = async () => {
  const resp = await authStore.logOut(authStore.signInUser.accessToken);
  customNotify({ status: resp.status, message: resp.message });
  if (resp.status === statusMessages.success) {
    router.push('/');
  }
}
</script>
