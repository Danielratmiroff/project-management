import { uuid } from "vue-uuid";

export default class DocModel {
  id: string;
  title: string;
  content: string;

  constructor() {
    this.id = uuid.v4();
    this.title = "";
    this.content = "";
  }
}
