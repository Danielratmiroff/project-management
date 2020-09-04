<template>
  <div id="create">
    <v-speed-dial
      v-model="fab"
      :bottom="bottom"
      :right="right"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="openTaskDialog">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="addDocument">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Fab",
    data: () => ({
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
    }),

    computed: {
      activeFab() {
        switch (this.tabs) {
          case "one":
            return { class: "purple", icon: "account_circle" };
          case "two":
            return { class: "red", icon: "edit" };
          case "three":
            return { class: "green", icon: "keyboard_arrow_up" };
          default:
            return {};
        }
      },
    },

    watch: {
      top(val) {
        this.bottom = !val;
      },
      right(val) {
        this.left = !val;
      },
      bottom(val) {
        this.top = !val;
      },
      left(val) {
        this.right = !val;
      },
    },
    methods: {
      openTaskDialog() {
        // we only add tasks when we're in home (tasks) page, so we check if we are not in "home"
        if (this.$route.path !== "/") {
          this.$router.push({
            name: `Home`,
            params: { addtask: "openDialog" },
          });
        } else {
          // otherwise, open add-task dialog directly
          this.$emit("openTaskDialog");
        }
      },
      addDocument() {
        this.$router.push({ name: "DocCreate" });
      },
    },
  });
</script>

<style lang="scss" scoped>
  #create .v-speed-dial {
    position: absolute;
  }
</style>
