export interface ThemeConfig {
  id: string;
  name: string;
  vibe: string;
  accent: string;
  secondary: string;
  bg: string;
  surface: string;
  card: string;
  border: string;
  glow: string;
  tag: string;
  danger: string;
  warning: string;
  text: string;
  muted: string;
}

export type ThemeProfile = 'tokyo' | 'mono' | 'blood';

export const THEMES: Record<string, ThemeConfig> = {
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo Cyan',
    vibe: 'Cyberpunk Default',
    accent: '#00ffaa',
    secondary: '#00d4ff',
    bg: '#0a0e17',
    surface: '#111827',
    card: 'rgba(17, 24, 39, 0.75)',
    border: 'rgba(0, 255, 170, 0.2)',
    glow: '0 0 20px rgba(0, 255, 170, 0.25)',
    tag: '#00d4ff',
    danger: '#ff4757',
    warning: '#ffa502',
    text: '#e2e8f0',
    muted: '#94a3b8',
  },
  mono: {
    id: 'mono',
    name: 'Mono White',
    vibe: 'Minimal / Clean Editor',
    accent: '#f0f0f0',
    secondary: '#a0a0a0',
    bg: '#0d0d0d',
    surface: '#161616',
    card: 'rgba(22, 22, 22, 0.85)',
    border: 'rgba(240, 240, 240, 0.15)',
    glow: '0 0 20px rgba(240, 240, 240, 0.06)',
    tag: '#888888',
    danger: '#cccccc',
    warning: '#999999',
    text: '#e8e8e8',
    muted: '#5a5a5a',
  },
  blood: {
    id: 'blood',
    name: 'Red Team Blood',
    vibe: 'Offensive / Exploitation',
    accent: '#ff3344',
    secondary: '#ff8800',
    bg: '#120709',
    surface: '#1f0d11',
    card: 'rgba(31, 13, 17, 0.8)',
    border: 'rgba(255, 51, 68, 0.25)',
    glow: '0 0 20px rgba(255, 51, 68, 0.3)',
    tag: '#ff8800',
    danger: '#ff1122',
    warning: '#ffa502',
    text: '#ffe4e6',
    muted: '#fda4af',
  },
};
