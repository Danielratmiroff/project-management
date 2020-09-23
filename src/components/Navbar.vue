<template>
  <div class="nav-menu">
    <span class="text-gray-300">
      <i v-show="currPage === 'Documents'" class="far fa-file-alt fa-lg"></i>
      <i
        v-show="currPage === 'Calendar'"
        class="far fa-calendar-check fa-lg"
      ></i>
      <i
        v-show="currPage === 'Create a document'"
        class="fas fa-file-signature fa-lg"
      ></i>
      <i v-show="currPage === 'Dashboard'" class="fas fa-list"></i>
    </span>
    <p class="nav-text">
      {{ currPage }}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Navbar",
    props: {
      currPage: String,
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .nav-menu {
      @apply px-2 flex items-center pl-8;
    }
    .menu-btn {
      @apply mt-6 p-2 w-full rounded-md
      transition duration-300 ease-in-out;
    }
    .nav-text {
      @apply text-lg font-bold ml-4 text-dark-800;
    }
  }
</style>
