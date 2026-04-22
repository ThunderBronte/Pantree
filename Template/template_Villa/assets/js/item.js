import { LitElement, html, css } from "lit";

class PantryItem extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static get tag() {
        return "pantry-item";
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
            div.card.expiring {
                border: 2px solid #CB2127;
            }
            div.card.expired {
                background-color: #FFC1C3;
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
            .name-row {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .icon-btn {
                background-color: #F3E5D9;
                color: #705B48;
                border: none;
                border-radius: 40px;
                width: 26px;
                height: 26px;
                font-size: 12px;
                cursor: pointer;
                padding: 0;
                flex-shrink: 0;
                line-height: 1;
            }
            .icon-btn.is-fav {
                background-color: #CB2127;
                color: white;
            }
            .tooltip-wrap {
                position: relative;
                display: inline-flex;
            }
            .tooltip-wrap .tooltip {
                visibility: hidden;
                opacity: 0;
                background-color: #1E1E1E;
                color: white;
                font-size: 10px;
                border-radius: 4px;
                padding: 4px 8px;
                position: absolute;
                bottom: calc(100% + 6px);
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                transition: opacity 0.15s;
                pointer-events: none;
                z-index: 10;
            }
            .tooltip-wrap:hover .tooltip {
                visibility: visible;
                opacity: 1;
            }
        `;
    }

    increase() {
        this.dispatchEvent(new CustomEvent("increase", { bubbles: true }));
    }
    decrease() {
        this.dispatchEvent(new CustomEvent("decrease", { bubbles: true }));
    }
    edit() {
        this.dispatchEvent(new CustomEvent("edit-item", {
            detail: { item: this.item },
            bubbles: true,
            composed: true
        }));
    }
    toggleFav() {
        this.dispatchEvent(new CustomEvent("toggle-fav", { bubbles: true }));
    }
    rewind() {
        this.dispatchEvent(new CustomEvent("rewind-item", { bubbles: true }));
    }

    isExpSoon(exp) {
        const expDate = new Date(`${exp.expMonth} ${exp.expDay}, ${exp.expYear}`);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        const diffMs = expDate - today;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        const section = this.item?.section?.toLowerCase();
        const threshold = (section === "fridge" || section === "freezer") ? 3 : 7;

        return diffDays >= 0 && diffDays <= threshold;
    }

    isExp(exp) {
        const expDate = new Date(`${exp.expMonth} ${exp.expDay}, ${exp.expYear}`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diffMs = expDate - today;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        return diffDays <= 0;
    }

    render() { 
        const count = this.item.count.length;
        const exp = this.item.count[0];

        const expiringSoon = this.isExpSoon(exp);

        const expired = this.isExp(exp);

        return html`
            <div class="card ${expiringSoon ? 'expiring': ''} ${expired ? 'expired': ''}">
                <div>
                    <div class="name-row">
                        <h4>${this.item.name}</h4>
                        <button class=${this.item.isFav ? "icon-btn is-fav" : "icon-btn"} @click=${() => this.toggleFav()}>♥</button>
                        ${this.item.isFav ? html`
                            <span class="tooltip-wrap">
                                <button class="icon-btn" @click=${() => this.rewind()}>↺</button>
                                <span class="tooltip">Reset expiration to shelf life</span>
                            </span>` : null}
                    </div>

                ${(expiringSoon || expired) ? html`
                    <span class="expiring-badge">
                        ${expired ? 'EXPIRED' : 'EXPIRING SOON'}
                    </span>
                    ` : null}


                    ${(expiringSoon || expired) ? html`
                    <p>
                        ${this.item.type} | ${expired ? 'Expired' : 'Expires'} ${exp.expMonth} ${exp.expDay}
                    </p>
                    ` : html`
                    <p>${this.item.type} | Expires on ${exp.expMonth} ${exp.expDay}, ${exp.expYear}</p>
                    `}
                    
                </div>

                <div class="div-right">
                    <button @click=${() => this.decrease()}>-</button>

                    <div style="text-align: center; align-items: center;">
                    <div><h4 style="color: #CB2127">${count}</h4></div>
                    <p>${this.item.unit}</p>
                    </div>

                    <button @click=${() => this.increase()}>+</button>
                    <button @click=${() => this.edit()}>✎</button>
                </div>
            </div>
        `;
    }
}

//declare as a callable html element
customElements.define(PantryItem.tag, PantryItem);