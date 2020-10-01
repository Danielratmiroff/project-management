<template>
  <div class="menu-bar">
    <img src="../assets/logo.svg" class="mx-auto" width="32" height="32" />
    <router-link
      content="Tasks"
      v-tippy="{ placement: 'right', arrow: true }"
      :class="currPage === 'Dashboard' ? 'menu-active' : 'menu-icon'"
      class="menu-btn transition-smooth"
      to="/"
    >
      <i class="fas fa-list fa-lg"></i>
    </router-link>
    <router-link
      content="Documents"
      v-tippy="{ placement: 'right', arrow: true }"
      :class="currPage === 'Documents' ? 'menu-active' : 'menu-icon'"
      class="menu-btn transition-smooth"
      to="/documents"
    >
      <i class="far fa-file-alt  fa-lg"></i>
    </router-link>
    <router-link
      content="Calendar"
      v-tippy="{ placement: 'right', arrow: true }"
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
    .menu-bar {
      @apply px-2 shadow-lg grid py-2;
      grid-template-columns: 55px repeat(3, 1fr);
      grid-column: 1/12;
    }
    .menu-btn {
      @apply p-2 w-1/2 place-self-center rounded-md text-center;
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
  @screen sm {
    .menu-bar {
      @apply flex flex-col pb-0 justify-start;
      grid-column: 1;
    }
    .menu-btn {
      @apply mt-6 w-full;
    }
  }
</style>
