<template>
  <div class="todo-container">
    <v-card width="400">
      <v-card-item>
        <div class="todo-filters"></div>
        <div class="todo-list">
          <v-slide-y-reverse-transition group tag="TodoItem">
            <template v-for="(task, i) in tasks" :key="`todo_task_item_${i}`">
              <TodoItem :task="task"></TodoItem>
            </template>
          </v-slide-y-reverse-transition>
        </div>
      </v-card-item>
      <v-card-actions>
        <v-form ref="form" style="width: 100%" @submit.prevent>
          <v-text-field density="comfortable" :rules="rules" placeholder="New Task"
            append-inner-icon="mdi-plus-circle-outline" ref="taskInput" variant="outlined"
            @click:append-inner="submitForm" @input="onTextChange"></v-text-field>
        </v-form>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import TodoItem from './todo-item.vue';
import { ref } from 'vue';

const tasks = ref([
  { text: 'test task', isDone: false },
  { text: 'test task', isDone: false },
  { text: 'test task', isDone: false },
  { text: 'test task', isDone: false },
  { text: 'test task', isDone: false },
]);
const rules = [
  value => {
    if (value) return true

    return 'You must enter a task.'
  },
];

const taskInput = ref('');
const form = ref(null);

const onTextChange = (event) => {
  form.value.resetValidation();
  console.log(taskInput.value.value);
}
const addTask = () => {
  tasks.value = [...tasks.value, { text: taskInput.value.value, isDone: false }];
  taskInput.value.value = '';
  form.value.reset();
}

const submitForm = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);
  if (valid) {
    addTask();
  }
}

onMounted(() => {
  console.log(form.value)
})
</script>

<style scoped>
.todo-container {
  height: 50vh;
  width: 50vw;
}

.todo-list {
  height: 380px;
  width: 100%;
  overflow-y: scroll;
}
</style>

