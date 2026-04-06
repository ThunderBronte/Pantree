import { LitElement, html } from "lit";
import "./recipe-item.js";

export class AppRecipes extends LitElement {
  static properties = {
    recipes: { type: Array },
    filterTag: { type: String }
  };

  constructor() {
    super();
    this.recipes = [];
    this.filterTag = "all";
  }

  async connectedCallback() {
    super.connectedCallback();
    const res = await fetch("../../recipes.json");
    const data = await res.json();
    this.recipes = data.recipes;
  }

filterByType(recipes) {
  if (this.filterTag === "all") return recipes;

  return recipes.filter(recipe =>
    Array.isArray(recipe.tag) &&
    recipe.tag.some(tag => tag.toLowerCase() === this.filterTag)
  );
}

  renderRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
      return html`<p>No Recipes</p>`;
    }

    return recipes.map(
      recipe => html`<recipe-item .recipe=${recipe}></recipe-item>`
    );
  }

  render() {
    const filtered = this.filterByType(this.recipes);

    return html`
      <section>
        ${this.renderRecipes(filtered)}
      </section>
    `;
  }
}

customElements.define("app-recipes", AppRecipes);