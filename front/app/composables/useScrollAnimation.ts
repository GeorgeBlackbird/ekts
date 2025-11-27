import { ref, onMounted, onUnmounted } from "vue";

export const useScrollAnimation = (threshold = 0.1) => {
  const isVisible = ref(false);
  const elementRef = ref<HTMLElement | null>(null);

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
          }
        });
      },
      { threshold },
    );

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
      observer.disconnect();
    }
  });

  return { isVisible, elementRef };
};
