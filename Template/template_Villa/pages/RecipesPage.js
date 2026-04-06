import { html } from "lit";
import "../assets/js/recipe-filter.js";
import "../assets/js/recipes.js";

export default function RecipesPage() {
  const onFilterChange = (e) => {
    const recipes = document.querySelector("app-recipes");
    if (recipes) {
      recipes.filterTag = e.detail;
    }
  };

  return html`
    <recipe-filter @filter-change=${onFilterChange}></recipe-filter>
    <app-recipes></app-recipes>
  `;
}