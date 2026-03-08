document.addEventListener('DOMContentLoaded', () => {
  const masterSwitch = document.getElementById('masterSwitch');
  const notionSwitch = document.getElementById('notionSwitch');
  const githubSwitch = document.getElementById('githubSwitch');
  const masterToggle = document.getElementById('masterToggle');
  const masterStatus = document.getElementById('masterStatus');
  const statusDot = document.getElementById('statusDot');
  const notionCard = document.getElementById('notionCard');
  const githubCard = document.getElementById('githubCard');

  // Load stored state
  chrome.storage.sync.get(
    { enabled: false, notionEnabled: true, githubEnabled: true },
    (data) => {
      updateUI(data.enabled, data.notionEnabled, data.githubEnabled);
    }
  );

  function updateUI(enabled, notionEnabled, githubEnabled) {
    masterSwitch.classList.toggle('on', enabled);
    masterToggle.classList.toggle('active', enabled);
    masterStatus.textContent = enabled ? 'Cultivating' : 'Dormant';
    statusDot.classList.toggle('active', enabled);

    notionSwitch.classList.toggle('on', notionEnabled);
    notionCard.classList.toggle('active', notionEnabled);

    githubSwitch.classList.toggle('on', githubEnabled);
    githubCard.classList.toggle('active', githubEnabled);
  }

  masterSwitch.addEventListener('click', () => {
    chrome.storage.sync.get(
      { enabled: false, notionEnabled: true, githubEnabled: true },
      (data) => {
        const newEnabled = !data.enabled;
        chrome.storage.sync.set({ enabled: newEnabled }, () => {
          updateUI(newEnabled, data.notionEnabled, data.githubEnabled);
          notifyContentScript();
        });
      }
    );
  });

  notionSwitch.addEventListener('click', () => {
    chrome.storage.sync.get(
      { enabled: false, notionEnabled: true, githubEnabled: true },
      (data) => {
        const newVal = !data.notionEnabled;
        chrome.storage.sync.set({ notionEnabled: newVal }, () => {
          updateUI(data.enabled, newVal, data.githubEnabled);
          notifyContentScript();
        });
      }
    );
  });

  githubSwitch.addEventListener('click', () => {
    chrome.storage.sync.get(
      { enabled: false, notionEnabled: true, githubEnabled: true },
      (data) => {
        const newVal = !data.githubEnabled;
        chrome.storage.sync.set({ githubEnabled: newVal }, () => {
          updateUI(data.enabled, data.notionEnabled, newVal);
          notifyContentScript();
        });
      }
    );
  });

  function notifyContentScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateStyles' });
      }
    });
  }
});
