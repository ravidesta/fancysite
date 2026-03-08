(() => {
  const STYLE_ID = 'ghostwrite-design-system';
  const FONT_ID = 'ghostwrite-fonts';

  // Detect which site we're on
  const hostname = window.location.hostname;
  const isNotion = hostname.includes('notion.so') || hostname.includes('notion.site');
  const isGitHub = hostname.includes('github.com');

  function injectFonts() {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }

  function removeFonts() {
    const el = document.getElementById(FONT_ID);
    if (el) el.remove();
  }

  // ─────────────────────────────────────────────
  // GENERAL STYLES — applied to every site
  // ─────────────────────────────────────────────
  const generalCSS = `
/* ═══════════════════════════════════════════════
   GHOSTWRITE DESIGN SYSTEM — General
   Luxury palette, typography, and texture
   ═══════════════════════════════════════════════ */

:root {
  --gw-bg-base: #FAFAF8 !important;
  --gw-bg-surface: #FFFFFF !important;
  --gw-bg-glass: rgba(255, 255, 255, 0.7) !important;
  --gw-green-900: #0A1C14 !important;
  --gw-green-800: #122E21 !important;
  --gw-green-700: #1B402E !important;
  --gw-green-200: #D1E0D7 !important;
  --gw-green-100: #E8F0EA !important;
  --gw-gold-primary: #C5A059 !important;
  --gw-gold-light: #E6D0A1 !important;
  --gw-gold-dark: #9A7A3A !important;
  --gw-text-main: #122E21 !important;
  --gw-text-muted: #5C7065 !important;
  --gw-text-light: #8A9C91 !important;
  --gw-border-light: #E5EBE7 !important;
  --gw-border-gold: rgba(197, 160, 89, 0.3) !important;
}

/* Typography overrides */
body {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  letter-spacing: 0.01em !important;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth !important;
}

/* Soften all border-radius to luxury feel */
button, input, select, textarea,
[role="button"] {
  border-radius: 8px !important;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
}

/* Soften link transitions */
a {
  transition: color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease !important;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px !important;
}

::-webkit-scrollbar-track {
  background: #F5F5F2 !important;
}

::-webkit-scrollbar-thumb {
  background: #D1E0D7 !important;
  border-radius: 4px !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #9A7A3A !important;
}

/* Selection color */
::selection {
  background: rgba(197, 160, 89, 0.25) !important;
  color: #0A1C14 !important;
}
`;

  // ─────────────────────────────────────────────
  // NOTION-SPECIFIC STYLES
  // ─────────────────────────────────────────────
  const notionCSS = `
/* ═══════════════════════════════════════════════
   GHOSTWRITE — Notion Cultivation
   ═══════════════════════════════════════════════ */

/* Base background */
.notion-app-inner,
.notion-frame,
.notion-body {
  background: #FAFAF8 !important;
}

/* Sidebar */
.notion-sidebar {
  background: #FFFFFF !important;
  border-right: 1px solid #E5EBE7 !important;
}

.notion-sidebar-container {
  background: #FFFFFF !important;
}

/* Sidebar items */
.notion-sidebar .notion-focusable:hover {
  background: #E8F0EA !important;
}

/* Top bar */
.notion-topbar {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid #E5EBE7 !important;
}

/* Page content */
.notion-page-content {
  font-family: 'Manrope', -apple-system, sans-serif !important;
}

/* Headings inside pages */
.notion-header-block .notion-page-block,
.notion-sub_header-block .notion-page-block,
.notion-sub_sub_header-block .notion-page-block,
[placeholder="Heading 1"],
[placeholder="Heading 2"],
[placeholder="Heading 3"] {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  color: #0A1C14 !important;
}

/* Page titles */
.notion-page-block .notranslate[contenteditable="true"],
.notion-page-block [placeholder="Untitled"] {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  color: #0A1C14 !important;
}

/* Body text */
.notion-text-block .notranslate {
  font-family: 'Manrope', -apple-system, sans-serif !important;
  color: #122E21 !important;
  line-height: 1.7 !important;
}

/* Links */
.notion-link-token span {
  color: #9A7A3A !important;
  border-bottom: 1px solid rgba(197, 160, 89, 0.3) !important;
}

.notion-link-token span:hover {
  border-color: #9A7A3A !important;
}

/* Buttons / action items */
.notion-collection-view-select,
.notion-focusable[role="button"] {
  border-radius: 30px !important;
  font-family: 'Manrope', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
}

/* Blue buttons -> gold */
.notion-focusable[style*="background: rgb(35, 131, 226)"],
.notionFocusable[style*="background: rgb(35, 131, 226)"] {
  background: #0A1C14 !important;
  border-radius: 30px !important;
}

.notion-focusable[style*="background: rgb(35, 131, 226)"]:hover {
  background: #9A7A3A !important;
}

/* Table/Database views */
.notion-table-view,
.notion-board-view,
.notion-list-view,
.notion-gallery-view {
  font-family: 'Manrope', sans-serif !important;
}

/* Database header */
.notion-collection_view-block .notion-scroller {
  border-color: #E5EBE7 !important;
}

/* Tags / multi-select pills */
.notion-property-multi_select-item,
.notion-property-select-item {
  border-radius: 20px !important;
  font-family: 'Manrope', sans-serif !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.05em !important;
}

/* Callout blocks */
.notion-callout-block {
  border-radius: 12px !important;
  border: 1px solid #E5EBE7 !important;
  background: #FFFFFF !important;
}

/* Code blocks */
.notion-code-block {
  border-radius: 12px !important;
  border: 1px solid #E5EBE7 !important;
  background: #F8F9F7 !important;
}

/* Toggle blocks */
.notion-toggle-block {
  border-left: 2px solid rgba(197, 160, 89, 0.3) !important;
}

/* Quote blocks */
.notion-quote-block {
  border-left: 3px solid #C5A059 !important;
  font-family: 'Cormorant Garamond', serif !important;
  font-style: italic !important;
  font-size: 1.15em !important;
  color: #5C7065 !important;
}

/* Dividers */
.notion-divider-block .notion-focusable {
  border-color: #E5EBE7 !important;
}

/* Popup menus */
.notion-overlay-container .notion-scroller,
.notion-peek-renderer {
  background: #FFFFFF !important;
  border: 1px solid #E5EBE7 !important;
  border-radius: 12px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06) !important;
}

/* Checkboxes */
.notion-to_do-block .notion-focusable svg[style*="fill: rgb(35, 131, 226)"] {
  fill: #1B402E !important;
}
`;

  // ─────────────────────────────────────────────
  // GITHUB-SPECIFIC STYLES
  // ─────────────────────────────────────────────
  const githubCSS = `
/* ═══════════════════════════════════════════════
   GHOSTWRITE — GitHub Cultivation
   ═══════════════════════════════════════════════ */

/* Override GitHub's design tokens */
html[data-color-mode="light"],
[data-color-mode="light"][data-light-theme="light"],
[data-light-theme="light"] {
  --bgColor-default: #FAFAF8 !important;
  --bgColor-muted: #F5F5F0 !important;
  --bgColor-inset: #F0EDE8 !important;
  --bgColor-emphasis: #0A1C14 !important;
  --borderColor-default: #E5EBE7 !important;
  --borderColor-muted: rgba(197, 160, 89, 0.2) !important;
  --fgColor-default: #122E21 !important;
  --fgColor-muted: #5C7065 !important;
  --fgColor-accent: #9A7A3A !important;
  --fgColor-link: #9A7A3A !important;
  --button-primary-bgColor-rest: #0A1C14 !important;
  --button-primary-bgColor-hover: #1B402E !important;
  --color-accent-fg: #9A7A3A !important;
  --color-accent-emphasis: #9A7A3A !important;
  --color-fg-default: #122E21 !important;
  --color-fg-muted: #5C7065 !important;
  --color-canvas-default: #FAFAF8 !important;
  --color-canvas-subtle: #F5F5F0 !important;
  --color-canvas-inset: #F0EDE8 !important;
  --color-border-default: #E5EBE7 !important;
  --color-border-muted: rgba(197, 160, 89, 0.2) !important;
  --color-btn-primary-bg: #0A1C14 !important;
  --color-btn-primary-hover-bg: #1B402E !important;
  --color-primer-fg-disabled: #8A9C91 !important;
  --header-bgColor: #0A1C14 !important;
}

/* Header */
.AppHeader,
.Header,
header.AppHeader {
  background: #0A1C14 !important;
  border-bottom: 1px solid #1B402E !important;
}

/* Repository page background */
body, .application-main {
  background: #FAFAF8 !important;
}

/* Main content */
.Layout-main,
.repository-content,
.container-xl,
.container-lg {
  font-family: 'Manrope', -apple-system, sans-serif !important;
}

/* Repository name */
.AppHeader-context-item-label,
strong[itemprop="name"] a,
a.mr-2.flex-self-stretch {
  font-family: 'Cormorant Garamond', serif !important;
  font-weight: 600 !important;
  font-size: 1.2em !important;
}

/* Headings in markdown */
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  color: #0A1C14 !important;
  border-bottom-color: #E5EBE7 !important;
}

/* Markdown body text */
.markdown-body {
  font-family: 'Manrope', -apple-system, sans-serif !important;
  color: #122E21 !important;
  line-height: 1.7 !important;
}

/* Links in markdown */
.markdown-body a {
  color: #9A7A3A !important;
}

.markdown-body a:hover {
  color: #C5A059 !important;
}

/* Code blocks */
.markdown-body pre,
.markdown-body code,
.highlight pre,
.blob-code-inner {
  font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
  border-radius: 8px !important;
}

.markdown-body pre {
  background: #F5F5F0 !important;
  border: 1px solid #E5EBE7 !important;
  border-radius: 12px !important;
}

/* Inline code */
.markdown-body code {
  background: rgba(197, 160, 89, 0.08) !important;
  color: #9A7A3A !important;
  border-radius: 4px !important;
  padding: 0.15em 0.4em !important;
}

.markdown-body pre code {
  background: transparent !important;
  color: inherit !important;
}

/* Buttons */
.btn,
.btn-sm,
.btn-primary {
  border-radius: 30px !important;
  font-family: 'Manrope', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
}

.btn-primary {
  background: #0A1C14 !important;
  border-color: #0A1C14 !important;
}

.btn-primary:hover {
  background: #9A7A3A !important;
  border-color: #9A7A3A !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(154, 122, 58, 0.2) !important;
}

/* Tabs / underline nav */
.UnderlineNav-item,
.tabnav-tab {
  font-family: 'Manrope', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.8rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

.UnderlineNav-item[aria-current="page"],
.UnderlineNav-item.selected {
  border-bottom-color: #9A7A3A !important;
  color: #0A1C14 !important;
}

/* Repo sidebar / about */
.BorderGrid-cell {
  border-color: #E5EBE7 !important;
}

/* Labels / tags */
.Label, .IssueLabel,
.topic-tag {
  border-radius: 20px !important;
  font-family: 'Manrope', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.04em !important;
}

.topic-tag {
  background: #E8F0EA !important;
  color: #1B402E !important;
  border: 1px solid #D1E0D7 !important;
}

.topic-tag:hover {
  background: #D1E0D7 !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
}

/* Cards / boxes */
.Box,
.Box--condensed {
  border-color: #E5EBE7 !important;
  border-radius: 12px !important;
}

.Box-header {
  background: #F5F5F0 !important;
  border-bottom-color: #E5EBE7 !important;
  border-radius: 12px 12px 0 0 !important;
}

/* File browser */
.react-directory-row {
  border-color: #E5EBE7 !important;
}

/* Commit messages */
.commit-title a {
  color: #122E21 !important;
}

.commit-title a:hover {
  color: #9A7A3A !important;
}

/* PR / Issue page */
.TimelineItem {
  border-color: #E5EBE7 !important;
}

.timeline-comment {
  border-color: #E5EBE7 !important;
  border-radius: 12px !important;
}

.timeline-comment-header {
  background: #F5F5F0 !important;
  border-bottom-color: #E5EBE7 !important;
  border-radius: 12px 12px 0 0 !important;
}

/* State labels */
.State--open {
  background: #1B402E !important;
}

.State--merged {
  background: #9A7A3A !important;
}

/* Counter badges */
.Counter {
  background: #E8F0EA !important;
  color: #1B402E !important;
  border-radius: 20px !important;
  font-family: 'Manrope', sans-serif !important;
  font-weight: 600 !important;
}

/* Avatars */
.avatar, .avatar-user {
  border-radius: 50% !important;
  border: 1px solid rgba(197, 160, 89, 0.2) !important;
}

/* Flash notices */
.flash {
  border-radius: 12px !important;
}

/* Navigation breadcrumbs */
.js-path-segment, .final-path {
  font-family: 'Manrope', sans-serif !important;
  font-weight: 600 !important;
}

/* Diff view */
.blob-num {
  color: #8A9C91 !important;
}

.blob-code-addition {
  background: rgba(232, 240, 234, 0.5) !important;
}

.blob-code-deletion {
  background: rgba(197, 160, 89, 0.08) !important;
}

/* Comment box */
.comment-form-head {
  background: #F5F5F0 !important;
  border-color: #E5EBE7 !important;
  border-radius: 12px 12px 0 0 !important;
}

textarea.comment-form-textarea {
  border-color: #E5EBE7 !important;
  font-family: 'Manrope', sans-serif !important;
}

textarea.comment-form-textarea:focus {
  border-color: #C5A059 !important;
  box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.15) !important;
}

/* Pagination */
.pagination a {
  border-radius: 8px !important;
  font-family: 'Manrope', sans-serif !important;
}

.pagination .current {
  background: #0A1C14 !important;
  border-color: #0A1C14 !important;
  border-radius: 8px !important;
}

/* Focus rings */
*:focus-visible {
  outline-color: #C5A059 !important;
  outline-offset: 2px !important;
}

/* Subnav search */
.subnav-search-input:focus {
  border-color: #C5A059 !important;
  box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.15) !important;
}
`;

  // ─────────────────────────────────────────────
  // INJECTION ENGINE
  // ─────────────────────────────────────────────
  function applyStyles() {
    chrome.storage.sync.get(
      { enabled: false, notionEnabled: true, githubEnabled: true },
      (data) => {
        // Remove existing styles
        const existing = document.getElementById(STYLE_ID);
        if (existing) existing.remove();

        if (!data.enabled) {
          removeFonts();
          return;
        }

        injectFonts();

        let css = generalCSS;

        if (isNotion && data.notionEnabled) {
          css += notionCSS;
        }

        if (isGitHub && data.githubEnabled) {
          css += githubCSS;
        }

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);
      }
    );
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateStyles') {
      applyStyles();
    }
  });

  // Listen for storage changes (from other tabs/windows)
  chrome.storage.onChanged.addListener(() => {
    applyStyles();
  });

  // Apply on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStyles);
  } else {
    applyStyles();
  }
})();
