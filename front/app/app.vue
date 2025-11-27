<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import { TemplateReviews } from "./services/api";

onMounted(async () => {
  const temp: TemplateReviews = new TemplateReviews(
    "https://api.randomdatatools.ru"
  );
  const reviews = await temp.getReviews(10);
  console.log(reviews[0]);
});
</script>
