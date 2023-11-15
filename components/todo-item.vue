<template>
  <v-card elevation="3" class="todo-card" :class="task.status.done && 'todo-done'">
    <v-card-item>
      <div class="todo-item">
        <div class="todo-action-start">
          <v-btn variant="text" icon="mdi-check-circle" density="compact" @click="setTaskToDone"
            :color="!task.status.done ? 'success' : ''">
          </v-btn>
        </div>
        <div class="todo-text">{{ task.name }}</div>
        <div class="todo-action-end">
          <v-btn variant="text" icon="mdi-delete" density="compact" @click="removeTask"
            :color="!task.status.done ? 'red' : ''">
          </v-btn>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';

const store = useStore()
const { task } = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const removeTask = () => {
  store.dispatch('removeTask', task.id)
}

const setTaskToDone = () => {
  store.dispatch('updateTask', { id: task.id, task: { ...task, status: { done: true } } })
}
</script>

<style scoped>
.todo-card {
  margin-bottom: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.todo-card.todo-done {
  opacity: 0.4;
}

.todo-card.todo-done .todo-item .todo-text {
  text-decoration: line-through;
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

.todo-card:not(.todo-done) .todo-item:hover .todo-action-end {
  user-select: unset;
  opacity: 1;
}
</style>

