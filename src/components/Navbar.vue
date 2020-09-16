<template>
  <div class="navMenu">
    <span class="text-gray-300">
      <i v-show="currPage === 'Documents'" class="far fa-file-alt  fa-lg"></i>
      <i
        v-show="currPage === 'Calendar'"
        class="far fa-calendar-check  fa-lg"
      ></i>
      <i v-show="currPage === 'Dashboard'" class="fas fa-tasks"></i>
    </span>
    <p class="text-lg font-bold ml-4 text-dark-900">
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
    .navMenu {
      height: 55px;
      @apply px-2 flex items-center pl-8;
    }
    .menu-btn {
      @apply mt-6 p-2 w-full rounded-md
      transition duration-300 ease-in-out;
    }
  }
</style>
