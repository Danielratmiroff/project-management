<template>
  <div class="fullscreen">
    <button @click="saveDoc">Save</button>
    <input
      id="title"
      class="title"
      v-model="docContent.title"
      type="text"
      placeholder="Title here"
      required
    />
    <EditorContent :docContent="docContent" @contentUpdate="contentUpdate" />
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import DocModel from "@/models/DocModel";
  import EditorContent from "@/components/TextEditor.vue";
  import { mapState } from "vuex";
  export default Vue.extend({
    name: "DocCreate",
    components: {
      EditorContent,
    },
    data() {
      return {
        docContent: new DocModel(),
        docTitle: String,
        docEditing: new DocModel(),
        editModeParams: "" as string | null,
      };
    },
    computed: {
      ...mapState(["documents"]),
    },

    created() {
      if (this.editModeActive()) {
        const doc = this.handleEditDoc(this.editModeParams);
        // Pass existing html to text editor
        this.docContent.html = doc;
      }
    },
    methods: {
      editModeActive() {
        const params = this.$route.params.docedit;
        this.editModeParams = params ? params : null;
        return params ? true : false;
      },
      handleEditDoc(paramsId: string | null) {
        // Find the doc-object by the parameters
        const doc = this.documents.reduce((acc: string, curr: DocModel) => {
          if (curr.id === paramsId) {
            // store object which will be added later to doc list
            this.docContent = { ...curr };
            // acc builds opening content string
            return acc.concat(curr.html);
          }
          return acc;
        }, "");
        return doc;
      },
      saveDoc() {
        if (!this.docContent.title) {
          alert("Please add a title to your document 😀");
          const titleElm = document.getElementById("title")!;
          titleElm.focus();
          return;
        }
        if (this.editModeActive()) {
          this.$store.dispatch("editDoc", this.docContent);
        } else {
          this.$store.dispatch("saveDoc", this.docContent);
        }
        this.$router.push("Documents");
      },
      contentUpdate(item: any) {
        //Text editor child emits the content on any update and we store it here
        const content =
          item.content.length > 50
            ? item.content.slice(0, 50) + "..."
            : item.content;
        this.docContent.content = content;
        this.docContent.html = item.html;
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
