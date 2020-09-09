<template>
  <div class="absolute inset-0 w-full h-screen bg-dark-600">
    <div class="w-1/2 m-auto mt-12 bg-white rounded-lg">
      <div
        class="bg-blue-900 text-dark-900 h-12 flex relative items-center justify-center text-xl"
      >
        Task
        <div
          class="absolute right-0 mr-4 px-2 text-white border-white border-2"
          style="border-radius:50% 50%"
          @click="closeModal"
        >
          ×
        </div>
      </div>
      <div class="px-4 py-6">
        <input
          class="w-full p-2 text-dark-900"
          type="text"
          placeholder="Add your To Do"
          v-model="currTask.name"
        />
        <div class="mt-2 h-1 border-t-2 border-blue-900" />

        <!-- <v-select
            v-model="currTask.category"
            :items="categories"
            menu-props="auto"
            hide-details
            label="Select a category"
            single-line
            class="w-full p-2 text-dark-900"
          ></v-select> -->

        <vc-date-picker
          :popover="{ placement: 'top', visibility: 'click' }"
          v-model="selectedDate"
        />

        <button v-if="edit" color="primary" text @click="editTask()">
          I accept
        </button>
        <button v-else color="primary" text @click="addTask()">
          I accept
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import TaskModel from "@/models/TaskModel";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "TaskCreate",
    props: {
      task: TaskModel,
      edit: { type: Boolean, default: false },
    },
    data() {
      return {
        currTask: this.task ? this.task : new TaskModel(),
        selectedDate: "",
      };
    },

    computed: {
      ...mapState(["categories"]),
    },

    watch: {
      task: {
        immediate: true,
        handler() {
          this.currTask = this.task ? this.task : new TaskModel();
        },
      },
    },
    methods: {
      closeModal() {
        this.$emit("closeModal");
      },
      addTask() {
        this.$store.dispatch("addTask", this.currTask);
        this.currTask = new TaskModel();
      },
      editTask() {
        this.currTask = new TaskModel();
      },
    },
  });
</script>

<style lang="scss" scoped>
  .inputTask {
    width: 100%;
    padding: 0 3vw;
  }
</style>
