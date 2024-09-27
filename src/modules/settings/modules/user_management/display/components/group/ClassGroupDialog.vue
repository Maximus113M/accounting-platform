<template>
  <q-btn v-if="props.classGroup" flat dense icon="edit" @click="showDialog">
    <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
      Editar
    </q-tooltip>
  </q-btn>
  <q-btn v-else no-caps label="Nuevo +" rounded color="primary" text-color="white" class="q-px-lg"
    @click="showDialog" />
  <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
    <q-card style="min-width: 400px; width: 60%; max-width: 1000px">
      <q-card-section>
        <div class="row justify-between q-pb-sm">
          <div class="text-h5 text-weight-medium">
            {{ props.classGroup ? 'Editar ficha' : 'Nueva ficha' }}
          </div>
          <q-btn flat dense icon="cancel" v-close-popup />
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" id="class_group_form" class="row q-col-gutter-sm q-px-lg q-pb-md">
          <div class="col-12 col-sm-6 col-md-2">
            <div class="text-subtitle text-weight-medium">Codigo</div>
            <q-input outlined dense type="number" v-model.number="currentClassGroup.code"
              :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="text-subtitle text-weight-medium">
              Numero de ficha
            </div>
            <q-input outlined dense type="number" v-model.number="currentClassGroup.number"
              :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
          </div>
          <div class="col-12 col-sm-12 col-md-6">
            <div class="text-subtitle text-weight-medium">Nombre del programa</div>
            <q-input outlined dense type="text" v-model="currentClassGroup.name"
              :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="q-px-md q-mb-sm">
        <q-btn no-caps color="primary" type="submit" form="class_group_form"
          :label="props.classGroup ? 'Guardar' : 'Crear'" style="padding: 0px 20px" />
        <q-btn no-caps color="red-7" label="Cancelar" @click="hideDialog" style="padding: 0px 20px" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ClassGroup } from '../../../data/models/classGroup';
//import { createClassGroup } from 'src/modules/settings/modules/user_management/display/store/actions';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { useUsersManagementStore } from 'src/modules/settings/modules/user_management/display/store';
import { updateClassGroup } from 'src/modules/settings/modules/user_management/display/store/actions';

const props = defineProps({
  classGroup: { type: ClassGroup }
});

const isShowingDialog = ref<boolean>(false);
const currentClassGroup = ref(new ClassGroup({}));


const showDialog = () => {
  if (props.classGroup) {
    currentClassGroup.value = new ClassGroup({ ...props.classGroup });
  } else {
    currentClassGroup.value = new ClassGroup({});
  }

  isShowingDialog.value = true;
}

const onSubmit = async () => {
  const userManagementStore = useUsersManagementStore();
  if (!props.classGroup) {
    const res = await userManagementStore.createClassGroup(currentClassGroup.value);
    if (res.status === statusMessages.success) {
      userManagementStore.classGroups.push(res.classGroup!);
    }
    customNotify({
      status: res.status,
      message: res.message
    });
  } else {
    const res = await updateClassGroup(props.classGroup.number, currentClassGroup.value);
    if (res.status === statusMessages.success) {
      const index = userManagementStore.classGroups.findIndex(function (classGroup: ClassGroup) {
        return classGroup.id === props.classGroup?.id
      });
      userManagementStore.classGroups[index] = res.classGroup!;
    }
    customNotify({
      status: res.status,
      message: res.message
    });
  }
  hideDialog();
}

const hideDialog = () => {
  isShowingDialog.value = false;
}
</script>
