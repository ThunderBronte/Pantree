import { LitElement, html, css } from "lit";

class GroceryItem extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static get tag() {
        return "grocery-item";
    }

    static get properties() {
        return {
            item: { type: Object }
        };
    }

    constructor() {
        super();
    }

    

    static get styles() {
        return css`
            :host {
                display: block;
                width: 100%;
            }
            div.card {
                display: flex;
                background-color: white;
                align-items: center;
                gap: 48px;
                border-radius: 8px;
                margin: 12px 0px;
                justify-content: space-between;
                padding: 16px 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            /*div.card.expiring {
                border: 2px solid #CB2127;
            }
            .expiring-badge {
                display: inline-block;
                background-color: #CB2127;
                color: white;
                font-size: 8px;
                padding: 0px 6px;
                border-radius: 10px;
                margin: 4px 0px;
                font-weight: bold;
                width: fit-content;
            } */
            p {
                font-size: 10px; 
                color: #666;
                line-height: 0px;
            }
            h4 {
                margin: 0px;
            }
            .div-right {
                display: flex; 
                align-items: center; 
                gap: 24px;
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
        `;
    }

    increase() {
        this.dispatchEvent(new CustomEvent("increase", { bubbles: true }));
    }
    decrease() {
        this.dispatchEvent(new CustomEvent("decrease", { bubbles: true }));
    }
    

    openAddItem() {
        this.dispatchEvent(new CustomEvent("add-to-fridge", {
            detail: { item: this.item },
            bubbles: true,
            composed: true
        }));
    }

    render() { 
    const count = this.item.count?.length || 0;
    //const count = this.item.count || 0;

    return html`
        <div class="card">
            <div>
                <h4>${this.item.name}</h4>
                <p>${this.item.type}</p>
            </div>

            <div class="div-right">
                <button @click=${() => this.decrease()}>-</button>

                <div style="text-align: center;">
                    <h4 style="color: #CB2127">${count}</h4>
                    <p>${this.item.unit}</p>
                </div>

                <button @click=${() => this.increase()}>+</button>


                <div class="div-right">
                    <button @click=${this.openAddItem}>✔</button>
                </div>
            </div>
        </div>
    `;
    }
}

//declare as a callable html element
customElements.define(GroceryItem.tag, GroceryItem);