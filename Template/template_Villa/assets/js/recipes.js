import { LitElement, html, css} from "lit";
import "./recipe-item.js";

export class AppRecipes extends LitElement {
  createRenderRoot() {
    return super.createRenderRoot();
  }
  static properties = {
    recipes: { type: Array },
    filterTag: { type: String },
    searchQuery: { type: String },
    _savedIds: { type: Array }
  };

  constructor() {
    super();
    this.recipes = [];
    this.filterTag = "all";
    this.searchQuery = "";
    this._savedIds = [];
    this._onSavedChanged = () => {
      this._savedIds = JSON.parse(localStorage.getItem("saved-recipes") || "[]");
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      section {
        display: flex;
        gap: 24px;
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    const res = await fetch("../../recipes.json");
    const data = await res.json();
    this.recipes = data.recipes;
    this._savedIds = JSON.parse(localStorage.getItem("saved-recipes") || "[]");
    window.addEventListener("saved-recipes-changed", this._onSavedChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("saved-recipes-changed", this._onSavedChanged);
  }

filterByType(recipes) {
  if (this.filterTag === "all") return recipes;
  if (this.filterTag === "saved") return recipes.filter(r => this._savedIds.includes(r.id));

  return recipes.filter(recipe =>
    Array.isArray(recipe.tags) &&
    recipe.tags.some(tag => tag.toLowerCase() === this.filterTag)
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
    const byTag = this.filterByType(this.recipes);
    const filtered = this.searchQuery
      ? byTag.filter(r => r.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      : byTag;

    return html`
      <section>
        ${this.renderRecipes(filtered)}
      </section>
    `;
  }
}

customElements.define("app-recipes", AppRecipes);