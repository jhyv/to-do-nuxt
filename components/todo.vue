<template>
  <div class="todo-container">
    <v-card>
      <v-card-item>
        <div class="todo-filters">
          <task-chip :label="'Tasks'" :total="tasks.length"></task-chip>
          <task-chip :label="'Tasks Done'" :total="tasksDone.length"></task-chip>
          <v-slide-x-reverse-transition>
            <v-btn color="red" size="small" append-icon="mdi-delete" @click="removeDoneTasks"
              v-if="tasksDone.length > 0">Tasks Done</v-btn>
          </v-slide-x-reverse-transition>
          <v-btn color="red" size="small" append-icon="mdi-delete" @click="removeAllTasks">Tasks</v-btn>
        </div>
        <div class="todo-list" ref="todoContainer">
          <v-slide-x-transition group tag="TodoItem">
            <template v-for="(task, i) in tasks" :key="`todo_task_item_${i}`">
              <todo-item :task="task"></todo-item>
            </template>
          </v-slide-x-transition>
        </div>
      </v-card-item>
      <v-card-actions>
        <v-form ref="form" style="width: 100%" @submit.prevent :fast-fail="false">
          <v-text-field density="comfortable" :rules="rules" placeholder="New Task"
            append-inner-icon="mdi-plus-circle-outline" ref="textInput" variant="outlined"
            @click:append-inner="submitForm" @focus="onTextFocus"></v-text-field>
        </v-form>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore();

const tasks = computed(() => store.getters.tasksList || []);
const tasksDone = computed(() => store.getters.tasksDone || []);

const rules = [
  (value: any) => {
    if (value) return true

    return 'You must enter a task.'
  },
];

const textInput: Ref<any> = ref('');
const form: Ref<any> = ref(null);
const todoContainer: Ref<any> = ref(null);

const onTextFocus = () => {
  form.value.resetValidation();
}

const addTask = async () => {
  await store.dispatch('addTask', { name: textInput.value.value, status: { done: false } });
  textInput.value.value = '';
  form.value.reset();
  todoContainer.value.scrollTop = todoContainer.value.scrollHeight;
}

const submitForm = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);
  if (valid) {
    addTask();
  }
}

const removeDoneTasks = () => {
  store.dispatch('removeDoneTasks');
}

const removeAllTasks = () => {
  store.dispatch('removeTasks');
}

onMounted(() => {
  console.log(tasks.value)
  if (tasks.value.length == 0) {
    const tasksStorage = getStorage('tasks');

    if (Array.isArray(tasksStorage) && tasksStorage.length > 0)
      store.dispatch('setTasks', tasksStorage);
    else {

      // initialize start counter of id
      const incrementId = parseInt(getStorage('incrementId'));
      if (!incrementId)
        setStorage('incrementId', 1);
    }
  }
})
</script>

<style scoped>
.todo-container {
  height: 50vh;
  width: 40vw;
}

@media (max-width: 1000px) {
  .todo-container {
    width: 60vw;
  }
}

@media (max-width: 760px) {
  .todo-container {
    width: 90vw;
  }
}

.todo-list {
  height: 280px;
  width: 100%;
  overflow-y: auto;
  padding: 0 8px;
}

.todo-list::-webkit-scrollbar {
  width: 12px;
}

.todo-list::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

.todo-list::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #363636;
}

.todo-filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
}

.todo-filters * {
  margin-left: 5px;
}
</style>

