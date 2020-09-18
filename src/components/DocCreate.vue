<template>
  <div class="fullscreen">
    <div class="dc-container">
      <div class="dc-head">
        <!-- refacor : is this id needed? -->
        <input
          id="title"
          class="dc-title"
          v-model="docContent.title"
          type="text"
          placeholder="Title here"
          required
        />
        <button @click="saveDoc" class="btn-main">Save</button>
      </div>
      <div class="dc-editor">
        <EditorContent
          :docContent="docContent"
          @contentUpdate="contentUpdate"
        />
      </div>
    </div>
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
        this.$router.push("documents");
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
<style lang="css" scoped>
  @layer components {
    .fullscreen {
      @apply absolute inset-0 p-8 w-full h-full bg-dark-opacity;
    }
    .dc-container {
      @apply p-4 px-12 h-full items-start shadow-lg rounded-lg bg-white grid col-gap-16 relative row-gap-4;
      grid-template-rows: 55px 1fr;
    }
    .dc-head {
      @apply bg-white grid col-gap-16;
      grid-template-columns: 8fr 1fr;
      grid-template-rows: 55px 8fr;
    }
    .dc-editor {
      @apply py-2;
    }
    .dc-title {
      @apply w-full;
    }
    .dc-title::placeholder {
      @apply text-gray-500 font-bold text-2xl;
    }
    .dc-editor {
      @apply bg-white p-0 h-full relative;
    }
  }
</style>
