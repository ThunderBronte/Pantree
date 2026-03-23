import { html } from "lit";

export default function MyListsPage({ currentPath }) {
  return html`
    <section>
      <h1>My Lists</h1>
      <p>Browse your lists here.</p>
      <p>Current route: ${currentPath}</p>
    </section>
  `;
}