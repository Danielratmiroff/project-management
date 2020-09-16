<template>
  <div id="app">
    <div class="layout">
      <Menu :currPage="currPage" />
      <div class="screenContainer">
        <Navbar :currPage="currPage" />
        <!-- Home -->
        <router-view />
      </div>
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
    data() {
      return {
        currPage: "" as string | void,
      };
    },
    watch: {
      "$route.path": {
        immediate: true,
        handler() {
          this.currPage = this.getPage();
        },
      },
    },
    methods: {
      getPage(): string | void {
        const path = this.$route.path;
        const pathSwitch = {
          "/": "Dashboard",
          "/documents": "Documents",
          "/calendar": "Calendar",
        };

        if (hasKey(pathSwitch, path)) {
          return pathSwitch[path];
        } // else can be added here in case its found an unexpected URL

        // typescript's way to make sure the object key is valid
        function hasKey<O>(obj: O, key: keyof any): key is keyof O {
          return key in obj;
        }
      },
    },
  });
</script>

<style lang="css">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @layer components {
    * {
      @apply transition duration-300 ease-in-out;
    }
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
    grid-template-columns: auto 1fr 0px;
    grid-template-areas: none;
    grid-auto-flow: initial;
    grid-auto-rows: initial;
    grid-auto-columns: initial;
    height: 100%;
  }
  .screenContainer {
    width: 100%;
    height: 100%;
  }
</style>
