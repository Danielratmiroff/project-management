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
            v-for="item in filterMeetings()"
            :key="item.id"
            @click.native="taskEdit(item)"
          />
          <span
            v-if="meetingsText"
            content="Add some on the calendar view 📆"
            v-tippy="{ placement: 'top', arrow: true }"
            class="text-sm text-gray-500 cursor-default"
          >
            {{ meetingsText }}
          </span>
        </div>
      </div>
      <div class="search-container">
        <div class="flex w-full items-center justify-end">
          <span @click="removeAll" class="delete transition-smooth">
            <i class="far fa-trash-alt"></i>
          </span>
          <Search class="search-bar" @searchList="searchList" />
        </div>
      </div>
    </div>
    <div class="group no-select">
      <div
        v-for="(item, idx) in categories"
        :key="item"
        :id="item"
        class="container-tasks dropZone"
      >
        <p class="category  text-dark-600">
          <ClickToEdit
            class="update-category transition-smooth"
            @input="updateCategory"
            :value="item"
          />
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
  import ClickToEdit from "@/components/helpers/ClicktoEdit.vue";
  import Search from "@/components/Search.vue";
  import moment from "moment";

  export default Vue.extend({
    name: "Dashboard",
    components: {
      Task,
      TaskCreate,
      Meeting,
      Search,
      ClickToEdit,
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
        if (confirm("Do you want to delete all your local tasks?")) {
          localStorage.removeItem("tasks");
          location.reload();
          return false;
        }
      },
      filterKinds(list: Array<TaskModel>, kind: string) {
        const kinds = list.filter((elm: TaskModel) => {
          return elm.kind == kind;
        });
        return kinds;
      },

      filterMeetings() {
        // Do not display outdated meetings
        const meetings = this.filterKinds(this.tasks, "Meeting");
        const today = new Date();
        const filterOutDated = meetings.filter((elm: TaskModel) => {
          return moment(today).isSameOrBefore(elm.dueDate, "day");
        });
        return filterOutDated;
      },

      taskCreate() {
        this.$emit("taskCreate");
      },

      taskMouseDown(e: any, id: string) {
        // need to make index typescript function global
        const ref = this.$refs[id] as Vue;
        const element = ref[0];

        const elNode: HTMLDivElement = element.$el;
        // const elId: HTMLDivElement = this.$refs.task[0].$el;
        const elNodeRelativeY = e.clientY - elNode.getBoundingClientRect().top;
        const elNodeRelativeX = e.clientX - elNode.getBoundingClientRect().left;
        const elNodeRelativeWidth = elNode.getBoundingClientRect().width;
        // Store dropzone to remove listeners onmouseup
        let dropZone: HTMLDivElement | null;

        // Create a clone to smooth transition
        const clone = elNode.cloneNode(true) as HTMLDivElement;

        // Append clone to imitate dragging elm
        const elParent = elNode.parentElement as HTMLDivElement;

        elNode.style.width = elNodeRelativeWidth.toString() + "px";

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

        // Reset to non dragging state
        const resetState = (
          node: HTMLDivElement,
          parent: HTMLDivElement,
          clone: HTMLDivElement
        ) => {
          // Remove big listeners
          document.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseout", mouseLeaveScreen);
          // Reset document to previous state
          node.onmouseup = null;
          node.classList.remove("dragActive");
          parent.removeChild(clone);
          parent.append(node);
          this.isDragging = false;
        };

        // Mouse leaving screen function
        const mouseLeaveScreen = () => {
          resetState(elNode, elParent, clone);
        };

        //Listen if mouse leaves the window
        window.addEventListener("mouseout", mouseLeaveScreen);

        // Finalise event and remove listeners
        elNode.onmouseup = () => {
          const taskInstance = { ...element.task };

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
          resetState(elNode, elParent, clone);
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

      updateCategory(value: string) {
        if (/^[a-zA-Z]+$/.test(value)) {
          alert("Please only english alphabet letters 😅");
          return;
        }
        // I am here, missing functionality to update vuex
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
      @apply flex flex-col justify-between mb-4;
    }
    .meetings-wrapper {
      @apply mb-4 py-4 px-8 rounded-md bg-blue-100 w-full;
    }
    .search-container {
      @apply flex items-end;
    }
    .meetings-container {
      @apply grid grid-cols-1 items-center row-gap-4 pr-4 mt-4;
    }
    .delete {
      @apply text-gray-700;
    }
    .category {
      @apply flex text-left text-lg font-bold;
    }
    .group {
      @apply grid my-8 grid-cols-1 row-gap-8;
      grid-template-rows: repeat(3, minmax(125px, max-content));
    }
    .container-tasks {
      @apply w-full h-full px-2 py-4 grid grid-cols-1 row-gap-12;
    }
    .add-task {
      @apply ml-2 p-1 px-2 text-sm rounded-md text-gray-500 font-normal cursor-pointer;
    }
    .add-task:hover {
      @apply bg-gray-400 text-white shadow-md;
    }
    .update-category:hover {
      @apply cursor-text;
    }
    .delete:hover {
      @apply text-red-900 cursor-pointer;
    }
    .search-bar {
      @apply text-left flex items-center ml-6 w-full;
    }
    .task:hover {
      @apply cursor-pointer;
    }
    .no-select {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .dragActive {
      @apply absolute shadow-lg;
      z-index: 999;
      cursor: grabbing !important;
      cursor: -moz-grabbing !important;
      cursor: -webkit-grabbing !important;
    }
  }
  @screen sm {
    .search-bar {
      @apply w-1/3;
    }
    .container-tasks {
      @apply px-4 py-6 border rounded-md row-gap-8;
    }
    .meetings-container {
      @apply grid-cols-3 col-gap-6;
    }
  }
  @screen lg {
    .meetings-wrapper {
      @apply mb-0;
      max-width: 70%;
    }
    .head-container {
      @apply flex-row justify-between;
    }
    .container-tasks {
      @apply px-8 py-6;
    }
    .search-container {
      @apply flex w-1/4 items-end;
    }
    .search-bar {
      @apply w-full;
    }
  }
</style>
