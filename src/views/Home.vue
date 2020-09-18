<template>
  <div class="home-container">
    <Search class="searchBar" @searchList="searchList" />

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
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .home-container {
      @apply w-full bg-gray-100;
    }
    .searchBar {
      @apply text-left flex items-center mb-4;
    }
  }
</style>
