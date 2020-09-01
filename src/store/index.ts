import Vue from "vue";
import Vuex from "vuex";
import TaskModel from "@/models/model";

Vue.use(Vuex);

export type State = { tasks: object };

export default new Vuex.Store({
  state: {
    tasks: Array<TaskModel>(),
    categories: ["On Progress", "Ideas", "Backlog"],
  },
  mutations: {
    addTask(state, task: TaskModel) {
      console.log("add", task);
      state.tasks.push(task);
    },
    removeTask(state, id: string) {
      const list = state.tasks;
      const task = list.filter((elm) => {
        return elm.id !== id;
      });
      state.tasks = task;
    },
  },
  actions: {
    addTask({ commit }, task: TaskModel) {
      commit("addTask", task);
    },
    removeTask({ commit }, id: string) {
      commit("removeTask", id);
    },
  },
  modules: {},
});
