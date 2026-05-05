import { LitElement, html, css } from "lit";
import "./search-bar.js";
import {profileStore} from "./profile-store.js";
import { onSignOut } from "./profileHandlers.js";
import {renderAuth} from "./user-auth.js";

export class LoginButton extends LitElement {

    createRenderRoot() {
        return super.createRenderRoot(); // disables Shadow DOM
    }

    static properties = {
        mode: { type: String },
        showAuth: {type: Boolean}
    };

    constructor() {
        super();
        this.mode = "create";
        this.showAuth = false;
    }

    static styles = css`
        button {
            background-color: #CB2127;
            color: white;
            border: none;
            padding: 12px 48px;
            border-radius: 40px;
            font-size: 16px;
            font-weight: medium;
            cursor: pointer;
        }
        .login {
            background-color: #1E1E1E;
        }
        .modal {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .card {
            display: flex;
            flex-direction: column;
            background: white;
            border-radius: 8px;
            width: 300px;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        profileStore.load();

        window.addEventListener("profile-changed", () => {
            this.showAuth = false;
            this.requestUpdate();
        });
    }

    render() {
    
        if (profileStore.loading) {
            return html`<p>Loading...</p>`;
        }
    
        if (profileStore.user) {
            return html`<p>Welcome, ${profileStore.user.name}</p>
            <button @click=${onSignOut}>Sign out</button>`;
        }

        return html`
        <button @click=${() => (this.showAuth = true)} class="${this.mode === "login" ? "login" : 'create'}">
            ${this.mode === "login" ? "Login" : 'Get Started'}
        </button>

        ${this.showAuth ? html`
            <div class="modal" @click=${() => (this.showAuth = false)}>
                <div class="card" @click=${e => e.stopPropagation()}>
                    ${renderAuth(this.mode, () => (this.showAuth = false))}
                </div>
            </div>
        ` : null}`;
    }
}

customElements.define("login-button", LoginButton);