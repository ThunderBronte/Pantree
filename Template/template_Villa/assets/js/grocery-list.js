import { LitElement, html } from "lit";
import "./grocery-item.js";

export class GroceryList extends LitElement {
  static properties = {
    items: { type: Array },
    filterType: { type: String }
  };

  constructor() {
    super();
    this.items = [];
    this.filterType = 'all'
  }

  addItem(itemDetail) {
    const newItem = itemDetail.newItem || itemDetail;
    this.items = [...this.items, newItem];
    this.savedItems();
  }

  async connectedCallback() {
    super.connectedCallback();
    const savedItems = localStorage.getItem("pantry-items");
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
    localStorage.setItem("pantry-items", JSON.stringify(this.items));
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


  renderItems(items) {
    
    if (!items || items.length === 0) {
      return html`<p class="empty">No Items Yet!</p>`;
    }

    return items.map(
        item => html`
            <grocery-item
            .item=${item}
            @increase=${() => this.increaseItem(item.id)}
            @decrease=${() => this.decreaseItem(item.id)}
            @add-to-fridge=${this.handleCheckItem}>
            </grocery-item>
        `
    );
    }

    handleCheckItem(e) {
        const selectedItem = e.detail.item;

        const modal = this.renderRoot.querySelector("#addItemModal");
        if (modal) {
            // Pre-fill modal with selected item
            modal.selectedItem = {
            ...selectedItem,
            count: [{ expDate: "" }] 
            };
            modal.status = "add";
        }
    }

    handleAddItem(e) {
        const { newItem, originalItemId } = e.detail;

        // Ensure newItem has an id and section
        if (!newItem.id) newItem.id = crypto.randomUUID();
        if (!newItem.section) newItem.section = "fridge";

        // Add new item to the list
        this.items = [...this.items, newItem];

        // Remove the original item ONLY if originalItemId exists
        if (originalItemId) {
            this.items = this.items.filter(item => item.id !== originalItemId);
        }

        this.savedItems();
        }


  render() {

    
    return html`
        <add-item-button @add-item=${e => this.addItem(e.detail)}></add-item-button>
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
            <!---->

            


        </div>
    `;
  }
}

customElements.define("grocery-list", GroceryList);