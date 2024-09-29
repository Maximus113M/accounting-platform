<template>
    <q-btn v-if="props.company" flat dense icon="edit" @click="showDialog">
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
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo razón social</div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.basicData.businessTypeName" label="Personal Natural"
                                    val="Personal Natural" />
                                <q-radio v-model="currentCompany.basicData.businessTypeName" label="Empresa"
                                    val="Empresa" />
                            </div>
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.names"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellido</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.lastnames"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName !== 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Razón social</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.businessName"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Serial</div>
                            <q-input outlined dense type="text" v-model.number="currentCompany.serial"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Documento</div>
                            <q-select outlined dense v-model="currentCompany.basicData.documentType"
                                :options="documentTypes"
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
                            <q-input outlined dense type="number"
                                v-model.number="currentCompany.basicData.documentNumber"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre Comercial</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.companyName"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Ciudad</div>
                            <q-select outlined dense fill-input use-input hide-selected label="Buscar"
                                :model-value="getCityName()" :options="filteredCities" @filter="filterCityFn"
                                @input-value="onSelectedCity">
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
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.address"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo de Regimen</div>
                            <q-select outlined dense v-model="currentCompany.regimeType" :options="regimeTypeOptions"
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
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Correo contacto</div>
                            <q-input outlined dense type="text" v-model="currentCompany.emailContact"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre contacto</div>
                            <q-input outlined dense type="text" v-model="currentCompany.nameContact"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Página Web</div>
                            <q-input outlined dense type="text" v-model="currentCompany.pageUrl"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Teléfono</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.phone"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Es consorcio o unión temporal</div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.isConsortium" label="Si" :val="true" />
                                <q-radio v-model="currentCompany.isConsortium" label="No" :val="false" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Usuario cobrador</div>
                            <q-select outlined dense v-model="debtCollectorType" :options="debtCollectorTypeOptions">
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
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Cobrador por defecto</div>
                            <q-select outlined dense fill-input use-input hide-selected label="Buscar"
                                v-model="selectedDebtCollector" :options="debtCollectorsOptions"
                                @filter="filterDebtCollertorsFn">
                                <template v-slot:append>
                                    <q-icon v-if="selectedDebtCollector" class="cursor-pointer" name="cancel"
                                        @click.stop.prevent="selectedDebtCollector = undefined" />
                                </template>
                                <template v-slot:option="{ itemProps, opt }">
                                    <q-item v-bind="itemProps">
                                        <q-item-section>
                                            <strong>
                                                {{ opt.label }}
                                            </strong>
                                            {{ opt.value?.documentType + ', ' + opt.value?.documentNumber }}
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

                    <div v-else-if="selectedTab === 1" class="row  q-col-gutter-x-xl">
                        <div class="col-12 text-h6 text-bold q-mb-sm">
                            Tributario
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Código actividad económica</div>
                            <q-select outlined dense fill-input use-input hide-selected label="Buscar"
                                :model-value="getEconomicActivityName()" :options="filteredEconomicActivities"
                                @filter="filterEconomicActivitiesFn" @input-value="onSelectedEconomicActivity">
                                <template v-slot:append>
                                    <q-icon v-if="selectedEconomicActivity" class="cursor-pointer" name="cancel"
                                        @click.stop.prevent="selectedEconomicActivity = undefined" />
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
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tarifa ICA</div>
                            <q-input outlined dense type="number" v-model.number="currentCompany.taxData.icaRate"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Responsabilidades fiscales</div>
                            <q-select outlined dense multiple clearable v-model="selectedFiscalResponsabilities"
                                :options="companiesStore.fiscalResponsalities"
                                :display-value="getFiscalResponsabilitiesNames()">
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
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tributos</div>
                            <q-select outlined dense v-model="currentCompany.taxData.taxes" :options="[]"
                                class="q-mb-md">
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            Sin resultados
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 ">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Maneja AIU</div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.taxData.hasAIU" label="Si" :val="true" />
                                <q-radio v-model="currentCompany.taxData.hasAIU" label="No" :val="false" />
                            </div>

                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">
                                Utilizó dos impuestos cargos en la factura de venta
                            </div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.taxData.hasDoubleTax" label="Si" :val="true" />
                                <q-radio v-model="currentCompany.taxData.hasDoubleTax" label="No" :val="false" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">
                                Es agente retenedor del impuesto sobre las ventas IVA
                            </div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.taxData.isWithholdingAgent" label="Si" :val="true" />
                                <q-radio v-model="currentCompany.taxData.isWithholdingAgent" label="No" :val="false" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">
                                Maneja impuesto Ad-Valorem (industrias de licores)
                            </div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.taxData.hasAdValoremTax" label="Si" :val="true" />
                                <q-radio v-model="currentCompany.taxData.hasAdValoremTax" label="No" :val="false" />
                            </div>
                        </div>
                    </div>

                    <div v-else-if="selectedTab === 2" class="row  q-col-gutter-x-xl">
                        <div class="col-12 text-h6 text-bold">
                            Representante Legal
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombres</div>
                            <q-input outlined dense type="text" v-model="currentCompany.legalRepresentative.names"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                            <q-input outlined dense type="text" v-model="currentCompany.legalRepresentative.lastNames"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Identificación</div>
                            <q-select outlined dense v-model="currentCompany.legalRepresentative.documentType"
                                :options="documentTypes"
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
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Identificación</div>
                            <q-input outlined dense type="number"
                                v-model.number="currentCompany.legalRepresentative.documentNumber"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">¿Tienes socios en la empresa?</div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.legalRepresentative.hasPartners" label="Si"
                                    :val="true" />
                                <q-radio v-model="currentCompany.legalRepresentative.hasPartners" label="No"
                                    :val="false" />
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="col-12 text-h6 text-bold">
                            Logo
                        </div>
                    </div>

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
import { ref, watch } from 'vue';
import { CompanyModel } from '../../data/models/companyModel';
import { useCompaniesStore } from '../store';
import { UserModel } from 'src/models/userModel';
import { EconomicActivity, FiscalResponsibilities } from '../../data/models/taxData';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { CityModel } from 'src/models/cityModel';
import { GeneralServices } from 'src/services/generalServices';
import { deepClone } from 'src/core/utils/general';
import { useUsersManagementStore } from '../../../user_management/display/store';

const companiesStore = useCompaniesStore();
const usersManagementStore = useUsersManagementStore();
const generalServices = new GeneralServices();
const props = defineProps({
    company: { type: CompanyModel },
    signInUser: { type: UserModel, required: true }
});

const tabsMenu = [
    { name: 'General', value: 0 },
    { name: 'Tributario', value: 1 },
    { name: 'Representante', value: 2 },
    { name: 'Logo', value: 3 },
];

const isShowingDialog = ref<boolean>(false);
const currentCompany = ref(new CompanyModel({}));
const selectedTab = ref(0);
//Economic Activity
const selectedEconomicActivity = ref<EconomicActivity | undefined>(undefined);
const filteredEconomicActivities = ref<string[]>([]);
const filteredEconomicActivitiesCopy: string[] = [];
//FiscalResponsability
const selectedFiscalResponsabilities = ref<FiscalResponsibilities[]>([]);
//Cities
const citiesList: CityModel[] = [];
const selectedCity = ref<CityModel | undefined>(undefined);
const filteredCities = ref<string[]>([]);
const filteredCitiesCopy: string[] = [];
//Debt Collectors Users
const debtCollectorType = ref<string | undefined>(undefined);
const debtCollectorTypeOptions: string[] = ['Aprendiz', 'Instructor'];
const selectedDebtCollector = ref<Record<string, any> | undefined>(undefined);
const debtCollectorsOptions = ref<Record<string, any>[]>([]);

watch(() => debtCollectorType.value, (type) => {
    selectedDebtCollector.value = undefined;
    if (type === 'Aprendiz') {
        debtCollectorsOptions.value = [...usersManagementStore.studentsByClassGroup.map((user) => {
            return {
                label: user.names + ' ' + user.lastNames,
                value: user
            }
        })];
    } else {
        debtCollectorsOptions.value = [...usersManagementStore.instructors.map((user) => {
            return {
                label: user.names + ' ' + user.lastNames,
                value: user
            }
        })];
    }
});

const initData = async () => {
    console.log('Start load...');
    const inicio = performance.now();

    const promiseList: Promise<void>[] = [];

    const economicActivitiesPromise = companiesStore.getEconomicActivities(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
        filteredEconomicActivities.value = [...companiesStore.economicActivities.map((item) => `${item.key} - ${item.value}`)];
        filteredEconomicActivitiesCopy.length = 0;
        filteredEconomicActivitiesCopy.push(...filteredEconomicActivities.value);
    });
    const fiscalResponsabilitiesPromise = companiesStore.getFiscalResponsabilities(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
    });
    //TODO: Move to start app??
    const citiesPromise = generalServices.getCities(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
        citiesList.length = 0;
        citiesList.push(...resp.data!);
        filteredCities.value = [...citiesList.map((item) => `${item.dianCode} - ${item.name}`)];
        filteredCitiesCopy.length = 0;
        filteredCitiesCopy.push(...filteredCities.value);
    });
    //TODO: VERIFY HOW GET THE RELATED USERS
    const studentsPromise = usersManagementStore.getStudentsByClassGroup(1).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
    });

    promiseList.push(economicActivitiesPromise);
    promiseList.push(fiscalResponsabilitiesPromise);
    promiseList.push(citiesPromise);
    promiseList.push(studentsPromise);

    await Promise.all(promiseList);

    const fin = performance.now();
    const tiempoTranscurrido = fin - inicio;
    console.log(`Tiempo transcurrido: ${tiempoTranscurrido.toFixed(2)} ms`);

    customNotify({ status: statusMessages.success, message: 'Información obtenida ...' });
    console.log('End load...');
}

const showDialog = async () => {
    selectedCity.value = undefined;
    selectedEconomicActivity.value = undefined;
    selectedFiscalResponsabilities.value = [];
    isShowingDialog.value = true;

    if (props.company) {
        currentCompany.value = new CompanyModel({ ...props.company });
    } else {
        currentCompany.value = new CompanyModel({});
    }

    await initData();


}


//Economic Activity
const getEconomicActivityName = () => {
    return selectedEconomicActivity.value ?
        `${selectedEconomicActivity.value.key} - ${selectedEconomicActivity.value.value}` : ''
}
const filterEconomicActivitiesFn = (val: string, update: any) => {
    if (val === '') {
        update(() => {
            filteredEconomicActivities.value = [...filteredEconomicActivitiesCopy];
        });
        return;
    }
    const needle = val.toLowerCase();
    update(() => {
        filteredEconomicActivities.value = filteredEconomicActivitiesCopy.filter((v) => v.toLocaleLowerCase().includes(needle));
    });
};
const onSelectedEconomicActivity = (val: any) => {
    if (!val) return;
    const foundEconomicActivity = companiesStore.economicActivities.find((item) =>
        `${item.key} - ${item.value}`.toLocaleLowerCase() === val.toLocaleLowerCase());

    if (foundEconomicActivity) {
        selectedEconomicActivity.value = new EconomicActivity({
            key: foundEconomicActivity.key,
            value: foundEconomicActivity.value
        });
    }
}

//Fiscal Responsabilities
const getFiscalResponsabilitiesNames = () => selectedFiscalResponsabilities.value?.map((item) => item.key).join(', ');


//cities
const getCityName = () => {
    return selectedCity.value ?
        `${selectedCity.value.dianCode} - ${selectedCity.value.name}` : ''
}
const filterCityFn = (val: string, update: any) => {
    if (val === '') {
        update(() => {
            filteredCities.value = [...filteredCitiesCopy];
        });
        return;
    }
    const needle = val.toLowerCase();
    update(() => {
        filteredCities.value = filteredCitiesCopy.filter((v) => v.toLocaleLowerCase().includes(needle));
    });
};
const onSelectedCity = (val: any) => {
    if (!val) return;
    const foundCity = citiesList.find((item) =>
        `${item.dianCode} - ${item.name}`.toLocaleLowerCase() === val.toLocaleLowerCase());

    if (foundCity) {
        selectedCity.value = new CityModel({
            dianCode: foundCity.dianCode,
            name: foundCity.name
        });
    }
}
//debtCollertors
const filterDebtCollertorsFn = (val: string, update: any) => {
    if (!debtCollectorType.value) return;
    if (val === '') {
        debtCollectorType.value === 'Aprendiz' ?
            update(() => {
                debtCollectorsOptions.value = [...usersManagementStore.studentsByClassGroup.map((user) => {
                    return {
                        label: user.names + ' ' + user.lastNames,
                        value: user
                    }
                })];
            })
            :
            update(() => {
                debtCollectorsOptions.value = [...usersManagementStore.instructors.map((user) => {
                    return {
                        label: user.names + ' ' + user.lastNames,
                        value: user
                    }
                })];
            });

        return;
    }

    const needle = val.toLowerCase();
    update(() => {
        debtCollectorsOptions.value = debtCollectorType.value === 'Aprendiz' ?
            usersManagementStore.studentsByClassGroup.filter((user) => `${user.names + ' ' + user.lastNames}`.toLocaleLowerCase().includes(needle))
                .map((user) => {
                    return {
                        label: user.names + ' ' + user.lastNames,
                        value: user
                    }
                })
            :
            usersManagementStore.instructors.filter((user) => `${user.names + ' ' + user.lastNames}`.toLocaleLowerCase().includes(needle))
                .map((user) => {
                    return {
                        label: user.names + ' ' + user.lastNames,
                        value: user
                    }
                });
    });
}

const onSubmit = () => {
    console.log(selectedFiscalResponsabilities.value)
    if (props.company) {
        const newCompany = deepClone(props.company)
        console.log(newCompany);
    } else {
        const newCompany = deepClone(currentCompany.value);
        newCompany.basicData.city = selectedCity.value ?? newCompany.basicData.city;
        newCompany.taxData.economicActivity = selectedEconomicActivity.value ?? newCompany.taxData.economicActivity;
        newCompany.taxData.fiscalResponsibilities = selectedFiscalResponsabilities.value ?? newCompany.taxData.fiscalResponsibilities;

        console.log(newCompany);
    }
    //hideDialog();
}

const hideDialog = () => {
    isShowingDialog.value = false;
}

const documentTypes = [
    'Registro civil',
    'Tarjeta de identidad',
    'Cédula de ciudadanía',
    'Tarjeta de extranjería',
    'tarjeta extranjera',
    'NIT',
    'Pasaporte',
    'Documento de identificación extranjero',
    'NUIP',
    'No obligado a registrarse en el RUT PN',
    'Permiso especial de permanencia PEP',
    'Sin identificación del exterior o para uso definido por la DIAN',
    'Nit de otro pais/Sin identificación del exterior (43 medios magnéticos)',
    'Salvoconducto de permanencia'
];
const regimeTypeOptions = [
    '001 Gran Contribuyente',
    '002 Responsable de IVA',
    '003 No responsable de IVA',
    '004 Empresa del Estado',
];
// const economicActivities = [
//     '0010 Asalariado',
//     '0020 Pensionados',
//     '0081 Personas naturales y sucesiones ilíquidas sin actividad económica',
//     '0082 Personas naturales subsidiadas por terceros',
//     '0090 Rentistas de Capital, solo para personas naturales',
//     '0111 Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas',
//     '0112 Cultivo de arroz',
//     '0113 Cultivo de hortalizas, raíces y tuberculos',
//     '0114 Cultivo de tabaco',
//     '0115 Cultivo de plantas textiles',
// ];
// const fiscalResponsibilities = [
//     'Gran contribuyente',
//     'Autorretenedor',
//     'Agente de retención IVA',
//     'Régimen simple de tributación',
//     'No aplica - Otros',
// ];
// const cities = [
//     'Bucaramanga (002)',
//     'Floridablanca (052)',
//     'Piedecuesta (285)',
//     'Giron (351)',
// ];
</script>

<style scoped>
.radio-border {
    border-radius: 7px;
    border: 1px solid lightgray;
}
</style>