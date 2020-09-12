<template>
  <div class="menu">
    <router-link to="/">Home</router-link>
    <router-link to="/documents">Documents</router-link>
    <router-link to="/calendar">Calendar</router-link>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Menu",
  });
</script>

<style lang="scss" scoped>
  .menu {
    > a {
      display: block;
      margin: 2vw 0;
    }
  }
</style>
