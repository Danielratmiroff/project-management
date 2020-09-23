<template>
  <div class="home-container">
    <div class="flex w-full items-center mb-4">
      <Search class="search-bar" @searchList="searchList" />
      <span @click="removeAll" class="delete transition-smooth">
        <i class="far fa-trash-alt"></i>
      </span>
    </div>
    <Dashboard
      @taskCreate="taskHandler"
      @taskEdit="taskHandler"
      :allTasks="taskList"
    />

    <Fab @taskCreate="taskHandler" />

    <TaskCreate
      v-if="taskModal"
      :enableDueDatePick="true"
      :isEditMode="this.isEditMode"
      :task="task"
      @closeModal="taskModalHandler"
    />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Search from "@/components/Search.vue";
  import Dashboard from "@/components/Dashboard.vue";
  import TaskCreate from "@/components/TaskCreate.vue";
  import TaskModel from "@/models/TaskModel";
  import Fab from "@/components/Fab.vue";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "Home",
    components: {
      Search,
      Dashboard,
      TaskCreate,
      Fab,
    },
    data() {
      return {
        taskModal: false,
        task: new TaskModel(),
        isEditMode: false,
        taskList: [] as Array<[]>,
      };
    },
    computed: {
      ...mapState(["categorisedTasks", "categories"]),
    },

    created() {
      this.taskList = this.categorisedTasks;
      // check if open modal on window load
      this.$route.params.taskCreate
        ? setTimeout(() => {
            this.taskModalHandler();
            this.$route.params.addtask = "";
          }, 200)
        : null;
    },
    methods: {
      taskHandler(item?: TaskModel) {
        if (item) {
          // if we receive a parameter when calling this function, we are editing an existing task.
          this.task = { ...item };
          this.isEditMode = true;
        } else {
          this.task = new TaskModel();
          this.isEditMode = false;
        }
        this.taskModalHandler();
      },
      taskModalHandler() {
        this.taskModal = !this.taskModal;
      },
      searchList(list: Array<[]>) {
        this.taskList = list;
      },
      removeAll() {
        if (confirm("Do you want to delete your local tasks?")) {
          localStorage.removeItem("tasks");
        }
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .home-container {
      @apply w-full bg-gray-100 h-full;
    }
    .search-bar {
      @apply text-left flex items-center mr-6;
      min-width: 33%;
    }
    .delete:hover {
      @apply text-red-900 cursor-pointer;
    }
  }
</style>
