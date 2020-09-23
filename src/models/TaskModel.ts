import { uuid } from "vue-uuid";

export default class TaskModel {
  constructor(
    readonly id: string = uuid.v4(),
    public name: string = "",
    public category: string = "Ideas",
    public kind: string = "Task",
    public done: boolean = false,
    public date: Date | string = new Date(),
    public dueDate: Date | string = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.kind = kind;
    this.done = done;
    this.date = date;
    this.dueDate = dueDate;
  }
}
