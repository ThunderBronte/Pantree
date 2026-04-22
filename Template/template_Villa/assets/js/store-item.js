import { LitElement, html, css } from "lit";

export class StoreItem extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static get tag() {
        return "store-item";
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
                color: white;
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
        `;
    }

    // increase() {
    //     this.dispatchEvent(new CustomEvent("increase", { bubbles: true }));
    // }
    // decrease() {
    //     this.dispatchEvent(new CustomEvent("decrease", { bubbles: true }));
    // }
    

    // openAddItem() {
    //     this.dispatchEvent(new CustomEvent("add-to-fridge", {
    //         detail: { item: this.item },
    //         bubbles: true,
    //         composed: true
    //     }));
    //     console.log("button clicked");
    // }

    // render() { 
    // const count = this.item.count?.length || 0;
    // //const count = this.item.count || 0;
    // }

    render() { 
        return html`
            <div class="card">
            <h3>${this.item.name}</h3>
            <p>${this.item.location} away</p>
            </div>
        `;
    } 
}

customElements.define("store-item", StoreItem);