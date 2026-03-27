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
        
        `
    }

    render() {
        return html`
            <ul class="properties-filter">
                ${["all", "dairy", "meat", "grains", "produce"].map(
                    type => html`
                <li>
                    <button
                        class=${this.active === type ? "is_active" : ""}
                        @click=${() => this.selectFilter(type)}>
                        ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                </li>
                `)}
            </ul>
        `
    }

}

customElements.define(PantryFilter.tag, PantryFilter);