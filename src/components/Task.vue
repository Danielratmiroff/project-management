<template>
  <div :id="this.id">
    <!-- draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd" -->
    <div class="task-wrapper">
      <div class="task-grid task-labels">
        <div @click="handleStatus" class="task-status">
          {{ this.status }}
        </div>
        <div>
          CATEGORY
        </div>
        <div>
          CREATED
        </div>
        <div>
          DUE DATE
        </div>
      </div>
      <div class="task-grid task-container transition-smooth">
        <div class="task-title">
          {{ this.task.name }}
        </div>
        <div class="task-category">
          {{ this.task.category }}
        </div>
        <div class="task-date">
          {{ this.dateFormated }}
        </div>
        <div class="task-due-date">
          {{ this.dueDateFormated }}
        </div>
        <p class="task-close" @click="removeTask(task.id)">
          <i class="fas fa-times"></i>
        </p>
      </div>
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
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .task-grid {
      @apply grid items-center;
      grid-template-columns: minmax(50%, 300px) repeat(3, 1.5fr) 0.5fr;
    }
    .task-labels > div {
      @apply text-center text-xs text-gray-500 font-semibold;
    }
    .task-container {
      @apply bg-white shadow-md rounded-md rounded-tl-none;
    }
    .task-container:hover {
      @apply shadow-lg;
    }
    .task-container > div {
      @apply text-left flex items-center p-4 break-all;
    }
    .task-title {
      @apply text-left text-dark-900;
    }
    .task-category {
      @apply bg-blue-900 h-full text-white justify-center;
    }
    .task-status {
      @apply w-1/3 py-1 bg-red-900 text-sm text-white rounded-t-md text-center font-bold !important;
    }
    .task-dark {
      opacity: 0.5;
    }
    .task-date {
      @apply justify-center text-dark-900;
    }
    .task-due-date {
      @apply justify-center text-dark-900;
    }
    .task-close {
      @apply text-right mr-8 text-gray-600;
    }
    .task-close:hover {
      @apply text-gray-900;
    }
  }
</style>
