let ports = [];

chrome.runtime.onConnect.addListener(port => {
  console.log('Connected ', port);
  ports.push(port);

  port.onDisconnect.addListener(() => {
    ports = ports.filter(p => p !== port);
  });

  port.onMessage.addListener((message) => {
    if (message.type === 'scroll') {
      chrome.storage.local.get('totalScrollDistance', (data) => {
        let totalScrollDistance = data.totalScrollDistance || 0;
        totalScrollDistance += message.distance;
        chrome.storage.local.set({ totalScrollDistance });
      });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getTotalDistance') {
    chrome.storage.local.get('totalScrollDistance', (data) => {
      sendResponse({ totalScrollDistance: data.totalScrollDistance || 0 });
    });
    return true; // Indicates async response
  }
});