import { profileStore } from "./profile-store.js";

export function onInput(field) {
  return event => {
    profileStore.update(field, event.target.value);
  };
}

const TOAST_STYLE = `
  .profile-saved-toast {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 8px;
    padding: 16px 32px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 15px;
    color: #1E1E1E;
    z-index: 200;
    white-space: nowrap;
    animation: profileToastFade 2.5s ease forwards;
  }
  @keyframes profileToastFade {
    0%   { opacity: 0; transform: translateX(-50%) translateY(10px); }
    15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
    75%  { opacity: 1; }
    100% { opacity: 0; }
  }
`;

function ensureToastStyles() {
  if (!document.getElementById("profile-toast-styles")) {
    const style = document.createElement("style");
    style.id = "profile-toast-styles";
    style.textContent = TOAST_STYLE;
    document.head.appendChild(style);
  }
}

export function onSave() {
  profileStore.save();
  ensureToastStyles();
  const toast = document.createElement("div");
  toast.className = "profile-saved-toast";
  toast.textContent = "Profile saved!";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

export function onSignOut() {
  localStorage.removeItem("profile");
  profileStore.user = null;
  window.location.hash = "/";
  window.dispatchEvent(new CustomEvent("profile-changed"));
}