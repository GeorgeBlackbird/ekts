<template>
  <div class="contact-info" :class="{ visible: isVisible }">
    <div class="info-content">
      <h3 class="info-title">Начни прямо сейчас</h3>
      <p class="info-description">
        Заполни форму, и наша команда свяжется с тобой в течение 24 часов. Мы
        поможем подобрать идеальную программу тренировок и ответим на все
        вопросы.
      </p>

      <div class="info-items">
        <div class="info-item">
          <div class="item-icon">
            <Icon icon="mdi:email-outline" />
          </div>
          <div class="item-content">
            <div class="item-label">Email</div>
            <div class="item-value">support@fitnesstrainer.ru</div>
          </div>
        </div>

        <div class="info-item">
          <div class="item-icon">
            <Icon icon="mdi:phone-outline" />
          </div>
          <div class="item-content">
            <div class="item-label">Телефон</div>
            <div class="item-value">+7 (800) 555-35-35</div>
          </div>
        </div>

        <div class="info-item">
          <div class="item-icon">
            <Icon icon="mdi:clock-outline" />
          </div>
          <div class="item-content">
            <div class="item-label">Часы работы</div>
            <div class="item-value">Пн-Вс: 8:00 - 22:00 МСК</div>
          </div>
        </div>
      </div>

      <div class="social-links">
        <a href="#" class="social-link" aria-label="Telegram">
          <Icon icon="mdi:telegram" />
        </a>
        <a href="#" class="social-link" aria-label="VK">
          <Icon icon="mdi:vk" />
        </a>
        <a href="#" class="social-link" aria-label="WhatsApp">
          <Icon icon="mdi:whatsapp" />
        </a>
        <a href="#" class="social-link" aria-label="Instagram">
          <Icon icon="mdi:instagram" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "@/assets/styles/contact-form.scss";
</style>
