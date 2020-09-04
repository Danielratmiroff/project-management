import Vue from "vue";
import Vuex from "vuex";
import TaskModel from "@/models/TaskModel";
import DocModel from "@/models/DocModel";

Vue.use(Vuex);

export type State = { tasks: object };

export default new Vuex.Store({
  state: {
    tasks: Array<TaskModel>(),
    categories: ["On Progress", "Ideas", "Backlog"],
    categorisedTasks: Array<any>(),
    documents: Array<DocModel>(),
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
        // run for every category on the list
        return categoryList(elm);
      });

      state.categorisedTasks = lists;

      function categoryList(elm: string) {
        const list = state.tasks.reduce(
          (acc: Array<TaskModel>, curr: TaskModel) => {
            if (curr.category === elm) {
              // if category in task matches current category beeing iterated on
              // push to array
              acc.push(curr);
            }
            return acc;
          },
          []
        );
        return list;
      }
    },
    addDoc(state, doc: DocModel) {
      state.documents.push(doc);
      console.log(state.documents);
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
    addDoc({ commit }, doc: DocModel) {
      commit("addDoc", doc);
    },
  },
  modules: {},
});
