<template>
  <div class="fullscreen">
    <button @click="storeDoc">Save</button>
    <input
      id="title"
      class="title"
      v-model="docContent.title"
      type="text"
      placeholder="Title here"
      required
    />
    <EditorContent @contentUpdate="contentUpdate" />
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import DocModel from "@/models/DocModel";
  import EditorContent from "@/components/TextEditor.vue";
  export default Vue.extend({
    name: "DocCreate",
    components: {
      EditorContent,
    },
    data() {
      return {
        docContent: new DocModel(),
        docTitle: String,
      };
    },
    methods: {
      contentUpdate(item: string) {
        //Text editor child emits the content on any update and we store it here
        this.docContent.content = item;
      },
      storeDoc() {
        if (!this.docContent.title) {
          alert("Please add a title to your document 😀");
          const titleElm = document.getElementById("title");
          titleElm ? titleElm.focus() : null;
          return;
        }
        this.$store.dispatch("addDoc", this.docContent);
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
  .title {
    width: 100%;
    display: block;
    margin: 2vw auto;
    text-align: center;
  }
</style>
