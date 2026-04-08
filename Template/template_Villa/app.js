// This file handles page navigation and connects slugs to pages
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import {css} from "@popperjs/core"

import HomePage from "./pages/HomePage.js";
import RecipesPage from "./pages/RecipesPage.js";
import PantryPage from "./pages/PantryPage.js";
import MyLists from "./pages/MyListsPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import LoginPage from "./pages/LoginPage.js";
import RecipeDetailPage from "./pages/RecipeDetailPage.js";
///import ProfileEditPage from "./pages/ProfileEditPage.js";
import './assets/js/app-header.js';

import "./assets/js/app-footer.js";

console.log("app.js loaded");

export class App extends LitElement {
  
createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    console.log("App constructor ran");
    this.currentPath = this.getPathFromHash();

    // Bind handlers so `this` works correctly
    this.handleHashChange = this.handleHashChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.handleHashChange);

    window.addEventListener("profile-changed", () => {
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.handleHashChange);
    super.disconnectedCallback();
  }

  getPathFromHash() {
    return window.location.hash.slice(1) || "/";
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

      case basePath.startsWith("/recipes/"): {
        const slug = basePath
          .replace("/recipes/", "")
          .replace(/\/$/, "");

        return RecipeDetailPage({ slug });
      }

      case basePath.startsWith("/recipes"):
        return RecipesPage({ currentPath: this.currentPath });

      case basePath.startsWith("/login"):
        return LoginPage({ currentPath: this.currentPath });

      //case basePath.startsWith("/profile/edit"):
        //return ProfileEditPage({ currentPath: this.currentPath });

      case basePath.startsWith("/profile"):
        return ProfilePage({ currentPath: this.currentPath });

      default:
        return HomePage({ currentPath: this.currentPath });
    }
  }

  /*render() {
    return html`
      <div class="container">

        <main class="content">
          ${this.renderPage()}
        </main>
      </div>

      <app-footer
      .currentPath=${this.currentPath}
      .onNavigate=${this.navigate}
      >
      </app-footer>
    `;
  }*/

  render() {
  const isHomePage = this.currentPath === "/";

  return html`
    <div class="container">
      <main class="content">
        ${this.renderPage()}
      </main>
    </div>

    ${!isHomePage
      ? html`
          <app-footer
            .currentPath=${this.currentPath}
            .onNavigate=${this.navigate}
          ></app-footer>
        `
      : null}
  `;
}
}

customElements.define("app-root", App);