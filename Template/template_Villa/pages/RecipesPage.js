import { html } from "lit";
import "../assets/js/recipe-filter.js";
import "../assets/js/recipes.js";
import "../assets/js/recipe-search-bar.js";

export default function RecipesPage() {
  const onFilterChange = (e) => {
    const recipes = document.querySelector("app-recipes");
    if (recipes) {
      recipes.filterTag = e.detail;
    }
  };

  return html`
    <div class="section properties" style="margin-bottom:48px; margin-top:48px;">

      <div class="container">
        <recipe-search-bar></recipe-search-bar> <!--fix searchbar to work for recipes or create special one-->
        <recipe-filter @filter-change=${onFilterChange}></recipe-filter>
        <app-recipes></app-recipes>
        <section class="section"></section>
      </div>
    </div>
    
  `;
}