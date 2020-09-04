<template>
  <div class="fullscreen">
    <button @click="storeDoc">Save</button>
    <EditorContent @contentUpdate="contentUpdate" />
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import NavBar from "@/components/Navbar.vue";
  import EditorContent from "@/components/TextEditor.vue";
  export default Vue.extend({
    name: "DocCreate",
    components: {
      EditorContent,
    },
    data() {
      return {
        docContent: HTMLElement,
      };
    },
    methods: {
      // refactor these types pls
      contentUpdate(item: any) {
        this.docContent = item;
      },
      storeDoc() {
        this.$store.dispatch("addDoc", this.docContent);
        console.log(this.docContent);
        this.$router.push("about");
      },
    },
  });
</script>
<style lang="scss" scoped>
  .fullscreen {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: 0 auto;
    background-color: ghostwhite;
  }
</style>
