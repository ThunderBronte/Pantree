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
      <div>
        <h4>Welcome back, ${user.name}</h4>
      </div>

      <ul>
        <li><a href="#/pantry">My Pantry</a></li>
        <li><a href="#/my-lists">My Lists</a></li>
        <li><a href="#/recipes">Recipes</a></li>
        <li><a href="#/profile">Profile</a></li>
      </ul>
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