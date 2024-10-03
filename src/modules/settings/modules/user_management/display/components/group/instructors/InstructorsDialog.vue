<template>
  <q-btn v-if="props.instructor" flat dense icon="edit" @click="showDialog">
    <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
      Editar
    </q-tooltip>
  </q-btn>
  <q-btn v-else no-caps label="Nuevo +" rounded color="primary" text-color="white" class="q-px-lg"
    @click="showDialog" />
  <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
    <q-card style="min-width: 480px; width: 70%; max-width: 1000px">
      <q-card-section>
        <div class="row justify-between q-pb-sm">
          <div class="text-h5 text-weight-medium">
            {{ props.instructor ? 'Editar Instructor' : 'Nuevo Instructor' }}
          </div>
          <q-btn flat dense icon="cancel" v-close-popup />
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" id="class_group_form" class="row q-col-gutter-sm q-px-lg q-pb-md">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="text-subtitle2 text-weight-medium">Nombres</div>
            <q-input outlined dense type="text" v-model="currentInstructor.names"
              :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="text-subtitle2 text-weight-medium">Apellidos</div>
            <q-input outlined dense type="text" v-model="currentInstructor.lastNames"
              :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <div class="text-subtitle2 text-weight-medium">Tipo Documento</div>
            <q-select outlined dense v-model="currentInstructor.documentType" :options="rootStore.documentTypes"
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
            <div class="text-subtitle2 text-weight-medium">Numero Documento</div>
            <q-input outlined dense type="number" v-model.number="currentInstructor.documentNumber"
              :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="text-subtitle2 text-weight-medium">
              Correo Electrónico
            </div>
            <q-input outlined dense type="text" v-model="currentInstructor.email"
              :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="q-px-md q-mb-sm">
        <q-btn no-caps color="primary" type="submit" form="class_group_form"
          :label="props.instructor ? 'Guardar' : 'Crear'" style="padding: 0px 20px" :loading="isLoading" />
        <q-btn no-caps color="red-7" label="Cancelar" @click="hideDialog" style="padding: 0px 20px" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserModel } from 'src/models/userModel';
import { useUsersManagementStore } from '../../../store';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { useRootStore } from 'src/stores/root-store';

const props = defineProps({
  instructor: { type: UserModel },
  signInUser: { type: UserModel, required: true }
});

const rootStore = useRootStore();
const usersManagementStore = useUsersManagementStore();

const isLoading = ref<boolean>(false);
const isShowingDialog = ref<boolean>(false);
const currentInstructor = ref(new UserModel({ rol: 2 }));

const showDialog = () => {
  if (props.instructor) {
    currentInstructor.value = new UserModel({ ...props.instructor });
  } else {
    currentInstructor.value = new UserModel({ rol: 2 });
  }

  isShowingDialog.value = true;
};

const onSubmit = async () => {
  isLoading.value = true;
  let response;
  if (props.instructor) {
    await usersManagementStore.updateInstructor(currentInstructor.value, props.signInUser.accessToken).then(async (updateResp) => {
      customNotify({ status: updateResp.status, message: updateResp.message });
      response = updateResp.status;
    });

  } else {
    await usersManagementStore.createInstructor(currentInstructor.value, props.signInUser.accessToken).then(async (createResp) => {
      customNotify({ status: createResp.status, message: createResp.message });
      response = createResp.status;
    });

  }

  if (response === statusMessages.success) {
    await usersManagementStore.getInstructors(props.signInUser.accessToken).then((instructorsResp) => {
      if (instructorsResp.status === statusMessages.fail) {
        customNotify({ status: instructorsResp.status, message: instructorsResp.message });
      }
    });
    hideDialog();
  }
  isLoading.value = false;
};

const hideDialog = () => {
  isShowingDialog.value = false;
};
</script>
