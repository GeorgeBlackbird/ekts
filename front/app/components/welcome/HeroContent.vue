<template>
  <div class="hero-content">
    <n-space vertical :size="24">
      <div class="title-wrapper">
        <h1 class="hero-title">
          Твой <span class="gradient-text">фитнес-тренер</span>
          <br />в кармане
        </h1>
      </div>
      
      <p class="hero-subtitle">
        Персональные тренировки, отслеживание прогресса и мотивация 24/7. 
        Достигай своих целей вместе с нами!
      </p>

      <n-space :size="16" class="cta-buttons">
        <n-button 
          type="primary" 
          size="large"
          class="cta-primary"
          @click="handleDownload"
        >
          <template #icon>
            <Icon icon="mdi:download" />
          </template>
          Скачать бесплатно
        </n-button>
        
        <n-button 
          size="large"
          quaternary
          class="cta-secondary"
          @click="handleLearnMore"
        >
          <template #icon>
            <Icon icon="mdi:play-circle" />
          </template>
          Узнать больше
        </n-button>
      </n-space>

      <div class="stats">
        <div 
          v-for="stat in stats" 
          :key="stat.label" 
          class="stat-item"
        >
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { NButton, NSpace, useMessage } from 'naive-ui';

const message = useMessage();

const stats = [
  { value: '500K+', label: 'Активных пользователей' },
  { value: '4.8★', label: 'Рейтинг в магазинах' },
  { value: '1000+', label: 'Программ тренировок' }
];

const handleDownload = () => {
  message.success('Скачивание начнётся автоматически...');
};

const handleLearnMore = () => {
  const nextSection = document.querySelector('#advantages');
  nextSection?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/welcome.scss";
</style>