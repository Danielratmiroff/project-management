<template>
  <div class="home">
    <div class="container">
      <Search />
      <Dashboard />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Search from "@/components/Search.vue";
  import Dashboard from "@/components/Dashboard.vue";

  export default Vue.extend({
    name: "Home",
    components: {
      Search,
      Dashboard,
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
