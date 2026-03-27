import { html } from "lit";
import { profileStore } from "./profile-store.js";

export function renderAuth() {
  return html`
    <section>
      <h1>Create an Account / Sign In</h1>

      <label>
        Name
        <input id="name" />
      </label>

      <label>
        Email
        <input id="email" type="email" />
      </label>

      <button @click=${onSignIn}>
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
