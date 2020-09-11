<template>
  <div class="navigation">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Navbar",
  });
</script>

<style lang="scss" scoped>
  .navigation {
    background-color: grey;
    > a {
      margin: 0 2vw;
    }
  }
</style>
