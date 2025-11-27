<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <div class="app-container">
        <WelcomeSection />
        
        <section id="advantages" class="section-placeholder">
          <!-- Блок преимуществ -->
        </section>
        
        <section id="reviews" class="section-placeholder">
          <!-- Блок отзывов -->
        </section>
        
        <section id="contact" class="section-placeholder">
          <!-- Блок обратной связи -->
        </section>
        
        <section id="contacts" class="section-placeholder">
          <!-- Блок контактов -->
        </section>
        
        <footer class="footer-placeholder">
          <!-- Футер -->
        </footer>
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import WelcomeSection from '~/layouts/WelcomeSection.vue';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#667eea',
    primaryColorHover: '#5568d3',
    primaryColorPressed: '#4c5fd6',
    borderRadius: '12px',
  },
  Button: {
    borderRadiusLarge: '12px',
    fontSizeLarge: '1.1rem',
    heightLarge: '56px',
    paddingLarge: '0 32px',
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  width: 100%;
}

.section-placeholder {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  font-size: 1.5rem;
  
  &:nth-child(odd) {
    background: #fff;
  }
}

.footer-placeholder {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #fff;
  font-size: 1.5rem;
}
</style>
