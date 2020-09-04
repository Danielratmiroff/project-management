import Vue from "vue";
import Vuex from "vuex";
import TaskModel from "@/models/model";

Vue.use(Vuex);

export type State = { tasks: object };

export default new Vuex.Store({
  state: {
    tasks: Array<TaskModel>(),
    categories: ["On Progress", "Ideas", "Backlog"],
    categorisedTasks: Array<any>(),
    documents: Array<HTMLElement>(),
  },
  mutations: {
    addTask(state, task: TaskModel) {
      state.tasks.push(task);
    },
    removeTask(state, id: string) {
      const list = state.tasks;
      const task = list.filter((elm) => {
        return elm.id !== id;
      });
      state.tasks = task;
    },
    categorizeTasks(state) {
      const lists = state.categories.map((elm: string) => {
        return categoryList(elm);
      });

      state.categorisedTasks = lists;

      function categoryList(elm: string) {
        const list = state.tasks.reduce(
          (acc: Array<TaskModel>, curr: TaskModel) => {
            if (curr.category === elm) {
              acc.push(curr);
            }
            return acc;
          },
          []
        );
        return list;
      }
    },
    addDoc(state, doc) {
      console.log(doc);
      state.documents.push(doc);
    },
  },
  actions: {
    addTask({ commit }, task: TaskModel) {
      commit("addTask", task);
    },
    removeTask({ commit }, id: string) {
      commit("removeTask", id);
    },
    categorizeTasks({ commit }) {
      commit("categorizeTasks");
    },
    addDoc({ commit }, doc: HTMLElement) {
      commit("addDoc", doc);
    },
  },
  modules: {},
});
