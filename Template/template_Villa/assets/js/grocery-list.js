import { LitElement, html, css } from "lit";
import "./grocery-item.js";

export class GroceryList extends LitElement {
  static properties = {
    items: { type: Array },
    filterType: { type: String },
    checkedIds: { type: Array }
  };

  static styles = css`
    .cost-banner {
      background-color: #9CC97A;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: bold;
      white-space: nowrap;
    }
    .left-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .send-btn {
      background-color: #F3E5D9;
      color: #705B48;
      border: none;
      padding: 12px 48px;
      border-radius: 40px;
      font-size: 13px;
      font-style: italic;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.filterType = 'all';
    this.checkedIds = [];
  }

  addItem(itemDetail) {
    const newItem = itemDetail.newItem || itemDetail;
    this.items = [...this.items, newItem];
    this.savedItems();
  }

  async connectedCallback() {
    super.connectedCallback();
    const savedItems = localStorage.getItem("grocery-items");
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    } else {
      const res = await fetch("../../user-items.json");
      const data = await res.json();
      this.items = data.items;
      this.savedItems();
    }
  }

  savedItems() {
    localStorage.setItem("grocery-items", JSON.stringify(this.items));
  }
  
  filterByType(items) {
    if (this.filterType === "all") return items;
    return items.filter(
      item => item.type.toLowerCase() === this.filterType
    );
  }


  increaseItem(id) {
    this.items = this.items.map(item =>
      item.id === id
        ? {
            ...item,
            count: [...item.count, {}]
          }
        : item
    );
    this.savedItems();
  }

  decreaseItem(id) {
    this.items = this.items
      .map(item =>
        item.id === id
          ? { ...item, count: item.count.slice(0, -1) }
          : item
      )
      .filter(item => item.count.length > 0);
      this.savedItems();
  }

  
  itemsBySection(section) {
    return this.filterByType(this.items.filter(item => item?.section?.toLowerCase() === section));
  }

  get recipeTitles() {
    const seen = new Set();
    for (const item of this.items) {
      if (item.recipeTitle) seen.add(item.recipeTitle);
    }
    return [...seen];
  }

  recipeSection(title) {
    return this.items.filter(item => item.recipeTitle === title);
  }


  renderItems(items) {
    
    if (!items || items.length === 0) {
      return html`<p class="empty">No Items Yet!</p>`;
    }

    return items.map(
        item => html`
            <grocery-item
            .item=${item}
            .checked=${this.checkedIds.includes(item.id)}
            @increase=${() => this.increaseItem(item.id)}
            @decrease=${() => this.decreaseItem(item.id)}
            @toggle-check=${() => this.toggleCheck(item.id)}>
            </grocery-item>
        `
    );
    }

  get estimatedCost() {
    return this.items
      .reduce((sum, item) => sum + (item.singleCost ?? 0) * (item.count?.length || 1), 0)
      .toFixed(2);
  }

  toggleCheck(id) {
    if (this.checkedIds.includes(id)) {
      this.checkedIds = this.checkedIds.filter(cid => cid !== id);
    } else {
      this.checkedIds = [...this.checkedIds, id];
    }
  }

  finishShopping() {
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const minExp = new Date();
    minExp.setDate(minExp.getDate() + 7);

    const checkedItems = this.items
      .filter(item => this.checkedIds.includes(item.id))
      .map(item => ({
        ...item,
        id: crypto.randomUUID(),
        added: new Date().toISOString(),
        count: item.count.map(c => {
          const existing = c.expDate ? new Date(c.expDate) : null;
          const expDate = existing && existing > minExp ? existing : minExp;
          return {
            ...c,
            expDate: expDate.toISOString().split("T")[0],
            expMonth: monthNames[expDate.getMonth()],
            expDay: expDate.getDate(),
            expYear: expDate.getFullYear()
          };
        })
      }));

    const pantryItems = JSON.parse(localStorage.getItem("pantry-items") || "[]");
    localStorage.setItem("pantry-items", JSON.stringify([...pantryItems, ...checkedItems]));

    this.items = this.items.filter(item => !this.checkedIds.includes(item.id));
    this.checkedIds = [];
    this.savedItems();
  }


  render() {

    
    return html`
        <div class="top-bar">
          <div class="left-group">
            <div class="cost-banner">Estimated Cost: $${this.estimatedCost}</div>
            <add-item-button @add-item=${e => this.addItem(e.detail)}></add-item-button>
          </div>
          ${this.checkedIds.length > 0
            ? html`<button class="send-btn" @click=${() => this.finishShopping()}>Send ${this.checkedIds.length} item${this.checkedIds.length === 1 ? "" : "s"} to Pantry</button>`
            : null}
        </div>
        <div class="row properties-box">
            <!--
            <div style="margin-bottom: 12px;">
                <h2 style="color:#CB2127;">All Items</h2>
                ${this.renderItems(this.items)}
            </div>
            -->
    
            <!--Pantry-->
            <div style="margin-bottom: 12px;">
                <h2 style="color:#CB2127;">Pantry</h2>
                ${this.renderItems(this.itemsBySection("pantry"))}
            </div>

            <!--Fridge -->
            <div style="margin-bottom: 12px;">
                <h2 style="color:#CB2127;">Fridge</h2>
                ${this.renderItems(this.itemsBySection("fridge"))}
            </div>

            <!-- Freezer -->
            <div style="margin-bottom: 12px;">
                <h2 style="color:#CB2127;">Freezer</h2>
                ${this.renderItems(this.itemsBySection("freezer"))}
            </div>

            <!-- Recipe sections -->
            ${this.recipeTitles.map(title => html`
                <div style="margin-bottom: 12px;">
                    <h2 style="color:#CB2127;">${title}</h2>
                    ${this.renderItems(this.recipeSection(title))}
                </div>
            `)}
            <!---->

            


        </div>
    `;
  }
}

customElements.define("grocery-list", GroceryList);