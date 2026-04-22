import { LitElement, html, css } from "lit";
import "./search-bar.js";

const TYPE_ICONS = {
    Dairy: 'assets/images/milk-box.png',
    Meat: 'assets/images/proteins.png',
    Greens: 'assets/images/vegetable.png',
    Fruit: 'assets/images/harvest.png',
    Oil: 'assets/images/olive-oil.png',
    Grains: 'assets/images/rice.png'
}

export class AddItemButton extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static properties = {
        status: { type: String },
        selectedItem: {type: Object}
    };

    constructor() {
        super();
        this.status = "closed";
        this.selectedItem = null;
    }

    static styles = css`
        button {
            background-color: #CB2127;
            color: white;
            border: none;
            padding: 12px 48px;
            border-radius: 40px;
            font-size: 16px;
            font-weight: medium;
            cursor: pointer;
        }

        .back-button {
            background-color: #1E1E1E;
        }

        .modal {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .card {
            display: flex;
            flex-direction: column;
            background: white;
            padding: 16px;
            border-radius: 8px;
            width: 300px;
            justify-items: center;
        }
        img {
            width: 64px;
        }

        input, select {
            width: 100%;
            margin-bottom: 8px;
            padding: 6px;
        }
    `;

    getTypeIcon(type) {
        return TYPE_ICONS[type] ?? 'assets/images/default.png';
    }

    openCard() {
        this.status = "open";
    }
    openForm() {
        this.status = "add"
    }
    back() {
        this.status = "open";
    }
    closeCard() {
        this.status = "closed";
    }

    submit(e) {
        e.preventDefault();

        const form = e.target;

        //get the exact info from the date
        const expDateStr = form.expDate.value;
        const expDateObj = new Date(expDateStr);
        
        const expYear = expDateObj.getFullYear();
        const expMonth = expDateObj.getMonth() + 1;
        const expDay = expDateObj.getDate();  

        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const expMonthName = monthNames[expDateObj.getMonth()];


        const item = {
        id: crypto.randomUUID(),
        name: form.name.value,
        type: form.type.value,
        unit: form.unit.value,
        section: form.section.value || "pantry",
        added: new Date(),
        singleCost: 0,
        isFav: false,
        count: [
            {
                expDate: form.expDate.value,
            expMonth: expMonthName,
            expDay: expDay,
            expYear: expYear,
            expOnOpen: 7
            }
        ]
        };

        // this.dispatchEvent(
        // new CustomEvent("add-item", {
        //     detail: item,
        //     bubbles: true,
        //     composed: true
        // })
        // );

        // this.dispatchEvent(new CustomEvent("add-item", {
        //     detail: { newItem: item },
        //     bubbles: true,
        //     composed: true
        // }));

        this.dispatchEvent(new CustomEvent("add-item", {
            detail: {
                newItem: item,
                originalItemId: this.selectedItem?.id
            },
            bubbles: true,
            composed: true
        }));

        this.closeCard();
    }

    onItemSelected(e) {
        this.selectedItem = e.detail;
        this.status = "add"; // reuse the form view
    }

    defaultExpDate(item) {
        const existing = item?.count?.[0]?.expDate;
        if (existing) return existing;
        const expOnOpen = item?.count?.[0]?.expOnOpen ?? 7;
        const d = new Date();
        d.setDate(d.getDate() + expOnOpen);
        return d.toISOString().split("T")[0];
    }

    render() {
        return html`
        <button @click=${this.openCard}>+ Add Item</button>

        ${this.status !== "closed" ? html`
            
            <div class="modal" @click=${this.closeCard}>
                <div class="card" @click=${e => e.stopPropagation()}>

                    ${this.status === "open" ? html`
                        <search-bar
                            @item-selected=${this.onItemSelected}>
                        </search-bar>
                        <button @click=${this.openForm}>New Item</button>
                    `
                    : html`
                    <!--form for item detail that needs revising for styles-->
                        <form @submit=${this.submit}>
                            
                            ${this.selectedItem?.type ? html`
                            <img
                                class="item-icon"
                                src=${this.getTypeIcon(this.selectedItem.type)}
                                alt=${this.selectedItem.type}
                            />
                            ` : null}

                            <input name="name" placeholder="Type Name" required .value=${this.selectedItem?.name ?? ""}/>
                            <select name="type">
                                <option value="" disabled selected>Select Type</option>
                                <option value="Dairy" ?selected=${this.selectedItem?.type === "Dairy"}>Dairy</option>
                                <option value="Meat" ?selected=${this.selectedItem?.type === "Meat"}>Meat</option>
                                <option value="Grains" ?selected=${this.selectedItem?.type === "Grains"}>Grains</option>
                                <option value="Produce" ?selected=${this.selectedItem?.type === "Produce"}>Produce</option>
                                <option value="Spice" ?selected=${this.selectedItem?.type === "Spice"}>Spice</option>
                            </select>

                            <select name="unit">
                                <option value="" disabled selected>Select Unit</option>
                                <option value="bag" ?selected=${this.selectedItem?.unit === "bag"}>Bag</option>
                                <option value="box" ?selected=${this.selectedItem?.unit === "box"}>Box</option>
                                <option value="block" ?selected=${this.selectedItem?.unit === "block"}>Block</option>
                                <option value="gallon" ?selected=${this.selectedItem?.unit === "gallon"}>Gallon</option>
                                <option value="each" ?selected=${this.selectedItem?.unit === "each"}>Each</option>
                                <option value="quart" ?selected=${this.selectedItem?.unit === "quart"}>Quart</option>
                                <option value="liter" ?selected=${this.selectedItem?.unit === "liter"}>Liter</option>
                                <option value="lbs" ?selected=${this.selectedItem?.unit === "lbs"}>lbs</option>
                                <option value="floz" ?selected=${this.selectedItem?.unit === "floz"}>floz</option>
                                <option value="oz" ?selected=${this.selectedItem?.unit === "oz"}>oz</option>
                                <option value="mg" ?selected=${this.selectedItem?.unit === "mg"}>mg</option>
                                <option value="g" ?selected=${this.selectedItem?.unit === "g"}>g</option>
                            </select>

                            <select name="section">
                                <option value="" disabled selected>Select Section</option>
                                <option value="pantry" ?selected=${this.selectedItem?.section === "pantry"}>Pantry</option>
                                <option value="fridge" ?selected=${this.selectedItem?.section === "fridge"}>Fridge</option>
                                <option value="freezer" ?selected=${this.selectedItem?.section === "freezer"}>Freezer</option>
                            </select>

                            <label>Expiration Date: </label>
                            <input name="expDate" type="date" .value=${this.defaultExpDate(this.selectedItem)}>

                            <div style="display: flex; justify-content: space-between;">
                                <button class="back-button" @click=${this.back}>Back</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    `}
                    
                    
                </div>
            </div>
        ` : this.status === "add" ? html`
            <div class="modal" @click=${this.closeCard}>
                <div class="card" @click=${e => e.stopPropagation()}>
                    
                </div>
            </div>
        `: null}
        `;
    }
}

customElements.define("add-item-button", AddItemButton);