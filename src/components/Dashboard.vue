<template>
  <div class="group">
    <div
      v-for="(item, idx) in categories"
      :key="item"
      :id="item"
      @drop="dragDrop"
      @dragover="dragOver"
      class="dropTarget"
      style="padding: 5vw 0; background:lightblue;"
    >
      {{ item }}
      <Task
        v-for="task in allTasks[idx]"
        :key="task.id"
        :id="task.id"
        :task="task"
        @dragging="dragging"
        @openEdit="Dialog(task)"
      >
      </Task>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import Task from "@/components/Task.vue";
  import TaskCreate from "@/components/TaskCreate.vue";
  import TaskModel from "@/models/TaskModel";

  export default Vue.extend({
    name: "Dashboard",
    components: {
      Task,
      TaskCreate,
    },
    props: {
      allTasks: Array,
    },

    data() {
      return {
        draggingElm: [HTMLDivElement, null],
        draggedElm: new TaskModel(),
        taskEdit: new TaskModel(),
        openDialog: false,
      };
    },
    computed: {
      ...mapState(["tasks", "categories", "categorisedTasks"]),
    },
    watch: {
      tasks: {
        immediate: true,
        handler() {
          this.buildLists();
        },
      },
    },
    methods: {
      buildLists() {
        this.$store.dispatch("categorizeTasks");
      },

      dragOver(event: any) {
        event.preventDefault();
      },

      dragging(elm: any) {
        // refactor this pls (reduce can be improved)
        // Receive dragging element emitted from child and we store it
        this.draggingElm = elm;
        const matchTask = this.tasks.reduce(
          (acc: Array<TaskModel>, curr: TaskModel) => {
            // Iterate on Tasks list to find the TaskModel-Object that matches the dragging element id
            if (curr.id === elm.id) {
              return curr;
            } else {
              return acc;
            }
          },
          {}
        );
        this.draggedElm = matchTask;
      },

      dragDrop(event: any) {
        event.preventDefault();
        const elm = event.target;
        if (!elm.classList.contains("dropTarget")) {
          return;
        }
        // We replace the dragging object's category with it's drop-container's category
        // (Element id is equal its category's name)
        this.draggedElm.category = elm.id;
        elm.appendChild(this.draggingElm);
      },

      Dialog(task: TaskModel) {
        this.taskEdit = task;
        this.openDialog = !this.openDialog;
        this.buildLists();
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
