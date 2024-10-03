<template>
    <q-page padding style="height: 91vh">
        <q-card flat class="bg-white q-pa-md" style="
        height: 100%;
        border-radius: 20px;
        border: 1px solid #ebebeb;
        overflow-y: auto;
      ">
            <!-- Route -->
            <div class="row justify-start items-center">
                <div class="row items-center cursor-pointer" @click="router.back()">
                    <q-icon size="md" name="arrow_circle_left" />
                    <span class="q-ml-sm text-h6 text-bold">Gestión Usuarios - Instructores</span>
                </div>
            </div>
            <!-- New and Search -->
            <div class="row justify-between items-center q-px-md q-mt-sm">
                <InstructorsDialog :sign-in-user="authStore.signInUser" />
                <q-input v-model="filter" rounded outlined dense type="text" debounce="100" placeholder="Buscar"
                    clearable color="grey-8">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <!-- TABLE -->
            <div>
                <q-table :grid="$q.screen.lt.sm" class="q-mt-sm q-px-sm" color="black" flat
                    :rows="userManagementStore.instructors" :columns="columns" row-key="id" :filter="filter"
                    rows-per-page-label="Filas por página" :rows-per-page-options="[10, 20, 30, 40]"
                    no-data-label="No se encontraron resultados" no-results-label="No se encontraron resultados">
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <div class="row justify-center q-gutter-xs">
                                <InstructorsDialog :instructor="props.row" :sign-in-user="authStore.signInUser" />
                                <q-btn flat dense icon="delete" @click="deleteDialog(props.row)">
                                    <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale"
                                        class="text-caption">
                                        Eliminar
                                    </q-tooltip>
                                </q-btn>
                            </div>
                        </q-td>
                    </template>
                </q-table>
            </div>
        </q-card>
    </q-page>
</template>
<script setup lang="ts">
import InstructorsDialog from '../components/group/instructors/InstructorsDialog.vue';

import { onMounted, ref } from 'vue';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';
import { customNotify } from 'src/core/utils/notifications';
import { statusMessages } from 'src/core/helpers/generalHelpers';

import { useAuthStore } from 'src/modules/auth/display/store';
import { useUsersManagementStore } from 'src/modules/settings/modules/user_management/display/store';

import { UserModel } from 'src/models/userModel';

const router = useRouter();
const filter = ref<string>('');
const authStore = useAuthStore();
const userManagementStore = useUsersManagementStore();

onMounted(async () => {
    const resp = await userManagementStore.getInstructors(authStore.signInUser.accessToken);
    customNotify({
        status: resp.status,
        message: resp.message
    });
});

const columns: any = [
    {
        name: 'id',
        align: 'center',
        label: 'ID',
        field: (instructor: UserModel) => instructor.id,
        sortable: true,
    },
    {
        name: 'name',
        align: 'center',
        label: 'Nombre',
        field: (instructor: UserModel) => instructor.names + ' ' + instructor.lastNames,
        sortable: true,
    },
    {
        name: 'document',
        align: 'center',
        label: 'Documento',
        field: (instructor: UserModel) => instructor.documentNumber,
        sortable: true,
    },
    {
        name: 'email',
        align: 'center',
        label: 'Correo',
        field: (instructor: UserModel) => instructor.email,
        sortable: true,
    },
    {
        name: 'actions',
        align: 'center',
        label: 'Acciones',
        field: () => '',
        sortable: false,
    },
];

const deleteDialog = (instructor: UserModel) => {
    Dialog.create({
        title: '<div class="primary">Eliminar instructor</div>',
        message: `¿<strong>Deseas eliminar</strong> al instructor seleccionado <strong>"${instructor.names + ' ' + instructor.lastNames}"</strong> ? Esta acción <strong>no puede</strong> revertirse.`,
        ok: {
            push: true,
            color: 'primary',
        },
        cancel: {
            push: true,
            color: 'red-5',
        },
        html: true,
    })
        .onOk(async () => {
            const resp = await userManagementStore.deleteInstructor(instructor, authStore.signInUser.accessToken);
            customNotify({ status: resp.status, message: resp.message });

            if (resp.status === statusMessages.success) {
                await userManagementStore.getInstructors(authStore.signInUser.accessToken).then((instructorsResp) => {
                    if (instructorsResp.status === statusMessages.fail) {
                        customNotify({ status: instructorsResp.status, message: instructorsResp.message });
                    }
                });
            }
        });
};

</script>
