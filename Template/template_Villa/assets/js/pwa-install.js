export const pwaInstall = {
  deferredPrompt: null,
  isStandalone:
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true,
};

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  pwaInstall.deferredPrompt = e;
  window.dispatchEvent(new CustomEvent('pwa-install-ready'));
});

window.addEventListener('appinstalled', () => {
  pwaInstall.deferredPrompt = null;
  pwaInstall.isStandalone = true;
  window.dispatchEvent(new CustomEvent('pwa-install-ready'));
});

export async function triggerInstall() {
  if (!pwaInstall.deferredPrompt) return;
  pwaInstall.deferredPrompt.prompt();
  const { outcome } = await pwaInstall.deferredPrompt.userChoice;
  pwaInstall.deferredPrompt = null;
  window.dispatchEvent(new CustomEvent('pwa-install-ready'));
}
