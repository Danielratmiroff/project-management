<template>
  <div
    class="draggable"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd"
    :id="this.id"
  >
    <div class="status">
      {{ this.Task.done }}
    </div>
    <div class="TaskContainer" @click="openEditDialog(Task)">
      <div>
        {{ this.Task.name }}
      </div>
      <div class="category">
        {{ this.Task.category }}
      </div>
      <div class="date">
        {{ this.Task.date }}
      </div>
      <div class="date">Due {{ this.Task.dueDate }}</div>
      <p @click="removeTask(Task.id)">×</p>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import TaskModel from "@/models/model";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "Task",
    props: {
      id: String,
      Task: Object,
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      removeTask(elm: string) {
        this.$store.dispatch("removeTask", elm);
      },
      dragStart(event: any) {
        event.target.classList.add("dark");
        this.$emit("dragging", event.target);
      },
      dragEnd(event: any) {
        event.target.classList.remove("dark");
      },
      openEditDialog(task: TaskModel) {
        this.$emit("openEdit", task);
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
  .TaskContainer {
    display: grid;
    grid-template-columns: 4fr 2fr 2fr 2fr 2fr;
    background-color: white;
    padding: 1vw;
  }
  .dark {
    opacity: 0.5;
  }
  .status {
    width: 20%;
    background-color: blueviolet;
    color: white;
  }
  .draggable {
    cursor: move;
  }
</style>
