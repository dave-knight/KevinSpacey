function deletePinnedTweets() {
    // Identify the pinned tweets in the Twitter Space
    const pinnedTweets = document.querySelectorAll('.pinned-tweet-selector'); // Update this selector to match the actual structure of Twitter's HTML
  
    // Iterate through the pinned tweets and delete them
    for (const tweet of pinnedTweets) {
      // You may need to simulate a click event on a delete button, or make an XMLHttpRequest to Twitter's API to delete the tweet
      // The exact implementation will depend on how Twitter's web interface is structured
      // Here's an example of simulating a click event on a delete button:
      const deleteButton = tweet.querySelector('.delete-button-selector'); // Update this selector to match the actual structure of Twitter's HTML
      if (deleteButton) {
        deleteButton.click();
      }
    }
  }
  
  function onDOMContentLoaded() {
    try {
      deletePinnedTweets();
  
      // Optionally, you can set up a MutationObserver to detect changes to the DOM and delete newly pinned tweets as they appear
      const observer = new MutationObserver(deletePinnedTweets);
      const observerConfig = { attributes: false, childList: true, subtree: true };
      observer.observe(document.documentElement, observerConfig);
    } catch (error) {
      console.error("Error deleting pinned tweets:", error);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
  } else {
    onDOMContentLoaded();
  }
  
  // Optionally, you can set up communication with the service worker to handle additional logic, such as authentication with Twitter's API
  