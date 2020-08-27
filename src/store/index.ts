import Vue from "vue";
import Vuex from "vuex";
import TaskModel from "@/models/model";

Vue.use(Vuex);

export type State = { Tasks: object };

export default new Vuex.Store({
  state: {
    Tasks: Array<TaskModel>(),
    categories: ["On Progress", "Ideas", "Backlog"],
  },
  mutations: {
    addTask(state, Task: TaskModel) {
      state.Tasks.push(Task);
    },
    removeTask(state, id: string) {
      const list = state.Tasks;
      const Task = list.filter((elm) => {
        return elm.id !== id;
      });
      state.Tasks = Task;
    },
  },
  actions: {
    addTask({ commit }, Task: TaskModel) {
      commit("addTask", Task);
    },
    removeTask({ commit }, id: string) {
      commit("removeTask", id);
    },
  },
  modules: {},
});
