<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="editor-menubar">
        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <span class="editor-icon">
            <i class="fas fa-bold"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <span class="editor-icon">
            <i class="fas fa-italic"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <span class="editor-icon">
            <i class="fas fa-strikethrough"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <span class="editor-icon">
            <i class="fas fa-underline"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <span class="editor-icon">
            <i class="fas fa-code"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <span class="editor-icon">
            <i class="fas fa-paragraph"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <span class="editor-icon"> <i class="fas fa-heading"></i>1 </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <span class="editor-icon"> <i class="fas fa-heading"></i>2 </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <span class="editor-icon"> <i class="fas fa-heading"></i>3 </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <span class="editor-icon">
            <i class="fas fa-list-ul"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <span class="editor-icon">
            <i class="fas fa-list-ol"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <span class="editor-icon">
            <i class="fas fa-quote-right"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <span class="editor-icon">
            <i class="far fa-file-code"></i>
          </span>
        </button>

        <button
          class="menubar__button editor-button"
          @click="commands.horizontal_rule"
        >
          <span class="editor-icon">
            <i class="fas fa-arrows-alt-h"></i>
          </span>
        </button>

        <button class="menubar__button editor-button" @click="commands.undo">
          <span class="editor-icon">
            <i class="fas fa-undo-alt"></i>
          </span>
        </button>

        <button class="menubar__button editor-button" @click="commands.redo">
          <span class="editor-icon">
            <i class="fas fa-redo-alt"></i>
          </span>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content editor-content" :editor="editor" />
  </div>
</template>

<script>
  function editorResponsiveHeight() {
    // set a default height for Editor's content based on its responsive parent
    const editorHeight = document.querySelector(".dc-editor").offsetHeight;
    const content = document.querySelector(".ProseMirror");
    // Editor's container minus header
    const remainHeight = editorHeight - 80;
    content.style.height = remainHeight + "px";
    content.style.wordBreak = "break-all";
  }

  import Vue from "vue";
  import Icons from "@/components/Icons.vue";
  import { Editor, EditorContent, EditorMenuBar } from "tiptap";
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
  } from "tiptap-extensions";
  export default Vue.extend({
    props: {
      docContent: Object,
    },

    components: {
      EditorContent,
      EditorMenuBar,
      Icons,
    },

    data() {
      return {
        editor: new Editor({
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History(),
          ],
          onInit: () => {
            // send to parent the starting content for it's storage in Doc's object
          },

          onUpdate: ({ getJSON, getHTML }) => {
            // get new content on update and send to parent it's storage in Doc's object
            const editor = {
              html: getHTML(),
              content: getJSON().content[0].content[0].text
                ? getJSON().content[0].content[0].text
                : "...",
            };
            this.$emit("contentUpdate", editor);
            editorResponsiveHeight();
          },
        }),
      };
    },

    created() {
      const editableHTML = this.docContent.html;
      this.editor.setContent(editableHTML);
    },
    mounted() {
      setTimeout(() => {
        editorResponsiveHeight();
      }, 20);
    },

    beforeDestroy() {
      this.editor.destroy();
    },
  });
</script>

<style lang="scss">
  .editor-menubar {
    height: 40px;
    display: flex;
    align-items: center;
    border: 1px solid (var(--gray-light));
  }
  .editor-button {
    border-radius: 8px;
    width: 32px;
    height: 32px;
    margin: 0 0.25rem;
    &:hover {
      background-color: (var(--gray-light));
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
  .editor-icon {
    color: (var(--gray-normal));
    font-size: 0.85rem;
  }
  .is-active {
    background-color: (var(--gray-light));
    > span {
      color: (var(--main-dark)) !important;
    }
  }
  .editor {
    height: 100%;
  }
  .editor-content {
    margin-top: 1.75rem;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
