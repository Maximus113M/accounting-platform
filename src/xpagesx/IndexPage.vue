<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Meta, Todo } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { useAccountStore } from 'src/modules/accounting/modules/accounts/display/store';
import {
  Account,
  Level,
  Nature,
} from 'src/modules/accounting/modules/accounts/data/models/account';

const accountStore = useAccountStore();

defineOptions({
  name: 'IndexPage',
});

onMounted(async () => {
  // const res = await accountStore.getPuc(7629149764355);
  // console.log(res);

  // const { message } = await accountStore.createAccount(
  //   new Account({
  //     code: 930510,
  //     name: 'Cuenta Contable Test',
  //     description: 'Desceipcion aqui',
  //     level: Level.sub_account,
  //     nature: Nature.creditor,
  //     serial_company: 7629149764355,
  //     father_id: 414
  //   })
  // );

  // console.log(message);
});

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
