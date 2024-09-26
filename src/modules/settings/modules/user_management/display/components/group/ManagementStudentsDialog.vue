<template>
    <q-btn flat dense icon="group_add" @click="showDialog">
        <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
            Gestionar aprendices
        </q-tooltip>
    </q-btn>
    <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
        <q-card style="min-width: 580px; width: 90%; max-width: 1200px;">
            <q-card-section>
                <div class="row justify-between q-pb-sm">
                    <div class="text-h5 text-weight-medium">Gestión de aprendices</div>
                    <q-btn flat dense icon="cancel" v-close-popup />
                </div>
                <q-separator />
            </q-card-section>
            <div class="row justify-between items-center q-px-lg">
                <q-btn no-caps rounded color="primary" icon-right="publish" label="Cagar" @click="hideDialog" />
                <q-input v-model="filter" rounded outlined dense type="text" debounce="100" placeholder="Buscar"
                    clearable color="grey-8">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>

            <q-card-section>
                <q-table :grid="$q.screen.lt.sm" class="q-px-sm" color="black" flat :rows="exampleStudentList"
                    :columns="columns" row-key="id" :filter="filter" rows-per-page-label="Filas por página"
                    :rows-per-page-options="[5, 10, 15, 20,]" no-data-label="No se encontraron resultados"
                    no-results-label="No se encontraron resultados">

                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <div class="row justify-center q-gutter-xs">
                                <StudentsDialog :student="props.row" />
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
            </q-card-section>

            <!-- <q-card-actions align="right">
                <q-btn no-caps flat color="primary" type="submit" form="class_group_form"
                    :label="props.classGroup ? 'Editar' : 'Crear'" />
                <q-btn no-caps color="primary" label="Cancelar" @click="hideDialog" />
            </q-card-actions> -->
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import StudentsDialog from './students/StudentsDialog.vue';
import { onMounted, ref } from 'vue';
import { Dialog } from 'quasar';

import { ClassGroup } from '../../../data/models/classGroup';
import { UserModel } from 'src/models/userModel';
import {
  getStudentsByClassGroup
} from 'src/modules/settings/modules/user_management/display/store/actions';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { useUsersManagementStore } from 'src/modules/settings/modules/user_management/display/store';

const props = defineProps({
    classGroup: { type: ClassGroup, required: true }
});

const isShowingDialog = ref<boolean>(false);
const currentClassGroup = ref(new ClassGroup({}));
const filter = ref<string>('');
const userManagementStore = useUsersManagementStore();
const exampleStudentList = ref<UserModel[]>([]);

onMounted(async () => {
  const res = await getStudentsByClassGroup(props.classGroup?.number);
  if (res.status === statusMessages.success) exampleStudentList.value = userManagementStore.studentsByClassGroup;
  else customNotify({
    status: res.status,
    message: res.message
  });
});

const showDialog = () => {
    currentClassGroup.value = new ClassGroup({ ...props.classGroup });
    isShowingDialog.value = true;
}

// const onSubmit = () => {
//     hideDialog();
// }

const hideDialog = () => {
    isShowingDialog.value = false;
}

const columns: any = [
    {
        name: 'id',
        align: 'center',
        label: 'ID',
        field: (student: UserModel) => student.id,
        sortable: true,
    },
    {
        name: 'documentType',
        align: 'center',
        label: 'T. Documento',
        field: (student: UserModel) => student.documentType,
        sortable: true,
    },
    {
        name: 'document',
        align: 'center',
        label: 'Documento',
        field: (student: UserModel) => student.documentNumber,
        sortable: true,
    },
    {
        name: 'name',
        align: 'center',
        label: 'Nombre',
        field: (student: UserModel) => `${student.names} ${student.lastNames}`,
        sortable: true,
    },
    {
        name: 'email',
        align: 'center',
        label: 'Email',
        field: (student: UserModel) => student.email,
        sortable: true,
    },
    {
        name: 'actions',
        align: 'center',
        label: 'Acciones',
        field: () => '',
        sortable: false
    },
];


const deleteDialog = (student: UserModel) => {
    Dialog.create({
        title: '<div class="text-red-7">Eliminar aprendiz</div>',
        message: `¿<strong>Deseas eliminar</strong> al aprendiz seleccionado <strong>"${student.names} ${student.lastNames}"</strong> ? Esta acción <strong>no puede revertirse.</strong>`,
        ok: {
            push: true,
            color: 'light-blue-4'
        },
        cancel: {
            push: true,
            color: 'red-5'
        },
        html: true,
    }).onOk(async (data) => {
        data;
        console.log('>>>> OK, received', student)
    }).onCancel(() => {
    });
}
</script>
