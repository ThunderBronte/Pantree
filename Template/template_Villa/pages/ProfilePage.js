import { html } from "lit";

export default function ProfilePage({ currentPath }) {
  return html`
    <section>
      <h1>Profile</h1>
      <p>Manage your profile information here.</p>
      <p>Current route: ${currentPath}</p>
    </section>
  `;
}