import { createStore } from "vuex";
import { setStorage } from "~/utils/storage.ts";

const store = createStore({
    state() {
        return {
            tasks: new Array(),
        };
    },
    getters: {
        tasksList(state) {
            return state.tasks.sort((a, b) => b.status.done - a.status.done);
        },
        tasksDone(state) {
            return state.tasks.filter(task => task.status.done);
        },
    },
    mutations: {
        setTasks(state: any, tasks: any) {
            state.tasks = [...tasks];
        },
        newTask(state: any, task: any) {
            let id = parseInt(getStorage('incrementId'));
            // flag if id is not present in local storage
            if (!id) {
                const tasksArr = [...state.tasks];
                id = tasksArr.length > 0 ? parseInt(tasksArr.sort((a: any, b: any) => b.id - a.id)[0].id) + 1 : 1;
            }

            state.tasks = [...state.tasks, { ...task, id }];

            setStorage('tasks', state.tasks);
            setStorage('incrementId', id + 1);
        },
        updateTask(state: any, { id, task }) {
            state.tasks = [...state.tasks.map((t: any) => {
                if (id == t.id) {
                    return task;
                }

                return t;
            })];
            setStorage('tasks', state.tasks);
        },
        removeTask(state: any, id: any) {
            state.tasks = [...state.tasks.filter((task: any) => task.id != id)];
        },
        removeAll(state) {
            state.tasks = [];
            setStorage('tasks', state.tasks);
        },
        removeDone(state) {
            state.tasks = [...state.tasks.filter((task: any) => !task.status.done)];
            setStorage('tasks', state.tasks);
        }
    },
    actions: {
        addTask({ commit }, task) {
            commit('newTask', task);
        },
        removeTask({ commit }, index) {
            commit('removeTask', index);
        },
        updateTask({ commit }, { id, task }) {
            commit('updateTask', { id, task });
        },
        setTasks({ commit }, tasks) {
            commit('setTasks', tasks);
        },
        removeTasks({ commit }) {
            commit('removeAll');
        },
        removeDoneTasks({ commit }) {
            commit('removeDone');
        },
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
})
