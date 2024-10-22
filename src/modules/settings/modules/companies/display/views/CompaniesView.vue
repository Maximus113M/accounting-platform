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
                <CompanyDialog :sign-in-user="authStore.signInUser" />
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
                    :rows="companiesStore.companyList" :columns="columns" row-key="id" :filter="filter"
                    rows-per-page-label="Filas por página" :rows-per-page-options="[10, 20, 30, 40]"
                    no-data-label="No se encontraron resultados" no-results-label="No se encontraron resultados"
                    :loading="isLoading">

                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <div class="row justify-center q-gutter-xs">
                                <CompanyDialog :company="props.row" :sign-in-user="authStore.signInUser" />
                                <CompanyDetails :company="props.row" :sign-in-user="authStore.signInUser" />
                                <ThirdsTableDialog :company-serial="props.row.serial" :sign-in-user="authStore.signInUser"/>
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
import CompanyDetails from '../components/CompanyDetails.vue';
import ThirdsTableDialog from '../components/ThirdsTableDialog.vue';

import { onMounted, ref } from 'vue';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';
import { CompanyModel } from '../../data/models/companyModel';
import { useCompaniesStore } from '../store';
import { useAuthStore } from 'src/modules/auth/display/store';
import { customNotify } from 'src/core/utils/notifications';
import { statusMessages } from 'src/core/helpers/generalHelpers';

const router = useRouter();
const authStore = useAuthStore();
const companiesStore = useCompaniesStore();

let filter = ref('');
const isLoading = ref(false);
onMounted(async () => {
    isLoading.value = true;
    const resp = await companiesStore.getCompanies(authStore.signInUser.accessToken);
    isLoading.value = false;
    customNotify({ status: resp.status, message: resp.message });
});

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
    }).onOk(async () => {
        const resp = await companiesStore.deleteCompany(company.serial, authStore.signInUser.accessToken);
        if (resp.status === statusMessages.success) {
            const resp2 = await companiesStore.getCompanies(authStore.signInUser.accessToken);
            customNotify({ status: resp2.status, message: resp.message + ', ' + 'información actualiazada!' });
        } else {
            customNotify({ status: resp.status, message: resp.message });
        }
        console.log('>>>> OK, received', resp.message);
    }).onCancel(() => {
    });
}
</script>
