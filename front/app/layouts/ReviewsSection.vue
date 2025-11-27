<template>
  <section id="reviews" ref="sectionRef" class="reviews-section">
    <div class="reviews-container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">
          Что говорят <span class="highlight">наши пользователи</span>
        </h2>
        <p class="section-subtitle">
          Реальные отзывы людей, которые достигли своих целей с нашим приложением
        </p>
      </div>

      <div class="reviews-stats" :class="{ visible: isVisible }">
        <div class="stat-item">
          <Icon icon="mdi:star" class="stat-icon" />
          <div class="stat-content">
            <div class="stat-value">4.8</div>
            <div class="stat-label">Средний рейтинг</div>
          </div>
        </div>
        <div class="stat-item">
          <Icon icon="mdi:account-group" class="stat-icon" />
          <div class="stat-content">
            <div class="stat-value">500K+</div>
            <div class="stat-label">Довольных пользователей</div>
          </div>
        </div>
        <div class="stat-item">
          <Icon icon="mdi:thumb-up" class="stat-icon" />
          <div class="stat-content">
            <div class="stat-value">95%</div>
            <div class="stat-label">Положительных отзывов</div>
          </div>
        </div>
      </div>

      <ReviewCarousel :is-visible="isVisible" />
    </div>

    <div class="background-decoration">
      <div class="deco-circle circle-1"></div>
      <div class="deco-circle circle-2"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';
import ReviewCarousel from '@/components/reviews/ReviewCarousel.vue';

const { isVisible, elementRef: sectionRef } = useScrollAnimation(0.15);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/reviews.scss';
</style>
