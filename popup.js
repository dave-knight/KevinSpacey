// popup.js

document.getElementById('deleteButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'deletePinnedTweets' });
  });
});

function openInVLC(url) {
  // You may need to use a custom protocol handler to open URLs in VLC player
  // This will depend on the user's system configuration
  window.open(`vlc://${url}`);
}

function displayUrls() {
  chrome.runtime.sendMessage({ action: 'getUrls' }, (response) => {
    const urlList = document.getElementById('urlList');
    urlList.innerHTML = '';

    for (const url of response.urls) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = url;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openInVLC(url);
      });
      listItem.appendChild(link);
      urlList.appendChild(listItem);
    }
  });
}

document.addEventListener('DOMContentLoaded', displayUrls);