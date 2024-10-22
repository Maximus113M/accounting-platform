<template>
    <q-btn flat dense icon="group_add" @click="showDialog">
        <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
            Gestionar terceros
        </q-tooltip>
    </q-btn>
    <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
        <q-card style="min-width: 580px; width: 90%; max-width: 1200px">
            <q-card-section>
                <div class="row justify-between q-pb-sm">
                    <div class="text-h5 text-weight-medium">Gestión de terceros</div>
                    <q-btn flat dense icon="cancel" v-close-popup />
                </div>
                <q-separator />
            </q-card-section>
            <div class="row justify-between items-center q-px-lg">
                <ThirdDialog :company-serial="initProps.companySerial" :sign-in-user="signInUser" />

                <q-input v-model="filter" rounded outlined dense type="text" debounce="100" placeholder="Buscar"
                    clearable color="grey-8">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>

            <q-card-section>
                <q-table :grid="$q.screen.lt.sm" class="q-px-sm" color="black" flat :rows="companiesStore.thirdList"
                    :columns="columns" row-key="id" :filter="filter" rows-per-page-label="Filas por página"
                    :rows-per-page-options="[5, 10, 15, 20]" no-data-label="No se encontraron resultados"
                    no-results-label="No se encontraron resultados">
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <div class="row justify-center q-gutter-xs">
                                <ThirdDialog :company-serial="initProps.companySerial" :current-third="props.row" :sign-in-user="signInUser" />
                                <q-btn flat dense icon="delete" @click.prevent="deleteThirdDialog(props.row)">
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

        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import ThirdDialog from './thirds/ThirdDialog.vue';
import { onMounted, ref, } from 'vue';
import { Dialog } from 'quasar';

import { UserModel } from 'src/models/userModel';

import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { useCompaniesStore } from '../store';
import { ThirdModel } from '../../data/models/thrid/thirdModel';

const initProps = defineProps({
    signInUser: { type: UserModel, required: true },
    companySerial: { type: Number, required: true },
});

const isShowingDialog = ref<boolean>(false);
const filter = ref<string>('');
const companiesStore = useCompaniesStore();

onMounted(async () => {
    await loadData();
});


const loadData = async () => {
    const res = await companiesStore.getAllThirds(initProps.companySerial, initProps.signInUser.accessToken);
    customNotify({status: res.status,message: res.message});
};

const showDialog = () => {
    isShowingDialog.value = true;
};

const columns: any = [
    {
        name: 'id',
        align: 'center',
        label: 'ID',
        field: (third: ThirdModel) => third.id,
        sortable: true,
    },
    {
        name: 'serial',
        align: 'center',
        label: 'Serial',
        field: (third: ThirdModel) => third.companySerial,
        sortable: true,
    },
    {
        name: 'name',
        align: 'center',
        label: 'Nombre comercial',
        field: (third: ThirdModel) => third.basicData.companyName,
        sortable: true,
    },
    {
        name: 'name',
        align: 'center',
        label: 'Tipo de tercero',
        field: (third: ThirdModel) => third.thirdType.map((item) => item.name).join(', '),
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


function deleteThirdDialog(third: ThirdModel) {
    Dialog.create({
        title: '<div class="text-red-7">Eliminar tercero</div>',
        message: `¿<strong>Deseas eliminar</strong> al tercero seleccionado <strong>"${third.basicData.companyName}"</strong> ? Esta acción <strong>no puede revertirse.</strong>`,
        ok: {
            push: true,
            color: 'light-blue-4',
        },
        cancel: {
            push: true,
            color: 'red-5',
        },
        html: true,
    })
        .onOk(async () => {
            console.log(third.id)
            const res = await companiesStore.deleteThird(third.id, initProps.signInUser.accessToken);
            customNotify({status: res.status, message: res.message});
            if (res.status === statusMessages.success) {           
                await companiesStore.getAllThirds(initProps.companySerial, initProps.signInUser.accessToken);
            }
        })
        .onCancel(() => { });
};
</script>