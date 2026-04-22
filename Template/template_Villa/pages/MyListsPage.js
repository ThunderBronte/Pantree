import { html } from "lit";
import { GroceryItem } from "../assets/js/grocery-item.js";
import { GroceryList } from "../assets/js/grocery-list.js";
import { AddItemButton } from "../assets/js/add-item-button.js";
import { PantryFilter } from "../assets/js/pantry-filter.js";

export default function MyListsPage({ currentPath }) {
  
  let selectedFilter = "all";
  
  const onFilterChange = (e) => {
    selectedFilter = e.detail;
    document.querySelector("app-pantry").filterType = selectedFilter;
  };

  return html`

  <!--Main Content-->
    <div class="section properties" style="margin-bottom:48px; margin-top:48px;">
      <div class="container">
        <!-- Grocery List -->

        <!--Groups-->
        <grocery-list .filterType=${selectedFilter}></grocery-list>

        <div class="section"></div>
      </div>
    </div>
  `;
}