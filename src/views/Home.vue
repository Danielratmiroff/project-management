<template>
  <div class="home">
    <div class="container">
      <Search @searchList="searchList" />
      <Dashboard :allTasks="taskList" />

      <!-- <v-btn fixed dark fab bottom right color="cyan" @click="Dialog">
        +
      </v-btn> -->

      <Fab @openTaskDialog="Dialog" />

      <TaskCreate task="" :open="openDialog" @closeDialog="Dialog" />
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
        openDialog: false,
        taskList: [] as Array<[]>,
      };
    },
    computed: {
      ...mapState(["categorisedTasks", "categories"]),
    },

    created() {
      this.taskList = this.categorisedTasks;
      // we check if parameters have add-task to open the dialog on window load
      this.$route.params.addtask
        ? setTimeout(() => {
            this.openDialog = !this.openDialog;
            this.$route.params.addtask = "";
          }, 200)
        : null;
    },

    methods: {
      Dialog() {
        this.openDialog = !this.openDialog;
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
