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
    <EditorContent
      :isEditMode="this.editModeActive"
      :docContent="docContent"
      @contentUpdate="contentUpdate"
    />
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
      async storeDoc() {
        if (!this.docContent.title) {
          alert("Please add a title to your document 😀");
          const titleElm = document.getElementById("title");
          titleElm ? titleElm.focus() : null;
          return;
        }
        if (this.editModeActive()) {
          // we remove the current document being edited from documents list to avoid duplicates
          await this.$store.dispatch("editDoc", this.docEditing);
        }
        // add new document
        await this.$store.dispatch("addDoc", this.docContent);
        this.$router.push("Documents");
      },
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
            // store object being edited for later removal from the doc lists
            this.docEditing = { ...curr };
            // acc builds opening content string
            return acc.concat(curr.html);
          }
          return acc;
        }, "");
        return doc;
      },
      contentUpdate(item: any) {
        //Text editor child emits the content on any update and we store it here
        this.docContent.html = item.html;
        const content =
          item.content.length > 50
            ? item.content.slice(0, 50) + "..."
            : item.content;
        this.docContent.content = content;
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
