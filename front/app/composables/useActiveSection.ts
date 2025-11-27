import { ref, onMounted, onUnmounted } from "vue";

export const useActiveSection = () => {
  const activeSection = ref<string>("welcome");

  let observer: IntersectionObserver | null = null;
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  const checkBottomScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Если пользователь почти в самом низу страницы (в пределах 100px)
    if (documentHeight - scrollPosition < 100) {
      const sections = document.querySelectorAll("section[id]");
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        activeSection.value = lastSection.id;
      }
    }
  };

  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      checkBottomScroll();
    }, 50);
  };

  onMounted(() => {
    const sections = document.querySelectorAll("section[id]");

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -50% 0px",
      }
    );

    sections.forEach((section) => {
      observer?.observe(section);
    });

    // Добавляем слушатель скролла для проверки нижней части страницы
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Проверяем сразу при монтировании
    checkBottomScroll();
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }

    window.removeEventListener("scroll", handleScroll);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Принудительно обновляем активную секцию
      setTimeout(() => {
        activeSection.value = sectionId;
      }, 100);
    }
  };

  return {
    activeSection,
    scrollToSection,
  };
};
