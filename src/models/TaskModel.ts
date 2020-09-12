import { uuid } from "vue-uuid";
import { dateFormater } from "@/components/helpers/date-formarter";

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
    this.done = false;

    const now = new Date();
    this.dueDate = dateFormater(now, "US");
    this.date = dateFormater(now, "US");
  }
}
