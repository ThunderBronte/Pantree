import { LitElement, html, css } from "lit";
import "./search-bar.js";

export class AddItemButton extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static properties = {
        open: { type: Boolean }
    };

    constructor() {
        super();
        this.open = false;
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

    openForm() {
        this.open = true;
    }

    closeForm() {
        this.open = false;
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
            expMonth: form.expMonth.value,
            expDay: Number(form.expDay.value),
            expYear: Number(form.expYear.value),
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

        this.closeForm();
    }

    render() {
        return html`
        <button @click=${this.openForm}>+ Add New Item</button>

        ${this.open ? html`
            <search-bar></search-bar>
            <div class="modal" @click=${this.closeForm}>
            <div class="card" @click=${e => e.stopPropagation()}>
                <form @submit=${this.submit}>
                <input name="name" placeholder="Name" required />
                <input name="type" placeholder="Type" />
                <input name="unit" placeholder="Unit" />
                <select name="section">
                    <option value="pantry">Pantry</option>
                    <option value="fridge">Fridge</option>
                    <option value="freezer">Freezer</option>
                </select>

                <input name="expMonth" placeholder="Month (e.g. April)" />
                <input name="expDay" type="number" placeholder="Day" />
                <input name="expYear" type="number" placeholder="Year" />

                <button type="submit">Save</button>
                </form>
            </div>
            </div>
        ` : null}
        `;
    }
}

customElements.define("add-item-button", AddItemButton);