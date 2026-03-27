import { html } from "lit";
import {profileStore} from "../assets/js/profile-store.js";
import { onInput, onSave, onSignOut } from "../assets/js/profileHandlers.js";
import {renderAuth, onSignIn} from "../assets/js/user-auth.js";

export default function ProfilePage({ currentPath }) {
  if (!profileStore.user && !profileStore.loading) {
    profileStore.load();
  }

  if (profileStore.loading) {
    return html`<p>Loading...</p>`;
  }

  if (!profileStore.user) {
    return renderAuth();
  }

  function renderProfile() {
    return html`
      <section>
        <h1>Profile</h1>
        <p>Manage your profile information here.</p>
        
        <label>
          Name
          <input .value=${profileStore.user.name} @input=${onInput("name")}/>
        </label>

        <label>
          Email
          <input type="email" .value=${profileStore.user.email} @input=${onInput("email")}/>
        </label>
        
        <div>
          <button @click=${onSave}>Save</button>
          <button @click=${onSignOut}>Sign out</button>
        </div>

      </section>
    `;
  }
  
  return renderProfile();
}