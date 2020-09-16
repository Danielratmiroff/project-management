import { uuid } from "vue-uuid";
import { dateFormater } from "@/components/helpers/date-formarter";

export default class TaskModel {
  id: string;
  name: string;
  date: string | Date;
  category: string;
  dueDate: string | Date;
  done: boolean;

  constructor() {
    this.id = uuid.v4();
    this.name = "";
    this.category = "";
    this.done = false;

    const now = new Date();
    this.dueDate = now;
    this.date = now;
  }
}
