import { html } from "lit";

export default function RecipesPage({ currentPath }) {
  return html`
    <section>
      <h1>Recipes</h1>
      <p>Browse your recipes here.</p>
      <p>Current route: ${currentPath}</p>
    </section>
  `;
}