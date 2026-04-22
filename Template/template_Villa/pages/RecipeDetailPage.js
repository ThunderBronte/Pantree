import { html, css, LitElement } from "lit";

class RecipeDetail extends LitElement {
  createRenderRoot() {
    return super.createRenderRoot();
  }

  static properties = {
    slug: { type: String },
    recipe: { type: Object },
    _loading: { type: Boolean },
    _sent: { type: Boolean },
    _showConfirm: { type: Boolean },
    _savedIds: { type: Array },
    checkedIngredients: { type: Array },
    pantryItems: { type: Array },
    groceryItems: { type: Array }
  };

  static get styles() {
    return css`
      .section {
        margin-bottom: 48px;
        margin-top: 48px;
      }
      .container {
        margin-bottom: 48px;
        background-color: white;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      img {
        max-width: 100%;
      }
      .back-btn {
        background-color: #F3E5D9;
        color: #705B48;
        border: none;
        padding: 12px 24px;
        border-radius: 40px;
        font-size: 12px;
        font-weight: medium;
        cursor: pointer;
        margin-bottom: 24px;
      }
      .top-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .top-content p, .top-content h2 {
        margin: 0;
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
      .tag {
        background-color: #F3E5D9;
        color: #705B48;
        border-radius: 40px;
        padding: 6px 14px;
        font-size: 12px;
      }
      .back-btn:hover {
        text-decoration: underline;
      }
      .send-btn {
        background-color: #CB2127;
        color: white;
        border: none;
        padding: 12px 48px;
        border-radius: 40px;
        font-size: 13px;
        font-style: italic;
        cursor: pointer;
        margin-top: 12px;
        margin-bottom: 24px;
      }
      .send-btn:hover:not(:disabled) {
        text-decoration: underline;
      }
      .send-btn:disabled {
        background-color: #e8e8e8;
        color: #bbb;
        cursor: not-allowed;
      }
      .toast {
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border-radius: 8px;
        padding: 16px 32px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 15px;
        color: #1E1E1E;
        z-index: 200;
        animation: fadeInOut 2.5s ease forwards;
        white-space: nowrap;
      }
      @keyframes fadeInOut {
        0%   { opacity: 0; transform: translateX(-50%) translateY(10px); }
        15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
        75%  { opacity: 1; }
        100% { opacity: 0; }
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .ingredient-item {
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .ingredient-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
      .ingredient-label input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid #F3E5D9;
        border-radius: 4px;
        flex-shrink: 0;
        cursor: pointer;
        background-color: white;
        transition: background-color 0.15s, border-color 0.15s;
      }
      .ingredient-label input[type="checkbox"]:checked {
        background-color: #CB2127;
        border-color: #CB2127;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3 4.3a1 1 0 0 0-1.4 0L6.5 9.6 4.1 7.3a1 1 0 0 0-1.4 1.4l3.1 3a1 1 0 0 0 1.4 0l6.1-6a1 1 0 0 0 0-1.4z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
      }
      .ingredient-name {
        font-size: 15px;
      }
      .already-in-list {
        font-size: 11px;
        font-style: italic;
        color: #999;
        margin: 2px 0 0 30px;
        line-height: 1.4;
      }
      .ingredient-name.in-pantry {
        text-decoration: line-through;
        color: #aaa;
      }
      .modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
      }
      .confirm-card {
        background: white;
        border-radius: 8px;
        padding: 24px 16px;
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .confirm-card h3 {
        margin: 0;
        color: #1E1E1E;
      }
      .confirm-card p {
        margin: 0;
        font-size: 14px;
        color: #666;
      }
      .confirm-actions {
        display: flex;
        justify-content: space-between;
      }
      .confirm-yes {
        background-color: #CB2127;
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 40px;
        font-size: 16px;
        cursor: pointer;
      }
      .confirm-no {
        background-color: #F3E5D9;
        color: #705B48;
        border: none;
        padding: 12px 32px;
        border-radius: 40px;
        font-size: 16px;
        cursor: pointer;
      }
      .print-btn {
        background-color: #E66723;
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 40px;
        font-size: 13px;
        font-style: italic;
        cursor: pointer;
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .print-btn:hover {
        text-decoration: underline;
      }
      .image-wrapper {
        position: relative;
        line-height: 0;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border-radius: 8px 8px 0 0;
      }
      .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 8px 8px 0 0;
      }
      .image-gradient {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 55%;
        background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
        border-radius: 0;
        pointer-events: none;
      }
      .heart-btn {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        line-height: 0;
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.5));
      }
      .heart-btn svg {
        width: 28px;
        height: 28px;
        fill: transparent;
        stroke: white;
        stroke-width: 2;
        transition: fill 0.15s, stroke 0.15s;
      }
      .heart-btn.saved svg {
        fill: #CB2127;
        stroke: #CB2127;
      }
    `
  }

  constructor() {
    super();
    this._loading = true;
    this._sent = false;
    this._showConfirm = false;
    this._savedIds = [];
    this.recipe = null;
    this.checkedIngredients = [];
    this.pantryItems = [];
    this.groceryItems = [];
    this.referenceItems = [];
    this._onSavedChanged = () => {
      this._savedIds = JSON.parse(localStorage.getItem("saved-recipes") || "[]");
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("saved-recipes-changed", this._onSavedChanged);
  }

  get isSaved() {
    return this.recipe && this._savedIds.includes(this.recipe.id);
  }

  toggleSave() {
    const id = this.recipe.id;
    const updated = this._savedIds.includes(id)
      ? this._savedIds.filter(s => s !== id)
      : [...this._savedIds, id];
    localStorage.setItem("saved-recipes", JSON.stringify(updated));
    this._savedIds = updated;
    window.dispatchEvent(new CustomEvent("saved-recipes-changed"));
  }

  renderStars(rating) {
    return html`
      <div class="stars">
        ${Array.from({ length: 5 }, (_, i) => {
          const fill = Math.min(Math.max(rating - i, 0), 1);
          return html`
            <span class="star">
              <span class="star-fill" style="width: ${fill * 100}%">★</span>
              <span class="star-empty">★</span>
            </span>
          `;
        })}
      </div>
    `;
  }

  printRecipe() {
    const r = this.recipe;
    if (r.printUrl) {
      window.open(r.printUrl, "_blank");
      return;
    }
    if (r.printContent) {
      const { ingredients, steps } = r.printContent;
      const win = window.open("", "_blank");
      win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${r.title}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 680px; margin: 40px auto; color: #1E1E1E; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    .meta { color: #666; font-size: 14px; margin-bottom: 32px; }
    h2 { font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-top: 32px; }
    ul { padding-left: 20px; line-height: 1.8; }
    ol { padding-left: 20px; }
    ol li { margin-bottom: 12px; line-height: 1.6; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>${r.title}</h1>
  <p class="meta">${r.blog}${r.author ? ` · ${r.author}` : ""} &nbsp;|&nbsp; Serves ${r.servings} &nbsp;|&nbsp; ${r.totalTime}</p>
  <h2>Ingredients</h2>
  <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
  <h2>Preparation</h2>
  <ol>${steps.map(s => `<li>${s}</li>`).join("")}</ol>
</body>
</html>`);
      win.document.close();
      win.print();
      return;
    }
  }

  slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async connectedCallback() {
    super.connectedCallback();
    const [recipeRes, itemsRes] = await Promise.all([
      fetch("../../recipes.json"),
      fetch("../../items.json")
    ]);
    const data = await recipeRes.json();
    const itemsData = await itemsRes.json();
    this.recipe = data.recipes.find(r => this.slugify(r.title) === this.slug) ?? null;
    this.referenceItems = itemsData.items;

    this.pantryItems = JSON.parse(localStorage.getItem("pantry-items") || "[]");
    this.groceryItems = JSON.parse(localStorage.getItem("grocery-items") || "[]");
    this._savedIds = JSON.parse(localStorage.getItem("saved-recipes") || "[]");
    window.addEventListener("saved-recipes-changed", this._onSavedChanged);

    if (this.recipe) {
      this.checkedIngredients = this.recipe.ingredients
        .filter(i => !this.inPantry(i.name) && !this.inGroceryList(i.name))
        .map(i => i.name);
    }

    this._loading = false;
  }

  inPantry(name) {
    return this.pantryItems.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
  }

  inGroceryList(name) {
    return this.groceryItems.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
  }

  toggleIngredient(name) {
    if (this.checkedIngredients.includes(name)) {
      this.checkedIngredients = this.checkedIngredients.filter(n => n !== name);
    } else {
      this.checkedIngredients = [...this.checkedIngredients, name];
    }
  }

  sendToList() {
    const list = JSON.parse(localStorage.getItem("grocery-items") || "[]");
    const recipeTitle = this.recipe.title;

    for (const name of this.checkedIngredients) {
      const existingIndex = list.findIndex(
        item => item.name.toLowerCase() === name.toLowerCase()
      );
      if (existingIndex >= 0) {
        list[existingIndex] = {
          ...list[existingIndex],
          usedInRecipe: recipeTitle,
          count: [...list[existingIndex].count, {}]
        };
      } else {
        const ref = this.referenceItems.find(
          r => r.name.toLowerCase() === name.toLowerCase()
        );
        const expOnOpen = ref?.count?.[0]?.expOnOpen ?? 7;
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + expOnOpen);
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        list.push({
          id: crypto.randomUUID(),
          name,
          type: ref?.type ?? "Produce",
          unit: ref?.unit ?? "each",
          section: "recipe",
          recipeTitle,
          added: new Date().toISOString(),
          singleCost: ref?.singleCost ?? 0,
          isFav: false,
          count: [{
            expDate: expDate.toISOString().split("T")[0],
            expMonth: monthNames[expDate.getMonth()],
            expDay: expDate.getDate(),
            expYear: expDate.getFullYear(),
            expOnOpen
          }]
        });
      }
    }

    localStorage.setItem("grocery-items", JSON.stringify(list));
    this.groceryItems = list;
    this.checkedIngredients = [];
    this._showConfirm = false;
    this._sent = true;
    setTimeout(() => { this._sent = false; }, 2500);
  }

  render() {
    if (this._loading) return html`<p>Loading...</p>`;
    if (!this.recipe) return html`<p>Recipe not found.</p>`;

    const r = this.recipe;
    return html`
      <div class="section properties" style="margin-bottom:48px; margin-top:48px;">
        <button class="back-btn" @click=${() => history.back()}>← Back</button>

        <div class="container">
          <div class="image-wrapper">
            <img src=${r.thumbnail} alt=${r.title} />
            <div class="image-gradient"></div>
            <button class=${this.isSaved ? "heart-btn saved" : "heart-btn"} @click=${() => this.toggleSave()} aria-label=${this.isSaved ? "Unsave recipe" : "Save recipe"}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.5 4.5 3.5C13.09 5 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          <div class="top-content" style="padding: 0 32px; margin-top: 24px;">
            <div style="display: flex; align-items: center; gap: 16px; justify-content: space-between; color: #CB2127;">
              <p>${r.blog}<span style="color: black">${r.author ? `  ·  ${r.author}` : ""}</span></p>
              <a style="color: #CB2127;" href=${r.url} target="_blank">Go to recipe ➝</a>
            </div>

            <div style="display: flex; align-items: center; gap: 16px; justify-content: space-between;">
              <h2>${r.title}</h2>
              ${this.renderStars(r.rating)}
            </div>
            
            <p>Serves: ${r.servings} | Total Time: ${r.totalTime}</p>

            <div style="justify-content: space-between; display: flex; align-items: center;">
              ${r.printUrl || r.printContent ? html`
                <button class="print-btn" @click=${() => this.printRecipe()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                  Print Recipe
                </button>
              ` : null}
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${(r.tags ?? []).map(tag => html`<span class="tag">${tag}</span>`)}
              </div>
            </div>
          </div>

          <div style="padding: 0 32px; display: flex; flex-direction: column; border-top: 1px solid #f0f0f0; margin-top: 16px;">
            <h3>Ingredients</h3>
            <ul>
              ${r.ingredients.map(i => {
                const checked = this.checkedIngredients.includes(i.name);
                const inPantryFlag = this.inPantry(i.name);
                const inListFlag = this.inGroceryList(i.name);
                return html`
                  <li class="ingredient-item">
                    <label class="ingredient-label">
                      <input
                        type="checkbox"
                        .checked=${checked}
                        @change=${() => this.toggleIngredient(i.name)}
                      />
                      <span class="ingredient-name ${inPantryFlag ? 'in-pantry' : ''}">${i.name}</span>
                    </label>
                    ${inListFlag && !inPantryFlag
                      ? html`<p class="already-in-list">Already in list. Check to add another.</p>`
                      : null}
                  </li>
                `;
              })}
            </ul>
            <button class="send-btn" ?disabled=${this._sent} @click=${() => { this._showConfirm = true; }}>Send to List</button>
          </div>
          
        </div>
      </div>

      <div class="section" style="color: transparent;">_</div>

      ${this._showConfirm ? html`
        <div class="modal" @click=${() => { this._showConfirm = false; }}>
          <div class="confirm-card" @click=${e => e.stopPropagation()}>
            <h3>Add to Grocery List?</h3>
            <p>This will add ${this.checkedIngredients.length} item${this.checkedIngredients.length === 1 ? "" : "s"} to your grocery list.</p>
            <div class="confirm-actions">
              <button class="confirm-no" @click=${() => { this._showConfirm = false; }}>Cancel</button>
              <button class="confirm-yes" @click=${() => this.sendToList()}>Add</button>
            </div>
          </div>
        </div>
      ` : null}

      ${this._sent ? html`<div class="toast">Added to grocery list!</div>` : null}
    `;
    
  }
}

customElements.define("recipe-detail", RecipeDetail);

export default function RecipeDetailPage({ slug }) {
  return html`<recipe-detail slug=${slug}></recipe-detail>`;
}
