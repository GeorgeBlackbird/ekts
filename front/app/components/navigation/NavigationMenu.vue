<template>
  <nav class="navigation-menu" :class="{ mobile: isMobile }">
    <a
      v-for="item in menuItems"
      :key="item.id"
      :href="`#${item.id}`"
      class="nav-link"
      :class="{ active: activeSection === item.id }"
      @click.prevent="$emit('navigate', item.id)"
    >
      {{ item.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
interface MenuItem {
  id: string;
  label: string;
}

interface Props {
  activeSection: string;
  isMobile?: boolean;
}

defineProps<Props>();

defineEmits<{
  navigate: [sectionId: string];
}>();

const menuItems: MenuItem[] = [
  { id: 'welcome', label: 'Главная' },
  { id: 'advantages', label: 'Преимущества' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contact', label: 'Связаться' },
  { id: 'contacts', label: 'Контакты' },
];
</script>


<style lang="scss" scoped>
@import '@/assets/styles/navigation.scss';
</style>