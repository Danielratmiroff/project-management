<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/doc-create">
      Document 1
    </router-link>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    name: "About",
    components: {},
    data() {
      return {
        docCreate: false,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: ghostwhite;
  }
  .container {
    width: 80%;
    margin: 0 auto;
    background-color: whitesmoke;
  }
</style>
