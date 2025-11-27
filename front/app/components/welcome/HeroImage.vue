<template>
  <div class="hero-image">
    <div class="phone-mockup">
      <div class="phone-frame">
        <div class="phone-screen">
          <div class="app-preview">
            <div class="preview-header">
              <Icon icon="mdi:dumbbell" class="app-icon" />
              <span>Твой Фитнес-Тренер</span>
            </div>
            <div class="preview-content">
              <div class="workout-card">
                <Icon icon="mdi:run" class="workout-icon" />
                <div class="workout-info">
                  <div class="workout-title">Кардио тренировка</div>
                  <div class="workout-duration">30 минут</div>
                </div>
              </div>
              <div class="progress-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" class="progress-bg" />
                  <circle cx="50" cy="50" r="45" class="progress-fill" />
                </svg>
                <div class="progress-text">
                  <div class="progress-value">78%</div>
                  <div class="progress-label">Цель</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="floating-card card-1">
        <Icon icon="mdi:fire" />
        <span>245 ккал</span>
      </div>
      
      <div class="floating-card card-2">
        <Icon icon="mdi:heart-pulse" />
        <span>142 bpm</span>
      </div>
      
      <div class="floating-card card-3">
        <Icon icon="mdi:trophy" />
        <span>12 дней подряд</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<style lang="scss" scoped>
@import "@/assets/styles/welcome.scss";
</style>