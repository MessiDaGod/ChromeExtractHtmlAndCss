document.addEventListener('DOMContentLoaded', function() {
    const exportButton = document.getElementById('exportButton');
    exportButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
      });
    });
  });
