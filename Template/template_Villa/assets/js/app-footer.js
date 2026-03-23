import { LitElement, html, css } from "https://unpkg.com/lit@3/index.js?module";
//import RecipesIcon from '../images/recipes.svg';

const FOOTER_LINKS = [
    {name: 'Home', path: '/', icon: 'assets/images/home.svg'},
    {name: 'My Pantry', path: '/pantry', icon: 'assets/images/pantry.svg'},
    {name: 'My Lists', path: '/my-lists', icon: 'assets/images/list.svg'},
    {name: 'Recipes', path: '/recipes', icon: ''},
    {name: 'Profile', path: '/profile', icon: 'assets/images/profile.svg'},
];


class AppFooter extends LitElement {

    static get tag() {
        return "app-footer";
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
        return path.replace('/#', '') || '/';
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
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            z-index: 1000;
            background: white;
            border-top: 1px solid #e5e5e5;
            }

            nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 8px 0;
            }

            .nav-item {
            justify-items: center;
            flex: 1;
            text-align: center;
            color: #666;
            font-size: 12px;
            cursor: pointer;
            text-decoration: none;
            }

            .nav-item img {
            display: block;
            font-size: 20px;
            margin-bottom: 4px;
            }

            .nav-item.active {
            color: #ff7a00; /* match your brand */
            }
        `;
    }

    render() {
        return html`
            <nav>
            ${FOOTER_LINKS.map(
                (link) => html`
                <div
                    class="nav-item ${this._isActive(link.path) ? 'active' : ''}"
                    @click=${() => this._go(link.path)}
                >
                    <img
                    src="${link.icon}"
                    alt="${link.name}"
                    class="icon"
                    >
                    <span>${link.name}</span>
                </div>
                `
            )}
            </nav>
        `;
}

}

//declare as a callable html element
customElements.define(AppFooter.tag, AppFooter);