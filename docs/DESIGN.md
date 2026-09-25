# DESIGN.md — STUDIO Comp CTF Writeup Vault

## Theme

Cyber / Glassmorphism dark-first design with optional light mode and signature hacker aesthetics.

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

### Theme Color Profiles (Signature Switcher)

| Profile Name       | Accent (`cyber-accent`) | Secondary (`cyber-secondary`) | Vibe / Mood                 |
| ------------------ | ----------------------- | ----------------------------- | --------------------------- |
| **Tokyo Cyan**     | `#00d4ff` (Cyan)        | `#00ffaa` (Neon Green)        | Cyberpunk Default           |
| **Matrix Green**   | `#00ff66` (Phosphor)    | `#00aa44` (Terminal Green)    | Classic Hacker Terminal     |
| **Red Team Blood** | `#ff3344` (Crimson)     | `#ff8800` (Amber Flare)       | Offensive / Exploitation    |

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

---

## Signature Features & Cyber Identity

### 1. Text Decryption / Hacker Scramble Effect
- **Application:** Challenge card titles, category pills on hover, and page titles on initial load.
- **Behavior:** On hover or entrance, characters randomly shuffle through hex bytes and cyber glyphs (`0x`, `*`, `%`, `&`, `?`, `!`, `_`) for 400ms before snapping into readable text.

### 2. Dropdown Quake Terminal (`~` or `Ctrl+K`)
- **HUD Drawer:** Pulls down from top screen with a backdrop blur and neon top border.
- **Prompt:** `studio@vault:~$ `
- **Supported Commands:**
  - `help` — Lists all available interactive shell commands.
  - `ls` / `list` — Lists all writeups with IDs and categories.
  - `filter <category>` — Dynamically filters the dashboard challenge grid (e.g. `filter pwn`).
  - `whoami` — Prints author persona, specialization, and team handle.
  - `cat flag` — Easter egg responses (e.g., *"Nice try! The flag is protected by something RLS 😉"*).
  - `clear` — Clears terminal buffer.
  - `theme <profile>` — Switches color theme dynamically (`tokyo`, `matrix`, `blood`).

### 3. Target Mission Dossier & Kill Chain Breadcrumb Bar
- **Target Dossier Box (Header of Writeup Reader):**
  - Displays structured CTF metadata badge grid:
    - `TARGET IP:` e.g. `10.10.11.45`
    - `OS / PLATFORM:` Linux (Debian 12) / Windows
    - `ARCHITECTURE:` x86_64 / ARM / Web-only
    - `DIFFICULTY & POINTS:` e.g. Medium (250 pts)
    - `CVE IDENTIFIERS:` e.g. CVE-2024-xxxx (if applicable)
- **Interactive Kill Chain Breadcrumbs:**
  - Top progress tracker on write-ups:
    `[1. Recon] ➔ [2. Vuln Discovery] ➔ [3. Exploitation] ➔ [4. PrivEsc] ➔ [5. Root & Flag]`
  - Clicking any step smoothly scrolls the reader directly to that section.

### 4. Retro CRT Scanline & Ambient FX Switcher
- Subtle scanline overlay (`pointer-events: none`) simulating a retro cathode-ray hacker monitor.
- Can be toggled on/off with an icon button in the header/footer (defaults to off/clean, user can toggle on).

### 5. Authentic Shell Terminal Code Blocks with Exploit Downloader
- **Header:** Emulates a true Unix terminal:
  - Three colored window controls (Red `#ff5f56`, Yellow `#ffbd2e`, Green `#27c93f`).
  - Active path label: `studio@pwnbox:~/studio-comp/challenge$`
  - Copy to clipboard button with tactile feedback.
- **Exploit Download Action:** For Python/Shell exploit scripts, provides a direct "Download `.py`" or "Download Script" button.

---

## Component Specs

### Glass Card

- Background: `cyber-card` with `backdrop-blur-xl saturate-[180%]`
- Border: 1px solid `cyber-border`
- Border radius: `rounded-xl`
- Hover: border transitions to `cyber-accent`, subtle glow shadow (`shadow-cyber-glow`)

### Badge

- Rounded pill: `rounded-full px-2.5 py-0.5`
- Semi-transparent background with matching text color
- Categories and difficulties each have distinct color mappings

### Spoiler Flag Box

- Glass card with dashed neon border
- Flag text blurred (`filter: blur(8px)`) and hidden by default
- "Reveal Flag" action button: solid accent button with key/lock icon
- Revealed state: queries `/api/flag`, unblurs text, triggers Confetti burst, and presents a "Copy Flag" button

### Navigation Bar

- Fixed top, glass effect (`backdrop-blur-md`), full-width
- Logo with neon pulse dot and title on left
- Interactive Terminal quick-launch badge (`~` or `Ctrl+K`)
- Theme color profile switcher and GitHub link on right
- Mobile: responsive hamburger dropdown

---

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
