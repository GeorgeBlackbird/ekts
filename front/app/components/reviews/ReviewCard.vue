<template>
  <div class="review-card">
    <div class="card-header">
      <div class="user-avatar">
        <span class="avatar-text">{{ initials }}</span>
      </div>
      <div class="user-info">
        <div class="user-name">{{ fullName }}</div>
        <div class="user-meta">{{ review.Gender }}</div>
      </div>
    </div>

    <div class="card-rating">
      <Icon
        v-for="star in 5"
        :key="star"
        icon="mdi:star"
        :class="{ filled: star <= Math.round(review.Star) }"
      />
      <span class="rating-value">{{ review.Star.toFixed(1) }}</span>
    </div>

    <p class="card-review">{{ review.Review }}</p>

    <div class="card-footer">
      <Icon icon="mdi:shield-check" />
      <span>Проверенный отзыв</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

interface UserReview {
  LastName: string;
  FirstName: string;
  FatherName: string;
  Gender: "Женщина" | "Мужчина";
  Star: number;
  Review?: string;
}

interface Props {
  review: UserReview;
}

const props = defineProps<Props>();

const fullName = computed(() => {
  return `${props.review.FirstName} ${props.review.LastName}`;
});

const initials = computed(() => {
  return `${props.review.FirstName.charAt(0)}${props.review.LastName.charAt(0)}`;
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/reviews.scss";
</style>
