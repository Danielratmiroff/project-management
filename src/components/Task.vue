<template>
  <div
    class="draggable"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd"
    :id="this.id"
  >
    <div class="status">
      {{ this.Task.done }}
    </div>
    <div class="TaskContainer">
      <div>
        {{ this.Task.name }}
      </div>
      <div class="date">
        {{ this.Task.date }}
      </div>
      <p @click="removeTask(Task.id)">×</p>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "Task",
    props: {
      id: Number,
      Task: Object,
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      removeTask(elm: string) {
        this.$store.dispatch("removeTask", elm);
      },
      dragStart(event: any) {
        event.target.classList.add("dark");
        this.$emit("dragging", event.target);
      },
      dragEnd(event: any) {
        event.target.classList.remove("dark");
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
  .dark {
    opacity: 0.5;
  }
  .status {
    width: 20%;
    background-color: blueviolet;
    color: white;
  }
  .draggable {
    cursor: move;
  }
</style>
