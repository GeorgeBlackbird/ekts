<template>
  <section id="contacts" ref="sectionRef" class="contacts-section">
    <div class="contacts-container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">
          Как нас <span class="highlight">найти</span>
        </h2>
        <p class="section-subtitle">
          Приходи в наш офис или свяжись с нами удобным способом
        </p>
      </div>

      <div class="contacts-grid">
        <ContactMap :is-visible="isVisible" />
        <ContactDetails :is-visible="isVisible" />
        <DownloadQR :is-visible="isVisible" />
      </div>

      <div class="quick-actions" :class="{ visible: isVisible }">
        <n-button
          type="primary"
          size="large"
          class="action-button"
          @click="handleCall"
        >
          <template #icon>
            <Icon icon="mdi:phone" />
          </template>
          Позвонить нам
        </n-button>
        
        <n-button
          size="large"
          secondary
          class="action-button"
          @click="handleEmail"
        >
          <template #icon>
            <Icon icon="mdi:email" />
          </template>
          Написать Email
        </n-button>
        
        <n-button
          size="large"
          secondary
          class="action-button"
          @click="handleTelegram"
        >
          <template #icon>
            <Icon icon="mdi:telegram" />
          </template>
          Telegram
        </n-button>
      </div>
    </div>

    <div class="background-pattern"></div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { NButton } from 'naive-ui';
import { useScrollAnimation } from '~/composables/useScrollAnimation';
import ContactMap from '~/components/contacts/ContactMap.vue';
import ContactDetails from '~/components/contacts/ContactDetails.vue';
import DownloadQR from '~/components/contacts/DownloadQR.vue';

const { isVisible, elementRef: sectionRef } = useScrollAnimation(0.15);

const handleCall = () => {
  window.location.href = 'tel:+78005553535';
};

const handleEmail = () => {
  window.location.href = 'mailto:support@fitnesstrainer.ru';
};

const handleTelegram = () => {
  window.open('https://t.me/fitnesstrainer', '_blank');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/contacts.scss';
</style>
