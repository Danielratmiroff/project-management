import { uuid } from "vue-uuid";

export default class TaskModel {
  id: string;
  name: string;
  date: string;
  category: string;
  dueDate: string;
  done: boolean;

  constructor() {
    this.id = uuid.v4();
    this.name = "";
    this.category = "";
    this.dueDate = "";
    this.done = false;

    const now = new Date();
    this.date = now.toLocaleDateString("de-DE");
  }
}
