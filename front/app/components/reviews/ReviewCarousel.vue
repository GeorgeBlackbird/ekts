<template>
  <div class="review-carousel" :class="{ visible: isVisible }">
    <div v-if="isLoading" class="carousel-loading">
      <n-spin size="large" />
      <p>Загружаем отзывы...</p>
    </div>

    <div v-else-if="error" class="carousel-error">
      <Icon icon="mdi:alert-circle" />
      <p>{{ error }}</p>
      <n-button @click="loadReviews">Попробовать снова</n-button>
    </div>

    <div v-else class="carousel-wrapper">
      <button
        class="carousel-nav prev"
        :disabled="currentIndex === 0"
        @click="prevSlide"
        aria-label="Предыдущий отзыв"
      >
        <Icon icon="mdi:chevron-left" />
      </button>

      <div class="carousel-track-container">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
        >
          <ReviewCard
            v-for="(review, index) in reviews"
            :key="index"
            :review="review"
          />
        </div>
      </div>

      <button
        class="carousel-nav next"
        :disabled="currentIndex >= maxIndex"
        @click="nextSlide"
        aria-label="Следующий отзыв"
      >
        <Icon icon="mdi:chevron-right" />
      </button>
    </div>

    <div v-if="!isLoading && !error" class="carousel-indicators">
      <button
        v-for="(_, index) in Math.ceil(reviews.length / slidesPerView)"
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Перейти к слайду ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import { NSpin, NButton, useMessage } from "naive-ui";
import { TemplateReviews } from "@/services/reviewsApi";
import ReviewCard from "./ReviewCard.vue";

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();

const message = useMessage();

interface UserReview {
  LastName: string;
  FirstName: string;
  FatherName: string;
  Gender: "Женщина" | "Мужчина";
  Star: number;
  Review?: string;
}

const reviews = ref<UserReview[]>([]);
const currentIndex = ref(0);
const isLoading = ref(true);
const error = ref<string | null>(null);
const slidesPerView = ref(3);
const autoplayInterval = ref<ReturnType<typeof setInterval> | null>(null);

const slideWidth = computed(() => 100 / slidesPerView.value);
const maxIndex = computed(() =>
  Math.max(0, Math.ceil(reviews.value.length / slidesPerView.value) - 1),
);

const updateSlidesPerView = () => {
  const width = window.innerWidth;
  if (width <= 767) slidesPerView.value = 1;
  else if (width <= 1200) slidesPerView.value = 2;
  else slidesPerView.value = 3;
};

const loadReviews = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const api = new TemplateReviews("https://api.randomdatatools.ru");
    const data = await api.getReviews(12);
    reviews.value = data;
  } catch (err) {
    console.error("Ошибка загрузки отзывов:", err);
    error.value = "Не удалось загрузить отзывы. Попробуйте обновить страницу.";
    message.error("Ошибка загрузки отзывов");
  } finally {
    isLoading.value = false;
  }
};

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = maxIndex.value;
  }
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

onMounted(() => {
  loadReviews();
  updateSlidesPerView();
  window.addEventListener("resize", updateSlidesPerView);
  startAutoplay();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSlidesPerView);
  stopAutoplay();
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/reviews.scss";
</style>
