import { html } from "lit";
import { GroceryItem } from "../assets/js/item.js";
import { AppPantry } from "../assets/js/pantry.js";
import { AddItemButton } from "../assets/js/add-item-button.js";
import {PantryFilter} from "../assets/js/pantry-filter.js";

export default function PantryPage({ currentPath }) {
  let selectedFilter = "all";
  
  const onFilterChange = (e) => {
    selectedFilter = e.detail;
    document.querySelector("app-pantry").filterType = selectedFilter;
  };

  return html`

  <!--Main Content-->
    <div class="section properties" style="margin:48px">
      <div class="container">
        <add-item-button></add-item-button>

      <!--Search / filter-->
        <pantry-filter
          @filter-change=${onFilterChange}
        ></pantry-filter>

      <!--Groups-->
          <app-pantry .filterType=${selectedFilter}></app-pantry>

        <div class="section"></div>
      </div>
    </div>
  `;
}