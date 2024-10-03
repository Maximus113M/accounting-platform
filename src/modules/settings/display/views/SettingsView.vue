<template>
    <q-page padding style="height: 91vh;">
        <q-card flat class="bg-white q-pa-md"
            style="height: 100%; border-radius: 20px; border: 1px solid #EBEBEB; overflow-y: auto; ">
            <div class="row justify-center items-center" style="height: 90%;">
                <SettingsCard v-for="item of settingsMenu" v-bind="item" :key="item.name" />
            </div>
        </q-card>
    </q-page>

</template>

<script setup lang="ts">
import SettingsCard, { SettingsCardProps } from '../components/SettingsCard.vue';

const settingsMenu: SettingsCardProps[] = [
    {
        icon: 'supervisor_account',
        name: 'Gestión Usuarios',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
        route: 'users-management',
    },
    {
        icon: 'factory',
        name: 'Empresas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
        route: 'company',
    },
    {
        icon: 'badge',
        name: 'Creación de terceros',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
        route: '',
    },

];
</script>