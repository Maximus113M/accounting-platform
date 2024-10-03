<template>
  <q-btn v-if="props.classGroup" flat dense icon="content_copy" @click="showDialog">
    <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
      Clonar empresa
    </q-tooltip>
  </q-btn>
  <q-btn v-else no-caps label="Nuevo +" rounded color="primary" text-color="white" class="q-px-lg"
    @click="showDialog" />
  <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
    <q-card style="min-width: 400px; width: 60%; max-width: 1000px">
      <q-card-section>
        <div class="row justify-between q-pb-sm">
          <div class="text-h5 text-weight-medium">
            Clonar Empresa
          </div>
          <q-btn flat dense icon="cancel" v-close-popup />
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle1 text-weight-medium">Selecciona la empresa a clonar</div>
        <div class="col-12 col-sm-6 col-md-4">
          <q-select outlined dense fill-input use-input hide-selected label="Buscar" v-model="selectedCompany"
            :options="companyOptions" @filter="filterCityFn"
            :rules="[(val: any) => (val) || 'Debes completar este campo']">
            <template v-slot:append>
              <q-icon v-if="selectedCompany" class="cursor-pointer" name="cancel"
                @click.stop.prevent="selectedCompany = undefined" />
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

      </q-card-section>

      <q-card-actions align="right" class="q-px-md q-mb-sm">
        <q-btn no-caps color="primary" @click="onSubmit" label="Clonar" style="padding: 0px 20px" />
        <q-btn no-caps color="red-7" label="Cancelar" @click="hideDialog" style="padding: 0px 20px" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ClassGroup } from '../../../data/models/classGroup';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { useCompaniesStore } from '../../../../companies/display/store/index';
import { UserModel } from 'src/models/userModel';

const companiesStore = useCompaniesStore()

const props = defineProps({
  classGroup: { type: ClassGroup, required: true },
  signInUser: { type: UserModel, required: true },
});

const isShowingDialog = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const companies: Record<string, any>[] = [];
const companyOptions = ref<Record<string, any>[]>([]);
const selectedCompany = ref<Record<string, any> | undefined>(undefined);

const showDialog = async () => {
  await companiesStore.getCompanies(props.signInUser.accessToken).then((resp) => {
    customNotify({ status: resp.status, message: resp.message });

    companies.push(...companiesStore.companyList.map((company) => {
      //const label= company.basicData.businessTypeName === 'Empresa'?  company.basicData.businessName : company.basicData.
      return {
        label: company.basicData.companyName + ' - ' + company.serial,
        value: company
      }
    }));

    companyOptions.value = [...companies];
  });
  isShowingDialog.value = true;
}

const filterCityFn = (val: string, update: any) => {
  if (val === '') {
    update(() => {
      companyOptions.value = [...companies];
    });
    return;
  }
  const needle = val.toLowerCase();
  update(() => {
    companyOptions.value = companies.filter((v) => v.label.toLocaleLowerCase().includes(needle));
  });
};

const onSubmit = async () => {
  if (!selectedCompany.value) {
    customNotify({ status: statusMessages.fail, message: 'Debes seleccionar una empresa' });
    return;
  }
  isLoading.value = true;

  await companiesStore.cloneCompany({
    serial: selectedCompany.value.value.serial,
    groupNumber: props.classGroup.number,
    accessToken: props.signInUser.accessToken
  }).then((resp) => {
    customNotify({ status: resp.status, message: resp.message });
    if (resp.status === statusMessages.success) {
      hideDialog();
    }
  });
  isLoading.value = false;
}

const hideDialog = () => {
  isShowingDialog.value = false;
}
</script>
