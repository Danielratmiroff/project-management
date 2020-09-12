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
    <div class="TaskContainer">
      <div>
        {{ this.task.name }}
      </div>
      <div class="category">
        {{ this.task.category }}
      </div>
      <div class="date">
        {{ this.task.date }}
      </div>
      <div class="date">
        {{ this.dueDateFormated }}
      </div>
      <p @click="removeTask(task.id)">×</p>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import { dateFormater } from "@/components/helpers/date-formarter";
  import TaskModel from "@/models/TaskModel";

  export default Vue.extend({
    name: "Task",
    props: {
      id: String,
      task: TaskModel,
    },
    data() {
      return {
        status: "",
        dueDateFormated: "" as string | undefined,
      };
    },
    mounted() {
      this.dueDateFormated = dateFormater(this.task.dueDate, "US");
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
