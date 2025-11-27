<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { NButton, useMessage } from 'naive-ui';
import { useActiveSection } from '~/composables/useActiveSection';
import NavigationMenu from './NavigationMenu.vue';
import MobileMenu from './MobileMenu.vue';

const message = useMessage();
const { activeSection, scrollToSection } = useActiveSection();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  // Убеждаемся что скролл разблокирован
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
});

// Следим за состоянием меню и блокируем/разблокируем скролл
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    // Блокируем скролл простым способом
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  } else {
    // Разблокируем скролл
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleNavigate = (sectionId: string) => {
  scrollToSection(sectionId);
};

const handleDownload = () => {
  message.success('Скачивание начнётся автоматически...');
  scrollToSection('contacts');
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleMobileNavigate = (sectionId: string) => {
  // Закрываем меню
  isMobileMenuOpen.value = false;
  
  // Небольшая задержка для закрытия анимации меню
  setTimeout(() => {
    scrollToSection(sectionId);
  }, 300); // Увеличил до 300ms для завершения анимации
};
</script>

<template>
  <header class="main-header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <div class="header-logo" @click="scrollToTop">
        <Icon icon="mdi:dumbbell" class="logo-icon" />
        <span class="logo-text">
          <span class="logo-main">Твой Фитнес</span>
          <span class="logo-sub">Тренер</span>
        </span>
      </div>

      <NavigationMenu
        :active-section="activeSection"
        :is-mobile="false"
        @navigate="handleNavigate"
      />

      <div class="header-actions">
        <n-button
          type="primary"
          size="medium"
          class="download-button"
          @click="handleDownload"
        >
          <template #icon>
            <Icon icon="mdi:download" />
          </template>
          Скачать
        </n-button>

        <button
          class="mobile-menu-toggle"
          :class="{ active: isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Меню"
        >
          <span class="toggle-line"></span>
          <span class="toggle-line"></span>
          <span class="toggle-line"></span>
        </button>
      </div>
    </div>
  </header>

  <MobileMenu
    :is-open="isMobileMenuOpen"
    :active-section="activeSection"
    @navigate="handleMobileNavigate"
    @close="closeMobileMenu"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/navigation.scss';
</style>
