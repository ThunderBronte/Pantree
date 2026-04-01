export const profileStore = {
    loading: false,
    user: null,

    load() {
        this.loading = true;

        const cached = localStorage.getItem("profile");
        if (cached) {
            this.user = JSON.parse(cached);
            window.dispatchEvent(new CustomEvent("profile-changed"));
        }

        this.loading = false;
    },

    update(field, value) {
        this.user = {...this.user, [field]: value};
        localStorage.setItem("profile", JSON.stringify(this.user));
    },

    save() {
        localStorage.setItem("profile", JSON.stringify(this.user));
    },

    clear() {
        this.user = null;
        localStorage.removeItem("profile");
    }
};