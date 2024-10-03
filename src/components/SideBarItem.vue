<template>
  <q-item clickable>
    <q-item-section v-if="icon" avatar>
      <q-icon :size="isSelected ? '35px' : 'md'" :name="icon" color="white"
        :style="isSelected ? 'opacity: 1' : 'opacity: 0.70'" />
    </q-item-section>

    <q-item-section>
      <q-item-label :style="isSelected ? 'opacity: 1' : 'opacity: 0.70'"
        :class="isSelected ? 'text-white text-bold text-subtitle1' : 'text-white text-bold text-subtitle2'">{{
          title
        }}</q-item-label>
    </q-item-section>

    <q-separator class="bg-white" />
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EssentialLink'
});

export interface SideBarItemProps {
  title: string;
  icon?: string;
  route: string;
  isSelected: boolean,
};

withDefaults(defineProps<SideBarItemProps>(), {
  title: '',
  icon: '',
  route: '',
  isSelected: false,
});
</script>
