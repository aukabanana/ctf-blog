# 📦 Versioning & Release Guide

This document defines the versioning scheme, release lifecycle, and automated CI/CD deployment pipelines used for **AUKA CTF Vault**.

---

## 🎯 Semantic Versioning (SemVer)

AUKA CTF Vault strictly adheres to [Semantic Versioning 2.0.0](https://semver.org/):

$$\mathbf{MAJOR} \,.\, \mathbf{MINOR} \,.\, \mathbf{PATCH}$$

Each release tag follows the format `vX.Y.Z` (e.g. `v1.0.0`).

```text
       v 1 . 2 . 3
         │   │   └── PATCH : Bug fixes, styling tweaks, minor patches
         │   └────── MINOR : New features, new pages, backward-compatible additions
         └────────── MAJOR : Breaking changes, architectural rewrites, major milestones
```

---

### Detailed Decimal Breakdown

### 1. `MAJOR` (X.0.0) — Breaking Changes & Milestones
Increment the **MAJOR** version when making incompatible changes or reaching substantial architectural milestones.

- **Examples:**
  - Migrating backend frameworks or database architectures (e.g., SQLite $\rightarrow$ Supabase schema rewrite).
  - Breaking changes to writeup frontmatter schemas that require updating all existing Markdown files.
  - Complete redesign of the Vault layout or interactive API layers.
- **Number progression:** `v1.2.4` $\rightarrow$ `v2.0.0` *(Notice: MINOR and PATCH reset to 0)*.

---

### 2. `MINOR` (0.Y.0) — New Features & Additions
Increment the **MINOR** version when adding new capabilities or features in a backward-compatible manner.

- **Examples:**
  - Adding dedicated URL routes (`/writeups/[id]`) for challenge dossiers.
  - Adding a new theme profile to the Quake terminal and dashboard (e.g., `matrix` or `synthwave`).
  - Adding a new CLI command to the Quake HUD (e.g., `stats`, `export`).
  - Adding audio sound effects or new keyboard shortcuts.
- **Number progression:** `v1.0.0` $\rightarrow$ `v1.1.0` *(Notice: PATCH resets to 0)*.

---

### 3. `PATCH` (0.0.Z) — Bug Fixes & Refinements
Increment the **PATCH** version when making backward-compatible bug fixes, security patches, or small UI refinements.

- **Examples:**
  - Eliminating theme flash (FOUC) on client route navigation.
  - Fixing typo in writeup dossiers or Markdown templates.
  - Adjusting box shadows, card padding, or font sizes.
  - Updating build script configurations or dependencies.
- **Number progression:** `v1.1.0` $\rightarrow$ `v1.1.1` $\rightarrow$ `v1.1.2`.

---

## 🚀 How to Create a Release (Automated CI/CD)

The repository is equipped with a GitHub Actions workflow (`.github/workflows/release.yml`) that triggers automatically whenever a version tag matching `v*.*.*` is pushed.

### Step 1: Bump the Version

You can use `pnpm version` to automatically increment the version in `package.json`, create a Git commit, and create the corresponding Git tag:

```bash
# For a bug fix or small tweak:
pnpm version patch

# For a new feature:
pnpm version minor

# For a major release:
pnpm version major
```

> **Tip:** You can also specify an exact version:
> ```bash
> pnpm version 1.0.0
> ```

---

### Step 2: Push the Tag to GitHub

Push your branch along with the newly created tag:

```bash
git push --follow-tags
```

*(Or push only the tag directly: `git push origin v1.0.0`)*

---

### Step 3: Automated Release Pipeline

Once the tag is pushed to GitHub:

1. **GitHub Actions Triggers:** The `Publish Release` workflow spins up on Ubuntu.
2. **Quality Checks:** Runs `pnpm install` and `pnpm run build` (`astro check && astro build`) to ensure zero TypeScript errors and zero build failures.
3. **Changelog Generation:** GitHub scans all merged commits and pull requests since the previous release and organizes them into categories:
   - 🚀 Features & Enhancements
   - 🐛 Bug Fixes & Stability
   - 🎨 Design, Themes & UI
   - ⚡ Performance & Optimization
   - 📝 Documentation & Field Manuals
   - 🧰 Maintenance & Dependencies
4. **Publishing:** Publishes the release under the repository's **Releases** tab on GitHub!

---

## 🛠️ Manual Release Creation (Alternative)

If you prefer to create a release manually via the GitHub Web UI without running CLI commands:

1. Navigate to your repository on GitHub: `https://github.com/aukabanana/ctf-blog`.
2. In the right sidebar, click **Releases** $\rightarrow$ **Draft a new release**.
3. In **Choose a tag**, enter your version (e.g. `v1.0.0`) and click **+ Create new tag: v1.0.0 on publish**.
4. Set the target branch (usually `main`).
5. Click **Generate release notes** to automatically insert commit changelogs.
6. Click **Publish release**.

---

## 📝 Conventional Commit Guidelines

To ensure the automated release changelogs are neat and descriptive, follow the [Conventional Commits](https://www.conventionalcommits.org/) convention:

| Prefix | Type | Example |
| :--- | :--- | :--- |
| `feat:` | New feature | `feat(routes): add dedicated static writeup path /writeups/[id]` |
| `fix:` | Bug fix | `fix(theme): eliminate flash of unstyled content on route transition` |
| `style:` | UI / Styling change | `style(hero): update shadow and padding on hero banner` |
| `perf:` | Performance boost | `perf(layout): load theme script synchronously in head before fonts` |
| `docs:` | Documentation update | `docs(versioning): add semantic versioning and release manual` |
| `refactor:` | Code restructuring | `refactor(writeups): extract getWriteups into reusable module` |
| `chore:` | Maintenance / tooling | `chore(deps): update astro and react dependencies` |
