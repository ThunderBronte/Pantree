// This file handles page navigation and connects slugs to pages
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import HomePage from "./pages/Home";
import RecipesPage from "./pages/Recipes";
import PantryPage from "./pages/Pantry";
import MyLists from "./pages/MyLists";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import ProfileEditPage from "./pages/ProfileEdit";

import "./assets/js/app-footer.js";

@customElement("app-root")
export class App extends LitElement {
  constructor() {
    super();
    this.currentPath = this.getPathFromHash();

    // Bind handlers so `this` works correctly
    this.handleHashChange = this.handleHashChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.handleHashChange);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.handleHashChange);
    super.disconnectedCallback();
  }

  getPathFromHash() {
    const fullHash = window.location.hash.slice(1) || "/";
    return fullHash.split("#")[0];
  }

  handleHashChange() {
    this.currentPath = this.getPathFromHash();
    this.requestUpdate();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  navigate(path) {
    if (!path.startsWith("/")) path = "/" + path;

    if (window.location.hash !== `#${path}`) {
      window.location.hash = path;
    } else {
      this.currentPath = this.getPathFromHash();
      this.requestUpdate();
    }
  }

  renderPage() {
    const basePath = this.currentPath || "/";

    switch (true) {
      case basePath === "/":
        return HomePage({ currentPath: this.currentPath });

      case basePath.startsWith("/pantry"):
        return PantryPage({ currentPath: this.currentPath });

      case basePath.startsWith("/my-lists"):
        return MyLists({ currentPath: this.currentPath });

      case basePath.startsWith("/recipes"):
        return RecipesPage({ currentPath: this.currentPath });

      case basePath.startsWith("/login"):
        return LoginPage({ currentPath: this.currentPath });

      case basePath.startsWith("/profile/edit"):
        return ProfileEditPage({ currentPath: this.currentPath });

      case basePath.startsWith("/profile"):
        return ProfilePage({ currentPath: this.currentPath });

      default:
        return HomePage({ currentPath: this.currentPath });
    }
  }

  render() {
    return html`
      <div class="container">
        <nav-bar
          .currentPath=${this.currentPath}
          .onNavigate=${this.navigate}
        ></nav-bar>

        <main class="content">
          ${this.renderPage()}
        </main>
      </div>

      <app-footer></app-footer>
    `;
  }
}