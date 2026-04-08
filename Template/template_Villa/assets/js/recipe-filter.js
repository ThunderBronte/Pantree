import { LitElement, css, html } from "lit";

class RecipeFilter extends LitElement {
  createRenderRoot() {
    return super.createRenderRoot(); // disable shadow DOM
  }

  static get tag() {
    return "recipe-filter";
  }

  static properties = {
    active: { type: String }
  };

  constructor() {
    super();
    this.active = "all";
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
      background: #1e1e1e;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 40px;
      cursor: pointer;
      font-size: 10px;
    }
    button.is_active {
      background: #cb2127;
    }
  `;
  }

  render() {
    const tags = [
      "all",
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
              class=${this.active === tag ? "is_active" : ""}
              @click=${() => this.selectFilter(tag)}
            >
              ${tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          `
        )}
      </div>
    `;
  }
}

customElements.define(RecipeFilter.tag, RecipeFilter);