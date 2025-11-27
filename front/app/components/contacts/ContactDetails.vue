<template>
  <div class="contact-details" :class="{ visible: isVisible }">
    <div class="details-card">
      <div 
        v-for="detail in contactDetails" 
        :key="detail.type"
        class="detail-item"
      >
        <div class="detail-icon-wrapper">
          <Icon :icon="detail.icon" class="detail-icon" />
        </div>
        
        <div class="detail-content">
          <div class="detail-label">{{ detail.label }}</div>
          <div class="detail-values">
            <a
              v-for="(value, idx) in detail.values"
              :key="idx"
              :href="value.link"
              class="detail-value"
              :class="{ clickable: value.link }"
            >
              {{ value.text }}
            </a>
          </div>
        </div>
      </div>

      <div class="social-section">
        <div class="social-label">Мы в соцсетях</div>
        <div class="social-links">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.link"
            :aria-label="social.name"
            class="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon :icon="social.icon" />
            <span class="social-name">{{ social.name }}</span>
          </a>
        </div>
      </div>

      <div class="working-hours">
        <Icon icon="mdi:clock-outline" class="hours-icon" />
        <div class="hours-content">
          <div class="hours-title">Режим работы</div>
          <div class="hours-text">Понедельник - Воскресенье</div>
          <div class="hours-time">8:00 - 22:00 МСК</div>
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

const contactDetails = [
  {
    type: 'address',
    icon: 'mdi:map-marker',
    label: 'Адрес',
    values: [
      {
        text: 'г. Москва, ул. Примерная, д. 42, офис 301',
        link: 'https://yandex.ru/maps/',
      },
    ],
  },
  {
    type: 'phone',
    icon: 'mdi:phone',
    label: 'Телефоны',
    values: [
      { text: '+7 (800) 555-35-35', link: 'tel:+78005553535' },
      { text: '+7 (495) 123-45-67', link: 'tel:+74951234567' },
    ],
  },
  {
    type: 'email',
    icon: 'mdi:email',
    label: 'Email',
    values: [
      { text: 'support@fitnesstrainer.ru', link: 'mailto:support@fitnesstrainer.ru' },
      { text: 'info@fitnesstrainer.ru', link: 'mailto:info@fitnesstrainer.ru' },
    ],
  },
];

const socials = [
  { name: 'Telegram', icon: 'mdi:telegram', link: 'https://t.me/fitnesstrainer' },
  { name: 'VK', icon: 'mdi:vk', link: 'https://vk.com/fitnesstrainer' },
  { name: 'WhatsApp', icon: 'mdi:whatsapp', link: 'https://wa.me/78005553535' },
  { name: 'Instagram', icon: 'mdi:instagram', link: 'https://instagram.com/fitnesstrainer' },
];
</script>


<style lang="scss" scoped>
@import '@/assets/styles/contacts.scss';
</style>
