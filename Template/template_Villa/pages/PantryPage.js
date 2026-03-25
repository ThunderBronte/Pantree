import { html } from "lit";

export default function PantryPage({ currentPath }) {
  return html`
  <!--Add New Item Component-->
    <div class="section properties" style="justify-self: center;">
        <div class="main-button">
                <a href="property-details.html">+ Add New Item</a>
            </div>
      </div>

  <!--Main Content-->
    <div class="section properties">
      <div class="container">

      <!--Search / filter-->
      <div>Search Bar</div>
        <ul class="properties-filter">
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
          <div class="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 adv">
            <div class="item">
              <h4><a href="property-details.html">Pantry</a></h4>
              <ul style="background-color: #F3E5D9; border-radius: 24px; padding: 12px;">
                <li>Pretzle Img</li>
                <li>Chips Img</li>
                <li>Rice Img</li>
                <li>Beans Img</li>
                <li>Beans Img</li>
              </ul>
              <div class="main-button">
                <a href="property-details.html">View All Items</a>
              </div>
            </div>
          </div>
          
        <!--Fridge Component-->
          <div class="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 adv">
            <div class="item">
              <h4><a href="property-details.html">Fridge</a></h4>
              <ul style="background-color: #F2FAFF; border-radius: 24px; padding: 12px;">
                <li>Milk Img</li>
                <li>Jelly Img</li>
                <li>Beef Img</li>
                <li>Beef Img</li>
                <li>Bacon Img</li>
                <li>Bacon Img</li>
                <li>Egg Img</li>
                <li>Egg Img</li>
              </ul>
              <div class="main-button">
                <a href="property-details.html">View All Items</a>
              </div>
            </div>
          </div>

        <!--Freezer Component-->
          <div class="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 adv">
            <div class="item">
              <h4><a href="property-details.html">Freezer</a></h4>
              <ul style="background-color: #E4EEFF; border-radius: 24px; padding: 12px;">
                <li>BlueBerries Img</li>
                <li>ChickenNugget Img</li>
                <li>Potato Img</li>
                <li>Potato Img</li>
                <li>Potato Img</li>
              </ul>
              <div class="main-button">
                <a href="property-details.html">View All Items</a>
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