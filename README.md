# AUKA CTF Vault

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/favicon-w.svg">
  <source media="(prefers-color-scheme: light)" srcset="./public/favicon-b.svg">
  <img src="./public/favicon-w.svg" alt="auka" width="100" height="100">
</picture>

### **Offensive Security Intelligence & CTF Exploitation Archives**

[![Astro](https://img.shields.io/badge/Astro-5.4-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

[Live Deployment](https://ctf-blog.auka.workers.dev/) • [Report Bug](https://github.com/aukabanana/ctf-blog/issues) • [Request Feature](https://github.com/aukabanana/ctf-blog/issues)

</div>

---

## 📌 Overview

**AUKA CTF Vault** is a high-performance, cyberpunk-themed documentation repository and tactical field handbook designed for capture-the-flag (CTF) security researchers, red teamers, and penetration testers.

Engineered with **Astro 5 Islands Architecture**, **Clean Feature-Driven Design**, and deployed globally on **Cloudflare Workers Edge Network**, the Vault delivers sub-millisecond static page speeds while offering rich, dynamic interactive exploitation tools.

---

## Key Features

- **Quake Dropdown HUD Terminal (`~` or `Ctrl+K`)**
  - An interactive terminal emulator offering command-line navigation
    - `ls`
    - `cat`
    - `open <id>`
    - `theme <name>`
    - `filter <cat>`
    - `whoami`
    - `crt toggle`
    - `clear`
- **Retro CRT Scanline Filter**
  - High-fidelity CRT scanline and phosphor grid overlay that can be toggled via hotkey, HUD button, or terminal command.
- **Multi-Profile Cyberpunk Theme Engine**
  - **Tokyo Night (`tokyo`)**: Electric cyan and purple neon.
  - **Mono White (`mono`)**: Ultra-clean pitch-black background with monotone grayscale accents and badges.
  - **Blood Red (`blood`)**: High-contrast crimson red tactical HUD.
  - **Cyber Light Mode**: Crisp white/slate interface with dark typography and automatic Tokyo accent fallback.
- **Tactical Mission Dossiers**
  - Rich breakdown of each vulnerability target:
    - **CVSS 3.1 Severity Score** badge
    - **MITRE ATT&CK Kill Chain** phase tracker
    - Target IP & exposed service enumeration
    - Proof-of-Concept exploit scripts with copy-to-clipboard code blocks
- **Spoiler-Protected Flag Reveal**
  - Flags remain encrypted and hidden behind zero-spoiler reveal triggers to protect reader challenge integrity.
- **Hacker Text Scramble Animation**
  - Dynamic `DecryptedText` glyph-cycling animation on titles, categories, and mission headers.
- **Real-Time Client-Side Recon Filter**
  - Instant zero-latency search by Title, CVE identifier, IP, or summary.
  - Filter pills by category: `Web`, `Pwn`, `Crypto`, `Rev`, `Forensics`, `OSINT`.
  - Filter by difficulty rating: `Easy`, `Medium`, `Hard`, `Insane`.
- **Edge-Ready & SEO Optimized**
  - Dynamic OpenGraph cards, canonical tags, zero-JS base layouts, and full Cloudflare Workers compatibility.

---

## Tech Stack

| Layer                  | Technologies                                                                                |
| :--------------------- | :------------------------------------------------------------------------------------------ |
| **Framework**          | [Astro 5](https://astro.build/) (Static Site Generation + Server-Side Edge Rendering)       |
| **Component Islands**  | [React 19](https://react.dev/) + [Lucide Icons](https://lucide.dev/)                        |
| **Styling**            | [Tailwind CSS 3.4](https://tailwindcss.com/) + CSS Variable Cyberpunk Themes                |
| **Edge Runtime**       | [Cloudflare Workers](https://developers.cloudflare.com/workers/) via `@astrojs/cloudflare`  |
| **Database & Auth**    | [Supabase](https://supabase.com/) (`@supabase/supabase-js`)                                 |
| **Artifact Storage**   | [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) via `@aws-sdk/client-s3` |
| **Language & Tooling** | TypeScript 5.8 (Strict), pnpm, tsx, Wrangler 4                                              |

---

## Architecture & Project Structure

The codebase is structured following **Domain / Feature-Driven Clean Architecture**:

```text
ctf-blog/
├── public/                    # Static assets
│   ├── favicon-w.svg          # Custom SVG Brand Logo (Dark theme)
│   ├── favicon-b.svg          # Custom SVG Brand Logo (Light theme)
│   └── robots.txt             # Search crawler directives
├── scripts/                   # Administrative automation CLI scripts
│   ├── set-flag.ts            # Script to hash & store challenge flags in Supabase
│   └── upload-image.ts        # Script to upload exploit PoC screenshots to R2
├── src/
│   ├── components/
│   │   ├── common/            # Reusable UI primitives
│   │   │   ├── DecryptedText.tsx      # Hacker scramble text effect
│   │   │   └── TerminalCodeBlock.tsx  # Mac/Terminal styled syntax blocks
│   │   ├── islands/           # High-level React hydration coordinators
│   │   │   └── VaultApp.tsx           # Main application state & HUD island
│   │   └── seo/               # Search engine metadata components
│   │       └── BaseHead.astro         # Canonical, OpenGraph, Favicon, Fonts
│   ├── content/               # Markdown content collections
│   │   └── writeups/          # Structured CTF writeup entries (.md)
│   ├── features/              # Feature modules (Domain-driven)
│   │   ├── flags/             # Flag vault domain
│   │   │   └── components/
│   │   │       └── SpoilerFlagBox.tsx
│   │   ├── terminal/          # Quake HUD terminal domain
│   │   │   ├── components/
│   │   │   │   └── QuakeTerminal.tsx
│   │   │   └── types/
│   │   │       └── theme.ts
│   │   └── writeups/          # Mission dossiers & writeup domain
│   │       ├── components/
│   │       │   ├── ChallengeCard.tsx
│   │       │   ├── KillChainBar.tsx
│   │       │   ├── MissionDossier.tsx
│   │       │   └── WriteupReader.tsx
│   │       ├── data/
│   │       │   └── sample-writeups.ts
│   │       └── types/
│   │           └── index.ts
│   ├── layouts/               # Page layouts
│   │   ├── BaseLayout.astro   # Main root HTML layout
│   │   └── ErrorLayout.astro  # Terminal-themed error / 404 skeleton
│   ├── lib/                   # External service client SDKs
│   │   ├── r2.ts              # Cloudflare R2 S3 Client
│   │   └── supabase.ts        # Supabase Client
│   ├── pages/                 # Astro routing tree
│   │   ├── api/               # Edge API endpoints
│   │   │   └── flag.ts        # Flag verification API
│   │   ├── 404.astro          # Custom 404 Anomaly page
│   │   └── index.astro        # Vault dashboard entrypoint
│   ├── styles/
│   │   └── global.css         # Tailwind directives & scanline keyframes
│   └── types/                 # Shared generic ambient types
│       ├── common.ts
│       └── env.d.ts
├── astro.config.mjs           # Astro integration configuration
├── package.json               # Dependencies & scripts
├── tsconfig.json              # Path aliases (@components, @features, etc.)
└── wrangler.jsonc             # Cloudflare Workers configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: [pnpm](https://pnpm.io/) (`v9` or `v10`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aukabanana/ctf-blog.git
   cd ctf-blog
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:

   ```env
   # Supabase Configuration
   PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Cloudflare R2 Configuration (Optional for image upload scripts)
   R2_ACCOUNT_ID=your-cloudflare-account-id
   R2_ACCESS_KEY_ID=your-r2-access-key-id
   R2_SECRET_ACCESS_KEY=your-r2-secret-key
   R2_BUCKET_NAME=your-bucket-name
   R2_PUBLIC_URL=https://your-custom-r2-domain.com
   ```

4. Start development server:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## Terminal Keybindings & Commands

| Key / Command                | Action                                                                    |
| :--------------------------- | :------------------------------------------------------------------------ |
| \` or `~`                    | Toggle Quake HUD Terminal Drawer                                          |
| `Ctrl` + `K`                 | Toggle Quake HUD Terminal Drawer                                          |
| `help`                       | Display interactive command manual                                        |
| `ls`                         | List all archived CTF mission dossiers                                    |
| `open <id>`                  | Instantly open and inspect challenge writeup                              |
| `theme <tokyo\|mono\|blood>` | Switch visual cyberpunk color scheme                                      |
| `filter <category>`          | Filter challenge grid (`web`, `pwn`, `crypto`, `rev`, `forensics`, `all`) |
| `crt toggle`                 | Toggle retro scanline shader overlay                                      |
| `whoami`                     | Inspect current operator credentials                                      |
| `clear`                      | Clear terminal screen buffer                                              |

---

## Build & Deployment

### Build Locally

To type-check diagnostics and compile the production bundle:

```bash
pnpm build
```

### Preview Locally

Preview the built server entrypoint:

```bash
pnpm preview
```

### Deploy to Cloudflare Workers

Deploy directly to Cloudflare's Edge Network:

```bash
npx wrangler deploy
```

Continuous Deployment is pre-configured via **Cloudflare Workers Builds** on GitHub pull requests and merges to the `main` branch.

---

## 📦 Releases & Versioning

AUKA CTF Vault uses [Semantic Versioning](https://semver.org/) (`vMAJOR.MINOR.PATCH`) with automated GitHub Actions CI/CD releases.

For version number conventions, release procedures, and tagging instructions, see the [Versioning & Release Guide](docs/VERSIONING.md).

```bash
# Example: release a new patch
pnpm version patch
git push --follow-tags
```

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.
