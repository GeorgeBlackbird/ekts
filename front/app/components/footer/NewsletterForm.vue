<template>
  <div class="newsletter-form">
    <h3 class="newsletter-title">Подпишись на новости</h3>
    <p class="newsletter-description">
      Получай эксклюзивные советы, новые программы и специальные предложения
    </p>
    
    <form v-if="!isSubscribed" @submit.prevent="handleSubmit">
      <n-input
        v-model:value="email"
        type="email"
        placeholder="Твой email"
        size="large"
        :status="emailError ? 'error' : undefined"
      >
        <template #prefix>
          <Icon icon="mdi:email-outline" />
        </template>
      </n-input>
      
      <n-button
        type="primary"
        size="large"
        block
        :loading="isLoading"
        :disabled="isLoading"
        attr-type="submit"
        class="submit-button"
      >
        <template #icon>
          <Icon icon="mdi:send" />
        </template>
        Подписаться
      </n-button>
    </form>

    <div v-else class="success-state">
      <Icon icon="mdi:check-circle" class="success-icon" />
      <p class="success-text">Спасибо за подписку!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { NInput, NButton, useMessage } from 'naive-ui';

const message = useMessage();
const email = ref('');
const emailError = ref(false);
const isLoading = ref(false);
const isSubscribed = ref(false);

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async () => {
  emailError.value = false;

  if (!email.value) {
    emailError.value = true;
    message.error('Введи email адрес');
    return;
  }

  if (!validateEmail(email.value)) {
    emailError.value = true;
    message.error('Некорректный email адрес');
    return;
  }

  isLoading.value = true;

  // Имитация отправки
  await new Promise((resolve) => setTimeout(resolve, 1500));

  isSubscribed.value = true;
  message.success('Успешно подписан!');
  isLoading.value = false;
};
</script>


<style lang="scss" scoped>
@import '@/assets/styles/footer.scss';
</style>