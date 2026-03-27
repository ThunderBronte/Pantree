import { LitElement, html, css } from "lit";

class SearchBar extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static get tag() {
        return "search-bar";
    }

    static get properties() {
        return {
            query: {type: String},
            items: {type: Array},
            filtered: {type: Array}
        };
    }

    constructor() {
        super();
        this.query = "";
        this.items = [];
        this.filtered = [];
    }

    async connectedCallback() {
        super.connectedCallback();
        const res = await fetch("../../items.json");
        const data = await res.json();
        this.items = data.items;
        this.filtered = data.items;
    }

    onInput(e) {
        this.query = e.target.value.toLowerCase();
        this.filtered = this.items.filter(item =>
            item.name.toLowerCase().includes(this.query)
        );
    }

    selectItem(item) {
        this.dispatchEvent(
            new CustomEvent("item-selected", {
                detail: item,
                bubbles: true,
                composed: true
            })
        );
    }

    static get styles() {
        return css`
        :host {
            margin-bottom: 24px;
        }
            div.wrapper {
                display: flex;
                gap: 24px;
                border-radius: 40px;
                text-align: center;
                background-color: #F3E5D9;
                padding: 10px 24px;
                font-size: 16px;
            }
            img {
                height: 24px;
            }
            input {
                font-style: italic; 
                color:#705B48; 
                font-size: 16px;
                background: none; 
                border:none;
                width: 100%;
            }
            input:focus {
                outline: none;
            }
            ul {
                list-style: none;
                padding: 0;
                margin: 8px;
            }
            li {
                cursor: pointer;
                padding: 6px 6px;
            }
            li:hover {
                font-weight: bold;
            }
        `
    }

    render() {
        return html`
            <div class="wrapper">
                <span><img src="/assets/images/search.svg"></span>
                <input type="text" placeholder="Search..." @input=${this.onInput}/>
            </div>
            <div>
                ${this.query
                    ? html`
                        <ul>
                            ${this.filtered.map(
                                item => html`
                                    <li @click=${() => this.selectItem(item)}>
                                        ${item.name}
                                    </li>
                                `
                            )}
                        </ul>
                    ` : null
                }
            </div>
        `
    }

}

customElements.define(SearchBar.tag, SearchBar);