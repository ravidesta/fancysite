document.addEventListener('DOMContentLoaded', () => {
  const masterSwitch = document.getElementById('masterSwitch');
  const notionSwitch = document.getElementById('notionSwitch');
  const githubSwitch = document.getElementById('githubSwitch');
  const masterToggle = document.getElementById('masterToggle');
  const masterStatus = document.getElementById('masterStatus');
  const statusDot = document.getElementById('statusDot');
  const notionCard = document.getElementById('notionCard');
  const githubCard = document.getElementById('githubCard');
  const themeRow = document.getElementById('themeRow');
  const fontRow = document.getElementById('fontRow');
  const weightRow = document.getElementById('weightRow');
  const textColorRow = document.getElementById('textColorRow');

  const DEFAULTS = {
    enabled: false,
    notionEnabled: true,
    githubEnabled: true,
    theme: 'luxury',
    font: 'classic',
    weight: 'medium',
    textColor: 'default'
  };

  chrome.storage.sync.get(DEFAULTS, (data) => {
    updateUI(data);
  });

  function updateUI(data) {
    masterSwitch.classList.toggle('on', data.enabled);
    masterToggle.classList.toggle('active', data.enabled);
    masterStatus.textContent = data.enabled ? 'Cultivating' : 'Dormant';
    statusDot.classList.toggle('active', data.enabled);

    notionSwitch.classList.toggle('on', data.notionEnabled);
    notionCard.classList.toggle('active', data.notionEnabled);

    githubSwitch.classList.toggle('on', data.githubEnabled);
    githubCard.classList.toggle('active', data.githubEnabled);

    themeRow.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.theme === data.theme);
    });

    fontRow.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.font === data.font);
    });

    weightRow.querySelectorAll('.opt-sm').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.weight === data.weight);
    });

    textColorRow.querySelectorAll('.opt-sm').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.textcolor === data.textColor);
    });
  }

  function toggle(key) {
    chrome.storage.sync.get(DEFAULTS, (data) => {
      data[key] = !data[key];
      chrome.storage.sync.set({ [key]: data[key] }, () => {
        updateUI(data);
        notifyContentScript();
      });
    });
  }

  function setOption(key, value) {
    chrome.storage.sync.get(DEFAULTS, (data) => {
      data[key] = value;
      chrome.storage.sync.set({ [key]: value }, () => {
        updateUI(data);
        notifyContentScript();
      });
    });
  }

  masterSwitch.addEventListener('click', () => toggle('enabled'));
  notionSwitch.addEventListener('click', () => toggle('notionEnabled'));
  githubSwitch.addEventListener('click', () => toggle('githubEnabled'));

  themeRow.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme]');
    if (btn) setOption('theme', btn.dataset.theme);
  });

  fontRow.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-font]');
    if (btn) setOption('font', btn.dataset.font);
  });

  weightRow.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-weight]');
    if (btn) setOption('weight', btn.dataset.weight);
  });

  textColorRow.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-textcolor]');
    if (btn) setOption('textColor', btn.dataset.textcolor);
  });

  function notifyContentScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateStyles' });
      }
    });
  }
});
