<template>
  <div>
    <label>
      <input placeholder="Search" v-model="searchTask" />
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
import { mapState } from 'vuex';
import TaskModel from "@/models/model"

  export default Vue.extend({
    name: "Search",
    data() {
      return {
        searchTask : ""
      }
    },
    computed: {
      ...mapState(['categorisedTasks'])
    },

    watch: {
      searchTask: {
        // refactor this pls (include correct types)
        handler() {
          const totalTasks = this.categorisedTasks
          const filteredTasks = totalTasks.map(categoriesArr => {
              return findTask(categoriesArr, this.searchTask)
          })

          console.log('filteredTasks', filteredTasks)
        function findTask(arr : any, find : any) {
           const filtered = arr.reduce((acc: any, curr: any) => {
            if (curr.name === find) {
              acc.push(curr) 
               } 
            return acc
          },[])
          return filtered
        }
      }
    }

  }
  })
</script>

<style scoped></style>
