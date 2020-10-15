import { uuid } from "vue-uuid";

export default class TaskModel {
  constructor(
    readonly id: string = uuid.v4(),
    public name: string = "",
    public category: string = "Ideas",
    public kind: string = "Task",
    public content: string = "",
    public priority: string | null = "Normal",
    public date: Date = new Date(),
    public dueDate: Date = new Date(),
    public color: string = '#72a0f9'
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.kind = kind;
    this.content = content;
    this.priority = priority;
    this.date = date;
    this.dueDate = dueDate;
    this.color = color;
  }
}
