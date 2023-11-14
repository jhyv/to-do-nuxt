<template>
  <v-card variant="outlined" elevation="3" class="todo-card">
    <v-card-item>
      <div class="todo-item">
        <div class="todo-action-start">
          <v-btn variant="text" icon="mdi-check-circle-outline" density="compact">
          </v-btn>
        </div>
        <div class="todo-text">{{ task.text }}</div>
        <div class="todo-action-end">
          <v-btn variant="text" icon="mdi-delete-outline" density="compact">
          </v-btn>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.todo-card {
  margin-bottom: 5px;
}

.todo-item {
  width: 100%;
  display: flex;
  align-items: center
}

.todo-item .todo-text {
  width: calc(100% - 60px);
  padding: 0 10px;
}

.todo-item .todo-action-start,
.todo-item .todo-action-end {
  width: 40px;
  height: 100%;
}

.todo-item .todo-action-end {
  user-select: none;
  opacity: 0;
  transition: 0.3s ease-in-out;
  text-align: right;
}

.todo-item:hover {
  cursor: pointer;
}

.todo-item:hover .todo-action-end {
  user-select: unset;
  opacity: 1;
}
</style>

