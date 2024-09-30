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
                <!-- :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" -->
                <!-- :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" -->
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
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.names" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellido</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.lastnames" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName !== 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Razón social</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.businessName" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Serial</div>
                            <q-input outlined dense type="number" v-model.number="currentCompany.serial"
                                :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Documento</div>
                            <q-select outlined dense v-model="currentCompany.basicData.documentType"
                                :options="rootStore.documentTypes">
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
                                v-model.number="currentCompany.basicData.documentNumber" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre Comercial</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.companyName" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Ciudad</div>
                            <q-select outlined dense fill-input use-input hide-selected label="Buscar"
                                v-model="selectedCity" :options="citiesOptions" @filter="filterCityFn">
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
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.address" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo de Regimen</div>
                            <q-select outlined dense v-model="currentCompany.regimeType"
                                :options="rootStore.regimeTypes">
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
                            <q-input outlined dense type="text" v-model="currentCompany.emailContact" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre contacto</div>
                            <q-input outlined dense type="text" v-model="currentCompany.nameContact" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Página Web</div>
                            <q-input outlined dense type="text" v-model="currentCompany.pageUrl" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Teléfono</div>
                            <q-input outlined dense type="number" v-model.number="currentCompany.basicData.phone" />
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
                                v-model="selectedEconomicActivity" :options="economicActivityOptions"
                                @filter="filterEconomicActivitiesFn">
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
                            <q-input outlined dense type="number" v-model.number="currentCompany.taxData.icaRate" />
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
                            <q-input outlined dense type="text" v-model="currentCompany.legalRepresentative.names" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                            <q-input outlined dense type="text"
                                v-model="currentCompany.legalRepresentative.lastNames" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Identificación</div>
                            <q-select outlined dense v-model="currentCompany.legalRepresentative.documentType"
                                :options="rootStore.documentTypes">
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
                                v-model.number="currentCompany.legalRepresentative.documentNumber" />
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
import { onMounted, ref, watch } from 'vue';
import { CompanyModel } from '../../data/models/companyModel';
import { useCompaniesStore } from '../store';
import { UserModel } from 'src/models/userModel';
import { EconomicActivity, FiscalResponsibilities } from '../../data/models/taxData';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { deepClone } from 'src/core/utils/general';
import { useUsersManagementStore } from '../../../user_management/display/store';
import { useRootStore } from 'src/stores/root-store';
import { GeneralServices } from 'src/services/generalServices';

const rootStore = useRootStore();
const companiesStore = useCompaniesStore();
const usersManagementStore = useUsersManagementStore();
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
const economicActivities: Record<string, any>[] = [];
const selectedEconomicActivity = ref<Record<string, any> | undefined>(undefined);
const economicActivityOptions = ref<Record<string, any>[]>([]);
//FiscalResponsability
const selectedFiscalResponsabilities = ref<FiscalResponsibilities[]>([]);
//Cities
const cities: Record<string, any>[] = [];
const selectedCity = ref<Record<string, any> | undefined>(undefined);
const citiesOptions = ref<Record<string, any>[]>([]);

//Debt Collectors Options
const debtCollectorType = ref<string | undefined>(undefined);
const debtCollectorTypeOptions: string[] = ['Aprendiz', 'Instructor'];
//Debt Collectors Users
const selectedDebtCollector = ref<Record<string, any> | undefined>(undefined);
const debtCollectorsOptions = ref<Record<string, any>[]>([]);
//Users Collectors
const studentList: Record<string, any>[] = [];
const instructorList: Record<string, any>[] = [];

watch(() => debtCollectorType.value, (type) => {
    selectedDebtCollector.value = undefined;
    if (type === 'Aprendiz') {
        debtCollectorsOptions.value = [...studentList];
    } else {
        debtCollectorsOptions.value = [...instructorList];
    }
});

onMounted(async () => {
    if (rootStore.cities.length === 0) {
        console.log('LOAD CITIES FROM COMPANY DIALOG')
        await GeneralServices.getCities().then((resp) => {
            if (resp.status === statusMessages.fail) {
                customNotify({ status: resp.status, message: resp.message });
                return;
            }
            rootStore.cities = resp.data!;
        })
    }
    cities.push(...rootStore.cities.map((city) => {
        return {
            label: city.dianCode + ' - ' + city.name,
            value: city
        }
    }));
})

const initData = async () => {
    console.log('Start load...');
    const inicio = performance.now();
    //Set cities
    citiesOptions.value = [...cities];

    const promiseList: Promise<void>[] = [];
    const economicActivitiesPromise = companiesStore.getEconomicActivities(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
        economicActivities.length = 0;
        economicActivities.push(...companiesStore.economicActivities.map((item) => {
            return {
                label: `${item.key} - ${item.value}`,
                value: item
            }
        }));
        economicActivityOptions.value = [...economicActivities];
    });
    const fiscalResponsabilitiesPromise = companiesStore.getFiscalResponsabilities(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
    });
    //TODO: VERIFY HOW TO GET THE RELATED USERS
    const studentsPromise = usersManagementStore.getStudentsByClassGroup(1).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
        studentList.length = 0;
        studentList.push(...usersManagementStore.studentsByClassGroup.map((student) => {
            return {
                label: student.names + ' ' + student.lastNames,
                value: student
            }
        }));
    });
    //MISSING INSTRUCTORS

    promiseList.push(economicActivitiesPromise);
    promiseList.push(fiscalResponsabilitiesPromise);
    promiseList.push(studentsPromise);

    await Promise.all(promiseList);

    const fin = performance.now();
    const tiempoTranscurrido = fin - inicio;
    console.log(`Time to resolve: ${tiempoTranscurrido.toFixed(2)} ms`);

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
const filterEconomicActivitiesFn = (val: string, update: any) => {
    if (val === '') {
        update(() => {
            economicActivityOptions.value = [...economicActivities];
        });
        return;
    }
    const needle = val.toLowerCase();
    update(() => {
        economicActivityOptions.value = economicActivities.filter((v) => v.label.toLocaleLowerCase().includes(needle));
    });
};

//Fiscal Responsabilities
const getFiscalResponsabilitiesNames = () => selectedFiscalResponsabilities.value?.map((item) => item.key).join(', ');

//Cities
const filterCityFn = (val: string, update: any) => {
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

//DebtCollertors
const filterDebtCollertorsFn = (val: string, update: any) => {
    if (!debtCollectorType.value) return;
    if (val === '') {
        update(() => {
            debtCollectorsOptions.value = debtCollectorType.value === 'Aprendiz' ? [...studentList] : [...instructorList];
        })
        return;
    }

    const needle = val.toLowerCase();
    update(() => {
        debtCollectorsOptions.value = debtCollectorType.value === 'Aprendiz' ?
            studentList.filter((student) => student.label.toLocaleLowerCase().includes(needle))
            :
            instructorList.filter((instructor) => instructor.label.toLocaleLowerCase().includes(needle))
    });
}


const onSubmit = () => {
    console.log(selectedFiscalResponsabilities.value)
    if (props.company) {
        const newCompany = deepClone(props.company)
        console.log(newCompany);
    } else {
        const newCompany = deepClone(currentCompany.value);
        newCompany.basicData.city = selectedCity.value?.value ?? newCompany.basicData.city;
        newCompany.taxData.economicActivity = selectedEconomicActivity.value?.value ?? newCompany.taxData.economicActivity;
        newCompany.taxData.fiscalResponsibilities = selectedFiscalResponsabilities.value ?? newCompany.taxData.fiscalResponsibilities;

        console.log(newCompany);
    }
    //hideDialog();
}

const hideDialog = () => {
    isShowingDialog.value = false;
}

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