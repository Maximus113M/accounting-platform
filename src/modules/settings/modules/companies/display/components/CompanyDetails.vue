<template>
    <q-btn v-if="props.company" flat dense icon="visibility" @click="showDialog">
        <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
            Detalles
        </q-tooltip>
    </q-btn>
    <q-btn v-else no-caps label="Nuevo +" rounded color="primary" text-color="white" class="q-px-lg"
        @click="showDialog" />

    <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)" persistent>
        <q-card style="min-width: 620px; width: 85%; max-width: 1400px;">

            <q-card-section>
                <div class="row justify-between q-mb-md">
                    <div class="row items-center">
                        <div class="text-h5 text-bold q-mr-sm">
                            {{ props.company.basicData.businessTypeName === 'Empresa'? props.company.basicData.businessName : props.company.basicData.names+' '+props.company.basicData.lastnames }}
                        </div>
                        <div class="text-body1 text-bold">
                            {{ `#${props.company.serial}` }}
                        </div>
                    </div>
                    <q-btn flat dense icon="cancel" v-close-popup />
                </div>
                <div class="q-px-md q-pb-md">
                    <div class="col-12 row justify-center">
                        <q-avatar size="220px">
                            <q-img v-if="imageURL !== ''"  :src="imageURL" alt="Company-image"
                            error-src="../../../../../../assets/images/No_Image_Available.jpg" />

                            <img v-else src="../../../../../../assets/images/No_Image_Available.jpg"
                                alt="No-image">
                        </q-avatar>
                    </div>

                    <div class="row  q-col-gutter-x-lg q-col-gutter-y-sm">
                        <div class="col-12 text-h6 text-bold q-mb-sm">
                            Datos Generales
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo razón social</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.basicData.businessTypeName" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.basicData.names" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.basicData.lastnames" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName !== 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Razón social</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.basicData.businessName" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Serial</div>
                            <q-input readonly outlined dense type="number" v-model.number="currentCompany.serial" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Documento</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.basicData.documentType" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Documento</div>
                            <q-input readonly outlined dense type="number"
                                v-model.number="currentCompany.basicData.documentNumber" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre Comercial</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.basicData.companyName" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Ciudad</div>
                            <q-input readonly outlined dense type="text" :model-value="`${selectedCity.dianCode+' - '+selectedCity.name}`"  />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Dirección</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.basicData.address" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo de Regimen</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.regimeType" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Correo contacto</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.emailContact" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre contacto</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.nameContact" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Página Web</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.pageUrl" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Teléfono</div>
                            <q-input readonly outlined dense type="number" v-model.number="currentCompany.basicData.phone" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Es consorcio o unión temporal</div>
                            <div class="row justify-around radio-border">
                                <q-radio disable readonly v-model="currentCompany.isConsortium" label="Si" :val="true" />
                                <q-radio disable v-model="currentCompany.isConsortium" label="No" :val="false" />
                            </div>
                        </div>

                        <div class="col-12 row q-mt-lg q-mb-sm" >
                            <div class="col-12" style="border: 1px solid lightgrey;"></div>
                        </div>

                        <div class="col-12 text-h6 text-bold q-mb-sm">
                            Tributario
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Código actividad económica</div>
                            <q-input readonly outlined dense type="text" :model-value="`${selectedEconomicActivity.key+' - '+selectedEconomicActivity.value}`" />
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tarifa ICA</div>
                            <q-input readonly outlined dense type="number" v-model.number="currentCompany.taxData.icaRate" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Responsabilidades fiscales</div>
                            <q-input readonly outlined dense type="text" v-model="selectedFiscalResponsabilities" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tributos</div>
                            <q-input readonly outlined dense type="text" v-model="selectedTaxesNames" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 ">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">¿Maneja AIU?</div>
                            <div class="row justify-around radio-border">
                                <q-radio disable v-model="currentCompany.taxData.hasAIU" label="Si" :val="true" />
                                <q-radio disable v-model="currentCompany.taxData.hasAIU" label="No" :val="false" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">
                                ¿Dos impuestos cargos en la factura de venta?
                            </div>
                            <div class="row justify-around radio-border">
                                <q-radio disable v-model="currentCompany.taxData.hasDoubleTax" label="Si" :val="true" />
                                <q-radio disable v-model="currentCompany.taxData.hasDoubleTax" label="No" :val="false" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">
                                ¿Es retenedor del impuesto sobre las ventas IVA?
                            </div>
                            <div class="row justify-around radio-border">
                                <q-radio disable v-model="currentCompany.taxData.isWithholdingAgent" label="Si" :val="true" />
                                <q-radio disable v-model="currentCompany.taxData.isWithholdingAgent" label="No" :val="false" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">
                                ¿Impuesto Ad-Valorem (industrias de licores)?
                            </div>
                            <div class="row justify-around radio-border">
                                <q-radio disable v-model="currentCompany.taxData.hasAdValoremTax" label="Si" :val="true" />
                                <q-radio disable v-model="currentCompany.taxData.hasAdValoremTax" label="No" :val="false" />
                            </div>
                        </div>

                        <div class="col-12 row q-mt-lg q-mb-sm" >
                            <div class="col-12" style="border: 1px solid lightgrey;"></div>
                        </div>

                        <div class="col-12 text-h6 text-bold">
                            Representante Legal
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombres</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.legalRepresentative.names" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.legalRepresentative.lastNames" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Identificación</div>
                            <q-input readonly outlined dense type="text" v-model="currentCompany.legalRepresentative.documentType" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Identificación</div>
                            <q-input readonly outlined dense type="number"
                                v-model.number="currentCompany.legalRepresentative.documentNumber" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">¿Tienes socios en la empresa?</div>
                            <div class="row justify-around radio-border">
                                <q-radio disable v-model="currentCompany.legalRepresentative.hasPartners" label="Si" :val="true"
                                    />
                                <q-radio disable v-model="currentCompany.legalRepresentative.hasPartners" label="No"
                                    :val="false" />
                            </div>
                        </div>

                        <div v-if="currentCompany.legalRepresentative.hasPartners" class="col-12 q-mt-md">
                            <div class="row items-center">
                                <div class="q-pb-xs text-subtitle1 text-bold">Agregar socios</div>
                                <q-icon class="q-ml-sm" name="person_add" size="sm" />
                            </div>

                            <div v-for="(partner, index) of partnerList" :key="index"
                                class="row q-col-gutter-sm q-pb-sm q-px-md q-my-md partner-card">
                                <div class="col-12 row justify-between items-center">
                                    <div class="text-bold text-subtitle1 text-primary">
                                        Socio N. {{ index + 1 }}
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombres</div>
                                    <q-input outlined dense type="text" v-model="partner.names"
     />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                                    <q-input outlined dense type="text" v-model="partner.lastNames"
     />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Documento</div>
                                    <q-select outlined dense v-model="partner.documentType"
                                        :options="rootStore.documentTypes"
    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                    Sin resultados
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Documento</div>
                                    <q-input outlined dense type="number" v-model.number="partner.documentNumber"
     />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">
                                        ¿Persona expuesta públicamente?
                                    </div>
                                    <div class="row justify-around radio-border">
                                        <q-radio v-model="partner.isPublicPerson" label="Si" :val="true" />
                                        <q-radio v-model="partner.isPublicPerson" label="No" :val="false" />
                                    </div>
                                </div>

                                <div class="col-12 row" style="border: 2 solid gray; height: 2px; width: 100%;"></div>
                            </div>

                        </div>

                    </div>

                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { deepClone } from 'src/core/utils/general';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify, spinnerType } from 'src/core/utils/notifications';
import { GeneralServices } from 'src/services/generalServices';

import { UserModel } from 'src/models/userModel';
import { PartnerModel } from '../../data/models/partnerModel';
import { CompanyModel } from '../../data/models/companyModel';
import { EconomicActivity, FiscalResponsibilities, Tax } from '../../data/models/taxData';

import { useRootStore } from 'src/stores/root-store';
import { useCompaniesStore } from '../store';
import { baseUrl } from 'src/boot/axios';
import { CityModel } from 'src/models/cityModel';

const rootStore = useRootStore();
const companiesStore = useCompaniesStore();

const props = defineProps({
    company: { type: CompanyModel, required: true },
    signInUser: { type: UserModel, required: true }
});

const isShowingDialog = ref<boolean>(false);
const currentCompany = ref(new CompanyModel({}));

//Cities
const selectedCity = ref<CityModel>(new CityModel({}));
//Economic Activity
const selectedEconomicActivity = ref<EconomicActivity>(new EconomicActivity({}));
//FiscalResponsability
const selectedFiscalResponsabilities = ref<string>('');
//Taxes
const selectedTaxesNames = ref<string>('');

//Partners
const partnerList = ref<PartnerModel[]>([]);
//Files
const logo = ref<File | null>(null);
const imageURL = ref('');

watch(() => logo.value, (file) => {
    if (file) {
        URL.revokeObjectURL(imageURL.value);
        imageURL.value = URL.createObjectURL(file);
        return;
    }
});

const initData = async () => {
    customNotify({ status: statusMessages.info, message: 'Obteniendo información...', spinner: spinnerType.Ios });
    console.log('Start load...');
    const init = performance.now();
    //Get company
    if (props.company) {
        const companyResp = await companiesStore.getCompany(props.company.serial, props.signInUser.accessToken);
        if (companyResp.status === statusMessages.success) {
            currentCompany.value = deepClone(companyResp.data!);
        } else {
            customNotify({ status: companyResp.status, message: companyResp.message });
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

    const promiseList: Promise<any>[] = [];
    //Get economicActivities
    promiseList.push(companiesStore.getEconomicActivities(props.signInUser.accessToken));
    //Get fiscalResponsabilities
    promiseList.push(companiesStore.getFiscalResponsabilities(props.signInUser.accessToken));
    //Get taxes
    promiseList.push(companiesStore.getTaxes(props.signInUser.accessToken));

    const promiseResp= await Promise.all(promiseList);
    promiseResp.forEach((resp: {status: statusMessages, message: string})=>{
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
    })
    const end = performance.now();
    const tiempoTranscurrido = end - init;
    console.log(`Time to resolve: ${tiempoTranscurrido.toFixed(2)} ms`);

    customNotify({ status: statusMessages.success, message: 'Información obtenida!', time: 1000 });

    console.log('End load...');
}

const showDialog = async () => {
    await initData();

    URL.revokeObjectURL(imageURL.value);
    imageURL.value = '';
    logo.value = null;

    selectedTaxesNames.value = '';
    selectedFiscalResponsabilities.value= '';

    isShowingDialog.value = true;

    //Set city
    const foundCity = rootStore.cities.find((city) => city.dianCode === currentCompany.value.basicData.city.dianCode);
    if(foundCity){
        selectedCity.value = foundCity;
    }

    //Set Economic Activity
    const foundEconomicActivity = companiesStore.economicActivities.find((economicAct) => economicAct.key === currentCompany.value.taxData.economicActivity.key);
    debugger
    if(foundEconomicActivity){
        selectedEconomicActivity.value = foundEconomicActivity;
    }

    //Set Fiscal Responsabilities
    for (let FisRes of currentCompany.value.taxData.fiscalResponsibilities) {
        const foundFiscalResponsability = companiesStore.fiscalResponsalities.find((item) => item.key === FisRes.key);
        if (foundFiscalResponsability) {
            selectedFiscalResponsabilities.value+= foundFiscalResponsability.value+', ';
        }
    }
    selectedFiscalResponsabilities.value= selectedFiscalResponsabilities.value.substring(0, selectedFiscalResponsabilities.value.length - 2);
    //Set taxes
    for (let tax of currentCompany.value.taxData.taxes) {
        const foundTax = companiesStore.taxes.find((item) => item.key === tax.key);
        if (foundTax) {
            selectedTaxesNames.value+= foundTax.value+', ';
        }
    }
    selectedTaxesNames.value= selectedTaxesNames.value.substring(0, selectedTaxesNames.value.length - 2)
    //Set partners
    partnerList.value = [...currentCompany.value.legalRepresentative.partnersList];
    //Set logo
    if (currentCompany.value.logo) {
        imageURL.value = baseUrl.replace('/api', '') + currentCompany.value.logo as string;
        console.log(imageURL.value)
    }

}

</script>

<style scoped lang="scss">
.radio-border {
    border-radius: 7px;
    border: 1px dashed lightgray;
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
