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

    <MobileMenu
      :is-open="isMobileMenuOpen"
      :active-section="activeSection"
      @navigate="handleMobileNavigate"
      @close="closeMobileMenu"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
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
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
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
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleMobileNavigate = (sectionId: string) => {
  scrollToSection(sectionId);
  closeMobileMenu();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/navigation.scss';
</style>
