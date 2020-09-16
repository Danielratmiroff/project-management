import { uuid } from "vue-uuid";

export default class DocModel {
  id: string;
  title: string;
  html: string;
  // always maintain content as last key
  content: string;

  constructor() {
    this.id = uuid.v4();
    this.title = "";
    this.html = `
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
  `;
    this.content = "Hi there, this is a very basic example of tiptap.";
  }
}
