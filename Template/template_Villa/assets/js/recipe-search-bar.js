import { LitElement, html, css } from "lit";

class RecipeSearchBar extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot();
    }

    static get tag() {
        return "recipe-search-bar";
    }

    static get properties() {
        return {
            query: { type: String }
        };
    }

    constructor() {
        super();
        this.query = "";
    }

    onInput(e) {
        this.query = e.target.value;
        const appRecipes = document.querySelector("app-recipes");
        if (appRecipes) {
            appRecipes.searchQuery = this.query;
        }
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
        `
    }

    render() {
        return html`
            <div class="wrapper">
                <span><img src="/assets/images/search.svg"></span>
                <input type="text" placeholder="Search recipes..." .value=${this.query} @input=${this.onInput}/>
            </div>
        `
    }

}

customElements.define(RecipeSearchBar.tag, RecipeSearchBar);
