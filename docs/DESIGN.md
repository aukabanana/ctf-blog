# DESIGN.md — STUDIO Comp CTF Writeup Vault

## Theme

Cyber / Glassmorphism dark-first design with optional light mode.

## Color Palette

### Dark Mode (Default)

| Token              | Value                  | Usage                       |
| ------------------ | ---------------------- | --------------------------- |
| `cyber-bg`         | `#0a0e17`              | Page background             |
| `cyber-surface`    | `#111827`              | Elevated surfaces           |
| `cyber-card`       | `rgba(17,24,39,0.7)`   | Glass card background       |
| `cyber-border`     | `rgba(0,255,170,0.15)` | Card borders                |
| `cyber-accent`     | `#00ffaa`              | Primary accent (neon green) |
| `cyber-secondary`  | `#00d4ff`              | Secondary accent (cyan)     |
| `cyber-text`       | `#e2e8f0`              | Body text                   |
| `cyber-text-muted` | `#94a3b8`              | Secondary text              |
| `cyber-danger`     | `#ff4757`              | Error / destructive         |
| `cyber-warning`    | `#ffa502`              | Warning                     |
| `cyber-success`    | `#00ffaa`              | Success (same as accent)    |

### Light Mode

| Token              | Value                   | Usage                    |
| ------------------ | ----------------------- | ------------------------ |
| `light-bg`         | `#f8fafc`               | Page background          |
| `light-surface`    | `#ffffff`               | Elevated surfaces        |
| `light-card`       | `rgba(255,255,255,0.8)` | Glass card background    |
| `light-accent`     | `#059669`               | Primary accent (emerald) |
| `light-text`       | `#1e293b`               | Body text                |
| `light-text-muted` | `#64748b`               | Secondary text           |

## Typography

| Element         | Font                       | Size          | Weight       |
| --------------- | -------------------------- | ------------- | ------------ |
| Headings        | System sans-serif          | `2xl`–`4xl`   | Bold (700)   |
| Body            | System sans-serif          | `base` (16px) | Normal (400) |
| Code / Terminal | JetBrains Mono / Fira Code | `sm` (14px)   | Normal (400) |
| Badges          | System sans-serif          | `xs` (12px)   | Medium (500) |

## Spacing Scale

Use Tailwind's default spacing scale (`4px` base unit).

- Card padding: `p-4` (mobile), `p-6` (desktop)
- Section gaps: `gap-6`
- Page margins: `px-4` (mobile), `px-8` (desktop), max-width `7xl` centered

## Component Specs

### Glass Card

- Background: `cyber-card` with `backdrop-blur-xl saturate-[180%]`
- Border: 1px solid `cyber-border`
- Border radius: `rounded-xl`
- Hover: border transitions to `cyber-accent`, subtle glow shadow

### Badge

- Rounded pill: `rounded-full px-2.5 py-0.5`
- Semi-transparent background with matching text color
- Categories and difficulties each have distinct color mappings

### Spoiler Flag Box

- Glass card with dashed border
- Flag text blurred (8px) by default
- "Reveal" button: solid accent button
- Revealed state: remove blur, show confetti, display copy button

### Terminal Code Block

- Header bar: dark `#16161e` with three colored dots (red, yellow, green)
- Body: Tokyo Night theme via Shiki
- Copy button: top-right corner, icon-only

### Navigation Bar

- Fixed top, glass effect, full-width
- Logo/title left, nav links right
- Mobile: hamburger → slide-out menu

## Responsive Breakpoints

| Breakpoint | Min Width       | Layout                                 |
| ---------- | --------------- | -------------------------------------- |
| Mobile     | `0px`           | Single column, stacked cards           |
| Tablet     | `768px` (`md`)  | 2-column card grid                     |
| Desktop    | `1024px` (`lg`) | 3-column card grid, side metadata      |
| Wide       | `1280px` (`xl`) | Max content width, comfortable spacing |

## Category Badge Colors

| Category  | Background    | Text       |
| --------- | ------------- | ---------- |
| Web       | Blue 500/20   | Blue 400   |
| Pwn       | Red 500/20    | Red 400    |
| Crypto    | Purple 500/20 | Purple 400 |
| Rev       | Amber 500/20  | Amber 400  |
| Forensics | Teal 500/20   | Teal 400   |
| OSINT     | Cyan 500/20   | Cyan 400   |
| Misc      | Gray 500/20   | Gray 400   |

## Difficulty Badge Colors

| Difficulty | Background    | Text       |
| ---------- | ------------- | ---------- |
| Easy       | Green 500/20  | Green 400  |
| Medium     | Yellow 500/20 | Yellow 400 |
| Hard       | Orange 500/20 | Orange 400 |
| Insane     | Red 600/20    | Red 500    |
