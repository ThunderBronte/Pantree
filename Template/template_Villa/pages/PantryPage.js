import { html } from "lit";

export default function PantryPage({ currentPath }) {
  return html`
  <!--Add New Item Component-->
    <div class="section properties" style="justify-self: center; margin:48px">
        <div class="main-button">
                <a href="property-details.html">+ Add New Item</a>
            </div>
      </div>

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
        <div class="row properties-box">

        <!--Dry Storage Component-->
          <div style="margin-bottom: 12px;">
            <h4 style="color:#CB2127;">Pantry</h4>

          <!--Single Item -->
            <div style="display: flex; gap: 48px; align-items: center; background-color: white; border-radius: 8px; padding: 12px; margin: 12px 0px; justify-content: space-between; filter: drop-shadow(2px 2px 2px gray)">
              <div>
                <p style="font-weight: bold; color: black">Spaghetti</p>
                <p style="font-size: 10px; color: #666">Grains</p>
              </div>

              <div style="display: flex; align-items: center; gap: 24px;">
                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">-</a>
                </div>

                <div style="text-align: center; align-items: center;">
                  <div><h6 style="color: #CB2127">4</h6></div>
                  <p style="font-size: 10px; color: #666; line-height: 8px;">boxes</p>
                </div>

                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">+</a>
                </div>
              </div>
            </div>

            <!--Single Item -->
            <div style="display: flex; gap: 48px; align-items: center; background-color: white; border-radius: 8px; padding: 12px; margin: 12px 0px; justify-content: space-between; filter: drop-shadow(2px 2px 2px gray)">
              <div>
                <p style="font-weight: bold; color: black">Brown Rice</p>
                <p style="font-size: 10px; color: #666">Grains</p>
              </div>

              <div style="display: flex; align-items: center; gap: 24px;">
                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">-</a>
                </div>

                <div style="text-align: center; align-items: center;">
                  <div><h6 style="color: #CB2127">1</h6></div>
                  <p style="font-size: 10px; color: #666; line-height: 8px;">bag</p>
                </div>

                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">+</a>
                </div>
              </div>
            </div>

          </div>
          
        <!--Fridge Component-->
          <div  style="margin-bottom: 12px;">
            <h4 style="color:#CB2127;">Fridge</h4>

            <!--Single Item -->
            <div style="display: flex; gap: 48px; align-items: center; background-color: white; border-radius: 8px; padding: 12px; margin: 12px 0px; justify-content: space-between; filter: drop-shadow(2px 2px 2px gray)">
              <div>
                <p style="font-weight: bold; color: black">Whole Milk</p>
                <p style="font-size: 10px; color: #666;">Dairy | Expires Mar 4</p>
              </div>

              <div style="display: flex; align-items: center; gap: 24px;">
                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">-</a>
                </div>

                <div style="text-align: center; align-items: center;">
                  <div><h6 style="color: #CB2127">1</h6></div>
                  <p style="font-size: 10px; color: #666; line-height: 8px;">gallon</p>
                </div>

                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">+</a>
                </div>
              </div>
            </div>

            <!--Single Item EXPIRING SOON-->
            <div style="display: flex; gap: 48px; align-items: center; background-color: white; border: 2px solid #CB2127; border-radius: 8px; padding: 12px; margin: 12px 0px; justify-content: space-between; filter: drop-shadow(2px 2px 2px gray)">
              <div style="line-height: 8px;">
                <p style="font-weight: bold; color: black">Chicken Breast</p>
                <span style="color: white; background-color: #CB2127; font-size: 8px; padding: 0px 4px; border-radius: 10px;">EXPIRING SOON</span>
                <p style="font-size: 10px; color: #666;">Meat | Expires Feb 27</p>
              </div>

              <div style="display: flex; align-items: center; gap: 24px;">
                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">-</a>
                </div>

                <div style="text-align: center; align-items: center;">
                  <div><h6 style="color: #CB2127">3</h6></div>
                  <p style="font-size: 10px; color: #666; line-height: 8px;">lbs</p>
                </div>

                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">+</a>
                </div>
              </div>
            </div>

          </div>

        <!--Freezer Component-->
          <div  style="margin-bottom: 12px;">
            <h4 style="color:#CB2127;">Freezer</h4>

            <!--Single Item -->
            <div style="display: flex; gap: 48px; align-items: center; background-color: white; border-radius: 8px; padding: 12px; margin: 12px 0px; justify-content: space-between; filter: drop-shadow(2px 2px 2px gray)">
              <div>
                <p style="font-weight: bold; color: black">Blueberries</p>
                <p style="font-size: 10px; color: #666;">Fruit | Expires Mar 4</p>
              </div>

              <div style="display: flex; align-items: center; gap: 24px;">
                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">-</a>
                </div>

                <div style="text-align: center; align-items: center;">
                  <div><h6 style="color: #CB2127">1</h6></div>
                  <p style="font-size: 10px; color: #666; line-height: 8px;">bag</p>
                </div>

                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">+</a>
                </div>
              </div>
            </div>

            <!--Single Item EXPIRING SOON-->
            <div style="display: flex; gap: 48px; align-items: center; background-color: white; border: 2px solid #CB2127; border-radius: 8px; padding: 12px; margin: 12px 0px; justify-content: space-between; filter: drop-shadow(2px 2px 2px gray)">
              <div style="line-height: 8px;">
                <p style="font-weight: bold; color: black">Ice cream</p>
                <span style="color: white; background-color: #CB2127; font-size: 8px; padding: 0px 4px; border-radius: 10px;">EXPIRING SOON</span>
                <p style="font-size: 10px; color: #666;">Dairy | Expires Feb 27</p>
              </div>

              <div style="display: flex; align-items: center; gap: 24px;">
                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">-</a>
                </div>

                <div style="text-align: center; align-items: center;">
                  <div><h6 style="color: #CB2127">1</h6></div>
                  <p style="font-size: 10px; color: #666; line-height: 8px;">tub</p>
                </div>

                <div class="main-button">
                  <a href="property-details.html" style="text-align: center;background-color: #F3E5D9; color: #705B48; width: 40px;padding: 0px; align-content: center">+</a>
                </div>
              </div>
            </div>

          </div>

          <!--
          <div class="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 adv rac">
            <div class="item">
              <a href="property-details.html"><img src="assets/images/property-03.jpg" alt=""></a>
              <span class="category">Luxury Villa</span>
              <h6>$1.460.000</h6>
              <h4><a href="property-details.html">26 Mid Street Portland, OR 38540</a></h4>
              <ul>
                <li>Bedrooms: <span>5</span></li>
                <li>Bathrooms: <span>4</span></li>
                <li>Area: <span>225m2</span></li>
                <li>Floor: <span>3</span></li>
                <li>Parking: <span>10 spots</span></li>
              </ul>
              <div class="main-button">
                <a href="property-details.html">Schedule a visit</a>
              </div>
            </div>
          </div>
          
        </div>

Pagination
        <div class="row">
          <div class="col-lg-12">
            <ul class="pagination">
              <li><a href="#">1</a></li>
              <li><a class="is_active" href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">>></a></li>
            </ul>
          </div>
        </div>-->
        <div class="section"></div>
      </div>
    </div>
  `;
}