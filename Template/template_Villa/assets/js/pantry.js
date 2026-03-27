import { LitElement, html } from "lit";
import "./item.js";

export class AppPantry extends LitElement {
  static properties = {
    items: { type: Array },
    filterType: { type: String }
  };

  constructor() {
    super();
    this.items = [];
    this.filterType = 'all'
  }

  async connectedCallback() {
    super.connectedCallback();
    const res = await fetch("../../user-items.json");
    const data = await res.json();
    this.items = data.items;
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
            count: [...item.count, { ...item.count[0] }]
          }
        : item
    );
  }

  decreaseItem(id) {
    this.items = this.items
      .map(item =>
        item.id === id
          ? { ...item, count: item.count.slice(0, -1) }
          : item
      )
      .filter(item => item.count.length > 0);
  }

  
  itemsBySection(section= string) {
    return this.filterByType(this.items.filter(item => item.section.toLowerCase() === section));
  }


  renderItems(items) {
    return items.map(
        item => html`
          <grocery-item
            .item=${item}
            @increase=${() => this.increaseItem(item.id)}
            @decrease=${() => this.decreaseItem(item.id)}
          ></grocery-item>
        `
    )
    }

  render() {
    return html`
        <div class="row properties-box">

            <!--Pantry-->
            <div style="margin-bottom: 12px;">
                <h2 style="color:#CB2127;">Pantry</h2>
                ${this.renderItems(this.itemsBySection("pantry"))}
            </div>

            <!--Fridge-->
            <div style="margin-bottom: 12px;">
                <h2 style="color:#CB2127;">Fridge</h2>
                ${this.renderItems(this.itemsBySection("fridge"))}
            </div>

            <!--Freezer-->
            <div style="margin-bottom: 12px;">
                <h2 style="color:#CB2127;">Freezer</h2>
                ${this.renderItems(this.itemsBySection("freezer"))}
            </div>

        </div>
    `;
  }
}

customElements.define("app-pantry", AppPantry);