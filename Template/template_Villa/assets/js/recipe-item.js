import { LitElement, html, css } from "lit";

class RecipeItem extends LitElement {
  createRenderRoot() {
    return super.createRenderRoot();
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
    }
    div.card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-content: center;
      justify-content: center;
      justify-items: center;
      align-items: center;
      text-align: center;
      width: 200px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
    }
    h5 {
      margin: 0px;
    }
    p {
        font-size: 10px; 
        color: #666;
        line-height: 0px;
        width: fill;
    }
    a {
      color: #cb2127;
      font-size: 10px;
      text-decoration: none;
      cursor: pointer;
    }
    a:hover {
      text-decoration: underline;
    }
    a:visited {
      color: #cb2127;
      text-decoration: none;
    }
    .credit {
        padding: 0px 12px;
        margin-bottom: 24px;
        text-align: center;
        justify-items: center;
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
    img {
      width: 100%;
      object-fit: cover;
      height: 100px;
      border-radius: 8px 8px 0px 0px;
    }
    .stars {
      display: flex;
      gap: 2px;
    }

    .star {
      position: relative;
      width: 16px;
      height: 16px;
      font-size: 16px;
    }

    .star-empty {
      color: #ddd;
    }

    .star-fill {
      position: absolute;
      top: 0;
      left: 0;
      color: #ffc107;
      overflow: hidden;
      white-space: nowrap;
    }
    .section {
      margin-bottom: 48px;
    }
  `;

  slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  get recipeUrl() {
    const slug = this.slugify(this.recipe.title);
    return `/recipes/${slug}`;
  }

  renderStars(rating) {
    const maxStars = 5;

    return html`
      <div class="stars">
        ${Array.from({ length: maxStars }, (_, i) => {
          const fill = Math.min(Math.max(rating - i, 0), 1);

          return html`
            <span class="star">
              <span class="star-fill" style="width: ${fill * 100}%">
                ★
              </span>
              <span class="star-empty">★</span>
            </span>
          `;
        })}
      </div>
    `;
  }

  render() {
    if (!this.recipe) return html``;

    return html`
      <div class="card" @click=${() => { window.location.hash = this.recipeUrl; }}>
        <img src=${this.recipe.thumbnail}>
        <div class="credit">
          <a href=${this.recipe.url}>${this.recipe.blog}</a>
          <h5>${this.recipe.title}</h5>
          <div id="rating"></div>
          ${this.renderStars(this.recipe.rating)}
        </div>
      </div>
    `;
  }
}

customElements.define(RecipeItem.tag, RecipeItem);