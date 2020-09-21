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
          + New Task
        </span>
      </p>
      <Task
        v-for="task in allTasks[idx]"
        :key="task.id"
        :id="task.id"
        :task="task"
        :ref="task.id"
        @mousedown.native="taskMouseDown($event, task.id)"
        @mousemove.native="taskMouseMove($event, task.id)"
        @mouseup.native="taskMouseUp"
        @dragstart="false"
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
        isMouseDown: false,
        isDragging: false,
        draggingNode: HTMLDivElement,
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
        this.draggingNode = element;
        const elNode: HTMLDivElement = element.$el;

        // const elId: HTMLDivElement = this.$refs.task[0].$el;
        const elNodeRelativeY = e.clientY - elNode.getBoundingClientRect().top;
        const elNodeRelativeX = e.clientX - elNode.getBoundingClientRect().left;

        // Store dropzone to remove listeners onmouseup
        let dropZone: HTMLDivElement | null;

        // Create a clone to smooth transition
        const clone = elNode.cloneNode(true) as HTMLDivElement;
        clone.style.opacity = "0.3";
        // Append clone to imitate dragging elm
        const elParent = elNode.parentElement as HTMLDivElement;
        elParent.append(clone);

        // Dragging elm floats on top of body
        elNode.classList.add("dragActive");
        document.body.append(elNode);

        // Follow click movement
        this.taskMoveTo(
          e.pageX,
          e.pageY,
          elNode,
          elNodeRelativeX,
          elNodeRelativeY
        );

        const onMouseMove = (e: any) => {
          // Follow the cursor
          this.taskMoveTo(
            e.pageX,
            e.pageY,
            elNode,
            elNodeRelativeX,
            elNodeRelativeY
          );

          // Dragging to active
          this.isDragging = true;

          elNode.hidden = true;
          // Get elements below absolute item being dragged
          let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
          elNode.hidden = false;

          if (!elemBelow) {
            return;
          } else {
            // Find closest dropzone relative to cursor's position
            dropZone = elemBelow.closest(".dropZone");
          }
        };

        // Trigger first following and add listener
        this.taskMoveTo(
          e.pageX,
          e.pageY,
          elNode,
          elNodeRelativeX,
          elNodeRelativeY
        );

        document.addEventListener("mousemove", onMouseMove);

        // Finalise event and remove listeners
        elNode.onmouseup = () => {
          const taskInstance = { ...element.task };
          if (this.isDragging) {
            if (dropZone) {
              dropZone.append(elNode);
              this.updateTaskCategory(dropZone.id, taskInstance);
            } else {
              elParent.append(elNode);
            }
            document.removeEventListener("mousemove", onMouseMove);
            elNode.onmouseup = null;
            elNode.classList.remove("dragActive");
            elParent.removeChild(clone);
          } else {
            this.isDragging = false;
            console.log("hey");
            this.taskEdit(taskInstance);
          }
        };
      },

      taskMouseMove() {},

      taskMouseUp() {
        // console.log("hey");
      },

      taskMoveTo(
        pageX: number,
        pageY: number,
        node: HTMLDivElement,
        nodeLocationX: number,
        nodeLocationY: number
      ) {
        node.style.left = pageX - nodeLocationX + "px";
        node.style.top = pageY - nodeLocationY + "px";
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
    }
    .dropZone {
      @apply w-full h-full px-8 py-4 border rounded-md;
    }
    .category {
      @apply text-left text-lg text-dark-600 font-bold;
    }
    .task {
      @apply my-4;
    }
    .task:hover {
      @apply cursor-pointer;
    }
    .add-task {
      @apply ml-2 p-1 px-2 text-sm rounded-md text-gray-400 font-normal cursor-pointer;
    }
    .add-task:hover {
      @apply bg-gray-400 text-white shadow-md;
    }
    .dragActive {
      @apply absolute w-10/12;
      z-index: 999;
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
