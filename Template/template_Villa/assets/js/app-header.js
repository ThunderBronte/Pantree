import { LitElement, html, css } from "lit";

class AppHeader extends LitElement {

    createRenderRoot() {
        return this; // disables Shadow DOM
    }

    static get tag() {
        return "app-header";
    }

    static get properties() {
        return {
            currentPath: { type: String },
            onNavigate: { attribute: false},
            user: { attribute: false}
        };
    }

    constructor() {
        super();
        this.currentPath = "/";
        this.onNavigate = (path) => {
            window.location.hash = path;
        };
        this.user = null;
    }

    _base(path) {
        if (!path) return '/';
        return path.split('#')[0] || '/';
    }

    _isActive(path) {
        const current = this._base(this.currentPath);
        return path === '/' ? current === '/' : current.startsWith(path);
    }

    _go(path) {
        if (typeof this.onNavigate === 'function') {
            this.onNavigate(path);
        }

        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { path },
                bubbles: true,
                composed: true,
            })
        );
    }

    static get styles() {
        return css`
            :host {
                display: block;
                width: 100%;
                color: black;
                background-color: #E4C9B2;
                //font-family: "K2D Mono";
            }
            nav#container {
                display: flex;
                background-color: white;
                align-items: center;
                gap: 24px;
                margin-inline: auto;
                justify-content: space-between;
                padding: 12px 24px;
                box-sizing: border-box;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
        `;
    }

    render() {
    return html`
        <div class="main-nav">
            <a href="/" class="logo" style="display: flex; align-items: center; gap: 10px;">
                <img src="./assets/images/Logo.svg" alt="Pantree Logo" width="40" height="40">
                <h1 style="color: #CB2127">Pantree</h1>
            </a>

            <a class="menu-trigger">
                <span>Menu</span>
            </a>
        </div>
    `;
}
}

//declare as a callable html element
customElements.define(AppHeader.tag, AppHeader);