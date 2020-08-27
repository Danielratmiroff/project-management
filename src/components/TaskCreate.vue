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
          placeholder="Add your To Do"
          v-model="Task.name"
          @keyup.enter="addTask(Task)"
        />

        <v-divider></v-divider>
        <v-select
          v-model="Task.category"
          :items="categories"
          menu-props="auto"
          hide-details
          label="Select"
          single-line
        ></v-select>

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
    name: "TaskCreate",
    props: {
      open: Boolean,
    },
    data() {
      return {
        Task: new TaskModel(),
        openDialog: this.open,
        category: String,
      };
    },

    computed: {
      ...mapState(["categories"]),
    },

    watch: {
      open: {
        immediate: true,
        handler() {
          this.Task = new TaskModel();
          this.openDialog = this.open;
        },
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
      addTask(elm: string) {
        this.openDialog = false;
        this.$store.dispatch("addTask", this.Task);
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
