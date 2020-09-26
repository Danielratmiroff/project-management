<template>
  <div>
    <div class="searchInput transition-smooth" style="background-color:white;">
      <input
        type="search"
        placeholder="Search"
        v-model="searchTask"
        class="pl-3 focus:outline-none text-sm w-full mr-3
                sm:mr-6 md:mr-8"
      />
      <span class="w-6 p-1 mr-2">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import TaskModel from "@/models/TaskModel";
  import { filter } from "vue/types/umd";

  export default Vue.extend({
    name: "Search",
    data() {
      return {
        searchTask: "",
      };
    },
    computed: {
      ...mapState(["categorisedTasks"]),
    },
    watch: {
      searchTask: {
        handler() {
          const filteredTasks = this.categorisedTasks.map(
            (categoriesArr: Array<TaskModel>) => {
              // we try to find task in each category
              return findTask(categoriesArr, this.searchTask);
            }
          );
          function findTask(arr: Array<TaskModel>, find: string) {
            return arr.filter((elm: TaskModel) => {
              return elm.name.match(find);
            });
          }
          this.sendList(filteredTasks);
        },
      },
      categorisedTasks: {
        // Watch for changes (added or deleted tasks) and update the list
        handler() {
          this.sendList(this.categorisedTasks);
          this.searchTask = "";
        },
      },
    },

    methods: {
      sendList(list: Array<[TaskModel]>) {
        this.$emit("searchList", list);
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .searchInput {
      @apply h-8 rounded-md border w-full border-gray-200 flex justify-between;
    }
    .searchInput:hover {
      @apply shadow-md;
    }
    .searchInput:active {
      @apply shadow-md;
    }
    .searchBtn {
      @apply bg-gray-200 h-full flex justify-center w-12;
    }
    .searchBtn:hover {
      @apply cursor-pointer;
    }
  }
</style>
