import { html } from "lit";
import { profileStore } from "./profile-store.js";

export function renderAuth() {
    
  return html`
    <section style="margin: 48; display: flex; flex-direction: column; padding: 48px; gap: 24px; justify-self: center;">
      <h2>Create an Account / Sign In</h2>

      <label>
        Name
        <input id="name" />
      </label>

      <label>
        Email
        <input id="email" type="email" />
      </label>

      <button style="background-color: #CB2127;
            color: white;
            border: none;
            padding: 12px 48px;
            border-radius: 40px;
            font-size: 16px;
            font-weight: medium;
            cursor: pointer;" @click=${onSignIn}>
        Sign In
      </button>
    </section>
  `;
}

export function onSignIn() {
    const form = event.target.closest("section");
  const name = form.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  if (!name || !email) {
    alert("Please enter name and email");
    return;
  }

  profileStore.user = { name, email };
  localStorage.setItem("profile", JSON.stringify(profileStore.user));

  window.dispatchEvent(new CustomEvent("profile-changed"));
}
