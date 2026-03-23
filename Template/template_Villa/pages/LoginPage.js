import { html } from "lit";

export default function LoginPage({ currentPath }) {
  return html`
    <section>
      <h1>Login</h1>
      <p>Please log in to your account.</p>
      <p>Current route: ${currentPath}</p>
    </section>
  `;
}