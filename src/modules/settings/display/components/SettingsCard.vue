<template>
    <q-card class="column items-center justify-center q-px-sm q-py-xl q-mx-lg q-my-md card" @click="router.push(route)">
        <q-icon size="95px" color="primary" :name="props.icon"></q-icon>
        <div class="q-mt-xs text-center text-h5 text-bold text-primary">{{ props.name }}</div>
        <div class="q-mt-sm q-mx-sm text-center text-caption">{{ props.description }}</div>
    </q-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps<SettingsCardProps>();

export interface SettingsCardProps {
    icon: string;
    name: string;
    description: string;
    route: string,
};

//#00C8F8  Azul
//#929292   Gris
//#D6D6D6   Gris Claro
//#F6F6F6   Gris Claro
</script>

<style scoped>
.card {
    width: 265px;
    min-height: 330px;
    border-radius: 10px;
    border: 2px solid #D6D6D6;
    box-shadow: 5px 9px 10px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.5s ease-in-out, background-color 0.3s ease-in, transform 0.3s ease, border 0.1s ease;
}

.card:hover {
    background-color: #f7f7f7;
    box-shadow: 0 8px 38px rgb(0, 183, 255, 0.8);
    border: 3px solid #00C8F8;
    transform: scale(1.05);
    cursor: pointer;
}
</style>
