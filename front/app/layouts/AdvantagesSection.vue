<template>
  <section id="advantages" ref="sectionRef" class="advantages-section">
    <div class="advantages-container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">
          Почему <span class="highlight">Твой Фитнес-Тренер</span>?
        </h2>
        <p class="section-subtitle">
          Мы создали идеальное приложение, которое поможет тебе достичь целей
          быстрее и эффективнее
        </p>
      </div>

      <div class="advantages-grid">
        <AdvantageCard
          v-for="(advantage, index) in advantages"
          :key="advantage.title"
          :icon="advantage.icon"
          :title="advantage.title"
          :description="advantage.description"
          :is-section-visible="isVisible"
        />
      </div>
    </div>

    <WeatherRecommendation />
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';
import AdvantageCard from '~/components/advantages/AdvantageCard.vue';
import WeatherRecommendation from '~/components/advantages/WeatherRecommendation.vue';

const { isVisible, elementRef: sectionRef } = useScrollAnimation(0.15);

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

const advantages: Advantage[] = [
  {
    icon: "mdi:account-star",
    title: "Персональный подход",
    description:
      "ИИ-тренер адаптирует программу под твои цели, уровень подготовки и предпочтения",
  },
  {
    icon: "mdi:dumbbell",
    title: "1000+ упражнений",
    description:
      "Огромная база упражнений с видео-инструкциями и техникой выполнения",
  },
  {
    icon: "mdi:chart-line",
    title: "Отслеживание прогресса",
    description:
      "Детальная аналитика тренировок, калорий, веса и достижений в реальном времени",
  },
  {
    icon: "mdi:food-apple",
    title: "План питания",
    description:
      "Персонализированные рационы с подсчётом калорий и макронутриентов",
  },
  {
    icon: "mdi:clock-outline",
    title: "Занимайся когда удобно",
    description:
      "Тренируйся дома, в зале или на улице — программы на любую ситуацию",
  },
  {
    icon: "mdi:account-group",
    title: "Комьюнити",
    description:
      "Общайся с единомышленниками, участвуй в челленджах и получай мотивацию",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/advantages.scss";
</style>
