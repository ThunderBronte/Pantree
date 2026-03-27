import { profileStore } from "./profile-store.js";

export function onInput(field) {
  return event => {
    profileStore.update(field, event.target.value);
  };
}

export function onSave() {
  profileStore.save();
  alert("Profile saved");
}

export function onSignOut() {
  localStorage.removeItem("profile");
  profileStore.user = null;
  window.dispatchEvent(new CustomEvent("profile-changed"));
}