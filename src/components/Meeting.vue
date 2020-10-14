<template>
  <div>
    <div class="meetings transition-smooth">
      <div class="meeting-title">
        <div class="meetings-dot" />
        {{ meetingName }}
      </div>
      <p class="meeting-date">
        {{ date }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import { dateFormater } from "@/components/helpers/date-formarter";
  import TaskModel from "@/models/TaskModel";

  export default Vue.extend({
    name: "Meeting",
    props: {
      meeting: Object,
    },
    computed: {
      date(): string {
        return dateFormater(this.meeting.date, "US")!;
      },
      meetingName(): string {
        return this.meeting.name.length > 20
          ? this.meeting.name.slice(0, 20) + "..."
          : this.meeting.name;
      },
    },
    methods: {
      removeTask(elm: string) {
        this.$store.dispatch("removeTask", elm);
      },
    },
  });
</script>

<style lang="css" scoped>
  @layer components {
    .meetings {
      @apply flex flex-col;
    }
    .meeting-date {
      @apply ml-2 text-gray-500 text-sm;
    }
    .meeting-title {
      @apply flex items-center;
    }
    .meetings:hover {
      @apply cursor-pointer text-darkblue-400;
    }
    .meetings-dot {
      border-radius: 50%;
      background-color: #72a0f9;
      height: 8px;
      width: 8px;
      margin-right: 0.5rem;
    }
  }
  @screen lg {
  }
</style>
