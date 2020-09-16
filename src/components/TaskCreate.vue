<template>
  <div class="backplane">
    <div class="popup-container">
      <div class="popup-title">
        Task
        <div class="popup-close" @click="closeModal">
          ×
        </div>
      </div>
      <div class="px-4 py-6">
        <p v-if="!errors.name" class="required-text">
          * Title is required
        </p>
        <input
          class="input-name"
          type="text"
          placeholder="Add your To Do"
          v-model="currTask.name"
        />
        <div class="input-error" />
        <p v-if="!errors.category" class="required-text">
          * Category is required
        </p>
        <v-select
          class="input-category"
          v-model="currTask.category"
          :options="categories"
        ></v-select>
        <v-date-picker
          v-if="enableDueDatePick"
          :popover="{ placement: 'top', visibility: 'click' }"
          v-model="currTask.dueDate"
        />
        <div class="flex justify-end">
          <button v-if="isEditMode" @click="removeTask" class="w-1/2">
            Delete
          </button>
          <button @click="storeTask" class="w-1/2">
            {{ this.createText() }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import TaskModel from "@/models/TaskModel";

  import { mapState } from "vuex";

  interface error {
    name: boolean;
    category: boolean;
  }

  export default Vue.extend({
    name: "TaskCreate",
    props: {
      task: TaskModel,
      isEditMode: Boolean,
      enableDueDatePick: Boolean,
    },
    data() {
      return {
        currTask: this.task,
        selectedDate: new Date(),
        selectedCategory: "" as string,
        errors: {
          name: true,
          category: true,
        } as error,
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
      storeTask() {
        if (this.missingRequired()) {
          return;
        } else if (this.isEditMode) {
          this.$store.dispatch("editTask", this.currTask);
        } else {
          this.$store.dispatch("saveTask", this.currTask);
        }
        this.closeModal();
      },
      missingRequired() {
        this.errors.name = !this.currTask.name ? false : true;
        this.errors.category = !this.currTask.category ? false : true;
        if (!this.errors.name || !this.errors.category) {
          return true;
        }
      },
      removeTask() {
        this.$store.dispatch("removeTask", this.currTask.id);
        this.closeModal();
      },
      createText() {
        return this.isEditMode ? "Save" : "Create";
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .required-text {
      @apply text-left text-red-900;
    }
    .backplane {
      @apply absolute inset-0 w-full h-screen bg-dark-100 flex justify-center items-center;
    }
    .popup-container {
      @apply w-1/2 m-auto  bg-white rounded-lg shadow-xl;
    }
    .popup-title {
      @apply bg-blue-900 text-dark-900 h-12 rounded-t-lg flex relative items-center justify-center text-xl;
    }
    .popup-close {
      @apply absolute right-0 mr-4 w-8 h-8 flex rounded-full justify-center items-center bg-white text-blue-900 cursor-pointer;
    }
    .popup-close:hover {
      @apply bg-gray-100;
    }
    .input-name {
      @apply w-full p-2 text-dark-900;
    }
    .input-error {
      @apply mt-2 h-1 border-t-2 border-blue-900;
    }
    .input-category {
      @apply;
    }
    .input-due-date {
      @apply w-full p-2 text-dark-900;
    }
  }
  .inputTask {
    width: 100%;
    padding: 0 3vw;
  }
</style>
