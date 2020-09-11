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
    saveTask(state, task: TaskModel) {
      state.tasks.push(task);
    },
    editTask(state, task: TaskModel) {
      const list = state.tasks.reduce(
        (acc: Array<TaskModel>, curr: TaskModel) => {
          if (curr.id === task.id) {
            // find the existing object with the passed id and update its values
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
    addDoc({ commit }, doc: DocModel) {
      commit("addDoc", doc);
    },
    editDoc({ commit }, doc: DocModel) {
      commit("editDoc", doc);
    },
  },
  modules: {},
});
