<template>
  <section id="contact" ref="sectionRef" class="contact-form-section">
    <div class="contact-container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">
          Остались <span class="highlight">вопросы</span>?
        </h2>
        <p class="section-subtitle">
          Свяжись с нами — мы всегда готовы помочь начать твой путь к идеальной форме
        </p>
      </div>

      <div class="contact-content">
        <ContactInfo :is-visible="isVisible" />
        <ContactForm :is-visible="isVisible" />
      </div>
    </div>

    <div class="background-decoration">
      <div class="deco-circle circle-1"></div>
      <div class="deco-circle circle-2"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';
import ContactInfo from '@/components/contact/ContactInfo.vue';
import ContactForm from '@/components/contact/ContactForm.vue';

const { isVisible, elementRef: sectionRef } = useScrollAnimation(0.15);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/contact-form.scss';
</style>
