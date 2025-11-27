<template>
  <div
    ref="cardRef"
    class="advantage-card"
    :class="{ visible: isCardVisible }"
    :style="{ '--delay': `${delay}s` }"
  >
    <div class="card-icon-wrapper">
      <Icon :icon="icon" class="card-icon" />
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    <div class="card-shine"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

interface Props {
  icon: string;
  title: string;
  description: string;
  delay?: number;
  isSectionVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  isSectionVisible: false,
});

const isCardVisible = computed(() => props.isSectionVisible);
</script>
