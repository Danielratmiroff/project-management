<template>
  <div class="about">
    <div class="navigation">
      <h1>Documents</h1>
      <router-link to="/doc-create" class="createDocument">
        Create New
      </router-link>
    </div>
    <div class="container">
      <div v-for="doc in this.documents" :key="doc.id" class="document">
        {{ doc.title }}
        <br />
        {{ doc.content.replace(/<[^>]*>/g, "") }}
      </div>
    </div>
    <Fab />
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import Fab from "@/components/Fab.vue";
  import { mapState } from "vuex";
  export default Vue.extend({
    name: "About",
    components: {
      Fab,
    },
    data() {
      return {
        docCreate: false,
      };
    },
    computed: {
      ...mapState(["documents"]),
    },
    methods: {},
  });
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    row-gap: 2vw;
    column-gap: 2vw;
    margin: 0 auto;
    background-color: ghostwhite;
  }
  .navigation {
    display: grid;
    align-items: center;
    grid-template-columns: 8fr 2fr;
  }

  .createDocument {
    padding: 1vw;
    background-color: blue;
    color: white;
  }
  .document {
    width: 100%;
    margin: 1vw;
    background-color: whitesmoke;
  }
</style>
