<template>
  <div id="app">
    <Menu :currPage="currPage" />
    <div class="screen-container">
      <Navbar :currPage="currPage" />
      <!-- Home -->
      <div class="view" ref="view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import Menu from "./components/Menu.vue";
  import Navbar from "./components/Navbar.vue";
  import { uuid } from "vue-uuid";
  import DocModel from "./models/DocModel";
  import TaskModel from "./models/TaskModel";
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
    beforeCreate() {
      this.$store.commit("initialiseStore");
    },
    created() {
      if (!this.tasks.length) {
        const newTask = new TaskModel(
          uuid.v4(),
          "Create your first meeting",
          this.categories[0],
          "Task",
          "You very first task is to explore the calendar view & create a meeting 😃",
          "High",
          new Date(),
          new Date(),
          "#2dc9e2"
        );
        this.$store.commit("saveTask", newTask);
      }
      if (!this.documents.length) {
        const newDoc = new DocModel(uuid.v4(), "Your very first document");
        this.$store.commit("saveDoc", newDoc);
      }
    },
    computed: {
      ...mapState(["tasks", "documents", "categories"]),
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
        const path = this.$route.path.toLowerCase();
        const pathSwitch = {
          "/": "Dashboard",
          "/documents": "Documents",
          "/calendar": "Calendar",
          "/doc-create": "Create a document",
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
  :root {
    --gray-normal: #718096;
    --gray-light: #edf2f7;
    --main-dark: #131e43;
    --meetings: #72a0f9;
    --tasks: a38cf9;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }
  body {
    position: relative;
  }

  @layer components {
    .view {
      @apply w-full h-full m-auto bg-gray-100 px-4 py-4 relative overflow-hidden;
    }
    .transition-smooth {
      @apply transition duration-300 ease-in-out;
    }
    .btn-main {
      @apply transition-smooth p-2 text-lg bg-brand text-white flex items-center justify-center rounded-md;
    }
    .btn-main:hover {
      @apply shadow-lg bg-blue-300;
    }
    .btn-secondary {
      @apply transition-smooth p-2 border border-red-300 text-lg text-red-400 flex items-center justify-center rounded-md;
    }
    .btn-secondary:hover {
      @apply shadow-lg bg-red-300 text-white border-red-300;
    }
  }
  @screen md {
    .view {
      @apply px-8 py-8;
    }
  }

  /* Kept this as standard css for maximum control */
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    display: grid;
    grid-template-columns: 55px 1fr;
    grid-template-areas: none;
    grid-auto-flow: initial;
    grid-auto-rows: initial;
    grid-auto-columns: initial;
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
  }
  .screen-container {
    display: grid;
    grid-column: 1/12;
    grid-template-rows: 55px 1fr;
  }
  @media screen and (min-width: 640px) {
    .screen-container {
      grid-column: auto;
    }
  }
</style>
