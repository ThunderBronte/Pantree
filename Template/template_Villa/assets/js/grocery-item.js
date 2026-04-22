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
            item: { type: Object },
            checked: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.checked = false;
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
                gap: 12px;
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
            button.check-btn.checked {
                background-color: #CB2127;
                color: white;
            }
            h4.crossed {
                text-decoration: line-through;
                color: #aaa;
            }
            h4.recipe-used {
                color: #CB2127;
            }
            .used-in-caption {
                font-size: 10px;
                font-style: italic;
                color: #CB2127;
                margin: 4px 0 0 0;
                line-height: 1.4;
            }
        `;
    }

    increase() {
        this.dispatchEvent(new CustomEvent("increase", { bubbles: true }));
    }
    decrease() {
        this.dispatchEvent(new CustomEvent("decrease", { bubbles: true }));
    }

    toggleCheck() {
        this.dispatchEvent(new CustomEvent("toggle-check", { bubbles: true }));
    }

    render() { 
    const count = this.item.count?.length || 0;
    //const count = this.item.count || 0;

    return html`
        <div class="card">
            <div>
                <h4 class=${this.checked ? "crossed" : this.item.usedInRecipe ? "recipe-used" : ""}>${this.item.name}</h4>
                <p>${this.item.type}</p>
                ${this.item.usedInRecipe
                    ? html`<p class="used-in-caption">Used in ${this.item.usedInRecipe}</p>`
                    : null}
            </div>

            <div class="div-right">
                <button @click=${() => this.decrease()}>-</button>

                <div style="text-align: center;">
                    <h4 style="color: #CB2127">${count}</h4>
                    <p>${this.item.unit}</p>
                </div>

                <button @click=${() => this.increase()}>+</button>

                <button class=${this.checked ? "check-btn checked" : "check-btn"} @click=${this.toggleCheck}>✔</button>

            </div>
        </div>
    `;
    }
}

//declare as a callable html element
customElements.define(GroceryItem.tag, GroceryItem);