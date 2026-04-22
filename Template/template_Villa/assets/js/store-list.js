import { LitElement, html } from "lit";
import "./store-item.js";

export class StoreList extends LitElement {
  static properties = {
    items: { type: Array }
  };

  constructor() {
    super();
    this.items = [];
  }

  async connectedCallback() {
    super.connectedCallback();

    const saved = localStorage.getItem("store-items");

    if (saved) {
      this.items = JSON.parse(saved);
    } else {
      const res = await fetch("../../store.json");
      const data = await res.json();
      this.items = data.stores;
      this.saveItems();
    }
  }

  saveItems() {
    localStorage.setItem("store-items", JSON.stringify(this.items));
  }

  renderItems(items) {
    if (!items || items.length === 0) {
      return html`<p>No Stores Yet!</p>`;
    }

    return items.map(
      store => html`
        <store-item .item=${store}></store-item>
      `
    );
  }

  render() {
    return html`
      <h2>Stores</h2>
      ${this.renderItems(this.items)}
    `;
  }
}

customElements.define("store-list", StoreList);