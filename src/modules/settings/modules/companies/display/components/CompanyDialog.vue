<template>
    <q-btn v-if="props.company" flat dense icon="edit" @click="showDialog">
        <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
            Editar
        </q-tooltip>
    </q-btn>
    <q-btn v-else no-caps label="Nuevo +" rounded color="primary" text-color="white" class="q-px-lg"
        @click="showDialog" />
    <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
        <q-card style="min-width: 620px; width: 85%; max-width: 1400px;">
            <q-card-section>
                <div class="row justify-between q-pb-sm">
                    <div class="text-h5 text-weight-medium">
                        {{ props.company ? 'Editar empresa' : 'Nueva empresa' }}
                    </div>
                    <q-btn flat dense icon="cancel" v-close-popup />
                </div>
                <q-separator />
            </q-card-section>
            <div class="q-px-sm">
                <q-btn v-for="item of tabsMenu" :label="item.name" @click="selectedTab = item.value"
                    v-bind:key="item.value" :color="selectedTab === item.value ? 'primary' : 'grey-5'" rounded
                    class="q-px-lg q-mx-sm" />
            </div>

            <q-card-section>
                <q-form @submit="onSubmit" id="company_form" class="q-px-md q-pb-md">
                    <div v-if="selectedTab === 0" class="row  q-col-gutter-x-xl">
                        <div class="col-12 text-h6 text-bold q-mb-sm">
                            Datos Generales
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Tipo razón social</div>
                            <div class="row justify-around">
                                <q-radio v-model="currentCompany.basicData.businessTypeName" label="Personal Natural"
                                    val="Personal Natural" />
                                <q-radio v-model="currentCompany.basicData.businessTypeName" label="Empresa"
                                    val="Empresa" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Razón social</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.businessName"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Serial</div>
                            <q-input outlined dense type="text" v-model.number="currentCompany.serial"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Tipo Documento</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.documentType"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Documento</div>
                            <q-input outlined dense type="number"
                                v-model.number="currentCompany.basicData.documentNumber"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Nombre Comercial</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.companyName"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Correo contacto</div>
                            <q-input outlined dense type="text" v-model="currentCompany.emailContact"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Correo contacto</div>
                            <q-input outlined dense type="text" v-model="currentCompany.nameContact"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Página Web</div>
                            <q-input outlined dense type="text" v-model="currentCompany.pageUrl"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Teléfono</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.phone"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle text-weight-medium">Es consorcio o unión temporal</div>
                            <div class="row justify-around">
                                <q-radio v-model="currentCompany.basicData.businessTypeName" label="Si" :val="true" />
                                <q-radio v-model="currentCompany.basicData.businessTypeName" label="No" :val="false" />
                            </div>
                        </div>

                    </div>

                    <div v-else-if="selectedTab === 1">
                        <div class="col-12 text-h6 text-bold">
                            Tributario
                        </div>
                    </div>

                    <div v-else-if="selectedTab === 2">
                        <div class="col-12 text-h6 text-bold">
                            Representante
                        </div>
                    </div>

                    <div v-else>
                        <div class="col-12 text-h6 text-bold">
                            Logo
                        </div>
                    </div>

                    <!-- <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Nombres</div>
                        <q-input outlined dense type="text" v-model="currentCompany.names"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Apellidos</div>
                        <q-input outlined dense type="text" v-model="currentCompany.lastNames"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Tipo Documento</div>
                        <q-input outlined dense type="text" v-model="currentCompany.documentType"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Numero Documento</div>
                        <q-input outlined dense type="number" v-model.number="currentCompany.documentNumber"
                            :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Correo Electrónico</div>
                        <q-input outlined dense type="text" v-model="currentCompany.email"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div> -->
                </q-form>
            </q-card-section>

            <q-card-actions align="right" class="q-px-md q-mb-sm">
                <q-btn no-caps color="primary" type="submit" form="company_form"
                    :label="props.company ? 'Guardar' : 'Crear'" style="padding: 0px 20px;" />
                <q-btn no-caps color="red-7" label="Cancelar" @click="hideDialog" style="padding: 0px 20px;" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CompanyModel } from '../../data/models/companyModel';

const props = defineProps({
    company: { type: CompanyModel }
});

const isShowingDialog = ref<boolean>(false);
const currentCompany = ref(new CompanyModel({}));
const selectedTab = ref(0);

const tabsMenu = [
    { name: 'General', value: 0 },
    { name: 'Tributario', value: 1 },
    { name: 'Representante', value: 2 },
    { name: 'Logo', value: 3 },
];

const showDialog = () => {
    if (props.company) {
        currentCompany.value = new CompanyModel({ ...props.company });
    } else {
        currentCompany.value = new CompanyModel({});
    }

    isShowingDialog.value = true;
}

const onSubmit = () => {
    hideDialog();
}

const hideDialog = () => {
    isShowingDialog.value = false;
}

</script>