import { uuid } from "vue-uuid";

export default class DocModel {
  constructor(
    readonly id: string = uuid.v4(),
    public title: string = "",
    public html: string = `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a very <em>basic</em> example of tiptap.
    </p>
    <pre><code>body { display: none; }</code></pre>
    <ul>
      <li>
        A regular list
      </li>
      <li>
        With regular items
      </li>
    </ul>
    <blockquote>
      It's amazing 👏
      <br />
      – mom
    </blockquote>
  `,
    readonly date: string | Date = new Date(),
    public content: string = "Hi there, this is a very basic example of tiptap."
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.html = html;
    this.content = content;
  }
}
