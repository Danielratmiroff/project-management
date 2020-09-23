<template>
  <div>
    <div
      v-on:keyup.enter="this.sendList(this.categorisedTasks)"
      class="searchInput transition-smooth"
      style="background-color:white;
            "
    >
      <input
        type="search"
        placeholder="Search"
        v-model="searchTask"
        class="pl-3 focus:outline-none text-sm w-full mr-3
                sm:mr-6 md:mr-8
                "
      />

      <div
        @click="this.sendList(this.categorisedTasks)"
        class="searchBtn sm:-ml-4;"
      >
        <span class="w-6 p-1">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import TaskModel from "@/models/TaskModel";

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
          const totalTasks = this.categorisedTasks;
          const filteredTasks = totalTasks.map(
            (categoriesArr: Array<[TaskModel] | null>) => {
              // we try to find task in each category
              return findTask(categoriesArr, this.searchTask);
            }
          );

          function findTask(arr: Array<any>, find: string) {
            const filtered = arr.reduce(
              (acc: Array<TaskModel | null>, curr: TaskModel) => {
                // find task on current category array
                if (curr.name.includes(find)) {
                  acc.push(curr);
                }
                return acc;
              },
              []
            );
            return filtered;
          }
          this.sendList(filteredTasks);
        },
      },

      categorisedTasks: {
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
