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
              // push to array if task's category matches current category beeing iterated on
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
    },
    editDoc(state, doc: DocModel) {
      const editedDoc = state.documents.reduce(
        (acc: Array<DocModel>, curr: DocModel) => {
          // return a new list without previous edited object
          curr.id === doc.id ? null : acc.push(curr);
          return acc;
        },
        []
      );
      state.documents = editedDoc;
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
    editDoc({ commit }, doc: DocModel) {
      commit("editDoc", doc);
    },
  },
  modules: {},
});
