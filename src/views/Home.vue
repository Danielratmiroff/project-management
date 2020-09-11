<template>
  <div class="home relative">
    <div class="container ">
      <Search @searchList="searchList" />

      <Dashboard @taskEdit="taskManage" :allTasks="taskList" />

      <Fab @taskCreate="taskManage" />

      <TaskCreate
        v-if="taskModal"
        :isEditMode="this.isEditMode"
        :task="task"
        @closeModal="taskModalHandler"
      />
    </div>
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
      taskManage(item?: TaskModel) {
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

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: ghostwhite;
  }
  .container {
    width: 80%;
    margin: 0 auto;
    background-color: whitesmoke;
  }
</style>
