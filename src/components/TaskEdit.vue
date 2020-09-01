<template>
  <div>
    <v-dialog v-model="openDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Task
        </v-card-title>

        <input
          class="inputTask"
          type="text"
          v-model="task.name"
          @keyup.enter="addTask(Task)"
        />
        <!-- 
        <v-divider></v-divider>
        <v-select
          v-model="Task.category"
          :items="categories"
          menu-props="auto"
          hide-details
          label="Select"
          single-line
        ></v-select> -->

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="addTask(Task)">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import TaskModel from "@/models/model";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "TaskEdit",
    props: {
      open: Boolean,
      task: Object,
    },
    data() {
      return {
        openDialog: this.open,
      };
    },

    computed: {},

    watch: {
      open: {
        handler() {
          this.openDialog = this.open;
        },
        immediate: true,
      },
      openDialog: {
        immediate: true,
        handler() {
          if (this.open !== this.openDialog) {
            this.$emit("closeDialog");
          }
        },
      },
    },
    methods: {
      addTask(task: any) {
        this.openDialog = false;
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
