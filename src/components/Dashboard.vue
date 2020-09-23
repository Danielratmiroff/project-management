<template>
  <div class="group">
    <div
      v-for="(item, idx) in categories"
      :key="item"
      :id="item"
      class="dropZone"
    >
      <p class="category">
        {{ item }}
        <span @click="taskCreate" class="add-task transition-smooth">
          + Add new
        </span>
      </p>
      <Task
        v-for="task in allTasks[idx]"
        :key="task.id"
        :id="task.id"
        :task="task"
        :ref="task.id"
        @mousedown.left.native="taskMouseDown($event, task.id)"
        @dragstart="false"
        class="task"
      />
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
        isMouseDown: false,
        isDragging: false,
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
      taskMouseDown(e: any, id: string) {
        // need to make index typescript function global
        const element: any = this.$refs[id][0];
        const elNode: HTMLDivElement = element.$el;
        // const elId: HTMLDivElement = this.$refs.task[0].$el;
        const elNodeRelativeY = e.clientY - elNode.getBoundingClientRect().top;
        const elNodeRelativeX = e.clientX - elNode.getBoundingClientRect().left;

        // Store dropzone to remove listeners onmouseup
        let dropZone: HTMLDivElement | null;

        // Create a clone to smooth transition
        const clone = elNode.cloneNode(true) as HTMLDivElement;

        // Append clone to imitate dragging elm
        const elParent = elNode.parentElement as HTMLDivElement;

        // Move move function
        const onMouseMove = (e: any) => {
          this.isDragging = true;

          // Append clone as a placeholder node
          clone.style.opacity = "0.3";
          elParent.append(clone);

          // Dragging node floats on top of body
          elNode.classList.add("dragActive");
          document.body.append(elNode);

          // Node follows the cursor
          elNode.style.left = e.pageX - elNodeRelativeX + "px";
          elNode.style.top = e.pageY - elNodeRelativeY + "px";

          elNode.hidden = true;
          // Get elements below cursor's position
          let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
          elNode.hidden = false;

          if (!elemBelow) {
            return;
          } else {
            // Find closest dropzone relative to cursor's position
            dropZone = elemBelow.closest(".dropZone");
          }
        };
        // Listen to the cursor's movement
        document.addEventListener("mousemove", onMouseMove);

        // Finalise event and remove listeners
        elNode.onmouseup = () => {
          const taskInstance = { ...element.task };
          // Remove listeners on document
          document.removeEventListener("mousemove", onMouseMove);

          if (!this.isDragging) {
            // If its single click, open edit mode
            this.taskEdit(taskInstance);
            return;
          } else if (dropZone) {
            // If dragging & dropzone, append node and update category
            dropZone.append(elNode);
            this.updateTaskCategory(dropZone.id, taskInstance);
          } else {
            // Else return to parent
            elParent.append(elNode);
          }

          // Reset document to previous state
          elNode.onmouseup = null;
          elNode.classList.remove("dragActive");
          elParent.removeChild(clone);
          this.isDragging = false;
        };
      },

      taskEdit(task: TaskModel) {
        this.$emit("taskEdit", task);
      },

      updateTaskCategory(newCategory: string, task: TaskModel) {
        const updateTask = { ...task };
        updateTask.category = newCategory;
        this.$store.dispatch("editTask", updateTask);
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .group {
      @apply grid grid-cols-1 row-gap-8;
      grid-template-rows: repeat(3, minmax(125px, max-content));
    }
    .dropZone {
      @apply w-full h-full px-8 py-4 border rounded-md;
    }
    .category {
      @apply text-left text-lg text-dark-600 font-bold;
    }
    .task {
      @apply my-6;
    }
    .task:hover {
      @apply cursor-pointer;
    }
    .add-task {
      @apply ml-2 p-1 px-2 text-sm rounded-md text-gray-500 font-normal cursor-pointer;
    }
    .add-task:hover {
      @apply bg-gray-400 text-white shadow-md;
    }
    .dragActive {
      @apply absolute w-10/12 shadow-lg;
      z-index: 999;
      transform: rotate(3deg);
      cursor: grabbing !important;
      cursor: -moz-grabbing !important;
      cursor: -webkit-grabbing !important;
    }
    .disableTextSelection {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
</style>
