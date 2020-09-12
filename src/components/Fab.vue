<template>
  <div class="fixed bottom-0 right-0 flex items-center justify-center">
    <div
      class="grid grid-cols-1 text-center justify-center row-gap-4 mb-4 mr-4"
    >
      <span
        @click="createDocument"
        class="fab-btn fab-btn-secondary bg-orange-900 hover:bg-orange-800"
        :class="toggleIcons ? 'taskAnimationIn' : 'taskAnimationOut'"
      >
        <i class="fas fa-file-alt"></i>
      </span>
      <span
        @click="openTaskCreateModal"
        class="fab-btn fab-btn-secondary bg-blue-900 hover:bg-blue-600"
        :class="toggleIcons ? 'taskAnimationIn' : 'taskAnimationOut'"
      >
        <i class="fas fa-list-ul"></i>
      </span>
      <button
        class="fab-btn fab-btn-primary bg-dark-900 hover:bg-dark-700 "
        style=""
        @click="toggleIcons = !toggleIcons"
      >
        <i
          :class="toggleIcons ? 'rotateIn' : 'rotateOut'"
          class="fas fa-plus"
        ></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Fab",
    data() {
      return {
        toggleIcons: false,
      };
    },

    methods: {
      openTaskCreateModal() {
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
      createDocument() {
        this.$router.push({ name: "DocCreate" });
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .fab-btn {
      @apply text-white flex items-center justify-center m-auto cursor-pointer;
      border-radius: 50%;
      transition: background-color 0.3s;
    }
    .fab-btn:focus {
      @apply outline-none;
    }
    .fab-btn-primary {
      @apply h-16 w-16;
    }
    .fab-btn-secondary {
      @apply h-10 w-10;
    }
  }

  .rotateIn {
    -webkit-animation: rotateIn 0.3s linear forwards;
    -moz-animation: rotateIn 0.3s linear forwards;
    animation: rotateIn 0.3s linear forwards;
  }
  .rotateOut {
    -webkit-animation: rotateOut 0.3s linear forwards;
    -moz-animation: rotateOut 0.3s linear forwards;
    animation: rotateOut 0.3s linear forwards;
  }

  @keyframes rotateIn {
    100% {
      transform: rotate(45deg);
    }
  }
  @keyframes rotateOut {
    from {
      transform: rotate(45deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  .taskAnimationIn {
    -webkit-animation: taskAnimateIn 0.3s ease-in-out forwards;
    -moz-animation: taskAnimateIn 0.3s ease-in-out forwards;
    animation: taskAnimateIn 0.3s ease-in-out forwards;
  }
  .taskAnimationOut {
    -webkit-animation: taskAnimateOut 0.3s ease-in-out forwards;
    -moz-animation: taskAnimateOut 0.3s ease-in-out forwards;
    animation: taskAnimateOut 0.3s ease-in-out forwards;
  }

  @keyframes taskAnimateIn {
    from {
      transform: translatey(1.2rem);
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translatey(0);
    }
  }
  @keyframes taskAnimateOut {
    from {
      opacity: 1;
      transform: translatey(0);
    }
    to {
      transform: translatey(1.2rem);
      opacity: 0;
    }
  }
</style>
