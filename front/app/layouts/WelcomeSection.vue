<template>
  <section id="welcome" class="welcome-section">
    <div class="welcome-container">
      <HeroContent />
      <HeroImage />
    </div>
    <div class="scroll-indicator" @click="scrollToNext">
      <Icon icon="mdi:chevron-down" class="bounce" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import HeroContent from "@/components/welcome/HeroContent.vue";
import HeroImage from "@/components/welcome/HeroImage.vue";

const scrollToNext = () => {
  const nextSection = document.querySelector("#advantages");
  nextSection?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/welcome.scss";
</style>
