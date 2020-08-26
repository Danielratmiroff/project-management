import Vue from "vue";
import Vuex from "vuex";
import ToDoModel from "@/models/model";

Vue.use(Vuex);

export type State = { todos: object };

export default new Vuex.Store({
  state: {
    todos: Array<ToDoModel>(),
  },
  mutations: {
    addTodo(state, todo: ToDoModel) {
      state.todos.push(todo);
    },
    removeTodo(state, id: string) {
      const list = state.todos;
      const todo = list.filter((elm) => {
        return elm.id !== id;
      });
      state.todos = todo;
    },
  },
  actions: {
    addTodo({ commit }, todo: ToDoModel) {
      commit("addTodo", todo);
    },
    removeTodo({ commit }, id: string) {
      commit("removeTodo", id);
    },
  },
  modules: {},
});
