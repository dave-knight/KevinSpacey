// service_worker.js

chrome.action.onClicked.addListener(function (tab) {
  // Open Twitter or prompt the user to authenticate with Twitter, as needed
  const targetUrl = 'https://twitter.com';
  chrome.tabs.create({ url: targetUrl });
});

const urlPattern = /https:\/\/prod-fastly-us-east-1\.video\.pscp\.tv\/Transcoding\/v1\/hls\/.*\/non_transcode\/us-east-1\/periscope-replay-direct-prod-us-east-1-public\/audio-space\/dynamic_playlist\.m3u8\?type=live/;

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (urlPattern.test(details.url)) {
      chrome.storage.local.get('twitterSpaceUrls', (data) => {
        let urls = data.twitterSpaceUrls || [];
        urls.push(details.url);
        chrome.storage.local.set({ twitterSpaceUrls: urls });
      });
    }
  },
  { urls: ['<all_urls>'] }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getUrls') {
    chrome.storage.local.get('twitterSpaceUrls', (data) => {
      sendResponse({ urls: data.twitterSpaceUrls || [] });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'keepAlive') {
    // Keep the service worker alive by resetting a timer
    clearTimeout(self.keepAliveTimer);
    self.keepAliveTimer = setTimeout(() => {
      // Close the service worker after a certain period of inactivity
      self.registration.unregister();
    }, 30000); // Adjust the timeout duration as needed (currently set to 30 seconds)
  } else if (event.data && event.data.request === 'deletePinnedTweets') {
    // Handle the request to delete pinned tweets
    deletePinnedTweets()
      .then((result) => {
        event.ports[0].postMessage({ success: result });
      })
      .catch((err) => {
        console.error("Error deleting pinned tweets:", err);
      });
  }
});

// Function to delete pinned tweets (this will need to be implemented)
function deletePinnedTweets() {
  // You will need to write code here to interact with Twitter's API
  // or the Twitter web page to delete the pinned tweets.
  // This may involve using Twitter's JavaScript SDK or making
  // XMLHttpRequests to Twitter's API endpoints.
  return new Promise((resolve, reject) => {
    // Implement the logic to delete pinned tweets and resolve or reject the promise as appropriate
  });
}