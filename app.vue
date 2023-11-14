<template>
  <ClientOnly>
    <DefaultLayout>
      <Todo></Todo>
    </DefaultLayout>
  </ClientOnly>
</template>

<script setup lang="ts">
import DefaultLayout from './layouts/default.vue';
import Todo from './components/todo.vue';
</script>