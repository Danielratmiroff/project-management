<template>
  <div>
    <label>
      <input placeholder="Search" v-model="searchTask" />
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import TaskModel from "@/models/model";

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
          this.searchTask = "";
          this.sendList(this.categorisedTasks);
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

<style scoped></style>
