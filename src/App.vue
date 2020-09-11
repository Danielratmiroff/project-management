<template>
  <div id="app">
    <div class="layout">
      <Menu />
      <div class="screenContainer">
        <Navbar />
        <router-view />
      </div>
      <!-- Home -->
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Menu from "./components/Menu.vue";
  import Navbar from "./components/Navbar.vue";
  export default Vue.extend({
    name: "App",
    components: {
      Menu,
      Navbar,
    },
  });
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    text-align: center;
    color: #2c3e50;
  }
  .layout {
    display: grid;
    grid-template-columns: 1fr 9fr;
    height: 100vh;
  }
  .screenContainer {
    width: 100%;
    height: 100%;
  }
</style>
