import { LitElement, html, css } from "lit";
import "./search-bar.js";

export class AddItemButton extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static properties = {
        status: { type: String }
    };

    constructor() {
        super();
        this.status = "closed";
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
        }

        .card {
            background: white;
            padding: 16px;
            border-radius: 8px;
            width: 300px;
        }

        input, select {
            width: 100%;
            margin-bottom: 8px;
            padding: 6px;
        }
    `;

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

        const item = {
        id: crypto.randomUUID(),
        name: form.name.value,
        type: form.type.value,
        unit: form.unit.value,
        section: form.section.value,
        added: new Date(),
        singleCost: 0,
        isFav: false,
        count: [
            {
                expDate: form.expDate.value,
            expMonth: "",
            expDay: null,
            expYear: null,
            expOnOpen: 7
            }
        ]
        };

        this.dispatchEvent(
        new CustomEvent("add-item", {
            detail: item,
            bubbles: true,
            composed: true
        })
        );

        this.closeCard();
    }

    render() {
        return html`
        <button @click=${this.openCard}>+ Add Item</button>

        ${this.status !== "closed" ? html`
            
            <div class="modal" @click=${this.closeCard}>
                <div class="card" @click=${e => e.stopPropagation()}>

                    ${this.status === "open" ? html`
                        <search-bar></search-bar>
                        <button @click=${this.openForm}>New Item</button>
                    `
                    : html`
                        <form @submit=${this.submit}>
                            <input name="name" placeholder="Type Name" required />
                            <select name="type">
                                <option value="" disabled selected>Select Type</option>
                                <option value="Diary">Dairy</option>
                                <option value="Meat">Meat</option>
                                <option value="Grains">Grains</option>
                                <option value="Produce">Produce</option>
                            </select>

                            <select name="unit">
                                <option value="" disabled selected>Select Unit</option>
                                <option value="bag">Bag</option>
                                <option value="block">Block</option>
                                <option value="gallon">Gallon</option>
                                <option value="quart">Pieces</option>
                                <option value="quart">Quart</option>
                                <option value="liter">Liter</option>
                                <option value="lbs">lbs</option>
                                <option value="floz">floz</option>
                                <option value="oz">oz</option>
                                <option value="mg">mg</option>
                                <option value="g">g</option>
                            </select>

                            <select name="section">
                                <option value="" disabled selected>Select Section</option>
                                <option value="pantry">Pantry</option>
                                <option value="fridge">Fridge</option>
                                <option value="freezer">Freezer</option>
                            </select>

                            <label>Expiration Date: </label>
                            <input name="expDate" type="date">

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