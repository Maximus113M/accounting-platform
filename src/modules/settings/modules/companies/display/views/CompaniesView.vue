<template>
    <q-page padding style="height: 91vh;">
        <q-card flat class="bg-white q-pa-md"
            style="height: 100%; border-radius: 20px; border: 1px solid #EBEBEB; overflow-y: auto; ">
            <div class="row justify-start items-center">
                <div class="row items-center cursor-pointer" @click="router.back()">
                    <q-icon size="md" name="arrow_circle_left" />
                    <span class="q-ml-sm text-h6 text-bold">Empresas</span>
                </div>
            </div>
            <!-- New and Search -->
            <div class="row justify-between items-center q-px-md q-mt-sm">
                <CompanyDialog />
                <q-input v-model="filter" rounded outlined dense type="text" debounce="100" placeholder="Buscar"
                    clearable color="grey-8">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <!-- TABLE -->
            <div>
                <q-table :grid="$q.screen.lt.sm" class="q-mt-sm q-px-sm" color="black" flat :rows="exampleGroupList"
                    :columns="columns" row-key="id" :filter="filter" rows-per-page-label="Filas por página"
                    :rows-per-page-options="[10, 20, 30, 40]" no-data-label="No se encontraron resultados"
                    no-results-label="No se encontraron resultados">

                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <div class="row justify-center q-gutter-xs">
                                <CompanyDialog :company="props.row" />

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
import CompanyDialog from '../components/CompanyDialog.vue';
import { ref } from 'vue';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';

import { CompanyModel } from '../../data/models/companyModel';

const router = useRouter();
const filter = ref<string>('');

const exampleGroupList: CompanyModel[] = [
    new CompanyModel({ serial: 1 }),
    new CompanyModel({ serial: 2 }),
    new CompanyModel({ serial: 3 }),
    new CompanyModel({ serial: 4 }),
    new CompanyModel({ serial: 5 }),
    new CompanyModel({ serial: 6 }),
    new CompanyModel({ serial: 7 }),
];

const columns: any = [
    {
        name: 'serial',
        align: 'center',
        label: 'Serial',
        field: (company: CompanyModel) => company.serial,
        sortable: true,
    },
    {
        name: 'businessTypeName',
        align: 'center',
        label: 'Tipo razón social',
        field: (company: CompanyModel) => company.basicData.businessTypeName,
        sortable: true,
    },
    {
        name: 'businessName',
        align: 'center',
        label: 'Razón social',
        field: (company: CompanyModel) => company.basicData.businessName,
        sortable: true,
    },
    {
        name: 'companyName',
        align: 'center',
        label: 'Nombre Comercial',
        field: (company: CompanyModel) => company.basicData.companyName,
        sortable: true,
    },
    {
        name: 'addres',
        align: 'center',
        label: 'Dirección',
        field: (company: CompanyModel) => `${company.basicData.city.name} - ${company.basicData.address}`,
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

const deleteDialog = (company: CompanyModel) => {
    Dialog.create({
        title: '<div class="text-red-7">Eliminar empresa</div>',
        message: `¿<strong>Deseas eliminar</strong> a la empresa seleccionada <strong>"${company.basicData.companyName}"</strong> ? Se eliminará la información asociada`,
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
        console.log('>>>> OK, received', company)
    }).onCancel(() => {
    });
}
</script>