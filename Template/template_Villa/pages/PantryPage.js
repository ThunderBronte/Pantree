import { html } from "lit";
import { GroceryItem } from "../assets/js/item.js";
import { AppPantry } from "../assets/js/pantry.js";
import { AddItemButton } from "../assets/js/add-item-button.js";

export default function PantryPage({ currentPath }) {
  return html`

  <!--Main Content-->
    <div class="section properties" style="margin:48px">
      <div class="container">

      <!--Search / filter-->
      <div style="display: flex; gap: 24px; border-radius: 40px; text-align: center; background-color: #F3E5D9; padding: 12px 24px; margin-bottom: 24px"><span><img src="/assets/images/search.svg" style="height:24px"></span>
      <input style="font-style: italic; color:#705B48; background: none; border:none;" placeholder="Search..."></div>
        <ul class="properties-filter" style="margin-bottom: 24px;">
          <li>
            <a class="is_active" href="#!" data-filter="*">All</a>
          </li>
          <li>
            <a href="#!" data-filter=".adv">Dairy</a>
          </li>
          <li>
            <a href="#!" data-filter=".str">Meat</a>
          </li>
          <li>
            <a href="#!" data-filter=".rac">Grains</a>
          </li>
          <li>
            <a href="#!" data-filter=".rac">Produce</a>
          </li>
        </ul>

      <!--Groups-->

        <add-item-button></add-item-button>
          <app-pantry></app-pantry>

        <div class="section"></div>
      </div>
    </div>
  `;
}