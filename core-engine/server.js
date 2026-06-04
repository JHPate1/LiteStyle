// One thing i have seen is that this server.js file fails alot on other devices. I tried this on windows and i couldnt get it to work. So it will be more of a hit or miss for you. Check the github readme for solutions.
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ limit: '1mb' }));

const server = http.createServer(app);

let projectRoot = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(projectRoot, 'sandbox-site'))) {
  if (fs.existsSync(path.resolve(__dirname, '../../sandbox-site'))) {
    projectRoot = path.resolve(__dirname, '../..');
  }
}

const SANDBOX_DIR = path.join(projectRoot, 'sandbox-site');
const CONFIG_PATH = path.join(SANDBOX_DIR, 'theme.json');
const TARGET_CSS_PATH = path.join(SANDBOX_DIR, 'src', 'theme.css');

const defaults = {
  mode: 'dark',
  fontBase: 'Inter, ui-sans-serif, system-ui, sans-serif',
  accent: '#2563eb',
  accent2: '#14b8a6',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  bgMain: '#08090d',
  bgSurface: '#151923',
  textMain: '#f5f7fb',
  textMuted: '#98a2b3',
  border: '#252a35',
  onAccent: '#ffffff',
  pagePad: '24px',

  cardBg: '#11141c',
  cardBorder: '#252a35',
  cardBorderWeight: '1px',
  cardRadius: '16px',
  cardPadding: '18px',
  cardShadow: '0 16px 44px rgba(0,0,0,.22)',
  cardHoverShadow: '0 20px 60px rgba(0,0,0,.32)',

  btnPrimaryType: 'solid',
  btnRadius: '12px',
  btnPadding: '10px 16px',
  btnHeight: '40px',
  btnFontSize: '14px',
  btnWeight: '700',
  btnScale: '0.97',
  btnGlow: '22px',

  badgeType: 'subtle',
  badgeBg: '#2563eb',
  badgeText: '#60a5fa',
  badgeRadius: '999px',
  badgePadding: '4px 10px',
  badgeFontSize: '11px',
  badgeWeight: '700',
  badgeTransform: 'uppercase',
  badgeGlow: '14px',

  inputBg: '#0e1118',
  inputBorder: '#252a35',
  inputBorderWeight: '1px',
  inputRadius: '12px',
  inputPadding: '10px 12px',
  inputHeight: '42px',
  inputGlowStyle: '0 0 0 3px rgba(37,99,235,.18)',

  navActiveBg: 'rgba(37,99,235,.12)',
  navActiveIndicator: '0 solid transparent',
  navLinkSpacing: '8px 12px',
  navRadius: '12px',
  navbarBg: 'rgba(21,25,35,.84)',
  navbarHeight: '64px',
  navbarBlur: '16px',
  sidebarBg: '#0c1017',
  sidebarWidth: '280px',
  sidebarPad: '16px',

  progressHeight: '8px',
  progressTrackBg: '#252a35',
  switchWidth: '44px',
  switchHeight: '24px',
  alertRadius: '12px',
  alertPadding: '14px 16px',
  alertBg: 'rgba(37,99,235,.12)',
  alertBorder: 'rgba(37,99,235,.24)',
  alertText: '#dbeafe',
  avatarSize: '40px',
  avatarRadius: '999px',
  tabsRadius: '12px',
  tabsBg: 'rgba(255,255,255,.05)',
  tabActiveBg: '#151923',
  chipRadius: '999px',
  chipBg: 'rgba(255,255,255,.06)',
  logoRadius: '10px',
  gridGap: '16px',
  stackGap: '16px',
  rowGap: '12px',
  tableHeadBg: 'rgba(255,255,255,.03)',

  radius: '12px',
  btnPadX: '16px',
  btnPadY: '10px',
  bgToast: '#1e1b4b',
  toastRadius: '16px',
  toastShadow: '0 10px 15px -3px rgba(0,0,0,.3)',
  sliderSmoothness: '0.15s',
  sliderThumbShape: '50%'
};

function isHex(value) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(String(value || ''));
}

function pickString(config, key, fallback = defaults[key]) {
  const value = config?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

// Fixed validation fallback mappings
function pickColor(config, key, fallback = defaults[key]) {
  const value = config?.[key];
  if (isHex(value)) return value;
  if (typeof value === 'string' && /^(rgba?|hsla?)\(/i.test(value.trim())) return value.trim();
  if (typeof value === 'string' && value.includes('var(')) return value.trim();
  return fallback;
}

function validateConfig(config = {}) {
  const mode = config.mode === 'light' ? 'light' : 'dark';
  const merged = { ...defaults, ...config, mode };

  return {
    ...merged,
    accent: pickColor(config, 'accent'),
    accent2: pickColor(config, 'accent2'),
    success: pickColor(config, 'success'),
    warning: pickColor(config, 'warning'),
    danger: pickColor(config, 'danger'),
    bgMain: pickColor(config, 'bgMain', mode === 'dark' ? defaults.bgMain : '#f7f9fc'),
    bgSurface: pickColor(config, 'bgSurface', mode === 'dark' ? defaults.bgSurface : '#ffffff'),
    textMain: pickColor(config, 'textMain', mode === 'dark' ? defaults.textMain : '#101828'),
    textMuted: pickColor(config, 'textMuted', mode === 'dark' ? defaults.textMuted : '#667085'),
    border: pickColor(config, 'border', mode === 'dark' ? defaults.border : '#d0d5dd'),
    onAccent: pickColor(config, 'onAccent'),
    badgeBg: pickColor(config, 'badgeBg'),
    badgeText: pickColor(config, 'badgeText'),
    inputBg: pickColor(config, 'inputBg'),
    inputBorder: pickColor(config, 'inputBorder'),
    cardBg: pickColor(config, 'cardBg'),
    cardBorder: pickColor(config, 'cardBorder'),
    navbarBg: pickColor(config, 'navbarBg'),
    sidebarBg: pickColor(config, 'sidebarBg'),
    progressTrackBg: pickColor(config, 'progressTrackBg'),
    alertBg: pickColor(config, 'alertBg'),
    alertBorder: pickColor(config, 'alertBorder'),
    alertText: pickColor(config, 'alertText'),
    chipBg: pickColor(config, 'chipBg'),
    tabsBg: pickColor(config, 'tabsBg'),
    tabActiveBg: pickColor(config, 'tabActiveBg'),
    tableHeadBg: pickColor(config, 'tableHeadBg'),
    fontBase: pickString(config, 'fontBase')
  };
}

function compileTokensToCss(config) {
  const cssBuffer = `/**
 * DO NOT EDIT THIS FILE DIRECTLY.
 * This file is generated dynamically by the LiteStyle Core Engine via theme.json. 
 */
:root {
  color-scheme: ${config.mode};
  --ls-font-base: ${config.fontBase};
  --ls-accent: ${config.accent};
  --ls-accent-2: ${config.accent2};
  --ls-success: ${config.success};
  --ls-warning: ${config.warning};
  --ls-danger: ${config.danger};
  --ls-on-accent: ${config.onAccent};
  --ls-bg-main: ${config.bgMain};
  --ls-bg-surface: ${config.bgSurface};
  --ls-text-main: ${config.textMain};
  --ls-text-muted: ${config.textMuted};
  --ls-border: ${config.border};
  --ls-page-pad: ${config.pagePad};

  --ls-card-bg: ${config.cardBg};
  --ls-card-border: ${config.cardBorder};
  --ls-card-border-weight: ${config.cardBorderWeight};
  --ls-card-radius: ${config.cardRadius};
  --ls-card-padding: ${config.cardPadding};
  --ls-card-shadow: ${config.cardShadow};
  --ls-card-hover-shadow: ${config.cardHoverShadow};

  --ls-btn-radius: ${config.btnRadius};
  --ls-btn-padding: ${config.btnPadding};
  --ls-btn-height: ${config.btnHeight};
  --ls-btn-font-size: ${config.btnFontSize};
  --ls-btn-weight: ${config.btnWeight};
  --ls-btn-active-scale: ${config.btnScale};
  --ls-btn-glow: ${config.btnGlow};

  --ls-badge-bg: ${config.badgeBg};
  --ls-badge-text: ${config.badgeText};
  --ls-badge-radius: ${config.badgeRadius};
  --ls-badge-padding: ${config.badgePadding};
  --ls-badge-font-size: ${config.badgeFontSize};
  --ls-badge-weight: ${config.badgeWeight};
  --ls-badge-transform: ${config.badgeTransform};
  --ls-badge-glow: ${config.badgeGlow};

  --ls-input-bg: ${config.inputBg};
  --ls-input-border: ${config.inputBorder};
  --ls-input-border-weight: ${config.inputBorderWeight};
  --ls-input-radius: ${config.inputRadius};
  --ls-input-padding: ${config.inputPadding};
  --ls-input-height: ${config.inputHeight};
  --ls-input-focus-glow: ${config.inputGlowStyle};

  --ls-nav-active-bg: ${config.navActiveBg};
  --ls-nav-active-border: ${config.navActiveIndicator};
  --ls-nav-link-spacing: ${config.navLinkSpacing};
  --ls-nav-radius: ${config.navRadius};
  --ls-navbar-bg: ${config.navbarBg};
  --ls-navbar-height: ${config.navbarHeight};
  --ls-navbar-blur: ${config.navbarBlur};
  --ls-sidebar-bg: ${config.sidebarBg};
  --ls-sidebar-width: ${config.sidebarWidth};
  --ls-sidebar-pad: ${config.sidebarPad};

  --ls-progress-height: ${config.progressHeight};
  --ls-progress-track-bg: ${config.progressTrackBg};
  --ls-switch-width: ${config.switchWidth};
  --ls-switch-height: ${config.switchHeight};
  --ls-alert-radius: ${config.alertRadius};
  --ls-alert-padding: ${config.alertPadding};
  --ls-alert-bg: ${config.alertBg};
  --ls-alert-border: ${config.alertBorder};
  --ls-alert-text: ${config.alertText};
  --ls-avatar-size: ${config.avatarSize};
  --ls-avatar-radius: ${config.avatarRadius};
  --ls-tabs-radius: ${config.tabsRadius};
  --ls-tabs-bg: ${config.tabsBg};
  --ls-tab-active-bg: ${config.tabActiveBg};
  --ls-chip-radius: ${config.chipRadius};
  --ls-chip-bg: ${config.chipBg};
  --ls-logo-radius: ${config.logoRadius};
  --ls-grid-gap: ${config.gridGap};
  --ls-stack-gap: ${config.stackGap};
  --ls-row-gap: ${config.rowGap};
  --ls-table-head-bg: ${config.tableHeadBg};

  --ls-toast-radius: ${config.toastRadius};
  --ls-toast-bg: ${config.bgToast};
  --ls-toast-shadow: ${config.toastShadow};
}
`;

  const cssDir = path.dirname(TARGET_CSS_PATH);
  if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
  fs.writeFileSync(TARGET_CSS_PATH, cssBuffer, 'utf-8');
}

// API Route Definition Mappings
app.get('/api/v1/config', (req, res) => {
  try {
    const currentConfig = fs.existsSync(CONFIG_PATH)
      ? JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
      : {};
    res.status(200).json(validateConfig(currentConfig));
  } catch {
    res.status(500).json({ error: 'Failed to access configuration file store.' });
  }
});

app.post('/api/v1/save-config', (req, res) => {
  try {
    const validatedData = validateConfig(req.body);
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(validatedData, null, 2), 'utf-8');
    compileTokensToCss(validatedData);
    res.status(200).json({ success: true, config: validatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Initialize Vite Core Server Context
const vite = await createViteServer({
  root: SANDBOX_DIR,
  server: { middlewareMode: true, watch: { usePolling: true }, hmr: { server } },
  appType: 'spa'
});

app.use('/dashboard', express.static(__dirname));
app.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dashboard.html'));
});
app.use(vite.middlewares);

// Core Initialization Lifecycle Hook
try {
  let initialData = {};
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      initialData = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    } catch {
      initialData = {};
    }
  }
  const secureConfig = validateConfig(initialData);
  fs.mkdirSync(SANDBOX_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(secureConfig, null, 2), 'utf-8');
  compileTokensToCss(secureConfig);
} catch (error) {
  console.error('LiteStyle engine bootstrap failure:', error);
}

server.listen(PORT, () => {
  console.log('\n=============================================================');
  console.log(' LiteStyle engine is running on port ' + PORT);
  console.log(` Studio dashboard: http://localhost:${PORT}/dashboard`);
  console.log(` Sandbox preview:  http://localhost:${PORT}/`);
  console.log('=============================================================\n');
});