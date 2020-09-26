import { uuid } from "vue-uuid";

export default class DocModel {
  constructor(
    readonly id: string = uuid.v4(),
    public title: string = "",
    public html: string = `
    <h2>
      Hi there 👏
    </h2>
    <p>
      this is a very <em><b>basic</b></em> example of a document.
    </p>
    <pre><code>Feel free to save your favorite lines of code here 
or even say something in german such as... Hans get ze Flammenwerfer! 🔥
    </code></pre>
    <blockquote>
      Have a lot of fun! 
      <br />
      – Dan
    </blockquote>
  `,
    readonly date: string | Date = new Date(),
    public content: string = "Hi there 👏 this is a very basic example of a document."
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.html = html;
    this.content = content;
  }
}
