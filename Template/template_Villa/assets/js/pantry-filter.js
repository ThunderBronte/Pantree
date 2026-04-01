import { LitElement, css, html } from "lit";

class PantryFilter extends LitElement {
    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static get tag() {
        return "pantry-filter";
    }

    static get properties() {
        return {
            active: {type: String}
        }
    }

    constructor() {
        super();
        this.active = "all";
    }

    selectFilter(type) {
        this.active = type;
        this.dispatchEvent(
        new CustomEvent("filter-change", {
            detail: type,
            bubbles: true,
            composed: true
        })
        );
    }

    static get styles() {
        return css`
        div {
            display: flex;
            flex-wrap: wrap;
            margin: 24px;
            gap: 12px;
        }
        button {
            background-color: #1E1E1E;
            color: white;
            border: none;
            padding: 12px 48px;
            border-radius: 40px;
            font-size: 12px;
            font-weight: medium;
            cursor: pointer;
        }
        button.is_active {
            background-color: #CB2127;
        }  
        `
    }

    render() {
        return html`
            <div class="properties-filter">
                ${["all", "dairy", "meat", "grains", "produce"].map(
                    type => html`
                    <button
                        class=${this.active === type ? "is_active" : ""}
                        @click=${() => this.selectFilter(type)}>
                        ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                `)}
            </div>
        `
    }

}

customElements.define(PantryFilter.tag, PantryFilter);