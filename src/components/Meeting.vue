<template>
  <div>
    <div class="meetings transition-smooth">
      <p class="meeting-title">
        {{ meetingName }}
      </p>
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
      meeting: TaskModel,
    },
    data() {
      return {};
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
    .meeting-container {
    }
    .meetings {
      @apply flex items-center;
    }
    .meeting-date {
      @apply ml-4 text-gray-600 text-sm;
    }
    .meetings:hover {
      @apply cursor-pointer text-blue-400;
    }
  }

  .meetings::before {
    content: "";
    border-radius: 50%;
    background-color: #63b3ed;
    height: 8px;
    width: 8px;
    margin-right: 0.5rem;
  }
</style>
