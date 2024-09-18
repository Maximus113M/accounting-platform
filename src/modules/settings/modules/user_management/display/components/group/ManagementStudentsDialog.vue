<template>
    <q-btn flat dense icon="group_add" @click="showDialog">
        <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale" class="text-caption">
            Gestionar aprendices
        </q-tooltip>
    </q-btn>
    <q-dialog v-model="isShowingDialog" backdrop-filter="blur(1px)">
        <q-card style="min-width: 580px; width: 90%; max-width: 1200px;">
            <q-card-section>
                <div class="row justify-between q-pb-sm">
                    <div class="text-h5 text-weight-medium">Gestión de aprendices</div>
                    <q-btn flat dense icon="cancel" v-close-popup />
                </div>
                <q-separator />
            </q-card-section>
            <div class="row justify-between items-center q-px-lg">
                <q-btn no-caps rounded color="primary" icon-right="publish" label="Cagar" @click="hideDialog" />
                <q-input v-model="filter" rounded outlined dense type="text" debounce="100" placeholder="Buscar"
                    clearable color="grey-8">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>

            <q-card-section>
                <q-table :grid="$q.screen.lt.sm" class="q-px-sm" color="black" flat :rows="exampleStudentList"
                    :columns="columns" row-key="id" :filter="filter" rows-per-page-label="Filas por página"
                    :rows-per-page-options="[5, 10, 15, 20,]" no-data-label="No se encontraron resultados"
                    no-results-label="No se encontraron resultados">

                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <div class="row justify-center q-gutter-xs">
                                <StudentsDialog :student="props.row" />
                                <q-btn flat dense icon="delete" @click="deleteDialog(props.row)">
                                    <q-tooltip :offset="[0, 10]" transition-show="scale" transition-hide="scale"
                                        class="text-caption">
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
import { ref } from 'vue';
import { Dialog } from 'quasar';

import { ClassGroup } from '../../../data/models/classGroup';
import { StudentModel } from '../../../data/models/studentModel';

const props = defineProps({
    classGroup: { type: ClassGroup, required: true }
});

const isShowingDialog = ref<boolean>(false);
const currentClassGroup = ref(new ClassGroup({}));
const filter = ref<string>('');

const exampleStudentList = ref([
    new StudentModel({ id: 1, names: 'John', lastNames: 'Doe', documentType: 'Cedula de ciudadania', documentNumber: '123456789', email: 'john.doe@example.com', rol: 3, groupCode: 101 }),
    new StudentModel({ id: 2, names: 'Jane', lastNames: 'Smith', documentType: 'Cedula de ciudadania', documentNumber: '987654321', email: 'jane.smith@example.com', rol: 3, groupCode: 102 }),
    new StudentModel({ id: 3, names: 'Emily', lastNames: 'Johnson', documentType: 'Passport', documentNumber: '12345675', email: 'emily.johnson@example.com', rol: 3, groupCode: 103 }),
    new StudentModel({ id: 4, names: 'Michael', lastNames: 'Williams', documentType: 'Cedula de ciudadania', documentNumber: '765432109', email: 'michael.williams@example.com', rol: 3, groupCode: 104 }),
    new StudentModel({ id: 5, names: 'Sarah', lastNames: 'Brown', documentType: 'Passport', documentNumber: '7654321', email: 'sarah.brown@example.com', rol: 3, groupCode: 101 }),
    new StudentModel({ id: 6, names: 'David', lastNames: 'Jones', documentType: 'Cedula de ciudadania', documentNumber: '456789123', email: 'david.jones@example.com', rol: 3, groupCode: 102 }),
    new StudentModel({ id: 7, names: 'Sophia', lastNames: 'Garcia', documentType: 'Cedula de ciudadania', documentNumber: '321654987', email: 'sophia.garcia@example.com', rol: 3, groupCode: 103 }),
    new StudentModel({ id: 8, names: 'James', lastNames: 'Martinez', documentType: 'Passport', documentNumber: '9876543', email: 'james.martinez@example.com', rol: 3, groupCode: 104 }),
    new StudentModel({ id: 9, names: 'Olivia', lastNames: 'Rodriguez', documentType: 'Cedula de ciudadania', documentNumber: '654321987', email: 'olivia.rodriguez@example.com', rol: 3, groupCode: 101 }),
    new StudentModel({ id: 10, names: 'Daniel', lastNames: 'Hernandez', documentType: 'Passport', documentNumber: '6543210', email: 'daniel.hernandez@example.com', rol: 3, groupCode: 102 }),
    new StudentModel({ id: 11, names: 'Lucas', lastNames: 'Lopez', documentType: 'Cedula de ciudadania', documentNumber: '789012345', email: 'lucas.lopez@example.com', rol: 3, groupCode: 103 }),
    new StudentModel({ id: 12, names: 'Ava', lastNames: 'Gonzalez', documentType: 'Passport', documentNumber: '1234567', email: 'ava.gonzalez@example.com', rol: 3, groupCode: 104 }),
    new StudentModel({ id: 13, names: 'Alexander', lastNames: 'Perez', documentType: 'Cedula de ciudadania', documentNumber: '159753486', email: 'alexander.perez@example.com', rol: 3, groupCode: 101 }),
    new StudentModel({ id: 14, names: 'Isabella', lastNames: 'Sanchez', documentType: 'Passport', documentNumber: '7890123', email: 'isabella.sanchez@example.com', rol: 3, groupCode: 102 }),
    new StudentModel({ id: 15, names: 'Mason', lastNames: 'Ramirez', documentType: 'Cedula de ciudadania', documentNumber: '123789456', email: 'mason.ramirez@example.com', rol: 3, groupCode: 103 })
]);

const showDialog = () => {
    currentClassGroup.value = new ClassGroup({ ...props.classGroup });
    isShowingDialog.value = true;
}

// const onSubmit = () => {
//     hideDialog();
// }

const hideDialog = () => {
    isShowingDialog.value = false;
}

const columns: any = [
    {
        name: 'id',
        align: 'center',
        label: 'ID',
        field: (student: StudentModel) => student.id,
        sortable: true,
    },
    {
        name: 'documentType',
        align: 'center',
        label: 'T. Documento',
        field: (student: StudentModel) => student.documentType,
        sortable: true,
    },
    {
        name: 'document',
        align: 'center',
        label: 'Documento',
        field: (student: StudentModel) => student.documentNumber,
        sortable: true,
    },
    {
        name: 'name',
        align: 'center',
        label: 'Nombre',
        field: (student: StudentModel) => `${student.names} ${student.lastNames}`,
        sortable: true,
    },
    {
        name: 'email',
        align: 'center',
        label: 'Email',
        field: (student: StudentModel) => student.email,
        sortable: true,
    },
    {
        name: 'actions',
        align: 'center',
        label: 'Acciones',
        field: () => '',
        sortable: false
    },
];


const deleteDialog = (student: StudentModel) => {
    Dialog.create({
        title: '<div class="text-red-7">Eliminar aprendiz</div>',
        message: `¿<strong>Deseas eliminar</strong> al aprendiz seleccionado <strong>"${student.names} ${student.lastNames}"</strong> ? Esta acción <strong>no puede revertirse.</strong>`,
        ok: {
            push: true,
            color: 'light-blue-4'
        },
        cancel: {
            push: true,
            color: 'red-5'
        },
        html: true,
    }).onOk(async (data) => {
        data;
        console.log('>>>> OK, received', student)
    }).onCancel(() => {
    });
}
</script>