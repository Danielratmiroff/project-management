<template>
  <div :id="this.id">
    <div class="task-grid task-labels">
      <div>
        <p v-if="task.priority === 'High'" class="task-status bg-orange-400">
          <i class="far fa-star"></i>
          {{ task.priority }}
        </p>
      </div>
      <div>
        CATEGORY
      </div>
      <div>
        DUE DATE
      </div>
    </div>
    <div class="task-grid task-container transition-smooth">
      <div class="task-title">
        {{ task.name }}
      </div>
      <div class="task-category" :style="color">
        {{ task.category }}
      </div>
      <div :class="isDue" class="task-due-date">
        {{ dueDate }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import moment from "moment";
  import { dateFormater } from "@/components/helpers/date-formarter";
  import TaskModel from "@/models/TaskModel";

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
    computed: {
      dueDate(): string {
        return dateFormater(this.task.dueDate, "US")!;
      },
      isDue(): string {
        if (this.task.category === "Done") {
          return "text-dark-900";
        }
        const today = new Date();
        return moment(today).isSameOrAfter(this.task.dueDate, "day")
          ? "text-red-500"
          : "text-dark-900";
      },
      color(): string {
        return "background-color:" + this.task.color;
      },
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
      grid-template-columns: 1fr;
    }
    .task-container {
      @apply bg-white shadow-md rounded-md rounded-tl-none;
    }
    .task-container:hover {
      @apply shadow-lg;
    }
    .task-labels > div:not(:first-of-type) {
      @apply hidden;
    }
    .task-container > div {
      @apply justify-center flex items-center text-center p-4 break-words;
    }
    .task-title {
      @apply text-dark-900;
    }
    .task-category {
      @apply h-full text-white justify-center;
    }
    .task-status {
      @apply w-full text-sm text-white rounded-t-md text-center;
    }
    .task-dark {
      opacity: 0.5;
    }
    .task-date {
      @apply hidden !important;
    }
    .task-date-label {
      @apply hidden;
    }
    .task-due-date {
      @apply justify-center;
    }
    .task-close {
      @apply text-right mr-8 text-gray-600;
    }
    .task-close:hover {
      @apply text-gray-900;
    }
  }
  @screen sm {
    .task-labels > div {
      @apply text-center text-xs text-gray-500 font-semibold;
    }
    .task-grid {
      grid-template-columns: 2fr repeat(2, 1fr);
    }
    .task-title {
      @apply justify-self-start text-left;
    }
    .task-status {
      @apply w-1/3;
    }
    .task-labels > div:not(.task-date-label) {
      @apply block;
    }
    .task-date {
      @apply flex justify-center text-dark-900;
    }
  }
  @screen md {
    .task-grid {
      grid-template-columns: minmax(60%, 300px) repeat(2, 2fr);
    }
    .task-date {
      @apply block !important;
    }
    .task-date-label {
      @apply block !important;
    }
  }
</style>
