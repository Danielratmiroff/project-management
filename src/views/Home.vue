<template>
  <div class="home">
    <div class="container">
      <Search />
      <Dashboard />

      <v-btn fixed dark fab bottom right color="cyan" @click="Dialog">
        +
      </v-btn>
      <TaskCreate :open="openDialog" @closeDialog="Dialog" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Search from "@/components/Search.vue";
  import Dashboard from "@/components/Dashboard.vue";
  import TaskCreate from "@/components/TaskCreate.vue";

  export default Vue.extend({
    name: "Home",
    components: {
      Search,
      Dashboard,
      TaskCreate,
    },
    data() {
      return {
        openDialog: false,
      };
    },
    methods: {
      Dialog() {
        this.openDialog = !this.openDialog;
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
