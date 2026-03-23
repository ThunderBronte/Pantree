import { LitElement, html, css } from "https://unpkg.com/lit@3/index.js?module";

const NAV_LINKS = [
    {name: 'home', path: '/'},
    {name: 'communities', path: '/communities'},
    {name: 'libraries', path: '/libraries'},
    {name: 'profile', path: '/profile'},
];


class NavBar extends LitElement {

    createRenderRoot() {
        return this; // disables Shadow DOM
    }

    static get tag() {
        return "nav-bar";
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
        <nav class="main-nav">
            <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 10px;">
                <img src="./assets/images/Logo.svg" alt="Pantree Logo" width="40" height="40">
                <h1>Pantree</h1>
            </a>

            

            <a class="menu-trigger">
                <span>Menu</span>
            </a>
        </nav>
    `;
}
}

//declare as a callable html element
customElements.define(NavBar.tag, NavBar);