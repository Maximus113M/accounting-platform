<template>
    <q-page padding style="height: 91vh;">
        <q-card flat class="bg-white q-pa-md"
            style="height: 100%; border-radius: 20px; border: 1px solid #EBEBEB; overflow-y: auto; ">
            <!-- Route -->
            <div class="row justify-start items-center">
                <div class="row items-center cursor-pointer" @click="router.back()">
                    <q-icon size="md" name="arrow_circle_left" />
                    <span class="q-ml-sm text-h6 text-bold">Gestión Usuarios - Fichas</span>
                </div>
            </div>
            <!-- New and Search -->
            <div class="row justify-between items-center q-px-md q-mt-sm">
                <ClassGroupDialog />
                <q-input v-model="filter" rounded outlined dense type="text" debounce="100" placeholder="Buscar"
                    clearable color="grey-8">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <!-- TABLE -->
            <div>
                <q-table :grid="$q.screen.lt.sm" class="q-mt-sm q-px-sm" color="black" flat title="Listado de Fichas"
                    :rows="exampleGroupList" :columns="columns" row-key="id" :filter="filter"
                    rows-per-page-label="Filas por página" :rows-per-page-options="[10, 20, 30, 40]"
                    no-data-label="No se encontraron resultados" no-results-label="No se encontraron resultados">

                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <div class="row justify-center q-gutter-xs">
                                <ClassGroupDialog :class-group="props.row" />
                                <ManagementStudentsDialog :class-group="props.row" />
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
import ClassGroupDialog from '../components/group/ClassGroupDialog.vue';
import ManagementStudentsDialog from '../components/group/ManagementStudentsDialog.vue';

import { ref } from 'vue';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';

import { ClassGroup } from '../../data/models/classGroup';

const router = useRouter();
const filter = ref<string>('');

const exampleGroupList: ClassGroup[] = [
    new ClassGroup({ id: 1, code: 101, number: 10, name: 'Group A' }),
    new ClassGroup({ id: 2, code: 102, number: 20, name: 'Group B' }),
    new ClassGroup({ id: 3, code: 103, number: 30, name: 'Group C' }),
    new ClassGroup({ id: 4, code: 104, number: 40, name: 'Group D' }),
    new ClassGroup({ id: 5, code: 105, number: 50, name: 'Group E' }),
    new ClassGroup({ id: 6, code: 106, number: 60, name: 'Group F' }),
    new ClassGroup({ id: 7, code: 107, number: 70, name: 'Group G' }),
];

const columns: any = [
    {
        name: 'id',
        align: 'center',
        label: 'ID',
        field: (group: ClassGroup) => group.id,
        sortable: true,
    },
    {
        name: 'code',
        align: 'center',
        label: 'Codigo de ficha',
        field: (group: ClassGroup) => group.code,
        sortable: true,
    },
    {
        name: 'name',
        align: 'center',
        label: 'Nombre',
        field: (group: ClassGroup) => group.name,
        sortable: true,
    },
    {
        name: 'number',
        align: 'center',
        label: 'Numero de ficha',
        field: (group: ClassGroup) => group.number,
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

const deleteDialog = (group: ClassGroup) => {
    Dialog.create({
        title: '<div class="text-red-7">Eliminar ficha</div>',
        message: `¿<strong>Deseas eliminar</strong> a la ficha seleccionada <strong>"${group.name}"</strong> ? Se eliminará la información y aprendices asociados.`,
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
        console.log('>>>> OK, received', group)
    }).onCancel(() => {
    });
}
</script>