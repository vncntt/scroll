let lastScrollPosition = window.scrollY;
let port;

function connectToBackground() {
  port = chrome.runtime.connect({ name: 'scrollTracker' });
  port.onDisconnect.addListener(() => {
    console.log('Disconnected. Attempting to reconnect...');
    setTimeout(connectToBackground, 1000);
  });
}

setTimeout(connectToBackground, 1000);

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;
  const pixels = Math.abs(currentScrollPosition - lastScrollPosition);
  const DPI = 258;
  const scrollDistance = 0.0254 * pixels / DPI; // convert pixels to meters
  
  if (port) {
    port.postMessage({ type: 'scroll', distance: scrollDistance });
  }
  
  lastScrollPosition = currentScrollPosition;
});