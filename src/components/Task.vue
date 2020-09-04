<template>
  <div
    class="draggable"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd"
    :id="this.id"
  >
    <div @click="handleStatus" class="status">
      {{ this.status }}
    </div>
    <div class="TaskContainer" @click="openEditDialog(task)">
      <div>
        {{ this.task.name }}
      </div>
      <div class="category">
        {{ this.task.category }}
      </div>
      <div class="date">
        {{ this.task.date }}
      </div>
      <div class="date">Due {{ this.task.dueDate }}</div>
      <p @click="removeTask(task.id)">×</p>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import TaskModel from "@/models/TaskModel";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "Task",
    props: {
      id: String,
      task: Object,
    },
    data() {
      return {
        status: "",
      };
    },
    watch: {
      status: {
        immediate: true,
        handler() {
          this.status = this.task.done ? "Done" : "Undone";
        },
      },
    },
    methods: {
      removeTask(elm: string) {
        this.$store.dispatch("removeTask", elm);
      },
      handleStatus() {
        this.task.done = !this.task.done;
        this.status = this.task.done ? "Done" : "Undone";
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
    cursor: pointer;
    &:active {
      cursor: -webkit-grabbing;
      cursor: -moz-grabbing;
      cursor: -o-grabbing;
      cursor: -ms-grabbing;
      cursor: grabbing;
    }
  }
</style>
