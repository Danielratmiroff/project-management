<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <Icons name="bold" />B
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <Icons name="italic" />I
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <Icons name="strike" />-
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <Icons name="underline" />_
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <Icons name="code" /></>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <Icons name="paragraph" />P
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <Icons name="ul" />ul
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <Icons name="ol" />ol
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <Icons name="quote" />"
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <Icons name="code" /></>
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          <Icons name="hr" />~
        </button>

        <button class="menubar__button" @click="commands.undo">
          <Icons name="undo" />«
        </button>

        <button class="menubar__button" @click="commands.redo">
          <Icons name="redo" />»
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>

import Vue from 'vue'
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

     props:{
       docContent: Object
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
              html :  getHTML(),
              content : getJSON().content[0].content[0].text ? getJSON().content[0].content[0].text : "..."
            }
            this.$emit('contentUpdate', editor);
          },
        }),
      };
    },

    created() {
      const editableHTML = this.docContent.html;
      this.editor.setContent(editableHTML)
    },

    beforeDestroy() {
      this.editor.destroy();
    },
  });
</script>
