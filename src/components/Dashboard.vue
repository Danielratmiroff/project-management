<template>
  <div>
    <div class="head-container">
      <div class="meetings-wrapper">
        <p class="category text-blue-600">
          Meetings
        </p>
        <div class="meetings-container">
          <Meeting
            :meeting="item"
            v-for="item in filterKinds(tasks, 'Meeting')"
            :key="item.id"
            @click.native="goToCalendar"
          />
          <span
            v-if="meetingsText"
            content="Add some on the calendar view 📆"
            v-tippy="{ placement: 'top', arrow: true }"
            class="text-sm text-gray-500 ml-4 cursor-default"
          >
            {{ meetingsText }}
          </span>
        </div>
      </div>
      <div class="search-container">
        <div class="flex w-full items-center">
          <span @click="removeAll" class="delete transition-smooth">
            <i class="far fa-trash-alt"></i>
          </span>
          <Search class="search-bar" @searchList="searchList" />
        </div>
      </div>
    </div>
    <div class="group">
      <div
        v-for="(item, idx) in categories"
        :key="item"
        :id="item"
        class="container-tasks dropZone"
      >
        <p class="category text-dark-600">
          {{ item }}
          <span @click="taskCreate" class="add-task transition-smooth">
            + Add task
          </span>
        </p>
        <Task
          v-for="task in filterKinds(taskList[idx], 'Task')"
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
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import Task from "@/components/Task.vue";
  import Meeting from "@/components/Meeting.vue";
  import TaskCreate from "@/components/TaskCreate.vue";
  import TaskModel from "@/models/TaskModel";
  import Search from "@/components/Search.vue";

  export default Vue.extend({
    name: "Dashboard",
    components: {
      Task,
      TaskCreate,
      Meeting,
      Search,
    },
    data() {
      return {
        isMouseDown: false,
        isDragging: false,
        taskList: [] as Array<[]>,
      };
    },
    computed: {
      ...mapState(["tasks", "categories", "categorisedTasks"]),
      meetingsText(): string | null {
        const totalMeetings = this.filterKinds(this.tasks, "Meeting");
        return totalMeetings.length
          ? null
          : "You have no meetings for now... lucky you! 😋";
      },
    },
    watch: {
      tasks: {
        immediate: true,
        handler() {
          this.buildLists();
        },
      },
    },
    created() {
      this.taskList = this.categorisedTasks;
    },
    methods: {
      buildLists() {
        this.$store.dispatch("categorizeTasks");
      },
      removeAll() {
        if (confirm("Do you want to delete your local tasks?")) {
          localStorage.removeItem("tasks");
        }
      },
      filterKinds(list: Array<TaskModel>, kind: string) {
        const kinds = list.filter((elm: TaskModel) => {
          return elm.kind == kind;
        });
        return kinds;
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

      goToCalendar() {
        this.$router.push("Calendar");
      },

      searchList(list: Array<[]>) {
        this.taskList = list;
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
    .head-container {
      @apply flex justify-between;
    }
    .search-container {
      @apply flex w-1/4 items-end;
    }
    .group {
      @apply grid my-8 grid-cols-1 row-gap-8;
      grid-template-rows: repeat(3, minmax(125px, max-content));
    }
    .meetings-wrapper {
      @apply py-4 px-8 rounded-md bg-blue-100;
      max-width: 80%;
    }
    .meetings-container {
      @apply grid grid-cols-3 row-gap-4 col-gap-6 mt-4;
    }
    .container-tasks {
      @apply w-full h-full px-8 py-4 border rounded-md;
    }
    .category {
      @apply text-left text-lg font-bold;
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
    .search-bar {
      @apply text-left flex items-center ml-6 w-full;
    }
  }
</style>
