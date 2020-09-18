<template>
  <div class="menu flex flex-col justify-start items-center mt-2">
    <img src="../assets/logo.svg" class="mx-auto" width="32" height="32" />
    <router-link
      :class="currPage === 'Dashboard' ? 'menu-active' : 'menu-icon'"
      class="menu-btn transition-smooth"
      to="/"
    >
      <i class="fas fa-home fa-lg"></i>
    </router-link>
    <router-link
      :class="currPage === 'Documents' ? 'menu-active' : 'menu-icon'"
      class="menu-btn transition-smooth"
      to="/documents"
    >
      <i class="far fa-file-alt  fa-lg"></i>
    </router-link>
    <router-link
      :class="currPage === 'Calendar' ? 'menu-active' : 'menu-icon'"
      class="menu-btn transition-smooth"
      to="/calendar"
    >
      <i class="far fa-calendar-check  fa-lg"></i>
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Menu",
    props: {
      currPage: String,
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .menu {
      @apply px-2 shadow-lg;
    }
    .menu-btn {
      @apply mt-6 p-2 w-full rounded-md text-center;
    }
    .menu-icon {
      @apply text-dark-900;
    }
    .menu-icon:hover {
      @apply bg-gray-200 shadow-md;
    }
    .menu-active {
      @apply bg-blue-900 text-white shadow-md;
    }
  }
</style>
