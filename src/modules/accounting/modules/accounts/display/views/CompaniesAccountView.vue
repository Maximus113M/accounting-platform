<template>
    <q-page padding style="height: 91vh;">
        <q-card flat class="bg-white q-pa-md"
            style="height: 100%; border-radius: 20px; border: 1px solid #EBEBEB; overflow-y: auto; ">
            <div class="row justify-start items-center">
                <div class="row">
                    <div v-if="!isShowingTable" class="row items-center cursor-pointer" @click="isShowingTable = true">
                        <q-icon size="md" name="arrow_circle_left" />
                    </div>
                    <div class="q-ml-sm text-h6 text-bold">{{ isShowingTable ? 'Cuentas' : 'PUC Empresa ' +
                        selectedCompany?.serial }}</div>
                </div>
            </div>
            <div v-if="isShowingTable" class="q-px-md">
                <q-table bordered grid :rows="companiesStore.companyList" :columns="companiesColumns" row-key="name"
                    :filter="filter" hide-header rows-per-page-label="Resultados por página"
                    :rows-per-page-options="[10, 20, 30]" no-data-label="No se encontraron resultados"
                    no-results-label="No se encontraron resultados" :loading="isLoading">
                    <template v-slot:top-right>
                        <q-input outlined rounded dense debounce="300" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>
                    <template v-slot:item="props">
                        <q-card class="cursor-pointer q-mx-sm" style="min-width: 200px;"
                            @click="onSelectedCompany(props.row)">
                            <q-card-section>
                                <div class="column q-pa-md">
                                    <div class="row justify-center q-mb-sm">
                                        <q-avatar class="bg-black">
                                            <q-icon color="white" size="lg" name="apartment" />
                                        </q-avatar>
                                    </div>
                                    <div class="text-bold text-subtitle2">Serial</div>
                                    <div class="">{{ props.row.serial }}</div>
                                    <div class="text-bold text-subtitle2">Tipo razón social</div>
                                    <div class="">{{ props.row.basicData.businessTypeName }}</div>
                                    <div class="text-bold text-subtitle2">Nombre Comercial</div>
                                    <div class="">{{ props.row.basicData.companyName }}</div>
                                    <div class="text-bold text-subtitle2">Dirección</div>
                                    <div class="">
                                        {{ `${props.row.basicData.city.name} - ${props.row.basicData.address}` }}
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </template>

                </q-table>
            </div>
            <div v-else>
                <div class="row">
                    <div class="col-6">
                        <q-tree :nodes="treeData" node-key="label">
                            <template v-slot:default-header="props">
                                <div @click="onSelectedAccount(props.node)"
                                    class="text-weight-bold text-grey-8 cursor-pointer">
                                    {{ props.key }}
                                </div>
                            </template>
                            <template v-slot:default-body="props">
                                    {{ props.node.value.name }}
                            </template>

                        </q-tree>
                    </div>
                    <div class="col-6" style="border-left: 2px solid lightgray;">

                        <q-table flat :rows="selectedAccounts" :columns="accountsColumns" :rows-per-page-options="[10]"
                            row-key="code" hide-bottom />
                        <div v-if="selectedAccount" class="row q-px-md">
                            <div v-if="nextLevelAccount && !isCreatingAccount"
                                class="row items-center q-col-gutter-x-sm q-pl-xs q-pr-md q-mt-md cursor-pointer"
                                style="user-select: none;" @click="createAccount">
                                <q-icon size="sm" name="add_circle"></q-icon>
                                <div>
                                    {{ 'Crear nuevo ' + nextLevelAccount }}
                                </div>
                            </div>
                            <!-- Create account -->
                            <div v-if="isCreatingAccount && nextLevelAccount" class="col-12 q-mt-md q-py-xs">
                                <div class="row items-center q-col-gutter-y-sm q-col-gutter-x-xs">
                                    <div class="col-4">
                                        <q-input readonly dense outlined label="Nivel" v-model="nextLevelAccount" />
                                    </div>
                                    <div class="col-4">
                                        <q-input readonly dense outlined label="Código"
                                            v-model="selectedAccount.code" />
                                    </div>
                                    <div class="col-4">
                                        <q-input dense outlined label="Código" v-model="codeInput"
                                            :mask="nextLevelAccount === 'Grupo' ? '#' : '##'" fill-mask="0" />
                                    </div>
                                    <div class="col-12">
                                        <q-input dense outlined label="Nombre" v-model="nameInput" />
                                    </div>
                                </div>
                                <div class="row justify-end q-gutter-x-sm q-mt-md">
                                    <q-btn dense no-caps :label="`Crear ${nextLevelAccount}`" color="primary"
                                        class="q-px-md" @click="addNewAccout()" />
                                    <q-btn dense no-caps label="Cancelar" color="red" class="q-px-lg"
                                        @click="isCreatingAccount = false" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </q-card>
    </q-page>
</template>


<script setup lang="ts">
import { customNotify, spinnerType } from 'src/core/utils/notifications';
import { useAuthStore } from 'src/modules/auth/display/store';
import { CompanyModel } from 'src/modules/settings/modules/companies/data/models/companyModel';
import { useCompaniesStore } from 'src/modules/settings/modules/companies/display/store';
import { onMounted, ref } from 'vue';
import { useAccountStore } from '../store';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { Account, accountToTreeData, Level } from '../../data/models/account';
import { getLevelName, getNextLevel } from 'src/core/utils/general';

const authStore = useAuthStore();
const companiesStore = useCompaniesStore();
const accountsStore = useAccountStore();

let filter = ref('');

const isLoading = ref(false);
const isShowingTable = ref(true);

const selectedCompany = ref<CompanyModel | undefined>(undefined);
const companyAccounts = ref<Account[]>([]);

const selectedAccounts = ref<Account[]>([]);
const selectedAccount = ref<Account | undefined>(undefined);
const nextLevelAccount = ref<string | undefined>(undefined);

const isCreatingAccount = ref(false);
const codeInput = ref('');
const nameInput = ref('');

const treeData = ref<{ label: string, value: Account, children: [] }[]>([]);

onMounted(async () => {
    isLoading.value = true;
    const resp = await companiesStore.getCompanies(authStore.signInUser.accessToken);
    isLoading.value = false;
    customNotify({ status: resp.status, message: resp.message });
});

async function onSelectedCompany(company: CompanyModel) {
    selectedCompany.value = company;
    isCreatingAccount.value = false;
    selectedAccounts.value = [];
    selectedAccount.value = undefined;
    nextLevelAccount.value = undefined;

    customNotify({ status: statusMessages.info, message: 'Obteniendo información...', spinner: spinnerType.Ios });
    await updatePuc();
    customNotify({ status: statusMessages.success, message: 'Información obtenida!', time: 1000 });
}

async function updatePuc() {
    if (!selectedCompany.value) return;
    treeData.value = [];
    const resp = await accountsStore.getPuc(selectedCompany.value.serial);
    customNotify({ message: resp.message, status: resp.status });
    if (resp.status === statusMessages.success) {
        isShowingTable.value = false;

        companyAccounts.value = resp.data!;
        console.log(companyAccounts.value);

        for (const account of companyAccounts.value) {
            const currentAccount = accountToTreeData(account);
            treeData.value.push(currentAccount);
        }
    }
}

function onSelectedAccount(accountNode: { label: string, value: Account, children: [] }) {
    selectedAccounts.value = [];
    selectedAccount.value = accountNode.value;
    isCreatingAccount.value = false;
    const nextLevel = getNextLevel(accountNode.value.level);
    nextLevelAccount.value = nextLevel ? getLevelName(nextLevel) : nextLevel;
    console.log('♫ ♫ ♫ ♫');
    //console.log(accountNode.value);

    if (!accountNode.value.father_id || accountNode.value.level === Level.class) {
        selectedAccounts.value = [accountNode.value];
        return;
    }
    const fatherId = Number(accountNode.value.code.toString().substring(0, 1));
    //console.log(fatherId + ' ◄◄')
    const foundFatherClass = companyAccounts.value.find((account) => account.code === fatherId)
    if (foundFatherClass) {
        selectedAccounts.value = [foundFatherClass];
        //Group
        if (accountNode.value.level === Level.group) {
            selectedAccounts.value.push(accountNode.value);
            return;
        }
        //ACCOUNT
        if (accountNode.value.level === Level.account) {
            const foundFatherGroup = foundFatherClass.children.find((group) => group.id === accountNode.value.father_id);
            if (foundFatherGroup) {
                selectedAccounts.value.push(foundFatherGroup);
                selectedAccounts.value.push(accountNode.value);
            }
            return;
        }

        //groupCode
        const groupCode = Number(accountNode.value.code.toString().substring(0, 2));
        const foundFatherGroup = foundFatherClass.children.find((group) => group.code === groupCode);
        if (!foundFatherGroup) return;
        selectedAccounts.value.push(foundFatherGroup);
        //accountCode
        const accountCode = Number(accountNode.value.code.toString().substring(0, 4));
        const foundFatherAccount = foundFatherGroup.children.find((account) => account.code === accountCode);
        if (!foundFatherAccount) return;
        selectedAccounts.value.push(foundFatherAccount);

        //SUB-ACCOUNT
        if (accountNode.value.level === Level.sub_account) {
            selectedAccounts.value.push(accountNode.value);
            return;
        }

        //subAccountCode
        const subAccountCode = Number(accountNode.value.code.toString().substring(0, 6));
        const foundFatherSubAccount = foundFatherAccount.children.find((account) => account.code === subAccountCode);
        if (!foundFatherSubAccount) return;
        selectedAccounts.value.push(foundFatherSubAccount);

        //assistant
        if (accountNode.value.level === Level.assistant) {
            selectedAccounts.value.push(accountNode.value);
            return;
        }

        const assistantCode = Number(accountNode.value.code.toString().substring(0, 8));
        const foundFatherAssitant = foundFatherSubAccount.children.find((account) => account.code === assistantCode);
        if (!foundFatherAssitant) return;

        selectedAccounts.value.push(foundFatherAssitant);
        selectedAccounts.value.push(accountNode.value);
    }

}

function createAccount() {
    isCreatingAccount.value = true;
    codeInput.value = '';
    nameInput.value = '';
}

async function addNewAccout() {
    if (!selectedAccount.value || !selectedCompany.value) return;
    if (codeInput.value === '' || codeInput.value === '00') {
        customNotify({ message: 'Debes completar el codigo de la nueva cuenta', status: statusMessages.info });
        return;
    }
    if (nameInput.value === '') {
        customNotify({ message: 'Debes completar el nombre de la nueva cuenta', status: statusMessages.info });
        return;
    }

    const code = selectedAccount.value.code + codeInput.value
    const newAccount = new Account({
        id: null,
        code: Number(code),
        name: nameInput.value,
        description: '',
        level: getNextLevel(selectedAccount.value.level)!,
        nature: selectedAccount.value.nature,
        serial_company: selectedCompany.value.serial,
        father_id: selectedAccount.value.id,
        children: [],
    });
    //console.log(newAccount)
    const resp = await accountsStore.createAccount(newAccount);
    customNotify({ message: resp.message, status: resp.status });
    if (resp.status === statusMessages.success) {
        isCreatingAccount.value = false;
        await updatePuc();
    }
}

const companiesColumns: any = [
    {
        name: 'serial',
        align: 'center',
        label: 'Serial',
        field: (company: CompanyModel) => company.serial,
        sortable: true,
    },
    {
        name: 'businessTypeName',
        align: 'center',
        label: 'Tipo razón social',
        field: (company: CompanyModel) => company.basicData.businessTypeName,
        sortable: true,
    },
    {
        name: 'companyName',
        align: 'center',
        label: 'Nombre Comercial',
        field: (company: CompanyModel) => company.basicData.companyName,
        sortable: true,
    },
    {
        name: 'addres',
        align: 'center',
        label: 'Dirección',
        field: (company: CompanyModel) => `${company.basicData.city.name} - ${company.basicData.address}`,
        sortable: true,
    }
];

const accountsColumns: any = [
    {
        name: 'type',
        align: 'center',
        label: 'Nivel',
        field: (account: Account) => getLevelName(account.level),
        sortable: false,
    },
    {
        name: 'code',
        align: 'center',
        label: 'Código',
        field: (account: Account) => account.code,
        sortable: false,
    },
    {
        name: 'name',
        align: 'center',
        label: 'Nombre',
        field: (account: Account) => account.name,
        sortable: false,
    },
]
</script>