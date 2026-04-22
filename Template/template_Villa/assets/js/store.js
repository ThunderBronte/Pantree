import { LitElement, html, css } from "lit";

class Store extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static get tag() {
        return "store";
    }

    static get properties() {
        return {
            store: { type: Object }
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
                background-color: #CB2127;
                color: white;
                align-items: center;
                gap: 48px;
                border-radius: 8px;
                margin: 12px 0px;
                justify-content: space-between;
                padding: 16px 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
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

    render() { 
        const count = this.store.count.length;

        return html`
            <div class="card">
                <div>
                    <h4>${this.store.name}</h4>
                    <p>${this.item.location}</p>
                    
                </div>

                <div class="div-right">

                    <div style="text-align: center; align-items: center;">
                    <div><h4 style="color: #CB2127">Go To Store</h4></div>
                    </div>

                    <button @click=${() => this.increase()}>+</button>
                </div>
            </div>
        `;
    }
}

//declare as a callable html element
customElements.define(PantryItem.tag, PantryItem);