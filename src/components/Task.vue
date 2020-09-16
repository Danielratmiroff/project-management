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
    <div class="taskContainer">
      <div class="title">
        {{ this.task.name }}
      </div>
      <div class="category">
        {{ this.task.category }}
      </div>
      <div class="date">
        {{ this.dateFormated }}
      </div>
      <div class="due-date">
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
        dateFormated: "" as string,
        dueDateFormated: "" as string,
      };
    },
    mounted() {
      this.dateFormated = dateFormater(this.task.date, "US")!;
      this.dueDateFormated = dateFormater(this.task.dueDate, "US")!;
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

<style lang="css" scoped>
  @layer components {
    .draggable {
      @apply cursor-pointer;
    }
    .title {
      @apply text-left pl-4 self-start;
    }
    .category {
      @apply bg-blue-900 h-full text-white justify-center;
    }
    .status {
      @apply w-1/6 bg-red-900 text-white rounded-t-md justify-center;
    }
    .dark {
      opacity: 0.5;
    }
    .taskContainer {
      @apply grid bg-white shadow-md rounded-md rounded-tl-none h-16 items-center;
      grid-template-columns: 4fr 2fr 2fr 2fr 2fr;
    }
    .date {
      @apply justify-center;
    }
    .due-date {
      @apply justify-center;
    }
  }
  .taskContainer > div {
    text-align: left;
    display: flex;
    align-items: center;
    padding: 1.2rem;
  }
</style>
