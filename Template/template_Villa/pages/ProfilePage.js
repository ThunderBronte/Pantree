import { html } from "lit";
import {profileStore} from "../assets/js/profile-store.js";
import { onInput, onSave, onSignOut } from "../assets/js/profileHandlers.js";
import {renderAuth, onSignIn} from "../assets/js/user-auth.js";

const styles = `
  button {
    background-color: #CB2127;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 40px;
    font-size: 12px;
    font-weight: medium;
    cursor: pointer;
  }
    section {
      display: flex;
      flex-direction: column;
      padding: 48px;
      gap: 24px;
      justify-content: center;
      align-items: center;
    }
      .profile-card {
        background-color: white;
        border-radius: 24px;
        padding: 24px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        justify-items: center;
        align-content: center;
        text-align: center;
      }
`;

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
    <style>${styles}</style>
      <section>
        <div class="profile-card">
          <img src="https://www.billboard.com/wp-content/uploads/2025/02/lady-gaga-snl50-red-carpet-billboard-1548.jpg?w=942&h=623&crop=1" style="width: 80px; height: 80px;border-radius: 100px; margin-bottom: 12px;">
          <h5 style="color: #CB2127">Sarah Johnson</h5>
          <p>Member since Feb 2026</p>
        </div>

        <div style="width: 100%">
          <h6 style="padding-bottom: 12px;">Profile Settings</h6>
          <div style="display: flex; flex-direction: column; gap: 12px; padding: 24px; background-color: white; border-radius: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 100%">
          
            <label>
              Name
              <input .value=${profileStore.user.name} @input=${onInput("name")}/>
            </label>

            <label>
              Email
              <input type="email" .value=${profileStore.user.email} @input=${onInput("email")}/>
            </label>
          
          </div>
        </div>

        <div style="width: 100%">
          <h6 style="padding-bottom: 12px;">App Settings</h6>
          <div style="display: flex; flex-direction: column; gap: 12px; padding: 24px; background-color: white; border-radius: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 100%">
            <p>Notifications</p>
            <p>Privacy & Security</p>
            <p>Help & Support</p>
          </div>
        </div>

        <div style="width: 100%">
          <h6 style="padding-bottom: 12px;">Dietary Preferences</h6>
          <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
          
            <ul>
              <li>
                Vegetarian
              </li>
              <li>
                Gluten-Free
              </li>
              <li>
                Dairy-Free
              </li>
              <li>
                Nut-Free
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <div>
            <button @click=${onSave}>Save</button>
            <button @click=${onSignOut}>Sign out</button>
          </div>
        </div>

        <div style="margin-bottom: 48px;"></div>

      </section>
    `;
  }
  
  return renderProfile();
}