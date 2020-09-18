<template>
  <div class="group">
    <div
      v-for="(item, idx) in categories"
      :key="item"
      :id="item"
      @drop.prevent="dragDrop"
      @dragover.prevent
      class="dropTarget"
    >
      <p class="category">
        {{ item }}
        <span @click="taskCreate" class="add-task transition-smooth">
          + New Task
        </span>
      </p>
      <Task
        v-for="task in allTasks[idx]"
        :key="task.id"
        :id="task.id"
        :task="task"
        @dragging="dragging"
        @click.native="taskEdit(task)"
        class="task"
      >
      </Task>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import Task from "@/components/Task.vue";
  import TaskCreate from "@/components/TaskCreate.vue";
  import TaskModel from "@/models/TaskModel";

  export default Vue.extend({
    name: "Dashboard",
    components: {
      Task,
      TaskCreate,
    },
    props: {
      allTasks: Array,
    },

    data() {
      return {
        draggingElm: [HTMLDivElement, null],
        draggedElm: new TaskModel(),
      };
    },
    computed: {
      ...mapState(["tasks", "categories", "categorisedTasks"]),
    },
    watch: {
      tasks: {
        immediate: true,
        handler() {
          this.buildLists();
        },
      },
    },
    methods: {
      buildLists() {
        this.$store.dispatch("categorizeTasks");
      },

      taskCreate() {
        this.$emit("taskCreate");
      },

      dragging(elm: any) {
        // refactor this pls (reduce can be improved)
        // Receive dragging element emitted from child and we store it
        this.draggingElm = elm;
        const matchTask = this.tasks.reduce(
          (acc: Array<TaskModel>, curr: TaskModel) => {
            // Iterate on Tasks list to find the TaskModel-Object that matches the dragging element id
            if (curr.id === elm.id) {
              return curr;
            } else {
              return acc;
            }
          },
          {}
        );
        this.draggedElm = matchTask;
      },

      dragDrop(event: any) {
        const elm = event.target;
        if (!elm.classList.contains("dropTarget")) {
          return;
        }
        // We replace the dragging object's category with it's drop-container's category
        // (Element id is equal its category's name)
        this.draggedElm.category = elm.id;
        elm.appendChild(this.draggingElm);
      },

      taskEdit(task: TaskModel) {
        this.$emit("taskEdit", task);
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .group {
      @apply grid grid-cols-1 row-gap-8;
    }
    .dropTarget {
      @apply w-full h-full px-8 py-4 border rounded-md;
    }
    .category {
      @apply text-left text-lg text-dark-600 font-bold;
    }
    .task {
      @apply py-4;
    }
    .add-task {
      @apply ml-2 p-1 px-2 text-sm rounded-md text-gray-400 font-normal cursor-pointer;
    }
    .add-task:hover {
      @apply bg-gray-400 text-white shadow-md;
    }
  }
</style>
