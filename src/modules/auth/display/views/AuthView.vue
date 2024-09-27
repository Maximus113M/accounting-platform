<template>
    <div class="row justify-center items-center bg-image" style="height: 100dvh;">
        <q-card flat class="bg-white q-pa-md"
            style="height: 450px; width: 350px; border-radius: 20px; border: 2px solid #AAAAAA; overflow-y: auto; ">
            <q-card-section>
                <div class="q-mt-sm text-center text-h4 text-primary text-bold">
                    SenaCont
                </div>
            </q-card-section>
            <q-card-section>
                <q-form class="row justify-center q-px-lg q-mt-sm" :submit="logIn">
                    <q-input class="col-12 q-mb-lg" dense type="email" label="Correo" v-model="logInData.email"
                        :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    <q-input class="col-12" dense type="password" label="Contraseña" v-model="logInData.password"
                        :rules="[(val: string) => (val && val.length > 0) || 'Debes completar este campo']" />
                    <div class="q-mb-xl text-caption text-grey">¿Olvidaste la contraseña?</div>
                    <q-btn no-caps class="col-12 q-mt-md q-py-sm" color="primary" type="submit" label="Ingresar"
                        :loading="isLoading" />
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/index';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { customNotify } from 'src/core/utils/notifications';

const router = useRouter();
const authStore = useAuthStore();
const logInData = ref({ email: '', password: '' });
const isLoading = ref(false);

const logIn = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    const resp = await authStore.logIn(logInData.value);
    customNotify({ status: resp.status, message: resp.message });

    if (resp.status === statusMessages.fail) {
        isLoading.value = false;
        return;
    }
    //const value = sessionStorage.getItem('token');

    const getUserResp = await authStore.getSignInUser(resp.data!);
    if (getUserResp.status === statusMessages.fail) {
        customNotify({ status: getUserResp.status, message: getUserResp.message });
        isLoading.value = false;
        return;
    }
    router.push('/main/');
    console.log(authStore.signInUser);
    isLoading.value = false;
}
</script>
<style scoped>
.bg-image {
    background-image: linear-gradient(to bottom,
            rgba(255, 255, 255, 0.01),
            rgba(255, 255, 255, 0.01)),
        url(../../../../assets/images/sena2.jpg);
    background-color: rgb(235, 235, 235);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
</style>