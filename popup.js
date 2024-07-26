document.addEventListener('DOMContentLoaded', () => {
  const distanceElement = document.getElementById('distance');
  
  chrome.runtime.sendMessage({ type: 'getTotalDistance' }, (response) => {
    if (chrome.runtime.lastError) {
      distanceElement.textContent = 'Error: Please refresh the extension';
    } else {
      distanceElement.textContent = `${response.totalScrollDistance.toFixed(2)} meters`;
    }
  });
});