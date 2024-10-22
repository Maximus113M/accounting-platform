<template>
    <q-btn v-if="props.currentThird" flat dense icon="edit" @click="showDialog">
        <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
            Editar
        </q-tooltip>
    </q-btn>
    <q-btn v-else no-caps label="Nuevo +" rounded color="primary" text-color="white" class="q-px-lg"
        @click="showDialog" />

    <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)" persistent>
        <q-card style="min-width: 620px; width: 85%; max-width: 1400px;">
            <q-card-section>
                <div class="row justify-between q-pb-sm">
                    <div class="text-h5 text-weight-medium">
                        {{ props.currentThird ? 'Editar tercero' : 'Nuevo tercero' }}
                    </div>
                    <q-btn flat dense icon="cancel" v-close-popup />
                </div>
                <q-separator />
            </q-card-section>

            <q-card-section>
                <q-form @submit="onSubmit" id="company_form" class="q-px-md q-pb-md">
                    <div class="row  q-col-gutter-x-xl">
                        <div class="row q-col-gutter-x-xl q-px-xl">
                            <div class="col-12 text-bold text-h6">
                                Tipo de tercero
                            </div>
                            <q-checkbox size="md" v-model="selectedThridTypes" :val="thirdTypes[0]" label="Clientes">
                                <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale"
                                    class="text-caption">
                                    Personas o empresas a las cuales necesitas generarles una cotización y/o una factura
                                    de venta
                                </q-tooltip>
                            </q-checkbox>
                            <q-checkbox size="md" v-model="selectedThridTypes" :val="thirdTypes[1]" label="Proveedores">
                                <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale"
                                    class="text-caption">
                                    Todas las personas o empresas a las cuales les compras bienes o servicios
                                </q-tooltip>
                            </q-checkbox>
                            <q-checkbox size="md" v-model="selectedThridTypes" :val="thirdTypes[2]" label="Otros">
                                <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale"
                                    class="text-caption">
                                    Todas las personas o empresas a las cuales les compras bienes o servicios
                                </q-tooltip>
                            </q-checkbox>
                        </div>

                        <div class="col-12 row q-mt-lg q-mb-lg">
                            <div class="col-12" style="border: 1px solid lightgrey;"></div>
                        </div>

                        <div class="col-12 text-h6 text-bold q-mb-sm">
                            Datos Generales
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo razón social</div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="selectedThird.basicData.businessTypeName" label="Personal Natural"
                                    val="Personal Natural" />
                                <q-radio v-model="selectedThird.basicData.businessTypeName" label="Empresa"
                                    val="Empresa" />
                            </div>
                        </div>
                        <div v-if="selectedThird.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre</div>
                            <q-input outlined dense type="text" v-model="selectedThird.basicData.names"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div v-if="selectedThird.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                            <q-input outlined dense type="text" v-model="selectedThird.basicData.lastnames"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div v-if="selectedThird.basicData.businessTypeName !== 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Razón social</div>
                            <q-input outlined dense type="text" v-model="selectedThird.basicData.businessName"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Documento</div>
                            <q-select outlined dense v-model="selectedThird.basicData.documentType"
                                :options="rootStore.documentTypes"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']">
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            Sin resultados
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Documento</div>
                            <q-input outlined dense type="number" v-model.number="selectedThird.basicData.documentNumber"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre Comercial</div>
                            <q-input outlined dense type="text" v-model="selectedThird.basicData.companyName"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Ciudad</div>
                            <q-select outlined dense fill-input use-input hide-selected label="Buscar"
                                v-model="selectedCity" :options="citiesOptions" @filter="filterCityFn"
                                :rules="[(val: any) => (val) || 'Debes completar este campo']">
                                <template v-slot:append>
                                    <q-icon v-if="selectedCity" class="cursor-pointer" name="cancel"
                                        @click.stop.prevent="selectedCity = undefined" />
                                </template>
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            Sin resultados
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Dirección</div>
                            <q-input outlined dense type="text" v-model="selectedThird.basicData.address"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Código de sucursal</div>
                            <q-input outlined dense type="text" v-model.number="selectedThird.warehouseCode"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Teléfono</div>
                            <q-input outlined dense type="number" v-model.number="selectedThird.basicData.phone"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                    </div>

                    <div class="col-12 row q-mt-lg q-mb-lg">
                        <div class="col-12" style="border: 1px solid lightgrey;"></div>
                    </div>

                    <div class="row  q-col-gutter-x-xl">
                        <div class="col-12 text-h6 text-bold q-mb-sm">
                            Datos de facturación y envio
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre de contacto</div>
                            <q-input outlined dense type="text" v-model="selectedThird.billingData.names"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos de contacto</div>
                            <q-input outlined dense type="text" v-model="selectedThird.billingData.lastNames"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Correo</div>
                            <q-input outlined dense type="text" v-model="selectedThird.billingData.email"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo de régimen IVA</div>
                            <q-select outlined dense v-model="selectedRegimeType" :options="selectedRegimeTypeOptions">
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            Sin resultados
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Teléfono</div>
                            <q-input outlined dense type="number" v-model.number="selectedThird.billingData.phone"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Código postal</div>
                            <q-input outlined dense type="text" v-model.number="selectedThird.billingData.postalCode"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Responsabilidades fiscales</div>
                            <q-select outlined dense multiple clearable v-model="selectedFiscalResponsabilities"
                                :options="companiesStore.fiscalResponsalities"
                                :display-value="getFiscalResponsabilitiesNames()"
                                :rules="[(val: any) => (val) || 'Debes completar este campo']">
                                <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                                    <q-item v-bind="itemProps">
                                        <q-item-section>
                                            <strong>{{ opt.key }}</strong>
                                            {{ opt.value }}
                                        </q-item-section>
                                        <q-item-section side>
                                            <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                                        </q-item-section>
                                    </q-item>
                                </template>
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            Sin resultados
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                    </div>

                    <div class="col-12 row q-mt-lg q-mb-md">
                        <div class="col-12" style="border: 1px solid lightgrey;"></div>
                    </div>

                    <div class="row  q-col-gutter-x-xl">
                        <div class="col-12 text-h6 text-bold">
                            Contactos
                        </div>

                        <div class="col-12 q-mt-md">
                            <div v-for="(contact, index) of contactList" :key="index"
                                class="row q-col-gutter-sm q-pb-sm q-px-md q-my-md partner-card">
                                <div class="col-12 row justify-between items-center">
                                    <div class="text-bold text-subtitle1 text-primary">
                                        Contacto N. {{ index + 1 }}
                                    </div>
                                    <q-icon class="cursor-pointer" size="sm" name="cancel" color="red-8"
                                        @click="removeContact(index)" />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombres</div>
                                    <q-input outlined dense type="text" v-model="contact.names"
                                        :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                                    <q-input outlined dense type="text" v-model="contact.lastNames"
                                        :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Correo</div>
                                    <q-input outlined dense type="text" v-model="contact.email"
                                        :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Teléfono</div>
                                    <q-input outlined dense type="number" v-model.number="contact.phone"
                                        :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                                </div>


                                <div class="col-12 row" style="border: 2 solid gray; height: 2px; width: 100%;"></div>
                            </div>

                            <div class="row items-center">
                                <div class="row items-center add-new-partner-btn" @click="addNewContact">
                                    <div class="q-mr-sm text-primary ">
                                        Agregar nuevo
                                    </div>
                                    <q-icon name="add_circle" color="primary" size="lg" />
                                </div>
                            </div>

                        </div>
                    </div>

                </q-form>
            </q-card-section>

            <q-card-actions align="right" class="q-px-md q-mb-sm">
                <q-btn no-caps color="primary" type="submit" form="company_form"
                    :label="props.currentThird ? 'Guardar' : 'Crear'" :loading="isLoading" style="padding: 0px 20px;" />
                <q-btn no-caps color="red-7" label="Cancelar" @click="hideDialog" style="padding: 0px 20px;" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import { ref } from 'vue';
import { deepClone } from 'src/core/utils/general';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify, spinnerType } from 'src/core/utils/notifications';
import { GeneralServices } from 'src/services/generalServices';

import { UserModel } from 'src/models/userModel';
import { FiscalResponsibilities } from '../../../data/models/taxData';

import { useRootStore } from 'src/stores/root-store';
import { useCompaniesStore } from '../../store';
import { ThirdModel } from '../../../data/models/thrid/thirdModel';
import { ContactModel } from '../../../data/models/thrid/contactData';
import { ThirdType } from '../../../data/models/thrid/thirdTypes';

const rootStore = useRootStore();
const companiesStore = useCompaniesStore();

const props = defineProps({
    currentThird: { type: ThirdModel },
    companySerial: { type: Number, required: true },
    signInUser: { type: UserModel, required: true }
});

const isShowingDialog = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const selectedThird = ref(new ThirdModel({}));

//THIRD TYPE
const selectedThridTypes = ref<ThirdType[]>([]);
const thirdTypes = [
    new ThirdType({ id: 1, name: 'Clientes' }),
    new ThirdType({ id: 2, name: 'Proveedores' }),
    new ThirdType({ id: 3, name: 'Otros' }),
]
//Cities
const cities: Record<string, any>[] = [];
const selectedCity = ref<Record<string, any> | undefined>(undefined);
const citiesOptions = ref<Record<string, any>[]>([]);

//Economic Activity
const economicActivities: Record<string, any>[] = [];
const economicActivityOptions = ref<Record<string, any>[]>([]);
//FiscalResponsability
const selectedFiscalResponsabilities = ref<FiscalResponsibilities[] | null>([]);
//RegimeType
const selectedRegimeType = ref<string>('No responsable de Iva');
const selectedRegimeTypeOptions = [
    'No responsable de Iva', 'Responsable de Iva'
];
//Contacs
const contactList = ref<ContactModel[]>([]);

const initData = async () => {
    customNotify({ status: statusMessages.info, message: 'Obteniendo información...', spinner: spinnerType.Ios });
    //console.log(props.signInUser.accessToken);
    console.log('Start load...');
    const init = performance.now();
    //Get company
    if (props.currentThird) {
        const thirdResp = await companiesStore.getThird(props.companySerial, props.currentThird.id, props.signInUser.accessToken);
        if (thirdResp.status === statusMessages.success) {
            selectedThird.value = new ThirdModel({ ...deepClone(thirdResp.data!) });
        } else {
            customNotify({ status: thirdResp.status, message: thirdResp.message });
        }
    }
    //Get cities
    if (rootStore.cities.length === 0) {
        const citiesResp = await GeneralServices.getCities();
        if (citiesResp.status === statusMessages.fail) {
            customNotify({ status: citiesResp.status, message: citiesResp.message });
            return;
        }
        rootStore.cities = citiesResp.data!;
    }
    cities.push(...rootStore.cities.map((city) => {
        return {
            label: city.dianCode + ' - ' + city.name,
            value: city
        }
    }));
    citiesOptions.value = [...cities];


    const promiseList: Promise<any>[] = [];
    //Get economicActivities
    promiseList.push(companiesStore.getEconomicActivities(props.signInUser.accessToken));
    //Get fiscalResponsabilities
    promiseList.push(companiesStore.getFiscalResponsabilities(props.signInUser.accessToken));
    //Get taxes
    promiseList.push(companiesStore.getTaxes(props.signInUser.accessToken));

    const promiseResp = await Promise.all(promiseList);
    promiseResp.forEach((resp: { status: statusMessages, message: string }, index) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
        if (index === 0) {
            economicActivities.length = 0;
            economicActivities.push(...companiesStore.economicActivities.map((item) => {
                return {
                    label: `${item.key} - ${item.value}`,
                    value: item
                }
            }));
            economicActivityOptions.value = [...economicActivities];
        }
    })
    const end = performance.now();
    const tiempoTranscurrido = end - init;
    console.log(`Time to resolve: ${tiempoTranscurrido.toFixed(2)} ms`);

    customNotify({ status: statusMessages.success, message: 'Información obtenida!', time: 1000 });

    console.log('End load...');
}

const showDialog = async () => {
    selectedThird.value = new ThirdModel({});
    await initData();
    console.log(props.currentThird);
    selectedCity.value = undefined;
    selectedFiscalResponsabilities.value = [];
    selectedRegimeType.value = selectedRegimeTypeOptions[0];
    contactList.value = [];

    isShowingDialog.value = true;

    if (props.currentThird) {
        //Set city
        const foundCity = cities.find((city) => city.value.dianCode === selectedThird.value.basicData.city.dianCode);
        selectedCity.value = foundCity;
        //Set Fiscal Responsabilities
        for (let FisRes of selectedThird.value.billingData.fiscalResponsibilities) {
            const foundFiscalResponsability = companiesStore.fiscalResponsalities.find((item) => item.key === FisRes.key);
            if (foundFiscalResponsability) {
                selectedFiscalResponsabilities.value.push(foundFiscalResponsability);
            }
        }
        selectedRegimeType.value = selectedThird.value.billingData.regimeType;
        selectedThridTypes.value = [];

        for (const type of selectedThird.value.thirdType) {
            const foundType = thirdTypes.find((thirdType) => thirdType.id === type.id);
            if (foundType) {
                selectedThridTypes.value.push(foundType);
            }
        }
        contactList.value = [...selectedThird.value.contacts];
    } else {
        selectedThird.value = new ThirdModel({});
        //Set city
        const foundCity = cities.find((city) => city.value.name.toLowerCase() === 'floridablanca');
        selectedCity.value = foundCity;
        //Set Fiscal Responsabilities
        if (companiesStore.fiscalResponsalities.length > 0) {
            selectedFiscalResponsabilities.value.push(companiesStore.fiscalResponsalities[0]);
        }
    }
}

//Fiscal Responsabilities
const getFiscalResponsabilitiesNames = () => selectedFiscalResponsabilities.value?.map((item) => item.key).join(', ');

//Cities
function filterCityFn(val: string, update: any) {
    if (val === '') {
        update(() => {
            citiesOptions.value = [...cities];
        });
        return;
    }
    const needle = val.toLowerCase();
    update(() => {
        citiesOptions.value = cities.filter((v) => v.label.toLocaleLowerCase().includes(needle));
    });
};

//Contacts
function addNewContact() {
    if (contactList.value.length > 0) {
        const partner = contactList.value[contactList.value.length - 1];
        if (!validateContactFields(partner, true)) {
            customNotify({ status: statusMessages.warning, message: 'Debes completar todos los campos antes de agregar otro contacto' });
            return;
        }
    }
    contactList.value.push(new ContactModel({}));
    customNotify({ status: statusMessages.success, message: 'Contacto añadido', time: 1000 });
}

function removeContact(index: number) {
    const contact = contactList.value[index];
    if (validateContactFields(contact)) {
        Dialog.create({
            title: '<div class="text-primary">Eliminar contacto</div>',
            message: '¿Deseas <strong>eliminar</strong> al <strong>contacto</strong> seleccionado? Esta acción <strong>no puede</strong> revertirse.',
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
                contactList.value.splice(index, 1);
                customNotify({ status: statusMessages.success, message: 'Contacto eliminado', time: 1000 });
            });
        return
    }
    contactList.value.splice(index, 1);
    customNotify({ status: statusMessages.success, message: 'Contacto eliminado', time: 1000 });
}

function validateContactFields(contact: ContactModel, strict?: boolean) {
    let counter = 0;
    if (contact.names === '') counter++;
    if (contact.lastNames === '') counter++;
    if (contact.email === '') counter++;
    if (contact.phone === '') counter++;

    return strict ? counter === 0 : counter <= 2;
}


async function onSubmit() {
    //VALIDATIONS
    //Contacts
    if(selectedThridTypes.value.length < 1 ){
        customNotify({ status: statusMessages.warning, message: 'Debes seleccionar el tipo de tercero' });
        return;        
    }
    const incompleteContact = contactList.value.find((contact) => !validateContactFields(contact, true));
    if (incompleteContact) {
        customNotify({ status: statusMessages.warning, message: 'Debes completar los datos de todos los contactos' });
        return;
    }

    isLoading.value = true;
    const newThird = new ThirdModel({ ...deepClone(selectedThird.value) });
    //Business Type Name
    if (selectedThird.value.basicData.businessTypeName === 'Empresa') {
        selectedThird.value.basicData.names = null;
        selectedThird.value.basicData.lastnames = null;
    } else {
        selectedThird.value.basicData.businessName = null;
    }

    //City
    newThird.basicData.city = selectedCity.value?.value ?? newThird.basicData.city;
    //Fiscal Responsibilities
    newThird.billingData.fiscalResponsibilities = selectedFiscalResponsabilities.value ?? newThird.billingData.fiscalResponsibilities;

    //Contacts
    newThird.contacts = [...contactList.value];
    //Third types
    newThird.thirdType = [...selectedThridTypes.value];
    //CompanySerial
    newThird.companySerial= props.companySerial;
    //regimeType
    newThird.billingData.regimeType= selectedRegimeType.value;

    console.log(newThird);
    // debugger;
    
    console.log(ThirdModel.thirdModelToJson(newThird));
    if (props.currentThird) {
        const updateResp = await companiesStore.updateThird(props.currentThird.id, newThird, props.signInUser.accessToken);
        if (updateResp.status === statusMessages.fail) {
            customNotify({ status: updateResp.status, message: updateResp.message });
            isLoading.value = false;
            return;
        }
        await refreshThirdTable(updateResp, 'Información actualizada!');
        hideDialog();

    } else {
        const createResp = await companiesStore.createThird(newThird, props.signInUser.accessToken);
        if (createResp.status === statusMessages.fail) {
            customNotify({ status: createResp.status, message: createResp.message });
            isLoading.value = false;
            return;
        }
        await refreshThirdTable(createResp, 'Empresa creada, información actualizada!');
        hideDialog();
    }
}

async function refreshThirdTable(fatherResp: any, message: string) {
    const companiesResp = await companiesStore.getAllThirds(props.companySerial, props.signInUser.accessToken);
    if (companiesResp.status === statusMessages.success) {
        customNotify({ status: companiesResp.status, message: message });
        return;
    }
    customNotify({ status: fatherResp.status, message: fatherResp.message });

}

function hideDialog() {
    isShowingDialog.value = false;
    isLoading.value = false;
}

</script>

<style scoped lang="scss">
.radio-border {
    border-radius: 7px;
    border: 1px solid lightgray;
}

.img-border {
    border-radius: 10px;
    border: 8px solid lightgray;
    min-width: 300px;
    width: 600px;
    max-width: 800px;
    max-height: 800px;
}

.add-new-partner-btn {
    cursor: pointer;
    border: 2px solid $primary;
    border-radius: 12px;
    padding: 2px 15px;
}

.partner-card {
    border: 3px solid $grey-4;
    border-radius: 15px;
}
</style>