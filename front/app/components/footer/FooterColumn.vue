<template>
  <div class="footer-column">
    <h3 class="column-title">{{ title }}</h3>
    <ul class="column-links">
      <li v-for="link in links" :key="link.label">
        <a :href="link.href" class="column-link">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Link {
  label: string;
  href: string;
}

interface Props {
  title: string;
  links: Link[];
}

defineProps<Props>();
</script>


<style lang="scss" scoped>
@import '@/assets/styles/footer.scss';
</style>