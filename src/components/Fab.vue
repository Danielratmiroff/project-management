<template>
  <div id="create">
    <button @click="openTaskModal">hey</button>
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
      openTaskModal() {
        // check if we are not in "home"
        if (this.$route.path !== "/") {
          this.$router.push({
            name: `Home`,
            // store task create on parameters (emit doesn't work while loading the page)
            params: { taskCreate: "create" },
          });
        } else {
          // otherwise, open task create modal directly
          this.$emit("taskCreate");
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
