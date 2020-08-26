<template>
  <div class="menu">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/about">About</router-link>
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
