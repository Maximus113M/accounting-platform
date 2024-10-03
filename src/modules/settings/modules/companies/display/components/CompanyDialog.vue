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
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.names"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div v-if="currentCompany.basicData.businessTypeName === 'Personal Natural'"
                            class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
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
                            <q-input outlined dense type="number" v-model.number="currentCompany.serial" readonly />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Documento</div>
                            <q-select outlined dense v-model="currentCompany.basicData.documentType"
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
                            <q-input outlined dense type="number"
                                v-model.number="currentCompany.basicData.documentNumber"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombre Comercial</div>
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.companyName"
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
                            <q-input outlined dense type="text" v-model="currentCompany.basicData.address"
                                :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo de Regimen</div>
                            <q-select outlined dense v-model="currentCompany.regimeType"
                                :options="rootStore.regimeTypes"
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
                            <q-input outlined dense type="text" v-model="currentCompany.pageUrl" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Teléfono</div>
                            <q-input outlined dense type="number" v-model.number="currentCompany.basicData.phone"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
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
                            <q-tooltip v-if="!debtCollectorType" :offset="[0, 10]" transition-show="scale"
                                transition-hide="scale" class="text-body2 text-white bg-warning">
                                Debes seleccionar un tipo de usuario
                            </q-tooltip>
                            <q-select outlined dense fill-input use-input hide-selected label="Buscar"
                                v-model="selectedDebtCollector" :options="debtCollectorsOptions"
                                @filter="filterDebtCollertorsFn" :disable="debtCollectorType ? false : true"
                                :rules="[(val: any) => (val) || 'Debes completar este campo']">
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
                                @filter="filterEconomicActivitiesFn"
                                :rules="[(val: any) => (val) || 'Debes completar este campo']">
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
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Tributos</div>
                            <q-select outlined dense multiple clearable v-model="selectedTaxes"
                                :options="companiesStore.taxes" :display-value="getTaxesNames()" class="q-mb-md"
                                :rules="[(val: any | null) => (val && val.length > 0) || 'Debes completar este campo']">
                                <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                                    <q-item v-bind="itemProps">
                                        <q-item-section>
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
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">Identificación</div>
                            <q-input outlined dense type="number"
                                v-model.number="currentCompany.legalRepresentative.documentNumber"
                                :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="q-pb-xs text-subtitle2 text-weight-medium">¿Tienes socios en la empresa?</div>
                            <div class="row justify-around radio-border">
                                <q-radio v-model="currentCompany.legalRepresentative.hasPartners" label="Si" :val="true"
                                    @click="partnersEnable" />
                                <q-radio v-model="currentCompany.legalRepresentative.hasPartners" label="No"
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
                                    <q-icon class="cursor-pointer" size="sm" name="cancel" color="red-8"
                                        @click="removePartner(index)" />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Nombres</div>
                                    <q-input outlined dense type="text" v-model="partner.names"
                                        :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Apellidos</div>
                                    <q-input outlined dense type="text" v-model="partner.lastNames"
                                        :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                                </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Tipo Documento</div>
                                    <q-select outlined dense v-model="partner.documentType"
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
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="q-pb-xs text-subtitle2 text-weight-medium">Documento</div>
                                    <q-input outlined dense type="number" v-model.number="partner.documentNumber"
                                        :rules="[(val: number) => (val && val >= 0) || 'Debes completar este campo']" />
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

                            <div class="row items-center">
                                <div class="row items-center add-new-partner-btn" @click="addNewPartner">
                                    <div class="q-mr-sm text-primary ">
                                        Agregar nuevo
                                    </div>
                                    <q-icon name="add_circle" color="primary" size="lg" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div v-else class="row q-col-gutter-x-xl justify-center">
                        <div class="col-12 q-mb-sm text-h6 text-bold">
                            Logo
                        </div>
                        <div class="col-12 row justify-center">
                            <img v-if="imageURL !== ''" class="img-border" :src="imageURL" alt="Company-image">

                            <img v-else class="img-border" src="../../../../../../assets/images/No_Image_Available.jpg"
                                alt="No-image" height="450">

                        </div>
                        <q-file filled bottom-slots v-model="logo" label="Imagen" counter accept=".jpg, image/*, .gif"
                            hint="jpeg, png, jpg, gif" @rejected="onRejectedFile" style="max-width: 650px;"
                            class="col-12">
                            <template v-slot:prepend>
                                <q-icon name="cloud_upload" @click.stop.prevent />
                            </template>
                            <template v-slot:append>
                                <q-icon name="close" @click.stop.prevent="cancelFile" class="cursor-pointer" />
                            </template>
                        </q-file>
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
import { Dialog } from 'quasar';
import { ref, watch } from 'vue';
import { deepClone } from 'src/core/utils/general';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify, spinnerType } from 'src/core/utils/notifications';
import { GeneralServices } from 'src/services/generalServices';

import { UserModel } from 'src/models/userModel';
import { PartnerModel } from '../../data/models/partnerModel';
import { CompanyModel } from '../../data/models/companyModel';
import { FiscalResponsibilities, Tax } from '../../data/models/taxData';

import { useRootStore } from 'src/stores/root-store';
import { useCompaniesStore } from '../store';
import { useUsersManagementStore } from '../../../user_management/display/store';
import { baseUrl } from 'src/boot/axios';

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

//Economic Activity
const economicActivities: Record<string, any>[] = [];
const selectedEconomicActivity = ref<Record<string, any> | undefined>(undefined);
const economicActivityOptions = ref<Record<string, any>[]>([]);
//FiscalResponsability
const selectedFiscalResponsabilities = ref<FiscalResponsibilities[] | null>([]);
//Taxes
const selectedTaxes = ref<Tax[] | null>([]);

//Partners
const partnerList = ref<PartnerModel[]>([]);
//Files
const logo = ref<File | null>(null);
const imageURL = ref('');

watch(() => debtCollectorType.value, (type) => {
    selectedDebtCollector.value = undefined;
    if (type === 'Aprendiz') {
        debtCollectorsOptions.value = [...studentList];
    } else {
        debtCollectorsOptions.value = [...instructorList];
    }
});
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
    const inicio = performance.now();
    const promiseList: Promise<void>[] = [];
    //Get company
    if (props.company) {
        const companyPromise = companiesStore.getCompany(props.company.serial, props.signInUser.accessToken).then((resp) => {
            if (resp.status === statusMessages.success) {
                currentCompany.value = deepClone(resp.data!);
            } else {
                customNotify({ status: resp.status, message: resp.message });
            }
        });
        promiseList.push(companyPromise);
    }
    //Get cities
    if (rootStore.cities.length === 0) {
        const citiesPromise = GeneralServices.getCities().then((resp) => {
            if (resp.status === statusMessages.fail) {
                customNotify({ status: resp.status, message: resp.message });
                return;
            }
            rootStore.cities = resp.data!;
            cities.push(...rootStore.cities.map((city) => {
                return {
                    label: city.dianCode + ' - ' + city.name,
                    value: city
                }
            }));
            citiesOptions.value = [...cities];
        });
        promiseList.push(citiesPromise);
    } else {
        cities.push(...rootStore.cities.map((city) => {
            return {
                label: city.dianCode + ' - ' + city.name,
                value: city
            }
        }));
        citiesOptions.value = [...cities];
    }
    //Get economicActivities
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
    //Get fiscalResponsabilities
    const fiscalResponsabilitiesPromise = companiesStore.getFiscalResponsabilities(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
    });
    //Get taxes
    const taxesPromise = companiesStore.getTaxes(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
    });
    //TODO: VERIFY HOW TO GET THE RELATED USERS
    //Students
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
    //Instructors
    const instructorsPromise = usersManagementStore.getInstructors(props.signInUser.accessToken).then((resp) => {
        if (resp.status === statusMessages.fail) {
            customNotify({ status: resp.status, message: resp.message });
            return;
        }
        instructorList.length = 0;
        instructorList.push(...usersManagementStore.instructors.map((instructor) => {
            return {
                label: instructor.names + ' ' + instructor.lastNames,
                value: instructor
            }
        }));
    });

    promiseList.push(economicActivitiesPromise);
    promiseList.push(fiscalResponsabilitiesPromise);
    promiseList.push(taxesPromise);
    promiseList.push(studentsPromise);
    promiseList.push(instructorsPromise);

    await Promise.all(promiseList);

    const fin = performance.now();
    const tiempoTranscurrido = fin - inicio;
    console.log(`Time to resolve: ${tiempoTranscurrido.toFixed(2)} ms`);

    customNotify({ status: statusMessages.success, message: 'Información obtenida ...' });

    console.log('End load...');
}

const showDialog = async () => {
    await initData();

    selectedCity.value = undefined;
    debtCollectorType.value = undefined;
    selectedDebtCollector.value = undefined;
    selectedEconomicActivity.value = undefined;

    URL.revokeObjectURL(imageURL.value);
    imageURL.value = '';
    logo.value = null;

    selectedFiscalResponsabilities.value = [];
    selectedTaxes.value = [];

    isShowingDialog.value = true;

    if (props.company) {
        //Set debtCollector
        if (currentCompany.value.debtCollector !== 0) {
            let userIndex = studentList.findIndex((student) => student.value.id === currentCompany.value.debtCollector);
            if (userIndex > -1) {
                debtCollectorType.value = 'Aprendiz';
                selectedDebtCollector.value = studentList[userIndex];
            } else {
                userIndex = instructorList.findIndex((instructor) => instructor.value.id === currentCompany.value.debtCollector);
                if (userIndex > -1) {
                    debtCollectorType.value = 'Instructor';
                    selectedDebtCollector.value = instructorList[userIndex]
                }
            }
        }
        //Set relatedUser
        const foundRelatedUser = instructorList.find((instructor) => instructor.value.id === currentCompany.value.relatedUser.id)
        if (foundRelatedUser) {
            currentCompany.value.relatedUser = new UserModel({ ...foundRelatedUser.value });
        }
        //Set city
        const foundCity = cities.find((city) => city.value.dianCode === currentCompany.value.basicData.city.dianCode);
        selectedCity.value = foundCity;
        //Set Economic Activity
        const foundEconomicActivity = economicActivities.find((economicAct) => economicAct.value.key === currentCompany.value.taxData.economicActivity.key);
        selectedEconomicActivity.value = foundEconomicActivity;
        //Set Fiscal Responsabilities
        for (let FisRes of currentCompany.value.taxData.fiscalResponsibilities) {
            const foundFiscalResponsability = companiesStore.fiscalResponsalities.find((item) => item.key === FisRes.key);
            if (foundFiscalResponsability) {
                selectedFiscalResponsabilities.value.push(foundFiscalResponsability);
            }
        }
        //Set taxes
        for (let tax of currentCompany.value.taxData.taxes) {
            const foundTax = companiesStore.taxes.find((item) => item.key === tax.key);
            if (foundTax) {
                selectedTaxes.value.push(foundTax);
            }
        }

        //Set partners
        partnerList.value = [...currentCompany.value.legalRepresentative.partnersList];
        //Set logo
        if (currentCompany.value.logo) {
            imageURL.value = baseUrl.replace('/api', '') + currentCompany.value.logo as string;
            console.log(imageURL.value)
        }
    } else {
        currentCompany.value = new CompanyModel({});
        //Set city
        const foundCity = cities.find((city) => city.value.name.toLowerCase() === 'floridablanca');
        selectedCity.value = foundCity;
        //Set economic Activity
        selectedEconomicActivity.value = economicActivities.length > 0 ? economicActivities[0] : undefined;
        //Set Fiscal Responsabilities
        if (companiesStore.fiscalResponsalities.length > 0) {
            selectedFiscalResponsabilities.value.push(companiesStore.fiscalResponsalities[0]);
        }
        //Set taxes
        if (companiesStore.taxes.length > 0) {
            selectedTaxes.value.push(companiesStore.taxes[0]);
        }
    }
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

//Taxes
const getTaxesNames = () => selectedTaxes.value?.map((item) => item.value).join(', ');

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

//Partners
const partnersEnable = () => {
    if (partnerList.value.length === 0) {
        partnerList.value.push(new PartnerModel({}));
    }
}

const addNewPartner = () => {
    if (partnerList.value.length > 0) {
        const partner = partnerList.value[partnerList.value.length - 1];
        if (!validatePartnerFields(partner, true)) {
            customNotify({ status: statusMessages.warning, message: 'Debes completar todos los campos antes de agregar otro socio' });
            return;
        }
    }
    partnerList.value.push(new PartnerModel({}));
    customNotify({ status: statusMessages.success, message: 'Socio añadido', time: 1000 });
}

const removePartner = (index: number) => {
    const partner = partnerList.value[index];
    if (validatePartnerFields(partner)) {
        Dialog.create({
            title: '<div class="text-primary">Eliminar socio</div>',
            message: '¿Deseas <strong>eliminar</strong> al <strong>socio</strong> seleccionado? Esta acción <strong>no puede</strong> revertirse.',
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
                partnerList.value.splice(index, 1);
                customNotify({ status: statusMessages.success, message: 'Socio eliminado', time: 1000 });
            });
        return
    }
    partnerList.value.splice(index, 1);
    customNotify({ status: statusMessages.success, message: 'Socio eliminado', time: 1000 });
}

const validatePartnerFields = (partner: PartnerModel, strict?: boolean) => {
    let counter = 0;
    if (partner.names === '') counter++;
    if (partner.lastNames === '') counter++;
    if (partner.documentType === '') counter++;
    if (partner.documentNumber === 0) counter++;

    return strict ? counter === 0 : counter <= 2;
}

//Logo
const cancelFile = () => {
    URL.revokeObjectURL(imageURL.value);
    imageURL.value = '';
    logo.value = null;
}

const onRejectedFile = () => {
    customNotify({ status: statusMessages.warning, message: 'El archivo no es valido' })
}



const onSubmit = async () => {
    //VALIDATIONS
    //Partners
    if (currentCompany.value.legalRepresentative.hasPartners) {
        const incompletePartner = partnerList.value.find((partner) => !validatePartnerFields(partner, true));
        if (incompletePartner) {
            customNotify({ status: statusMessages.warning, message: 'Debes completar los datos de todos los socios' });
            return;
        }
    }
    //Logo
    if (props.company) {
        if (!logo.value && !currentCompany.value.logo) {
            customNotify({ status: statusMessages.warning, message: 'Debes seleccionar un logo' });
            return;
        }
        if (!logo.value) {
            if (typeof currentCompany.value.logo === 'string') {
                const logResp = await fetch(currentCompany.value.logo);
                console.log(logResp)
                const blob = await logResp.blob();
                logo.value = new File([blob], `${currentCompany.value.serial}`, { type: 'jpeg, png, jpg, gif' });
                debugger
            } else {
                logo.value = currentCompany.value.logo;
            }
        }

        //return;
    } else {
        if (!logo.value) {
            customNotify({ status: statusMessages.warning, message: 'Debes seleccionar un logo' });
            return;
        }
    }
    const newCompany = deepClone(currentCompany.value);
    //Business Type Name
    if (currentCompany.value.basicData.businessTypeName === 'Empresa') {
        currentCompany.value.basicData.names = null;
        currentCompany.value.basicData.lastnames = null;
    } else {
        currentCompany.value.basicData.businessName = null;
    }
    //Related dectCollector
    if (selectedDebtCollector.value) {
        newCompany.relatedUser = props.signInUser;
        newCompany.debtCollector = selectedDebtCollector.value.value.id;
    }
    //City
    newCompany.basicData.city = selectedCity.value?.value ?? newCompany.basicData.city;
    //REQUIRED AN Economic.Activity REVIEW
    newCompany.taxData.economicActivity = selectedEconomicActivity.value?.value ?? newCompany.taxData.economicActivity;
    //Fiscal Responsibilities
    newCompany.taxData.fiscalResponsibilities = selectedFiscalResponsabilities.value ?? newCompany.taxData.fiscalResponsibilities;
    //Taxes
    newCompany.taxData.taxes = selectedTaxes.value ?? newCompany.taxData.taxes;
    //Partners
    if (newCompany.legalRepresentative.hasPartners) {
        if (partnerList.value.length > 0) {
            newCompany.legalRepresentative.partnersList = [...partnerList.value];
        } else {
            newCompany.legalRepresentative.hasPartners = false;
            newCompany.legalRepresentative.partnersList = [];
        }
    }
    //Logo
    newCompany.logo = logo.value;

    // console.log(newCompany);
    // debugger;
    if (props.company) {

        await companiesStore.updateCompany(newCompany, props.signInUser.accessToken).then((resp) => {
            customNotify({ status: resp.status, message: resp.message });
            if (resp.status === statusMessages.success) {
                hideDialog();
            }
        });

    } else {
        await companiesStore.createCompany(newCompany, props.signInUser.accessToken).then(async (createResp) => {

            if (createResp.status === statusMessages.fail) {
                customNotify({ status: createResp.status, message: createResp.message });
                return;
            }

            await companiesStore.getCompanies(props.signInUser.accessToken).then((companiesResp) => {
                if (companiesResp.status === statusMessages.success) {
                    customNotify({ status: companiesResp.status, message: 'Empresa creada, información actualizada!' });
                } else {
                    customNotify({ status: createResp.status, message: createResp.message });
                }
            });

            hideDialog();
            return;
        });
    }
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