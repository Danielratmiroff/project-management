<template>
  <div class="backplane" @mousedown.self="closeModal" @keyup.esc="closeModal">
    <div class="popup-container" @keyup.enter="storeTask">
      <div
        class="popup-title transition-smooth"
        :class="isTask() ? 'bg-orange-200' : 'bg-blue-200'"
      >
        <div>
          {{ title }}
        </div>
        <div class="kind-field">
          <!-- Named here 'type' since it makes more sense for the user.
           but its actually 'Kind' -->
          <p v-if="!errors.kind" class="required-text">
            * A Type is required
          </p>
          <button
            @click="currTask.kind = 'Task'"
            class="kind-button transition-smooth"
            :class="isTask() ? 'kind-active-task' : ''"
          >
            Task
          </button>
          <button
            @click="currTask.kind = 'Meeting'"
            class="kind-button transition-smooth"
            :class="isTask() ? '' : 'kind-active-meeting'"
          >
            Meeting
          </button>
        </div>

        <div class="popup-close transition-smooth" @click="closeModal">
          <i class="fas fa-times fa-md"></i>
        </div>
      </div>
      <div class="p-8 pb-6">
        <div class="top-container">
          <div>
            <p v-if="!errors.name" class="required-text">
              * Title is required
            </p>
            <label><i class="fas fa-heading label-icon"></i>Title</label>
            <input
              id="title"
              class="input-name"
              type="text"
              placeholder="Add title here"
              v-model="currTask.name"
            />
          </div>
          <div>
            <label><i class="fas fa-star label-icon"></i>Priority</label>
            <div>
              <v-select
                autocomplete="chrome-off"
                class="input-category"
                v-model="currTask.priority"
                :options="['High', 'Normal']"
              />
            </div>
          </div>
        </div>
        <div v-if="isTask()" class="popup-field">
          <label><i class="fas fa-bars label-icon"></i>Category</label>

          <p v-if="!errors.category" class="required-text">
            * Category is required
          </p>
          <v-select
            autocomplete="chrome-off"
            class="input-category"
            v-model="currTask.category"
            :options="categories"
          />
        </div>

        <div class="dates-container">
          <div>
            <label
              ><i class="fas fa-calendar-plus label-icon"></i> Starts</label
            >
            <v-date-picker
              :popover="{ placement: 'top', visibility: 'click' }"
              v-model="currTask.date"
            />
          </div>
          <div>
            <label
              ><i class="fas fa-calendar-check label-icon"></i>
              {{ endDate }}</label
            >
            <v-date-picker
              :popover="{ placement: 'top', visibility: 'click' }"
              v-model="currTask.dueDate"
            />
          </div>
        </div>
        <div v-if="isTask()" class="content-container">
          <label
            ><i class="fas fa-align-left label-icon"></i> Description</label
          >
          <textarea
            v-model="currTask.content"
            :class="currTask.content ? null : 'bg-gray-200'"
            class="text-area"
            placeholder="Write a description here"
          />
        </div>
        <div
          class="flex mt-8"
          :class="isEditMode ? 'justify-between' : 'justify-end'"
        >
          <button
            v-if="isEditMode"
            @click="removeTask"
            class="btn-secondary create-btn"
          >
            Delete
          </button>
          <button @click="storeTask" class="btn-main create-btn">
            {{ createText }}
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
      task: Object,
      isEditMode: Boolean,
      enableDueDatePick: Boolean,
    },
    data() {
      return {
        currTask: this.task as TaskModel,
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
      createText(): string {
        return this.isEditMode ? "Save" : "Create";
      },
      endDate(): string {
        return this.isTask() ? "Due" : "Ends";
      },
      title(): string {
        const mode = this.isEditMode ? "Edit" : "Create";
        return `${mode} a ${this.currTask.kind}`;
      },
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
      @apply w-full mx-auto mt-6 bg-white rounded-lg shadow-xl border;
    }
    .popup-field {
      @apply mt-6;
    }
    .popup-field:first-of-type {
      @apply mt-0;
    }
    .popup-title {
      @apply text-dark-900 font-bold rounded-t-lg grid relative items-center py-4 px-4 text-lg row-gap-4;
      grid-template-columns: 1fr;
    }
    .popup-close {
      @apply absolute right-0 top-0 mt-4 mr-4 text-gray-600 cursor-pointer;
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
      @apply text-gray-500 font-bold text-sm relative;
      bottom: 0.25rem;
    }
    .label-icon {
      @apply text-sm mr-2 text-gray-500;
    }
    .dates-container {
      @apply grid grid-cols-2 col-gap-8 mt-6;
    }
    .top-container {
      @apply grid col-gap-8 row-gap-6;
      grid-template-columns: 1fr;
    }
    .content-container {
      @apply my-8;
    }
    .text-area {
      @apply w-full h-32 border text-dark-900 p-4 border-gray-400 rounded-md;
      max-height: 175px;
    }
    input:focus {
      @apply border-blue-500;
    }
    textarea:focus {
      @apply border-blue-500 bg-white;
    }
    .kind-field {
      @apply flex items-center justify-center;
    }
    .kind-button {
      @apply border border-blue-500 text-blue-600 px-4 py-1 rounded-r-md;
    }
    .priority-button {
      @apply border border-blue-500 text-blue-600 py-1 rounded-full;
    }
    .kind-button:first-of-type {
      @apply rounded-l-md rounded-r-none border-r-0;
    }
    .kind-active-task {
      @apply bg-yellow-600 text-white;
    }
    .kind-active-meeting {
      @apply bg-blue-800 text-white;
    }
    .kind-button:active {
      @apply outline-none;
    }
    .kind-button:focus {
      @apply outline-none;
    }
    .create-btn {
      @apply w-1/2 px-4;
    }
  }
  @screen md {
    .popup-container {
      @apply w-1/2 mt-16 border-none translate-y-16;
    }
    .popup-close {
      @apply right-0 mr-8 mt-6;
    }
    .create-btn {
      @apply w-1/4;
    }
  }
  @screen lg {
    .popup-title {
      @apply px-8 col-gap-4;
      grid-template-columns: 1fr 1fr 1fr;
    }
    .top-container {
      grid-template-columns: 2fr 1fr;
    }
  }
</style>
