<template>
  <div class="contact-map" :class="{ visible: isVisible }">
    <div class="map-container">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A5cfac18ce0f2ed6c548075f6be2cc5c0276e435fe58c7d8cf951fb40d7536e08&amp;source=constructor"
        width="100%"
        height="100%"
        frameborder="0"
        loading="lazy"
        title="Карта офиса"
      ></iframe>

      <div class="map-overlay">
        <div class="location-badge">
          <Icon icon="mdi:map-marker" class="badge-icon" />
          <div class="badge-content">
            <div class="badge-title">Твой зал</div>
            <div class="badge-address">Екатеринбург, ул. Ленина, д. 28</div>
          </div>
        </div>
      </div>
    </div>

    <n-button text class="direction-button" @click="openMaps">
      <template #icon>
        <Icon icon="mdi:directions" />
      </template>
      Построить маршрут
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NButton } from "naive-ui";

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();

const openMaps = () => {
  window.open("https://yandex.ru/maps/", "_blank");
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/contacts.scss";
</style>
