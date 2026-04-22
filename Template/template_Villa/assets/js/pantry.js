import { LitElement, html, css } from "lit";
import "./item.js";

export class AppPantry extends LitElement {
  static properties = {
    items: { type: Array },
    filterType: { type: String },
    _showConfirm: { type: Boolean },
    _editItem: { type: Object }
  };

  static styles = css`
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .remove-btn {
      background-color: #F3E5D9;
      color: #705B48;
      border: none;
      padding: 12px 48px;
      border-radius: 40px;
      font-size: 13px;
      font-style: italic;
      cursor: pointer;
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
    .edit-card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      width: 300px;
      display: flex;
      flex-direction: column;
    }
    .edit-card input, .edit-card select {
      width: 100%;
      margin-bottom: 8px;
      padding: 6px;
      box-sizing: border-box;
    }
    .edit-card label {
      font-size: 13px;
      color: #666;
    }
    .edit-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }
    .edit-save {
      background-color: #CB2127;
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 40px;
      font-size: 16px;
      cursor: pointer;
    }
    .edit-cancel {
      background-color: #1E1E1E;
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 40px;
      font-size: 16px;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.filterType = 'all';
    this._showConfirm = false;
    this._editItem = null;
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
            count: [...item.count, { ...item.count[0] }]
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

  
  getExpDateValue(item) {
    const exp = item?.count?.[0];
    if (!exp) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split("T")[0];
    }
    if (exp.expDate) return exp.expDate;
    if (exp.expYear && exp.expMonth && exp.expDay) {
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const monthIndex = monthNames.indexOf(exp.expMonth);
      if (monthIndex >= 0) {
        const d = new Date(exp.expYear, monthIndex, exp.expDay);
        return d.toISOString().split("T")[0];
      }
    }
    const expOnOpen = exp.expOnOpen ?? 7;
    const d = new Date();
    d.setDate(d.getDate() + expOnOpen);
    return d.toISOString().split("T")[0];
  }

  submitEdit(e) {
    e.preventDefault();
    const form = e.target;
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const expDateStr = form.expDate.value;
    const expDateObj = new Date(expDateStr);

    const updated = {
      ...this._editItem,
      name: form.name.value,
      type: form.type.value,
      unit: form.unit.value,
      section: form.section.value,
      count: this._editItem.count.map((c, i) => i === 0 ? {
        ...c,
        expDate: expDateStr,
        expMonth: monthNames[expDateObj.getMonth()],
        expDay: expDateObj.getDate(),
        expYear: expDateObj.getFullYear()
      } : c)
    };

    this.items = this.items.map(item => item.id === updated.id ? updated : item);
    this._editItem = null;
    this.savedItems();
  }

  toggleFav(id) {
    this.items = this.items.map(item =>
      item.id === id ? { ...item, isFav: !item.isFav } : item
    );
    this.savedItems();
  }

  rewindItem(id) {
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    this.items = this.items.map(item => {
      if (item.id !== id) return item;
      const expOnOpen = item.count[0]?.expOnOpen || 7;
      const newExp = new Date();
      newExp.setDate(newExp.getDate() + expOnOpen);
      return {
        ...item,
        count: item.count.map((c, i) => i === 0 ? {
          ...c,
          expDate: newExp.toISOString().split("T")[0],
          expMonth: monthNames[newExp.getMonth()],
          expDay: newExp.getDate(),
          expYear: newExp.getFullYear()
        } : c)
      };
    });
    this.savedItems();
  }

  isExpired(item) {
    const exp = item.count?.[0];
    if (!exp) return false;
    const expDate = new Date(`${exp.expMonth} ${exp.expDay}, ${exp.expYear}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return expDate - today <= 0;
  }

  removeExpired() {
    this.items = this.items.filter(item => !this.isExpired(item));
    this._showConfirm = false;
    this.savedItems();
  }

  itemsBySection(section= string) {
    return this.filterByType(this.items.filter(item => item.section.toLowerCase() === section));
  }


  renderItems(items) {
    
    if (!items || items.length === 0) {
      return html`<p class="empty">No Items Yet!</p>`;
    }

    return items.map(
        item => html`
          <pantry-item
            .item=${item}
            @increase=${() => this.increaseItem(item.id)}
            @decrease=${() => this.decreaseItem(item.id)}
            @edit-item=${e => { this._editItem = e.detail.item; }}
            @toggle-fav=${() => this.toggleFav(item.id)}
            @rewind-item=${() => this.rewindItem(item.id)}
          ></pantry-item>
        `
    )
    }

  render() {
    return html`
      <div class="top-bar">
        <add-item-button @add-item=${e => this.addItem(e.detail)}></add-item-button>
        ${this.items.some(item => this.isExpired(item))
          ? html`<button class="remove-btn" @click=${() => { this._showConfirm = true; }}>Remove Expired Items</button>`
          : null}
      </div>

      ${this._showConfirm ? html`
        <div class="modal" @click=${() => { this._showConfirm = false; }}>
          <div class="confirm-card" @click=${e => e.stopPropagation()}>
            <h3>Remove Expired Items?</h3>
            <p>This will permanently delete all expired items from your pantry.</p>
            <div class="confirm-actions">
              <button class="confirm-no" @click=${() => { this._showConfirm = false; }}>Cancel</button>
              <button class="confirm-yes" @click=${() => this.removeExpired()}>Remove</button>
            </div>
          </div>
        </div>
      ` : null}

      ${this._editItem ? html`
        <div class="modal" @click=${() => { this._editItem = null; }}>
          <div class="edit-card" @click=${e => e.stopPropagation()}>
            <form @submit=${e => this.submitEdit(e)}>
              <input name="name" placeholder="Item Name" required .value=${this._editItem.name ?? ""} />

              <select name="type">
                <option value="" disabled>Select Type</option>
                <option value="Dairy"   ?selected=${this._editItem.type === "Dairy"}>Dairy</option>
                <option value="Meat"    ?selected=${this._editItem.type === "Meat"}>Meat</option>
                <option value="Grains"  ?selected=${this._editItem.type === "Grains"}>Grains</option>
                <option value="Produce" ?selected=${this._editItem.type === "Produce"}>Produce</option>
                <option value="Spice"   ?selected=${this._editItem.type === "Spice"}>Spice</option>
              </select>

              <select name="unit">
                <option value="" disabled>Select Unit</option>
                <option value="bag"    ?selected=${this._editItem.unit === "bag"}>Bag</option>
                <option value="box"    ?selected=${this._editItem.unit === "box"}>Box</option>
                <option value="block"  ?selected=${this._editItem.unit === "block"}>Block</option>
                <option value="gallon" ?selected=${this._editItem.unit === "gallon"}>Gallon</option>
                <option value="each"   ?selected=${this._editItem.unit === "each"}>Each</option>
                <option value="quart"  ?selected=${this._editItem.unit === "quart"}>Quart</option>
                <option value="liter"  ?selected=${this._editItem.unit === "liter"}>Liter</option>
                <option value="lbs"    ?selected=${this._editItem.unit === "lbs"}>lbs</option>
                <option value="floz"   ?selected=${this._editItem.unit === "floz"}>floz</option>
                <option value="oz"     ?selected=${this._editItem.unit === "oz"}>oz</option>
                <option value="mg"     ?selected=${this._editItem.unit === "mg"}>mg</option>
                <option value="g"      ?selected=${this._editItem.unit === "g"}>g</option>
              </select>

              <select name="section">
                <option value="" disabled>Select Section</option>
                <option value="pantry"  ?selected=${this._editItem.section === "pantry"}>Pantry</option>
                <option value="fridge"  ?selected=${this._editItem.section === "fridge"}>Fridge</option>
                <option value="freezer" ?selected=${this._editItem.section === "freezer"}>Freezer</option>
              </select>

              <label>Expiration Date:</label>
              <input name="expDate" type="date" .value=${this.getExpDateValue(this._editItem)} />

              <div class="edit-actions">
                <button type="button" class="edit-cancel" @click=${() => { this._editItem = null; }}>Cancel</button>
                <button type="submit" class="edit-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      ` : null}

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