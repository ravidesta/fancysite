document.addEventListener('DOMContentLoaded', () => {
  const DEFAULTS = {
    enabled: false,
    notionEnabled: true,
    githubEnabled: true,
    theme: 'luxury',
    headingFont: 'garamond',
    bodyFont: 'manrope',
    headingItalic: false,
    headingSize: 'normal',
    weight: 'medium',
    textColor: 'default'
  };

  const $ = (id) => document.getElementById(id);

  const masterSwitch = $('masterSwitch');
  const masterToggle = $('masterToggle');
  const masterStatus = $('masterStatus');
  const statusDot = $('statusDot');
  const notionSwitch = $('notionSwitch');
  const githubSwitch = $('githubSwitch');
  const notionCard = $('notionCard');
  const githubCard = $('githubCard');
  const italicToggle = $('italicToggle');

  const themeRow = $('themeRow');
  const headingFontRow = $('headingFontRow');
  const bodyFontRow = $('bodyFontRow');
  const sizeRow = $('sizeRow');
  const weightRow = $('weightRow');
  const textColorRow = $('textColorRow');

  chrome.storage.sync.get(DEFAULTS, updateUI);

  function updateUI(data) {
    masterSwitch.classList.toggle('on', data.enabled);
    masterToggle.classList.toggle('active', data.enabled);
    masterStatus.textContent = data.enabled ? 'Cultivating' : 'Dormant';
    statusDot.classList.toggle('active', data.enabled);

    notionSwitch.classList.toggle('on', data.notionEnabled);
    notionCard.classList.toggle('active', data.notionEnabled);
    githubSwitch.classList.toggle('on', data.githubEnabled);
    githubCard.classList.toggle('active', data.githubEnabled);

    selectInRow(themeRow, '[data-theme]', 'theme', data.theme);
    selectInRow(headingFontRow, '[data-hfont]', 'hfont', data.headingFont);
    selectInRow(bodyFontRow, '[data-bfont]', 'bfont', data.bodyFont);
    selectInRow(sizeRow, '[data-size]', 'size', data.headingSize);
    selectInRow(weightRow, '[data-weight]', 'weight', data.weight);
    selectInRow(textColorRow, '[data-textcolor]', 'textcolor', data.textColor);

    italicToggle.classList.toggle('selected', data.headingItalic);
  }

  function selectInRow(container, selector, attr, value) {
    container.querySelectorAll(selector).forEach(btn => {
      btn.classList.toggle('selected', btn.dataset[attr] === value);
    });
  }

  function toggle(key) {
    chrome.storage.sync.get(DEFAULTS, (data) => {
      data[key] = !data[key];
      chrome.storage.sync.set({ [key]: data[key] }, () => { updateUI(data); notify(); });
    });
  }

  function setOpt(key, value) {
    chrome.storage.sync.get(DEFAULTS, (data) => {
      data[key] = value;
      chrome.storage.sync.set({ [key]: value }, () => { updateUI(data); notify(); });
    });
  }

  masterSwitch.addEventListener('click', () => toggle('enabled'));
  notionSwitch.addEventListener('click', () => toggle('notionEnabled'));
  githubSwitch.addEventListener('click', () => toggle('githubEnabled'));
  italicToggle.addEventListener('click', () => toggle('headingItalic'));

  themeRow.addEventListener('click', (e) => {
    const b = e.target.closest('[data-theme]');
    if (b) setOpt('theme', b.dataset.theme);
  });

  headingFontRow.addEventListener('click', (e) => {
    const b = e.target.closest('[data-hfont]');
    if (b) setOpt('headingFont', b.dataset.hfont);
  });

  bodyFontRow.addEventListener('click', (e) => {
    const b = e.target.closest('[data-bfont]');
    if (b) setOpt('bodyFont', b.dataset.bfont);
  });

  sizeRow.addEventListener('click', (e) => {
    const b = e.target.closest('[data-size]');
    if (b) setOpt('headingSize', b.dataset.size);
  });

  weightRow.addEventListener('click', (e) => {
    const b = e.target.closest('[data-weight]');
    if (b) setOpt('weight', b.dataset.weight);
  });

  textColorRow.addEventListener('click', (e) => {
    const b = e.target.closest('[data-textcolor]');
    if (b) setOpt('textColor', b.dataset.textcolor);
  });

  function notify() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, { action: 'updateStyles' });
    });
  }
});
