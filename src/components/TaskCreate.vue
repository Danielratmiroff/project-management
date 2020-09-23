<template>
  <div class="backplane" @click.self="closeModal" @keyup.esc="closeModal">
    <div class="popup-container" @keyup.enter="storeTask">
      <div
        class="popup-title transition-smooth"
        :class="isTask() ? 'bg-orange-200' : 'bg-blue-200'"
      >
        <span class="popup-title-icon">
          <i class="fas fa-plus"></i>
        </span>
        Create a {{ this.currTask.kind }}
        <div class="popup-close transition-smooth" @click="closeModal">
          <i class="fas fa-times fa-md"></i>
        </div>
      </div>
      <div class="p-8 pb-6">
        <div class="popup-field">
          <p v-if="!errors.name" class="required-text">
            * Title name is required
          </p>
          <label class="">Title name</label>
          <input
            id="title"
            class="input-name"
            type="text"
            placeholder="Add title here"
            v-model="currTask.name"
          />
        </div>

        <div class="popup-field">
          <label class="">Kind</label>
          <p v-if="!errors.kind" class="required-text">
            * A kind is required
          </p>
          <v-select
            class="input-category"
            v-model="currTask.kind"
            :options="kinds"
          />
        </div>

        <div v-if="isTask()">
          <div class="popup-field">
            <label class="">Add a category</label>
            <p v-if="!errors.category" class="required-text">
              * Category is required
            </p>
            <v-select
              class="input-category"
              v-model="currTask.category"
              :options="categories"
            />
          </div>

          <div v-if="enableDueDatePick" class="popup-field">
            <label class="">Add a due date</label>
            <v-date-picker
              :popover="{ placement: 'top', visibility: 'click' }"
              v-model="currTask.dueDate"
            />
          </div>
        </div>
        <div
          class="flex mt-8"
          :class="isEditMode ? 'justify-between' : 'justify-end'"
        >
          <button
            v-if="isEditMode"
            @click="removeTask"
            class="btn-secondary w-1/4"
          >
            Delete
          </button>
          <button @click="storeTask" class="btn-main w-1/4">
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
    kind: boolean;
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
          kind: true,
        } as error,
      };
    },
    computed: {
      ...mapState(["categories", "kinds"]),
    },
    mounted() {
      const title = document.getElementById("title")!;
      title.focus();
      this.isTask();
    },
    watch: {
      "currTask.kind": {
        handler() {
          this.isTask();
        },
      },
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
        this.errors.kind = !this.currTask.kind ? false : true;
        if (!this.errors.name || !this.errors.category || !this.errors.kind) {
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
      isTask() {
        return this.currTask.kind == "Task" ? true : false;
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .required-text {
      @apply text-left text-red-900 mb-2;
    }
    .backplane {
      @apply absolute inset-0 w-full h-full bg-dark-opacity flex justify-start items-start;
    }
    .popup-container {
      @apply w-1/2 mx-auto mt-16 bg-white rounded-lg shadow-xl translate-y-16;
    }
    .popup-field {
      @apply my-6;
    }
    .popup-field:first-of-type {
      @apply mt-0;
    }
    .popup-title-icon {
      @apply text-gray-500 mr-2 text-sm;
    }
    .popup-title {
      @apply text-dark-900 font-bold rounded-t-lg flex relative items-center justify-start py-4 px-8 text-lg;
    }
    .popup-close {
      @apply absolute right-0 mr-8 text-gray-600 cursor-pointer;
    }
    .popup-close:hover {
      @apply text-gray-900;
    }
    .input-name {
      @apply w-full p-2 text-dark-900 border border-gray-400 rounded-md;
    }
    .input-due-date {
      @apply w-full  text-dark-900;
    }
    label {
      @apply text-gray-600;
    }
  }
</style>
