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
        ref="task"
        @mousedown.native="taskDragging"
        @dragstart="false"
        class="task"
      >
        <!-- @click.native="taskEdit(task)" -->
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
        currDropZone: HTMLDivElement,
        currDragElm: HTMLDivElement,
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
      taskDragging(e: any) {
        // need to make index typescript function global
        const el: HTMLDivElement = this.$refs.task[0].$el;
        const elRelativeY = e.clientY - el.getBoundingClientRect().top;
        const elRelativeX = e.clientX - el.getBoundingClientRect().left;

        // Store dropzone to remove listeners onmouseup
        let dropZone: HTMLDivElement | null;

        // Create a clone to smooth transition
        const clone = el.cloneNode(true) as HTMLDivElement;
        clone.style.opacity = "0.3";
        // Append clone to imitate dragging elm
        const elParent = el.parentElement as HTMLDivElement;
        elParent.append(clone);

        // Dragging elm floats on top of body
        el.classList.add("dragActive");
        document.body.append(el);

        // Follow click movement
        const moveTo = (pageX: number, pageY: number) => {
          el.style.left = pageX - elRelativeX + "px";
          el.style.top = pageY - elRelativeY + "px";
        };

        const onMouseMove = (e: any) => {
          // Trigger click following
          moveTo(e.pageX, e.pageY);

          el.hidden = true;
          let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
          el.hidden = false;

          if (!elemBelow) return;

          // Find closest dropzone relative to click's position
          dropZone = elemBelow.closest(".dropZone");
        };

        // Trigger first following and add listener
        moveTo(e.pageX, e.pageY);
        document.addEventListener("mousemove", onMouseMove);

        // Finalise event and remove listeners
        el.onmouseup = () => {
          if (dropZone) {
            dropZone.append(el);
          }
          document.removeEventListener("mousemove", onMouseMove);
          el.onmouseup = null;
          el.classList.remove("dragActive");
          elParent.removeChild(clone);
        };
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
