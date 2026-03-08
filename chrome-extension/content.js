(() => {
  const STYLE_ID = 'ghostwrite-design-system';
  const FONT_ID = 'ghostwrite-fonts';

  const hostname = window.location.hostname;
  const isNotion = hostname.includes('notion.so') || hostname.includes('notion.site');
  const isGitHub = hostname.includes('github.com');

  // ═══════════════════════════════════════════════
  // THEME PALETTES
  // ═══════════════════════════════════════════════
  const THEMES = {
    luxury: {
      bgBase:       '#F2F0EB',
      bgSurface:    '#FAFAF8',
      bgGlass:      'rgba(250, 250, 248, 0.7)',
      bgInset:      '#EAE7E0',
      primary900:   '#0A1C14',
      primary800:   '#122E21',
      primary700:   '#1B402E',
      primary200:   '#D1E0D7',
      primary100:   '#E8F0EA',
      accent:       '#C5A059',
      accentLight:  '#E6D0A1',
      accentDark:   '#9A7A3A',
      textMain:     '#122E21',
      textMuted:    '#5C7065',
      textLight:    '#8A9C91',
      borderLight:  '#E5EBE7',
      borderAccent: 'rgba(197, 160, 89, 0.3)',
      sidebarBg:    '#6B5240',
      sidebarText:  '#F5EDE4',
      sidebarHover: '#7D634F',
      topbarBg:     'rgba(107, 82, 64, 0.92)',
      topbarBorder: '#5A4333',
      headerBg:     '#3D2E22',
      selectionBg:  'rgba(197, 160, 89, 0.25)',
      scrollThumb:  '#D1E0D7',
      scrollHover:  '#9A7A3A',
      switchOn:     '#1B402E',
    },
    darkblue: {
      bgBase:       '#1A2035',
      bgSurface:    '#212842',
      bgGlass:      'rgba(33, 40, 66, 0.85)',
      bgInset:      '#151B2E',
      primary900:   '#0D1526',
      primary800:   '#1A2744',
      primary700:   '#263A5C',
      primary200:   '#B8C7E0',
      primary100:   '#D6DFF0',
      accent:       '#7B9ED9',
      accentLight:  '#A8C4F0',
      accentDark:   '#5A7FBF',
      textMain:     '#E2E8F0',
      textMuted:    '#94A3B8',
      textLight:    '#64748B',
      borderLight:  '#2D3A54',
      borderAccent: 'rgba(123, 158, 217, 0.3)',
      sidebarBg:    '#151B30',
      sidebarText:  '#CBD5E1',
      sidebarHover: '#1E2745',
      topbarBg:     'rgba(21, 27, 48, 0.92)',
      topbarBorder: '#2D3A54',
      headerBg:     '#0D1526',
      selectionBg:  'rgba(123, 158, 217, 0.3)',
      scrollThumb:  '#2D3A54',
      scrollHover:  '#5A7FBF',
      switchOn:     '#5A7FBF',
    },
    forest: {
      bgBase:       '#0C1A12',
      bgSurface:    '#12241A',
      bgGlass:      'rgba(18, 36, 26, 0.88)',
      bgInset:      '#081410',
      primary900:   '#050E09',
      primary800:   '#0C1A12',
      primary700:   '#14281C',
      primary200:   '#6B9F7E',
      primary100:   '#8AB89C',
      accent:       '#7EBF8E',
      accentLight:  '#A4D4B0',
      accentDark:   '#5A9968',
      textMain:     '#D4E8DC',
      textMuted:    '#8AAA96',
      textLight:    '#5C7D6A',
      borderLight:  '#1C3326',
      borderAccent: 'rgba(126, 191, 142, 0.25)',
      sidebarBg:    '#091210',
      sidebarText:  '#A4C4AE',
      sidebarHover: '#14281C',
      topbarBg:     'rgba(9, 18, 16, 0.92)',
      topbarBorder: '#1C3326',
      headerBg:     '#050E09',
      selectionBg:  'rgba(126, 191, 142, 0.2)',
      scrollThumb:  '#1C3326',
      scrollHover:  '#5A9968',
      switchOn:     '#5A9968',
    }
  };

  // ═══════════════════════════════════════════════
  // FONT STACKS
  // ═══════════════════════════════════════════════
  const FONTS = {
    classic: {
      heading: "'Cormorant Garamond', Georgia, serif",
      body:    "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      url:     'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600;700&display=swap'
    },
    cinzel: {
      heading: "'Cinzel', 'Times New Roman', serif",
      body:    "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      url:     'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap'
    },
    avenir: {
      heading: "'Nunito Sans', 'Avenir', 'Segoe UI', sans-serif",
      body:    "'Nunito Sans', 'Avenir', -apple-system, sans-serif",
      url:     'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap'
    }
  };

  // Weight mapping
  const WEIGHTS = {
    thin:   { body: 300, heading: 300 },
    medium: { body: 400, heading: 500 },
    bold:   { body: 600, heading: 700 }
  };

  // Text color overrides
  const TEXT_COLORS = {
    default:  null, // use theme default
    darkblue: { main: '#1A2744', muted: '#3B5069', light: '#5A6E84' },
    warmgray: { main: '#4A4A48', muted: '#6B6B68', light: '#8A8A86' }
  };

  function injectFonts(fontKey) {
    const existing = document.getElementById(FONT_ID);
    const newUrl = FONTS[fontKey].url;
    if (existing && existing.href === newUrl) return;
    if (existing) existing.remove();
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.rel = 'stylesheet';
    link.href = newUrl;
    document.head.appendChild(link);
  }

  function removeFonts() {
    const el = document.getElementById(FONT_ID);
    if (el) el.remove();
  }

  // ═══════════════════════════════════════════════
  // CSS GENERATORS
  // ═══════════════════════════════════════════════

  function generalCSS(t, f, w, tc) {
    return `
:root {
  --gw-bg-base: ${t.bgBase} !important;
  --gw-bg-surface: ${t.bgSurface} !important;
  --gw-accent: ${t.accent} !important;
  --gw-accent-dark: ${t.accentDark} !important;
}

body {
  font-family: ${f.body} !important;
  font-weight: ${w.body} !important;
  color: ${tc.main} !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${f.heading} !important;
  font-weight: ${w.heading} !important;
  letter-spacing: 0.01em !important;
  color: ${tc.main} !important;
}

p, li, td, th, span, div, label {
  font-weight: ${w.body} !important;
}

html { scroll-behavior: smooth !important; }

button, input, select, textarea, [role="button"] {
  border-radius: 8px !important;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
}

a {
  transition: color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease !important;
}

::-webkit-scrollbar { width: 8px !important; }
::-webkit-scrollbar-track { background: ${t.bgInset} !important; }
::-webkit-scrollbar-thumb { background: ${t.scrollThumb} !important; border-radius: 4px !important; }
::-webkit-scrollbar-thumb:hover { background: ${t.scrollHover} !important; }

::selection {
  background: ${t.selectionBg} !important;
  color: ${t.textMain} !important;
}
`;
  }

  // ─────────────────────────────────────────────
  // NOTION
  // ─────────────────────────────────────────────
  function notionCSS(t, f, w, tc) {
    return `
/* Base background — slightly darker */
.notion-app-inner,
.notion-frame,
.notion-body {
  background: ${t.bgBase} !important;
}

/* ── Sidebar — medium brown / theme sidebar ── */
.notion-sidebar,
.notion-sidebar-container {
  background: ${t.sidebarBg} !important;
  border-right: 1px solid ${t.borderLight} !important;
}

.notion-sidebar * {
  color: ${t.sidebarText} !important;
}

.notion-sidebar .notion-focusable:hover {
  background: ${t.sidebarHover} !important;
}

.notion-sidebar-switcher {
  background: ${t.sidebarBg} !important;
}

/* Sidebar dividers */
.notion-sidebar .notion-divider-block {
  border-color: ${t.borderLight} !important;
}

/* ── Top bar — medium brown / theme topbar ── */
.notion-topbar,
.notion-topbar-action-buttons {
  background: ${t.topbarBg} !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid ${t.topbarBorder} !important;
}

.notion-topbar * {
  color: ${t.sidebarText} !important;
}

.notion-topbar .notion-focusable:hover {
  background: ${t.sidebarHover} !important;
}

/* ── Page content ── */
.notion-page-content {
  font-family: ${f.body} !important;
}

/* Headings */
.notion-header-block .notion-page-block,
.notion-sub_header-block .notion-page-block,
.notion-sub_sub_header-block .notion-page-block,
[placeholder="Heading 1"],
[placeholder="Heading 2"],
[placeholder="Heading 3"] {
  font-family: ${f.heading} !important;
  color: ${t.textMain} !important;
}

/* Page titles */
.notion-page-block .notranslate[contenteditable="true"],
.notion-page-block [placeholder="Untitled"] {
  font-family: ${f.heading} !important;
  color: ${t.textMain} !important;
}

/* Body text */
.notion-text-block .notranslate {
  font-family: ${f.body} !important;
  font-weight: ${w.body} !important;
  color: ${tc.main} !important;
  line-height: 1.7 !important;
}

/* Links */
.notion-link-token span {
  color: ${t.accentDark} !important;
  border-bottom: 1px solid ${t.borderAccent} !important;
}
.notion-link-token span:hover {
  border-color: ${t.accentDark} !important;
}

/* Buttons */
.notion-collection-view-select,
.notion-focusable[role="button"] {
  border-radius: 30px !important;
  font-family: ${f.body} !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
}

.notion-focusable[style*="background: rgb(35, 131, 226)"],
.notionFocusable[style*="background: rgb(35, 131, 226)"] {
  background: ${t.primary900} !important;
  border-radius: 30px !important;
}
.notion-focusable[style*="background: rgb(35, 131, 226)"]:hover {
  background: ${t.accentDark} !important;
}

/* Database views */
.notion-table-view,
.notion-board-view,
.notion-list-view,
.notion-gallery-view {
  font-family: ${f.body} !important;
}

.notion-collection_view-block .notion-scroller {
  border-color: ${t.borderLight} !important;
}

/* ── Gallery view — rounded edges ── */
.notion-gallery-view .notion-collection-card,
.notion-gallery-view .notion-collection-card .notion-focusable,
.notion-gallery-view .notion-collection-card > div:first-child {
  border-radius: 16px !important;
  overflow: hidden !important;
  border: 1px solid ${t.borderLight} !important;
  transition: box-shadow 0.3s ease, transform 0.3s ease !important;
}

.notion-gallery-view .notion-collection-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
  transform: translateY(-2px) !important;
}

/* Gallery card cover images — rounded top */
.notion-gallery-view .notion-collection-card .notion-page-cover {
  border-radius: 16px 16px 0 0 !important;
}

/* Gallery card content area */
.notion-gallery-view .notion-collection-card .notion-collection-card__content {
  border-radius: 0 0 16px 16px !important;
  background: ${t.bgSurface} !important;
}

/* Board view cards also get rounded */
.notion-board-view .notion-collection-card {
  border-radius: 14px !important;
  overflow: hidden !important;
  border: 1px solid ${t.borderLight} !important;
}

/* Tags / pills */
.notion-property-multi_select-item,
.notion-property-select-item {
  border-radius: 20px !important;
  font-family: ${f.body} !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.05em !important;
}

/* Callout blocks */
.notion-callout-block {
  border-radius: 12px !important;
  border: 1px solid ${t.borderLight} !important;
  background: ${t.bgSurface} !important;
}

/* Code blocks */
.notion-code-block {
  border-radius: 12px !important;
  border: 1px solid ${t.borderLight} !important;
  background: ${t.bgInset} !important;
}

/* Toggle blocks */
.notion-toggle-block {
  border-left: 2px solid ${t.borderAccent} !important;
}

/* Quote blocks */
.notion-quote-block {
  border-left: 3px solid ${t.accent} !important;
  font-family: ${f.heading} !important;
  font-style: italic !important;
  font-size: 1.15em !important;
  color: ${t.textMuted} !important;
}

/* Dividers */
.notion-divider-block .notion-focusable {
  border-color: ${t.borderLight} !important;
}

/* Popup menus */
.notion-overlay-container .notion-scroller,
.notion-peek-renderer {
  background: ${t.bgSurface} !important;
  border: 1px solid ${t.borderLight} !important;
  border-radius: 12px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

/* Checkboxes */
.notion-to_do-block .notion-focusable svg[style*="fill: rgb(35, 131, 226)"] {
  fill: ${t.primary700} !important;
}
`;
  }

  // ─────────────────────────────────────────────
  // GITHUB
  // ─────────────────────────────────────────────
  function githubCSS(t, f, w, tc) {
    return `
/* Override GitHub design tokens */
html[data-color-mode="light"],
[data-color-mode="light"][data-light-theme="light"],
[data-light-theme="light"],
html[data-color-mode="dark"],
[data-color-mode="dark"][data-dark-theme*="dark"],
[data-dark-theme*="dark"] {
  --bgColor-default: ${t.bgBase} !important;
  --bgColor-muted: ${t.bgSurface} !important;
  --bgColor-inset: ${t.bgInset} !important;
  --bgColor-emphasis: ${t.primary900} !important;
  --borderColor-default: ${t.borderLight} !important;
  --borderColor-muted: ${t.borderAccent} !important;
  --fgColor-default: ${tc.main} !important;
  --fgColor-muted: ${tc.muted} !important;
  --fgColor-accent: ${t.accentDark} !important;
  --fgColor-link: ${t.accentDark} !important;
  --button-primary-bgColor-rest: ${t.primary900} !important;
  --button-primary-bgColor-hover: ${t.primary700} !important;
  --color-accent-fg: ${t.accentDark} !important;
  --color-accent-emphasis: ${t.accentDark} !important;
  --color-fg-default: ${tc.main} !important;
  --color-fg-muted: ${tc.muted} !important;
  --color-canvas-default: ${t.bgBase} !important;
  --color-canvas-subtle: ${t.bgSurface} !important;
  --color-canvas-inset: ${t.bgInset} !important;
  --color-border-default: ${t.borderLight} !important;
  --color-border-muted: ${t.borderAccent} !important;
  --color-btn-primary-bg: ${t.primary900} !important;
  --color-btn-primary-hover-bg: ${t.primary700} !important;
  --color-primer-fg-disabled: ${t.textLight} !important;
  --header-bgColor: ${t.headerBg} !important;
}

.AppHeader, .Header, header.AppHeader {
  background: ${t.headerBg} !important;
  border-bottom: 1px solid ${t.borderLight} !important;
}

body, .application-main {
  background: ${t.bgBase} !important;
}

.Layout-main, .repository-content, .container-xl, .container-lg {
  font-family: ${f.body} !important;
}

.AppHeader-context-item-label,
strong[itemprop="name"] a,
a.mr-2.flex-self-stretch {
  font-family: ${f.heading} !important;
  font-weight: 600 !important;
  font-size: 1.2em !important;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3,
.markdown-body h4, .markdown-body h5, .markdown-body h6 {
  font-family: ${f.heading} !important;
  color: ${t.textMain} !important;
  border-bottom-color: ${t.borderLight} !important;
}

.markdown-body {
  font-family: ${f.body} !important;
  font-weight: ${w.body} !important;
  color: ${tc.main} !important;
  line-height: 1.7 !important;
}

.markdown-body a { color: ${t.accentDark} !important; }
.markdown-body a:hover { color: ${t.accent} !important; }

.markdown-body pre, .markdown-body code, .highlight pre, .blob-code-inner {
  font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
  border-radius: 8px !important;
}

.markdown-body pre {
  background: ${t.bgInset} !important;
  border: 1px solid ${t.borderLight} !important;
  border-radius: 12px !important;
}

.markdown-body code {
  background: ${t.borderAccent} !important;
  color: ${t.accentDark} !important;
  border-radius: 4px !important;
  padding: 0.15em 0.4em !important;
}

.markdown-body pre code {
  background: transparent !important;
  color: inherit !important;
}

.btn, .btn-sm, .btn-primary {
  border-radius: 30px !important;
  font-family: ${f.body} !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
}

.btn-primary {
  background: ${t.primary900} !important;
  border-color: ${t.primary900} !important;
}

.btn-primary:hover {
  background: ${t.accentDark} !important;
  border-color: ${t.accentDark} !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px ${t.borderAccent} !important;
}

.UnderlineNav-item, .tabnav-tab {
  font-family: ${f.body} !important;
  font-weight: 600 !important;
  font-size: 0.8rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

.UnderlineNav-item[aria-current="page"],
.UnderlineNav-item.selected {
  border-bottom-color: ${t.accentDark} !important;
  color: ${t.textMain} !important;
}

.BorderGrid-cell { border-color: ${t.borderLight} !important; }

.Label, .IssueLabel, .topic-tag {
  border-radius: 20px !important;
  font-family: ${f.body} !important;
  font-weight: 600 !important;
  letter-spacing: 0.04em !important;
}

.topic-tag {
  background: ${t.primary100} !important;
  color: ${t.primary700} !important;
  border: 1px solid ${t.primary200} !important;
}

.topic-tag:hover {
  background: ${t.primary200} !important;
  border-color: ${t.borderAccent} !important;
}

.Box, .Box--condensed {
  border-color: ${t.borderLight} !important;
  border-radius: 12px !important;
}

.Box-header {
  background: ${t.bgSurface} !important;
  border-bottom-color: ${t.borderLight} !important;
  border-radius: 12px 12px 0 0 !important;
}

.react-directory-row { border-color: ${t.borderLight} !important; }

.commit-title a { color: ${t.textMain} !important; }
.commit-title a:hover { color: ${t.accentDark} !important; }

.TimelineItem { border-color: ${t.borderLight} !important; }

.timeline-comment {
  border-color: ${t.borderLight} !important;
  border-radius: 12px !important;
}

.timeline-comment-header {
  background: ${t.bgSurface} !important;
  border-bottom-color: ${t.borderLight} !important;
  border-radius: 12px 12px 0 0 !important;
}

.State--open { background: ${t.primary700} !important; }
.State--merged { background: ${t.accentDark} !important; }

.Counter {
  background: ${t.primary100} !important;
  color: ${t.primary700} !important;
  border-radius: 20px !important;
  font-family: ${f.body} !important;
  font-weight: 600 !important;
}

.avatar, .avatar-user {
  border-radius: 50% !important;
  border: 1px solid ${t.borderAccent} !important;
}

.flash { border-radius: 12px !important; }

.js-path-segment, .final-path {
  font-family: ${f.body} !important;
  font-weight: 600 !important;
}

.blob-num { color: ${t.textLight} !important; }

.comment-form-head {
  background: ${t.bgSurface} !important;
  border-color: ${t.borderLight} !important;
  border-radius: 12px 12px 0 0 !important;
}

textarea.comment-form-textarea {
  border-color: ${t.borderLight} !important;
  font-family: ${f.body} !important;
}

textarea.comment-form-textarea:focus {
  border-color: ${t.accent} !important;
  box-shadow: 0 0 0 3px ${t.selectionBg} !important;
}

.pagination a {
  border-radius: 8px !important;
  font-family: ${f.body} !important;
}

.pagination .current {
  background: ${t.primary900} !important;
  border-color: ${t.primary900} !important;
  border-radius: 8px !important;
}

*:focus-visible {
  outline-color: ${t.accent} !important;
  outline-offset: 2px !important;
}

.subnav-search-input:focus {
  border-color: ${t.accent} !important;
  box-shadow: 0 0 0 3px ${t.selectionBg} !important;
}
`;
  }

  // ═══════════════════════════════════════════════
  // INJECTION ENGINE
  // ═══════════════════════════════════════════════
  function applyStyles() {
    chrome.storage.sync.get(
      { enabled: false, notionEnabled: true, githubEnabled: true, theme: 'luxury', font: 'classic', weight: 'medium', textColor: 'default' },
      (data) => {
        const existing = document.getElementById(STYLE_ID);
        if (existing) existing.remove();

        if (!data.enabled) {
          removeFonts();
          return;
        }

        const t = THEMES[data.theme] || THEMES.luxury;
        const f = FONTS[data.font] || FONTS.classic;
        const w = WEIGHTS[data.weight] || WEIGHTS.medium;
        const tcOverride = TEXT_COLORS[data.textColor];
        const tc = tcOverride || { main: t.textMain, muted: t.textMuted, light: t.textLight };

        injectFonts(data.font);

        let css = generalCSS(t, f, w, tc);

        if (isNotion && data.notionEnabled) {
          css += notionCSS(t, f, w, tc);
        }

        if (isGitHub && data.githubEnabled) {
          css += githubCSS(t, f, w, tc);
        }

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);
      }
    );
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateStyles') {
      applyStyles();
    }
  });

  chrome.storage.onChanged.addListener(() => {
    applyStyles();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStyles);
  } else {
    applyStyles();
  }
})();
