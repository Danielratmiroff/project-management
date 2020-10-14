import Vue from "vue";
import Vuex from "vuex";
import TaskModel from "@/models/TaskModel";
import DocModel from "@/models/DocModel";
Vue.use(Vuex);

export type State = { tasks: object };

export default new Vuex.Store({
  state: {
    tasks: Array<TaskModel>(),
    categories: ["On Progress", "Ideas", "Backlog", "Done"],
    kinds: ["Meeting", "Task"],
    categorisedTasks: Array<any>(),
    documents: Array<DocModel>(),
  },

  mutations: {
    initialiseStore(state) {
      //Load tasks
      if (localStorage.getItem("tasks")) {
        const localTasks = JSON.parse(localStorage.getItem("tasks")!);
        const taskInstances = localTasks.map((elm: TaskModel) => {
          return new TaskModel(
            elm.id,
            elm.name,
            elm.category,
            elm.kind,
            elm.content,
            elm.priority,
            new Date(elm.date),
            new Date(elm.dueDate),
            elm.color
          );
        });
        state.tasks = taskInstances;
      }

      //Load documents
      if (localStorage.getItem("documents")) {
        const localDocs = JSON.parse(localStorage.getItem("documents")!);
        const documentInstances = localDocs.map((elm: DocModel) => {
          return new DocModel(
            elm.id,
            elm.title,
            elm.html,
            new Date(elm.date),
            elm.content
          );
        });
        state.documents = documentInstances;
      }

      //Load categories
      if (localStorage.getItem("categories")) {
        const localCategories = JSON.parse(localStorage.getItem("categories")!);
        const categoryInstances = localCategories.map((elm: Array<string>) => {
          return elm
        });
        state.categories = categoryInstances;
      }
    },

    storeTasks(state) {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

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
      const task = list.filter((elm: TaskModel) => {
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
    
    storeDocs(state) {
      localStorage.setItem("documents", JSON.stringify(state.documents));
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

    removeDoc(state, id: string) {
      const list = state.documents;
      const docs = list.filter((elm) => {
        return elm.id !== id;
      });
      state.documents = docs;
    },

    editCategory(state, { newValue, oldValue } : { newValue : string, oldValue : string }) {
      // Find old category and replace it with new one
      const findCategory = state.categories.map((elm : string) => { 
        return elm === oldValue ? newValue : elm
      })
      state.categories = findCategory
    },

    updateTasksCategory(state, { newValue, oldValue } : { newValue : string, oldValue : string }) {
      // Find tasks with old category and update to new one
      const updateTasks = state.tasks.map((elm : TaskModel) => {
        if (elm.category === oldValue) {
          elm.category = newValue
        }  
        return elm
      })
      state.tasks = updateTasks
    },

    storeCategories(state) {
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
  },
  actions: {
    // Run store mutations to maintain local storage updated
    saveTask({ commit }, task: TaskModel) {
      commit("saveTask", task);
      commit("storeTasks");
    },
    editTask({ commit }, task: TaskModel) {
      commit("editTask", task);
      commit("storeTasks");
    },
    removeTask({ commit }, id: string) {
      commit("removeTask", id);
      commit("storeTasks");
    },
    categorizeTasks({ commit }) {
      commit("categorizeTasks");
    },
    saveDoc({ commit }, doc: DocModel) {
      commit("saveDoc", doc);
      commit("storeDocs");
    },
    editDoc({ commit }, doc: DocModel) {
      commit("editDoc", doc);
      commit("storeDocs");
    },
    removeDoc({ commit }, docId: string) {
      commit("removeDoc", docId);
      commit("storeDocs");
    },
    editCategory({ commit }, values: object) {
      commit("editCategory", values);
      commit("updateTasksCategory", values);
      commit("storeCategories");
      commit("storeTasks");
    },
  },
});
