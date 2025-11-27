<template>
  <div class="contact-form-wrapper" :class="{ visible: isVisible }">
    <div v-if="!isSubmitted" class="form-container">
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        :show-label="false"
        size="large"
      >
        <n-form-item path="name">
          <n-input
            v-model:value="formValue.name"
            placeholder="Твоё имя"
            :input-props="{ autocomplete: 'name' }"
          >
            <template #prefix>
              <Icon icon="mdi:account-outline" />
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="email">
          <n-input
            v-model:value="formValue.email"
            placeholder="Email"
            :input-props="{ autocomplete: 'email' }"
          >
            <template #prefix>
              <Icon icon="mdi:email-outline" />
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="subject">
          <n-select
            v-model:value="formValue.subject"
            placeholder="Тема обращения"
            :options="subjectOptions"
          />
        </n-form-item>

        <n-form-item path="message">
          <n-input
            v-model:value="formValue.message"
            type="textarea"
            placeholder="Твоё сообщение"
            :autosize="{ minRows: 4, maxRows: 6 }"
          />
        </n-form-item>

        <n-button
          type="primary"
          block
          size="large"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleSubmit"
        >
          <template #icon>
            <Icon icon="mdi:send" />
          </template>
          Отправить сообщение
        </n-button>
      </n-form>
    </div>

    <div v-else class="success-message">
      <div class="success-icon">
        <Icon icon="mdi:check-circle" />
      </div>
      <h3 class="success-title">Спасибо за обращение!</h3>
      <p class="success-description">
        Мы получили твоё сообщение и свяжемся с тобой в ближайшее время.
      </p>
      <n-button secondary @click="resetForm">
        Отправить ещё одно сообщение
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { NForm, NFormItem, NInput, NSelect, NButton, useMessage } from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const isLoading = ref(false);
const isSubmitted = ref(false);

interface FormValue {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}

const formValue = ref<FormValue>({
  name: '',
  email: '',
  subject: null,
  message: '',
});

const subjectOptions = [
  { label: 'Вопрос о приложении', value: 'app' },
  { label: 'Технические проблемы', value: 'tech' },
  { label: 'Подбор программы', value: 'program' },
  { label: 'Сотрудничество', value: 'partnership' },
  { label: 'Другое', value: 'other' },
];

const rules: FormRules = {
  name: {
    required: true,
    message: 'Пожалуйста, введи своё имя',
    trigger: 'blur',
  },
  email: {
    required: true,
    validator: (_rule, value: string) => {
      if (!value) {
        return new Error('Пожалуйста, введи email');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return new Error('Некорректный email адрес');
      }
      return true;
    },
    trigger: ['blur', 'input'],
  },
  subject: {
    required: true,
    message: 'Выбери тему обращения',
    trigger: 'change',
  },
  message: {
    required: true,
    validator: (_rule, value: string) => {
      if (!value) {
        return new Error('Пожалуйста, введи сообщение');
      }
      if (value.length < 10) {
        return new Error('Сообщение должно содержать минимум 10 символов');
      }
      return true;
    },
    trigger: 'blur',
  },
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    isLoading.value = true;

    // Имитация отправки
    await new Promise((resolve) => setTimeout(resolve, 2000));

    isSubmitted.value = true;
    message.success('Сообщение успешно отправлено!');
  } catch (error) {
    message.error('Пожалуйста, заполни все обязательные поля');
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  isSubmitted.value = false;
  formValue.value = {
    name: '',
    email: '',
    subject: null,
    message: '',
  };
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/contact-form.scss';
</style>