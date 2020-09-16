import Vue from "vue";
import Vuex from "vuex";
import TaskModel from "@/models/TaskModel";
import DocModel from "@/models/DocModel";
import { uuid } from "vue-uuid";
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
    saveTask(state, task: TaskModel) {
      state.tasks.push(task);
    },
    editTask(state, task: TaskModel) {
      // refactor this. This function duplicated with editDoc function. create a unique one
      const list = state.tasks.reduce(
        (acc: Array<TaskModel>, curr: TaskModel) => {
          // find the existing object with the passed id
          if (curr.id === task.id) {
            // update all values expect its id
            const { id, ...content } = task;
            const updatedTask = { ...curr, ...content };
            acc.push(updatedTask);
          } else {
            acc.push(curr);
          }
          return acc;
        },
        []
      );
      state.tasks = list;
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

    saveDoc(state, doc: DocModel) {
      state.documents.push(doc);
    },

    editDoc(state, doc: DocModel) {
      const editedDoc = state.documents.reduce(
        (acc: Array<DocModel>, curr: DocModel) => {
          // find the existing object with the passed id
          if (curr.id === doc.id) {
            // update all values expect its id
            const { id, ...content } = doc;
            const updatedDoc = { ...curr, ...content };
            acc.push(updatedDoc);
          } else {
            acc.push(curr);
          }
          return acc;
        },
        []
      );
      state.documents = editedDoc;
    },
  },
  actions: {
    saveTask({ commit }, task: TaskModel) {
      commit("saveTask", task);
    },
    editTask({ commit }, task: TaskModel) {
      commit("editTask", task);
    },
    removeTask({ commit }, id: string) {
      commit("removeTask", id);
    },
    categorizeTasks({ commit }) {
      commit("categorizeTasks");
    },
    saveDoc({ commit }, doc: DocModel) {
      commit("saveDoc", doc);
    },
    editDoc({ commit }, doc: DocModel) {
      commit("editDoc", doc);
    },
  },
  modules: {},
});
