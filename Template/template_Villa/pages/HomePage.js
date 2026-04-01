import { html } from "lit";
import { LoginButton } from "../assets/js/login-button";
import { profileStore } from "../assets/js/profile-store";

export default function HomePage({ currentPath }) {
  const user = profileStore.user;
  
  return html`
  <div style="display: flex; flex-direction: column; gap: 12px; align-items: center; text-align: center; margin: 24px;">
    <img src="./assets/images/Logo.svg" style="width: 64px">
    <h1 style="color: #CB2127">Pantree</h1>
  </div>

  ${user
    ? html`
      <div style="margin: 24px; text-align: center;">
        <h4>Welcome back, ${user.name}</h4>
      </div>

      <ul style="display: flex; flex-direction: column; gap: 12px; text-align: center; justify-self: center; width: 100%; padding: 0px 48px;">
        <li style="padding: 12px; background-color: #CB2127; border-radius: 8px; justify-items: center;">
          <a href="#/pantry" style="color: white; display: flex; align-items: center;">
            <img src="./assets/images/pantry-white.svg" style="height: 48px;">
            My Pantry
          </a>
        </li>
        <li style="padding: 12px; background-color: #CB2127; border-radius: 8px; justify-items: center;">
          <a href="#/my-lists" style="color: white; display: flex; align-items: center;">
            <img src="./assets/images/list-white.svg" style="height: 48px; padding-right: 8px;">
            My Lists
          </a>
        </li>
        <li style="padding: 12px; background-color: #CB2127; border-radius: 8px; justify-items: center;">
          <a href="#/recipes" style="color: white; display: flex; align-items: center;">
            <img src="./assets/images/recipe-white.svg" style="height: 48px; padding-right: 8px;">
            Recipes
          </a>
        </li>
        <li style="padding: 12px; background-color: #CB2127; border-radius: 8px; justify-items: center;">
          <a href="#/profile" style="color: white; display: flex; align-items: center;">
            <img src="./assets/images/profile-white.svg" style="height: 48px; padding-right: 8px; ">
            Profile
          </a>
        </li>
      </ul>
      <div style="margin-bottom: 48px;"></div>
    `
    : html`
      <div style="text-align: center;">
        <h4>Welcome to Pantree</h4>
        <p>The grocery tracking app</p>
      </div>

      <div style="margin: 24px; text-align: center;">
        <login-button mode="create"></login-button>
      </div>
      
      <ul style="display: flex; gap: 12px; text-align: center; justify-self: center; flex-wrap: wrap;">
        <li>
          Track Items
        </li>
        |
        <li>
          Save Money
        </li>
        |
        <li>
          Reduce Waste
        </li>
      </ul>

      <div style="display: flex; flex-direction: column; gap: 12px; text-align: center; justify-self: center;">
        <p>Already have an account?</p>
        <login-button mode="login"></login-button>
      </div>
      

      <button>Download the App</button>
    `
  }
  `;
}