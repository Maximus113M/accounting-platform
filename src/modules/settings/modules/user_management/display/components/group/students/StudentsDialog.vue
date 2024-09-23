<template>
    <q-btn v-if="props.student" flat dense icon="edit" @click="showDialog">
        <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
            Editar
        </q-tooltip>
    </q-btn>
    <q-btn v-else no-caps label="Nuevo +" rounded color="primary" text-color="white" class="q-px-lg"
        @click="showDialog" />
    <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
        <q-card style="min-width: 480px; width: 70%; max-width: 1000px;">
            <q-card-section>
                <div class="row justify-between q-pb-sm">
                    <div class="text-h5 text-weight-medium">
                        {{ props.student ? 'Editar aprendiz' : 'Nueva aprendiz' }}
                    </div>
                    <q-btn flat dense icon="cancel" v-close-popup />
                </div>
                <q-separator />
            </q-card-section>

            <q-card-section>
                <q-form @submit="onSubmit" id="class_group_form" class="row q-col-gutter-sm q-px-lg q-pb-md">
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Nombres</div>
                        <q-input outlined dense type="text" v-model="currentStudent.names"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Apellidos</div>
                        <q-input outlined dense type="text" v-model="currentStudent.lastNames"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Tipo Documento</div>
                        <q-input outlined dense type="text" v-model="currentStudent.documentType"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Numero Documento</div>
                        <q-input outlined dense type="number" v-model.number="currentStudent.documentNumber"
                            :rules="[(val: number) => (val && val > 0) || 'Debes completar este campo']" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="text-subtitle text-weight-medium">Correo Electrónico</div>
                        <q-input outlined dense type="text" v-model="currentStudent.email"
                            :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions align="right" class="q-px-md q-mb-sm">
                <q-btn no-caps color="primary" type="submit" form="class_group_form"
                    :label="props.student ? 'Guardar' : 'Crear'" style="padding: 0px 20px;" />
                <q-btn no-caps color="red-7" label="Cancelar" @click="hideDialog" style="padding: 0px 20px;" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { StudentModel } from '../../../../data/models/studentModel';
import { useUsersManagementStore } from '../../../store';

const props = defineProps({
    student: { type: StudentModel }
});

const useStudentsStore = useUsersManagementStore();

const isShowingDialog = ref<boolean>(false);
const currentStudent = ref(new StudentModel({ id: 0, rol: 3, groupCode: 0 }));

const showDialog = () => {
    if (props.student) {
        currentStudent.value = new StudentModel({ ...props.student });
    } else {
        currentStudent.value = new StudentModel({ id: 0, rol: 3, groupCode: 0 });
    }

    isShowingDialog.value = true;
}

const onSubmit = async () => {
    const resp = await useStudentsStore.createStudent();
    if (resp?.status != 'sucess') {

    }
    hideDialog();

}

const hideDialog = () => {
    isShowingDialog.value = false;
}

</script>