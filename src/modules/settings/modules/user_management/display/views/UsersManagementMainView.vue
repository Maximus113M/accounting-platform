<template>
    <q-page padding style="height: 91vh;">
        <q-card flat class="bg-white q-pa-md"
            style="height: 100%; border-radius: 20px; border: 1px solid #EBEBEB; overflow-y: auto; ">
            <div class="row justify-start items-center">
                <div class="row items-center cursor-pointer" @click="router.back()">
                    <q-icon size="md" name="arrow_circle_left" />
                    <span class="q-ml-sm text-h6 text-bold">Gestión Usuarios</span>
                </div>
            </div>
            <div class="row justify-center items-center" style="height: 80%;">
                <SettingsCard v-for="item of settingsMenu" v-bind="item" :key="item.name" />
            </div>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import SettingsCard, { SettingsCardProps } from 'src/modules/settings/display/components/SettingsCard.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const settingsMenu: SettingsCardProps[] = [
    {
        icon: 'manage_accounts',
        name: 'Instructores',
        description: 'Gestiona la creación, actualización y eliminación de los instructores del sistema.',
        route: 'instructors-management',
    },
    {
        icon: 'school',
        name: 'Fichas',
        description: 'Gestiona la creación, actualización y eliminación de las fichas y aprendices del sistema.',
        route: 'group-management',
    },
];

</script>