<template>
  <div class="group">
    <div class="container">
      <div class="addTodo">
        +
      </div>
      <input
        type="text"
        placeholder="Add your To Do"
        v-model="todo.name"
        @keyup.enter="addTodo(todo)"
      />
    </div>
    <div v-for="todo in todos" :key="todo.id">
      <div class="status">
        {{ todo.done }}
      </div>
      <div class="taskContainer">
        <div>
          {{ todo.name }}
        </div>
        <div class="date">
          {{ todo.date }}
        </div>
        <p @click="removeTodo(todo.id)">×</p>
      </div>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import ToDoModel from "@/models/model";

  export default Vue.extend({
    name: "Dashboard",
    components: {},
    data() {
      return {
        todo: new ToDoModel(),
      };
    },
    computed: {
      ...mapState(["todos"]),
    },
    methods: {
      addTodo(elm: string) {
        this.$store.dispatch("addTodo", elm);
        this.todo = new ToDoModel();
      },
      removeTodo(elm: string) {
        this.$store.dispatch("removeTodo", elm);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 2vw 0;
  }
  .taskContainer {
    display: grid;
    grid-template-columns: 6fr 2fr 2fr;
    background-color: white;
    padding: 1vw;
  }
  .status {
    width: 20%;
    background-color: blueviolet;
    color: white;
  }
</style>
