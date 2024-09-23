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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="220" class="q-px-sm bg-primary">
      <q-list>
        <q-item-label class="column items-center" header>
          <q-avatar size="90px" color="white">
            <img src="../assets/quasar-logo-vertical.svg" alt="">
          </q-avatar>
          <q-item-label class="q-mt-sm text-white text-bold text-subtitle2">
            Camilo Mantilla
          </q-item-label>
        </q-item-label>

        <SideBarItem v-for="item in menuItemList" :key="item.title" v-bind="item"
          @click="layoutStore.changeRoute(item.route)" :is-selected="item.route === layoutStore.currentRoute" />
      </q-list>

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

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
