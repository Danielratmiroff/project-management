<template>
  <div class="fab-wrapper">
    <div class="fab-container">
      <router-link
        to="doc-create"
        content="Create document"
        v-tippy="{
          placement: 'left',
          arrow: true,
        }"
        v-show="toggleIcons"
        class="transition-smooth fab-btn fab-btn-secondary bg-orange-400 hover:bg-orange-600 hover:shadow-md"
        :class="toggleIcons ? 'taskAnimationIn' : 'taskAnimationOut'"
      >
        <i class="fas fa-file-alt"></i>
      </router-link>
      <span
        content="Add new task"
        v-tippy="{
          placement: 'left',
          arrow: true,
        }"
        v-show="toggleIcons"
        @click="openTaskCreateModal"
        class="transition-smooth fab-btn fab-btn-secondary bg-darkblue-400 hover:bg-darkblue-600 hover:shadow-md "
        :class="toggleIcons ? 'taskAnimationIn' : 'taskAnimationOut'"
      >
        <i class="fas fa-list-ul "></i>
      </span>
      <button
        content="Start here 🏄🏻‍♂️"
        v-tippy="{
          placement: 'left',
          arrow: true,
          theme: 'light',
        }"
        class="transition-smooth fab-btn fab-btn-primary"
        style=""
        @click="toggleIcons = !toggleIcons"
      >
        <i
          :class="toggleIcons ? 'rotateIn' : 'rotateOut'"
          class="fas fa-plus fa-lg"
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
        // if we are not on "home"
        if (this.$route.path !== "/") {
          // TaskCreate should be called from the dashboard for better UX
          this.$router.push({
            name: `Home`,
            // store task create on parameters (emit doesn't work while loading the page)
            params: { taskCreate: "create" },
          });
        } else {
          // if we are on "home", open task create modal directly
          this.$emit("taskCreate");
        }
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .fab-wrapper {
      @apply fixed right-0 bottom-0 flex items-center justify-center mb-4 mr-4;
    }
    .fab-container {
      @apply grid grid-cols-1 text-center justify-center row-gap-4;
    }
    .fab-btn {
      @apply text-white flex items-center justify-center m-auto cursor-pointer rounded-full;
    }
    .fab-btn:focus {
      @apply outline-none;
    }
    .fab-btn-primary {
      @apply h-16 w-16 bg-brand;
    }
    .fab-btn-primary:hover {
      @apply bg-blue-300 shadow-lg;
    }
    .fab-btn-secondary {
      @apply h-10 w-10;
    }
  }
  @screen sm {
    .fab-wrapper {
      @apply mb-6 mr-6;
    }
    .fab-btn-primary {
      @apply h-20 w-20;
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
