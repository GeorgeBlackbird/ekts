<template>
  <footer ref="footerRef" class="main-footer" :class="{ visible: isVisible }">
    <div class="footer-content">
      <div class="footer-grid">
        <!-- Колонка с логотипом и описанием -->
        <div class="footer-brand">
          <div class="footer-logo">
            <Icon icon="mdi:dumbbell" class="logo-icon" />
            <span class="logo-text">
              <span class="logo-main">Твой Фитнес</span>
              <span class="logo-sub">Тренер</span>
            </span>
          </div>
          <p class="footer-description">
            Персональный фитнес-тренер в твоём кармане. Достигай целей быстрее с нашим приложением!
          </p>
          <div class="footer-social">
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
            </a>
          </div>
        </div>

        <!-- Быстрые ссылки -->
        <FooterColumn title="Навигация" :links="navigationLinks" />

        <!-- Ресурсы -->
        <FooterColumn title="Ресурсы" :links="resourceLinks" />

        <!-- Форма подписки -->
        <NewsletterForm />
      </div>

      <!-- Разделитель -->
      <div class="footer-divider"></div>

      <!-- Нижняя часть -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} Твой Фитнес-Тренер. Все права защищены.</p>
        </div>
        <div class="footer-legal">
          <a href="#" class="legal-link">Политика конфиденциальности</a>
          <span class="separator">•</span>
          <a href="#" class="legal-link">Условия использования</a>
          <span class="separator">•</span>
          <a href="#" class="legal-link">Cookie</a>
        </div>
      </div>
    </div>

    <!-- Кнопка "Наверх" -->
    <button
      v-show="showScrollTop"
      class="scroll-top-button"
      @click="scrollToTop"
      aria-label="Вернуться наверх"
    >
      <Icon icon="mdi:arrow-up" />
    </button>

    <div class="footer-decoration">
      <div class="deco-gradient"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useScrollAnimation } from '~/composables/useScrollAnimation';
import FooterColumn from './FooterColumn.vue';
import NewsletterForm from './NewsletterForm.vue';

const { isVisible, elementRef: footerRef } = useScrollAnimation(0.1);
const showScrollTop = ref(false);

const currentYear = computed(() => new Date().getFullYear());

const socials = [
  { name: 'Telegram', icon: 'mdi:telegram', link: 'https://t.me/fitnesstrainer' },
  { name: 'VK', icon: 'mdi:vk', link: 'https://vk.com/fitnesstrainer' },
  { name: 'WhatsApp', icon: 'mdi:whatsapp', link: 'https://wa.me/78005553535' },
  { name: 'Instagram', icon: 'mdi:instagram', link: 'https://instagram.com/fitnesstrainer' },
  { name: 'YouTube', icon: 'mdi:youtube', link: 'https://youtube.com/@fitnesstrainer' },
];

const navigationLinks = [
  { label: 'Главная', href: '#welcome' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Связаться', href: '#contact' },
  { label: 'Контакты', href: '#contacts' },
];

const resourceLinks = [
  { label: 'База упражнений', href: '#' },
  { label: 'Программы тренировок', href: '#' },
  { label: 'Планы питания', href: '#' },
  { label: 'Блог', href: '#' },
  { label: 'FAQ', href: '#' },
];

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/footer.scss';
</style>
