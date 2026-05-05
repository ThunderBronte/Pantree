import { LitElement, css, html } from "lit";

class RecipeFilter extends LitElement {
  createRenderRoot() {
    return super.createRenderRoot(); // disable shadow DOM
  }

  static get tag() {
    return "recipe-filter";
  }

  static properties = {
    active: { type: String },
    _savedCount: { type: Number }
  };

  constructor() {
    super();
    this.active = "all";
    this._savedCount = 0;
    this._onSavedChanged = () => {
      this._savedCount = JSON.parse(localStorage.getItem("saved-recipes") || "[]").length;
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._savedCount = JSON.parse(localStorage.getItem("saved-recipes") || "[]").length;
    window.addEventListener("saved-recipes-changed", this._onSavedChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("saved-recipes-changed", this._onSavedChanged);
  }

  selectFilter(type) {
    this.active = type;
    this.dispatchEvent(
      new CustomEvent("filter-change", {
        detail: type,
        bubbles: true,
        composed: true
      })
    );
  }

  static get styles() {
    return css`
    div {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 24px;
    }
    button {
      background: #E4C9B2;
      color: #1e1e1e;
      border: none;
      padding: 6px 12px;
      border-radius: 40px;
      cursor: pointer;
      font-size: 10px;
    }
    button.meal-type {
      background: #1e1e1e;
      color: white;
    }
    button.is_active {
      background: #cb2127;
      color: white;
    }
  `;
  }

  render() {
    const mealTypes = new Set(["breakfast", "lunch", "dinner", "dessert", "snack"]);
    const tags = [
      "all",
      "breakfast",
      "lunch",
      "dinner",
      "dessert",
      "snack",
      "dairy-free",
      "peanut-free",
      "treenut-free",
      "gluten-free",
      "vegetarian",
      "pescatarian",
      "vegan",
      "halal"
    ];

    return html`
      <div class="properties-filter">
        ${tags.map(
          tag => html`
            <button
              class=${[mealTypes.has(tag) ? "meal-type" : "", this.active === tag ? "is_active" : ""].filter(Boolean).join(" ")}
              @click=${() => this.selectFilter(tag)}
            >
              ${tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          `
        )}
        ${this._savedCount > 0 ? html`
          <button
            class=${this.active === "saved" ? "is_active" : ""}
            @click=${() => this.selectFilter("saved")}
          >
            ♥ Saved
          </button>
        ` : null}
      </div>
    `;
  }
}

customElements.define(RecipeFilter.tag, RecipeFilter);