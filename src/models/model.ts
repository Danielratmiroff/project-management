import { uuid } from "vue-uuid";

export default class ToDoModel {
  id: string;
  name: string;
  done: boolean;
  date: string;

  constructor() {
    this.id = uuid.v4();
    this.name = "";
    this.done = false;

    const now = new Date();
    this.date = now.toLocaleDateString("de-DE");
  }
}
