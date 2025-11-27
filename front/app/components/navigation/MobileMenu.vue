<template>
  <Transition name="mobile-menu">
    <div v-if="isOpen" class="mobile-menu-overlay" @click="$emit('close')">
      <div class="mobile-menu-content" @click.stop>
        <div class="mobile-menu-header">
          <div class="menu-logo">
            <Icon icon="mdi:dumbbell" />
            <span>Твой Фитнес-Тренер</span>
          </div>
          <button
            class="menu-close"
            @click="$emit('close')"
            aria-label="Закрыть меню"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        <NavigationMenu
          :active-section="activeSection"
          :is-mobile="true"
          @navigate="handleNavigate"
        />

        <div class="mobile-menu-footer">
          <n-button type="primary" block size="large" @click="handleDownload">
            <template #icon>
              <Icon icon="mdi:download" />
            </template>
            Скачать приложение
          </n-button>

          <div class="mobile-social">
            <a href="#" class="mobile-social-link" aria-label="Telegram">
              <Icon icon="mdi:telegram" />
            </a>
            <a href="#" class="mobile-social-link" aria-label="VK">
              <Icon icon="mdi:vk" />
            </a>
            <a href="#" class="mobile-social-link" aria-label="WhatsApp">
              <Icon icon="mdi:whatsapp" />
            </a>
            <a href="#" class="mobile-social-link" aria-label="Instagram">
              <Icon icon="mdi:instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NButton } from "naive-ui";
import NavigationMenu from "./NavigationMenu.vue";

interface Props {
  isOpen: boolean;
  activeSection: string;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
  navigate: [sectionId: string];
}>();

const handleNavigate = (sectionId: string) => {
  emit("navigate", sectionId);
};

const handleDownload = () => {
  emit("navigate", "contacts");
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/navigation.scss";
</style>
