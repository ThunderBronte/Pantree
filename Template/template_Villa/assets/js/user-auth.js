import { html } from "lit";
import { profileStore } from "./profile-store.js";

export function renderAuth(mode = "create", onClose = null) {

  return html`
    <section style="display: flex; flex-direction: column; padding: 24px; gap: 16px;">
      ${onClose ? html`
        <button @click=${onClose} style="align-self: flex-end; background: none; border: none; font-size: 18px; cursor: pointer; color: #705B48; padding: 0; line-height: 1;">✕</button>
      ` : null}

      <h2 style="margin: 0 0 12px 0;">${mode === "login" ? "Login" : "Create Account"}</h2>

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
        ${mode === "login" ? "Login" : "Sign Up"}
      </button>
    </section>
  `;
}

export function onSignIn(event) {
  const form = event.target.closest("section");
  const name = form.querySelector("#name").value;
  const email = form.querySelector("#email").value;

  if (!name || !email) {
    alert("Please enter name and email");
    return;
  }

  profileStore.user = { name, email };
  localStorage.setItem("profile", JSON.stringify(profileStore.user));

  window.dispatchEvent(new CustomEvent("profile-changed"));
}
