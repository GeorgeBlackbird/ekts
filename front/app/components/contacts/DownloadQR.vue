<template>
  <div class="download-qr" :class="{ visible: isVisible }">
    <div class="qr-card">
      <div class="qr-header">
        <Icon icon="mdi:qrcode-scan" class="qr-header-icon" />
        <h3 class="qr-title">Скачай приложение</h3>
        <p class="qr-subtitle">Наведи камеру на QR-код</p>
      </div>

      <div class="qr-code-container">
        <div v-if="isQrLoading" class="qr-loading">
          <n-spin size="medium" />
        </div>
        
        <div v-else class="qr-code">
          <img 
            :src="qrCodeUrl" 
            :alt="qrAltText"
            @load="onQrLoad"
            @error="onQrError"
          />
        </div>
        
        <div v-if="!isQrLoading" class="scan-animation">
          <div class="scan-line"></div>
        </div>
      </div>

      <div class="store-badges">
        <a :href="appStoreLink" class="store-badge app-store" target="_blank">
          <Icon icon="mdi:apple" />
          <div class="badge-text">
            <span class="badge-small">Загрузите в</span>
            <span class="badge-large">App Store</span>
          </div>
        </a>
        
        <a :href="googlePlayLink" class="store-badge google-play" target="_blank">
          <Icon icon="mdi:google-play" />
          <div class="badge-text">
            <span class="badge-small">Доступно в</span>
            <span class="badge-large">Google Play</span>
          </div>
        </a>
      </div>

      <div class="stats-mini">
        <div class="stat-mini">
          <Icon icon="mdi:download" />
          <span>500K+ установок</span>
        </div>
        <div class="stat-mini">
          <Icon icon="mdi:star" />
          <span>4.8 рейтинг</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { NSpin } from 'naive-ui';
import { QrServerGenerator } from '~/services/qrApi';

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();

// Ссылки на приложение
const appStoreLink = 'https://apps.apple.com/app/fitness-trainer';
const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.fitnesstrainer';

const isQrLoading = ref(true);
const qrGenerator = new QrServerGenerator();

// Генерируем QR-код с ссылкой на лендинг или deep link
const qrData = computed(() => {
  // Можно использовать ссылку на лендинг или универсальную ссылку
  return 'https://ugkp.ru/';
  // Или deep link: return 'fitnesstrainer://download';
});

const qrCodeUrl = computed(() => {
  return qrGenerator.generate(qrData.value, 300);
});

const qrAltText = computed(() => {
  return `QR-код для скачивания приложения Твой Фитнес-Тренер`;
});

const onQrLoad = () => {
  isQrLoading.value = false;
};

const onQrError = () => {
  console.error('Ошибка загрузки QR-кода');
  isQrLoading.value = false;
};

onMounted(() => {
  // Предзагрузка QR-кода
  const img = new Image();
  img.src = qrCodeUrl.value;
  img.onload = () => {
    isQrLoading.value = false;
  };
  img.onerror = () => {
    isQrLoading.value = false;
  };
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/contacts.scss';
</style>
