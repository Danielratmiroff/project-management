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
          v-model="currTask.name"
        />

        <v-divider></v-divider>
        <v-select
          v-model="currTask.category"
          :items="categories"
          menu-props="auto"
          hide-details
          label="Select"
          single-line
        ></v-select>

        <v-divider></v-divider>
        <!-- Refactor this please (unnecesary code) -->
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, datePicker }">
            <v-text-field
              v-model="currTask.dueDate"
              label="Picker in menu"
              readonly
              v-bind="datePicker"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="currTask.dueDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="edit" color="primary" text @click="editTask()">
            I accept
          </v-btn>
          <v-btn v-else color="primary" text @click="addTask()">
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
      task: TaskModel,
      edit: { type: Boolean, default: false },
    },
    data() {
      return {
        currTask: this.task ? this.task : new TaskModel(),
        openDialog: this.open,
        category: String,
        datePicker: String,
        date: new Date().toISOString().substr(0, 7),
        menu: false,
        modal: false,
      };
    },

    computed: {
      ...mapState(["categories"]),
    },

    watch: {
      task: {
        immediate: true,
        handler() {
          this.currTask = this.task ? this.task : new TaskModel();
        },
      },
      open: {
        immediate: true,
        handler() {
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
      addTask() {
        this.openDialog = false;
        this.$store.dispatch("addTask", this.currTask);
        this.currTask = new TaskModel();
      },
      editTask() {
        this.openDialog = false;
        this.currTask = new TaskModel();
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
