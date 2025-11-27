<template>
  <div class="download-qr" :class="{ visible: isVisible }">
    <div class="qr-card">
      <div class="qr-header">
        <Icon icon="mdi:qrcode-scan" class="qr-header-icon" />
        <h3 class="qr-title">Скачай приложение</h3>
        <p class="qr-subtitle">Наведи камеру на QR-код</p>
      </div>

      <div class="qr-code-container">
        <div class="qr-code">
          <!-- Можно использовать реальный QR или SVG-заглушку -->
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- QR-код паттерн (упрощенная версия) -->
            <rect width="200" height="200" fill="white"/>
            <g fill="#1a1a1a">
              <!-- Углы -->
              <rect x="10" y="10" width="50" height="50"/>
              <rect x="20" y="20" width="30" height="30" fill="white"/>
              <rect x="140" y="10" width="50" height="50"/>
              <rect x="150" y="20" width="30" height="30" fill="white"/>
              <rect x="10" y="140" width="50" height="50"/>
              <rect x="20" y="150" width="30" height="30" fill="white"/>
              
              <!-- Данные (случайный паттерн) -->
              <rect x="75" y="15" width="8" height="8"/>
              <rect x="85" y="15" width="8" height="8"/>
              <rect x="105" y="15" width="8" height="8"/>
              <rect x="75" y="25" width="8" height="8"/>
              <rect x="95" y="25" width="8" height="8"/>
              <rect x="115" y="25" width="8" height="8"/>
              <rect x="85" y="35" width="8" height="8"/>
              <rect x="105" y="35" width="8" height="8"/>
              <rect x="125" y="35" width="8" height="8"/>
              
              <rect x="15" y="75" width="8" height="8"/>
              <rect x="25" y="75" width="8" height="8"/>
              <rect x="45" y="75" width="8" height="8"/>
              <rect x="15" y="85" width="8" height="8"/>
              <rect x="35" y="85" width="8" height="8"/>
              <rect x="55" y="85" width="8" height="8"/>
              
              <rect x="75" y="75" width="8" height="8"/>
              <rect x="95" y="75" width="8" height="8"/>
              <rect x="115" y="75" width="8" height="8"/>
              <rect x="85" y="85" width="8" height="8"/>
              <rect x="105" y="85" width="8" height="8"/>
              <rect x="125" y="85" width="8" height="8"/>
              
              <rect x="145" y="75" width="8" height="8"/>
              <rect x="165" y="75" width="8" height="8"/>
              <rect x="185" y="75" width="8" height="8"/>
              <rect x="155" y="85" width="8" height="8"/>
              <rect x="175" y="85" width="8" height="8"/>
              
              <rect x="75" y="105" width="8" height="8"/>
              <rect x="95" y="105" width="8" height="8"/>
              <rect x="115" y="105" width="8" height="8"/>
              <rect x="135" y="105" width="8" height="8"/>
              <rect x="85" y="115" width="8" height="8"/>
              <rect x="105" y="115" width="8" height="8"/>
              <rect x="125" y="115" width="8" height="8"/>
              <rect x="145" y="115" width="8" height="8"/>
              
              <rect x="75" y="145" width="8" height="8"/>
              <rect x="95" y="145" width="8" height="8"/>
              <rect x="115" y="145" width="8" height="8"/>
              <rect x="135" y="145" width="8" height="8"/>
              <rect x="155" y="145" width="8" height="8"/>
              <rect x="85" y="155" width="8" height="8"/>
              <rect x="105" y="155" width="8" height="8"/>
              <rect x="125" y="155" width="8" height="8"/>
              <rect x="165" y="155" width="8" height="8"/>
              <rect x="75" y="165" width="8" height="8"/>
              <rect x="115" y="165" width="8" height="8"/>
              <rect x="155" y="165" width="8" height="8"/>
              <rect x="185" y="165" width="8" height="8"/>
            </g>
          </svg>
        </div>
        
        <div class="scan-animation">
          <div class="scan-line"></div>
        </div>
      </div>

      <div class="store-badges">
        <a href="#" class="store-badge app-store">
          <Icon icon="mdi:apple" />
          <div class="badge-text">
            <span class="badge-small">Загрузите в</span>
            <span class="badge-large">App Store</span>
          </div>
        </a>
        
        <a href="#" class="store-badge google-play">
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
import { Icon } from '@iconify/vue';

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();
</script>


<style lang="scss" scoped>
@import '@/assets/styles/contacts.scss';
</style>
