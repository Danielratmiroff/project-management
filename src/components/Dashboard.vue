<template>
  <div class="group">
    <div
      v-for="item in categories"
      :key="item"
      @drop="dragDrop"
      @dragover="dragOver"
      class="dropTarget"
      style="padding: 5vw 0; background:lightblue;"
    >
      {{ item }}
    </div>
    <Task
      v-if="inCategory(item)"
      v-for="(Task, idx) in Tasks"
      :key="Task.id"
      :id="idx"
      :Task="Task"
      @dragging="dragging"
    />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import Task from "@/components/Task.vue";

  export default Vue.extend({
    name: "Dashboard",
    components: {
      Task,
    },
    data() {
      return {
        draggingElm: "",
      };
    },
    computed: {
      ...mapState(["Tasks", "categories"]),
    },
    methods: {
      dragOver(event: any) {
        event.preventDefault();
      },

      dragging(elm: any) {
        this.draggingElm = elm;
      },

      dragDrop(event: any) {
        event.preventDefault();
        const elm = event.target;
        if (elm.classList.contains("dropTarget")) {
          elm.appendChild(this.draggingElm);
        }
      },

      inCategory(item: any) {
        console.log(item);
        return true;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 2vw 0;
  }
  .TaskContainer {
    display: grid;
    grid-template-columns: 6fr 2fr 2fr;
    background-color: white;
    padding: 1vw;
  }
  .status {
    width: 20%;
    background-color: blueviolet;
    color: white;
  }
</style>
