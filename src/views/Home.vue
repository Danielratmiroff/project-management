<template>
  <div class="home-container">
    <Dashboard @taskCreate="taskHandler" @taskEdit="taskHandler" />

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
  import Dashboard from "@/components/Dashboard.vue";
  import TaskCreate from "@/components/TaskCreate.vue";
  import TaskModel from "@/models/TaskModel";
  import Fab from "@/components/Fab.vue";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "Home",
    components: {
      Dashboard,
      TaskCreate,
      Fab,
    },
    data() {
      return {
        taskModal: false,
        task: new TaskModel(),
        isEditMode: false,
      };
    },
    computed: {
      ...mapState(["categorisedTasks", "categories"]),
    },

    created() {
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
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .home-container {
      @apply w-full bg-gray-100 h-full;
    }

    .delete:hover {
      @apply text-red-900 cursor-pointer;
    }
  }
</style>
