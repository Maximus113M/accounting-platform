<template>
  <q-btn flat dense icon="group_add" @click="showDialog">
    <q-tooltip
      :offset="[0, 10]"
      transition-show="scale"
      transition-hide="scale"
      class="text-caption"
    >
      Gestionar aprendices
    </q-tooltip>
  </q-btn>
  <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
    <q-card style="min-width: 580px; width: 90%; max-width: 1200px">
      <q-card-section>
        <div class="row justify-between q-pb-sm">
          <div class="text-h5 text-weight-medium">Gestión de aprendices</div>
          <q-btn flat dense icon="cancel" v-close-popup />
        </div>
        <q-separator />
      </q-card-section>
      <div class="row justify-between items-center q-px-lg">
        <div class="row">
          <q-file
            color="gray"
            rounded
            standout
            bg-color="gray"
            label-color="primary"
            v-model="uploadFile"
            label="Escoge el archivo"
            class="q-mr-md"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="publish" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                color="primary"
                name="close"
                @click.stop.prevent="uploadFile = null"
                class="cursor-pointer"
              />
            </template>
          </q-file>
          <q-btn
            :disable="isLoading"
            no-caps
            rounded
            color="primary"
            icon-right="publish"
            label="Cargar"
            @click="onSubmit"
          />
        </div>
        <!--<q-file rounded standout bg-color="primary" label-color="white" color="" bottom-slots v-model="uploadFile" label="Cargar" counter>
                        <template v-slot:prepend>
                            <q-icon color="white" name="publish" @click.stop.prevent />
                        </template>
                        <template v-slot:append>
                            <q-icon color="white" name="close" @click.stop.prevent="uploadFile = null" class="cursor-pointer" />
                        </template>
                        <template v-slot:hint>
                            Peso del archivo
                        </template>
                    </q-file>-->

        <q-input
          v-model="filter"
          rounded
          outlined
          dense
          type="text"
          debounce="100"
          placeholder="Buscar"
          clearable
          color="grey-8"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-card-section>
        <q-table
          :grid="$q.screen.lt.sm"
          class="q-px-sm"
          color="black"
          flat
          :rows="exampleStudentList"
          :columns="columns"
          row-key="id"
          :filter="filter"
          rows-per-page-label="Filas por página"
          :rows-per-page-options="[5, 10, 15, 20]"
          no-data-label="No se encontraron resultados"
          no-results-label="No se encontraron resultados"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="row justify-center q-gutter-xs">
                <StudentsDialog @updated-students="onUpdatedStudents" :student="props.row" />
                <q-btn
                  flat
                  dense
                  icon="delete"
                  @click="deleteDialog(props.row)"
                >
                  <q-tooltip
                    :offset="[0, 10]"
                    transition-show="scale"
                    transition-hide="scale"
                    class="text-caption"
                  >
                    Eliminar
                  </q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <!-- <q-card-actions align="right">
                <q-btn no-caps flat color="primary" type="submit" form="class_group_form"
                    :label="props.classGroup ? 'Editar' : 'Crear'" />
                <q-btn no-caps color="primary" label="Cancelar" @click="hideDialog" />
            </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import StudentsDialog from './students/StudentsDialog.vue';
import { onMounted, ref, } from 'vue';
import { Dialog } from 'quasar';

import { ClassGroup } from '../../../data/models/classGroup';
import { UserModel } from 'src/models/userModel';
import {
  deleteStudent,
  getStudentsByClassGroup,
  uploadStudents
} from 'src/modules/settings/modules/user_management/display/store/actions';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';
import { useUsersManagementStore } from 'src/modules/settings/modules/user_management/display/store';

const props = defineProps({
  classGroup: { type: ClassGroup, required: true },
});

const isShowingDialog = ref<boolean>(false);
const currentClassGroup = ref(new ClassGroup({}));
const filter = ref<string>('');
const userManagementStore = useUsersManagementStore();
const exampleStudentList = ref<UserModel[]>([]);
const uploadFile = ref();
const isLoading = ref(false);

onMounted(async () => {
  await loadStudents();
});


const loadStudents = async () => {
  const res = await getStudentsByClassGroup(props.classGroup?.number);
  if (res.status === statusMessages.success)
    exampleStudentList.value = userManagementStore.studentsByClassGroup;
  else
    customNotify({
      status: res.status,
      message: res.message,
    });
};

const showDialog = () => {
  currentClassGroup.value = new ClassGroup({ ...props.classGroup });
  isShowingDialog.value = true;
};

const validatedFile = (): boolean => {
  if (!uploadFile.value) {
    customNotify({
      status: statusMessages.fail,
      message: 'Seleccione el archivo',
    });
    isLoading.value = false;
    return false;
  }
  if (uploadFile.value.size > 10000000) {
    customNotify({
      status: statusMessages.fail,
      message: 'El archivo no puede superar de 10MB',
    });
    uploadFile.value = null;
    isLoading.value = false;
    return false;
  }
  if (
    uploadFile.value.type !== 'text/csv' &&
    uploadFile.value.type !== 'text/plain'
  ) {
    customNotify({
      status: statusMessages.fail,
      message: 'El tipo de archivo no es valido, solo se admite csv | txt',
    });
    uploadFile.value = null;
    isLoading.value = false;
    return false;
  }
  return true;
};

const onSubmit = async () => {
  isLoading.value = true;
  const formData = new FormData();
  if (!validatedFile()) return;
  formData.append('csvFile', uploadFile.value);
  formData.append('numero_ficha', props.classGroup?.number.toString());
  const res = await uploadStudents(formData);
  if (res.status === statusMessages.success) {
    hideDialog();
    customNotify({
      status: res.status,
      message: 'Carga realizada correctamente',
    });
    await loadStudents();
    if (res.message.trim() !== '') {
      customNotify({
        status: statusMessages.warning,
        message: res.message,
      });
    }
  } else {
    customNotify({
      status: res.status,
      message: res.message,
    });
  }

  uploadFile.value = null;
  isLoading.value = false;
};

const hideDialog = () => {
  isShowingDialog.value = false;
};

const columns: any = [
  {
    name: 'id',
    align: 'center',
    label: 'ID',
    field: (student: UserModel) => student.id,
    sortable: true,
  },
  {
    name: 'documentType',
    align: 'center',
    label: 'T. Documento',
    field: (student: UserModel) => student.documentType,
    sortable: true,
  },
  {
    name: 'document',
    align: 'center',
    label: 'Documento',
    field: (student: UserModel) => student.documentNumber,
    sortable: true,
  },
  {
    name: 'name',
    align: 'center',
    label: 'Nombre',
    field: (student: UserModel) => `${student.names} ${student.lastNames}`,
    sortable: true,
  },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: (student: UserModel) => student.email,
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

const onUpdatedStudents = (updatedStudent: UserModel) => {
  const index = exampleStudentList.value.findIndex(function(student: UserModel) {
    return student.id === updatedStudent?.id
  });
  exampleStudentList.value[index] = updatedStudent;
}

const deleteDialog = (student: UserModel) => {
  Dialog.create({
    title: '<div class="text-red-7">Eliminar aprendiz</div>',
    message: `¿<strong>Deseas eliminar</strong> al aprendiz seleccionado <strong>"${student.names} ${student.lastNames}"</strong> ? Esta acción <strong>no puede revertirse.</strong>`,
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
      const res = await deleteStudent(student.id);
      customNotify({
        status: res.status,
        message: res.message,
      });
      if (res.status === statusMessages.success) {
        exampleStudentList.value = exampleStudentList.value.filter(function(_student: UserModel) {
          return _student.id !== student.id;
        });
        userManagementStore.studentsByClassGroup = exampleStudentList.value;
      }
    })
    .onCancel(() => {});
};
</script>
