<template>
  <section class="weather-section" ref="weatherRef">
    <div class="weather-container" :class="{ visible: isVisible }">
      <div v-if="loading" class="weather-loading">
        <Icon icon="mdi:loading" class="spin-icon" />
        <p>Загрузка погоды...</p>
      </div>

      <div v-else-if="weather" class="weather-content">
        <div class="weather-icon-wrapper">
          <Icon :icon="weatherData.icon" class="weather-icon" />
        </div>

        <div class="weather-info">
          <div class="temperature">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather-description">
            {{ weather.weather[0]?.description }}
          </div>
        </div>

        <div class="weather-recommendation">
          <h3 class="recommendation-title">{{ weatherData.title }}</h3>
          <p class="recommendation-text">{{ weatherData.slogan }}</p>
        </div>
      </div>

      <div v-else class="weather-error">
        <Icon icon="mdi:weather-cloudy-alert" class="error-icon" />
        <p>Не удалось загрузить данные о погоде</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";
import { getWeather, type WeatherData } from "~/services/weatherApi";

const { isVisible, elementRef: weatherRef } = useScrollAnimation(0.15);

const weather = ref<WeatherData | null>(null);
const loading = ref(true);

const weatherData = computed(() => {
  if (!weather.value) return { icon: "", title: "", slogan: "" };

  const condition = weather.value.weather[0]?.description.toLowerCase();
  const temp = Math.round(weather.value.main.temp);

  if (condition === "clear") {
    return {
      icon: "mdi:run",
      title: "Отличная погода!",
      slogan: `На улице ${temp}°C и солнечно — самое время для пробежки на свежем воздухе!`,
    };
  }

  if (condition === "clouds") {
    return {
      icon: "mdi:bike",
      title: "Комфортная погода",
      slogan: `${temp}°C — идеально для велопрогулки или активной тренировки в парке!`,
    };
  }

  if (condition === "rain" || condition === "drizzle") {
    return {
      icon: "mdi:home-heart",
      title: "Дождливо снаружи",
      slogan:
        "Сегодня лучше заняться домашними тренировками — йога или силовые упражнения!",
    };
  }

  if (condition === "snow") {
    return {
      icon: "mdi:snowflake",
      title: "Зимняя погода",
      slogan:
        "Снежная погода — отлично подходит для зимних видов спорта или тренировки дома!",
    };
  }

  if (condition === "thunderstorm") {
    return {
      icon: "mdi:dumbbell",
      title: "Непогода",
      slogan: "Гроза на улице — займись силовыми тренировками в помещении!",
    };
  }

  if (temp < 5) {
    return {
      icon: "mdi:yoga",
      title: "Прохладно",
      slogan: `${temp}°C — лучше заняться йогой или растяжкой в тёплом помещении!`,
    };
  }

  if (temp > 30) {
    return {
      icon: "mdi:pool",
      title: "Жарко!",
      slogan: `${temp}°C — отличное время для плавания или утренней тренировки!`,
    };
  }

  return {
    icon: "mdi:walk",
    title: "Приятная погода",
    slogan: `${temp}°C — отличное время для активности на свежем воздухе!`,
  };
});

onMounted(async () => {
  weather.value = await getWeather();
  loading.value = false
});
</script>

<style lang="scss" scoped>
.weather-section {
  padding: clamp(40px, 6vh, 60px) clamp(16px, 3vw, 24px);
  position: relative;
  overflow: hidden;
}

.weather-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: clamp(20px, 3vw, 28px);
  padding: clamp(32px, 5vw, 48px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.08),
    0 0 0 1px rgba(102, 126, 234, 0.04);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: clamp(20px, 3vw, 28px);
    padding: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.6;
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    box-shadow: 0 24px 48px rgba(102, 126, 234, 0.15),
      0 0 0 1px rgba(102, 126, 234, 0.08);
  }
}

.weather-loading,
.weather-error {
  text-align: center;
  padding: clamp(40px, 6vh, 60px) 20px;
  color: #666;

  .spin-icon,
  .error-icon {
    font-size: clamp(48px, 8vw, 64px);
    color: #667eea;
    margin-bottom: 16px;
  }

  .spin-icon {
    animation: spin 1s linear infinite;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin: 0;
  }
}

.weather-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: clamp(24px, 4vw, 40px);
  align-items: center;
  position: relative;
  z-index: 1;
}

.weather-icon-wrapper {
  width: clamp(80px, 12vw, 120px);
  height: clamp(80px, 12vw, 120px);
  border-radius: clamp(20px, 3vw, 28px);
  background: linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  .weather-icon {
    font-size: clamp(48px, 8vw, 72px);
    color: #667eea;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.weather-container:hover .weather-icon-wrapper {
  transform: scale(1.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);

  .weather-icon {
    color: white;
  }
}

.weather-info {
  .temperature {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .weather-description {
    font-size: clamp(1rem, 2vw, 1.2rem);
    text-transform: capitalize;
    color: #666;
  }
}

.weather-recommendation {
  text-align: right;

  .recommendation-title {
    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }

  .recommendation-text {
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    color: #666;
    line-height: 1.6;
    margin: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// ===== АДАПТИВНОСТЬ =====

@media (max-width: 1023px) {
  .weather-content {
    gap: 32px;
  }
}

@media (max-width: 767px) {
  .weather-section {
    padding: 40px 16px;
  }

  .weather-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 24px;
  }

  .weather-recommendation {
    text-align: center;
  }
}

@media (max-width: 479px) {
  .weather-section {
    padding: 32px 12px;
  }

  .weather-container {
    padding: 28px 20px;
  }

  .weather-content {
    gap: 20px;
  }
}
</style>
