<template>
  <div
    class="absolute inset-0 w-full h-screen bg-dark-100 flex justify-center items-center"
  >
    <div class="w-1/2 m-auto  bg-white rounded-lg shadow-xl">
      <div
        class="bg-blue-900 text-dark-900 h-12 rounded-t-lg flex relative items-center justify-center text-xl"
      >
        Task
        <div
          class="absolute right-0 mr-4 w-8 h-8 flex justify-center items-center bg-white text-blue-900 cursor-pointer hover:bg-gray-100"
          style="border-radius:50%;"
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

        <v-select v-model="currTask.category" :options="categories"></v-select>
        <vc-date-picker
          :popover="{ placement: 'top', visibility: 'click' }"
          v-model="currTask.dueDate"
        />
        <button color="primary" @click="saveTask">
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
      isEditMode: Boolean,
    },
    data() {
      return {
        currTask: this.task,
        selectedDate: new Date(),
        selectedCategory: "" as string,
      };
    },
    computed: {
      ...mapState(["categories"]),
    },
    methods: {
      closeModal() {
        this.$emit("closeModal");
        this.$destroy();
      },
      saveTask() {
        if (this.isEditMode) {
          this.$store.dispatch("editTask", this.currTask);
        } else {
          this.$store.dispatch("saveTask", this.currTask);
        }
        this.closeModal();
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
