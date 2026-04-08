import { html } from "lit";
import "../assets/js/recipe-filter.js";
import "../recipes.json";

export default function RecipeDetailPage({ slug }) {
  const recipe = recipes.find(r => r.slug === slug);

  
  if (!recipe) {
    return html`<p>Recipe not found</p>`;
  }

  const onFilterChange = (e) => {
    const recipes = document.querySelector("app-recipes");
    if (recipes) {
      recipes.filterTag = e.detail;
    }
  };

  return html`
    <div class="section properties" style="margin-bottom:48px; margin-top:48px;">

      <div class="container">
        <search-bar></search-bar> <!--fix searchbar to work for recipes or create special one-->
        <recipe-filter @filter-change=${onFilterChange}></recipe-filter>
        <app-recipes></app-recipes>
      </div>
      
    </div>
    
  `;
}