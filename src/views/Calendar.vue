<template>
  <div>
    <TaskCreate
      style="z-index:99"
      v-if="taskModal"
      :isEditMode="this.isEditMode"
      :enableDueDatePick="false"
      :task="task"
      @closeModal="taskModalHandler"
    />
    <FullCalendar class="calendar-container" :options="calendarOptions" />
    <div class="legend">
      <div v-for="item in categories" :key="item">
        <div
          class="legend-dot"
          :style="`background-color:${colorizeByCategory(item)}`"
        />
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import FullCalendar from "@fullcalendar/vue";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
  import { mapState } from "vuex";
  import TaskCreate from "@/components/TaskCreate.vue";
  import TaskModel from "@/models/TaskModel";

  // calendar needs static event to initialise correctly
  const events = [{ title: "initialise event", start: new Date("2020/09/13") }];

  export default Vue.extend({
    name: "Calendar",
    components: {
      FullCalendar,
      TaskCreate,
    },
    data() {
      return {
        taskModal: false,
        isEditMode: false,
        task: new TaskModel(),
        calendarTasks: [] as Array<object>,
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: "dayGridMonth",
          events: events,
          selectable: true,
          dayMaxEvents: true,
          editable: true,
          height: 800,
          backgroundColor: "#000",
          eventDrop: this.eventDrop,
          eventDidMount: this.eventToolTip,
          // eventMouseEnter: this.eventHover,
          eventDrop: this.eventDrop,
          eventClick: this.eventClick,
          headerToolbar: {
            right: "prev,next today",
            center: "title",
            left: "dayGridMonth,dayGridWeek",
          },
          select: this.handleDateClick,
        },
      };
    },
    computed: {
      ...mapState(["tasks", "categories"]),
    },
    watch: {
      tasks: {
        immediate: true,
        handler() {
          this.loadTasks();
        },
      },
    },
    methods: {
      colorizeByCategory(category: string): string {
        if (category === this.categories[0]) {
          return "#2dc9e2";
        } else if (category === this.categories[1]) {
          return "#d6be28";
        } else if (category === this.categories[2]) {
          return "#efa926";
        } else {
          return "#f69051";
        }
      },
      loadTasks() {
        const tasks = this.tasks.map((elm: TaskModel) => {
          return {
            id: elm.id,
            title: elm.priority === "High" ? elm.name + " ⭐" : elm.name,
            start: elm.date,
            end: elm.dueDate,
            color: elm.color,
            allDay: true,
          };
        });
        this.calendarOptions.events = tasks;
      },
      handleDateClick(e: any) {
        // Default when creating from calendar
        this.task.kind = "Meeting";
        // Clicked date in calendar
        this.task.date = e.start;
        // Compare if task its due to the same day
        const date = getLastDayDigit(e.start);
        const dueDate = getLastDayDigit(e.end);
        const diffInDates = dueDate - date;
        // if single click on an specific date
        if (diffInDates === 1) {
          // set due date to starting date
          this.task.dueDate = e.start;
        } else {
          // else multiple dates are selected, set last selected date as duedate
          this.task.dueDate = e.end;
        }
        this.taskModal = true;

        function getLastDayDigit(date: string): number {
          return parseInt(date.toString().slice(date.length - 1));
        }
      },
      eventClick(e: any) {
        const id: string = e.event._def.publicId;
        const fetchTask = this.findTask(id);
        this.task = fetchTask;
        this.isEditMode = true;
        this.taskModal = true;
      },
      eventDrop(info: any) {
        const id: string = info.event.id;
        const findTask = this.findTask(id);
        const updatedTask = {
          ...findTask,
          date: info.event.start,
          dueDate: info.event.end,
        };
        this.task = updatedTask;
        this.$store.dispatch("editTask", updatedTask);
      },
      findTask(id: string) {
        return this.tasks.find((elm: TaskModel) => elm.id === id);
      },
      taskModalHandler() {
        this.taskModal = !this.taskModal;
        this.isEditMode = false;
        // maybe this could be improved
        this.task = new TaskModel();
      },
    },
  });
</script>
<style lang="css" scoped>
  @layer components {
    .calendar-container {
      @apply;
    }
    .calendar-item {
      @apply bg-yellow-600;
    }
    .legend {
      @apply flex flex-col items-start;
    }
    .legend > div {
      @apply flex items-center mt-2;
    }
  }
  @screen sm {
    .legend {
      @apply flex-row items-center;
    }
    .legend > div:not(:first-child) {
      @apply ml-6;
    }
  }
  .legend-dot {
    border-radius: 50%;
    background-color: #72a0f9;
    height: 10px;
    width: 10px;
    margin-right: 0.5rem;
  }
</style>
