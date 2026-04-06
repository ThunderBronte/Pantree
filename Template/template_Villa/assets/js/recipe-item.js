import { LitElement, html, css } from "lit";

class RecipeItem extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get tag() {
    return "recipe-item";
  }

  static properties = {
    recipe: { type: Object }
  };

  static styles = css`
    :host {
        display: block;
        width: 100%;
    }
    div.card {
        display: flex;
        background-color: white;
        align-items: center;
        gap: 48px;
        border-radius: 8px;
        margin: 12px 0px;
        justify-content: space-between;
        padding: 16px 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    div.card.expiring {
        border: 2px solid #CB2127;
    }
    div.card.expired {
        background-color: #FFC1C3;
    }
    .expiring-badge {
        display: inline-block;
        background-color: #CB2127;
        color: white;
        font-size: 8px;
        padding: 0px 6px;
        border-radius: 10px;
        margin: 4px 0px;
        font-weight: bold;
        width: fit-content;
    }
    p {
        font-size: 10px; 
        color: #666;
        line-height: 0px;
    }
    h4 {
        margin: 0px;
    }
    .div-right {
        display: flex; 
        align-items: center; 
        gap: 24px;
    }
    button {
        text-align: center;
        background-color: #F3E5D9; 
        color: #705B48; 
        font-weight: medium;
        font-size: 16px;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 40px;
        padding: 0px; 
        align-items: center;
    }
  `;

  render() {
    if (!this.recipe) return html``;

    return html`
      <div class="card">
        <h3>${this.recipe.title}</h3>
        <p>By ${this.recipe.author}</p>
        ${this.recipe.url}
      </div>
    `;
  }
}

customElements.define(RecipeItem.tag, RecipeItem);