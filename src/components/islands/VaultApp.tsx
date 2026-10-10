import React, { useState, useEffect, useMemo } from "react";
import {
  Terminal,
  Search,
  Crosshair,
  X,
  Filter,
  Zap,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { DecryptedText } from "@components/common/DecryptedText";
import {
  QuakeTerminal,
  THEMES,
} from "@features/terminal/components/QuakeTerminal";
import { ChallengeCard } from "@features/writeups/components/ChallengeCard";
import { WriteupReader } from "@features/writeups/components/WriteupReader";
import { SAMPLE_WRITEUPS } from "@features/writeups/data/sample-writeups";
import type { WriteupItem } from "@features/writeups/types";

export { SAMPLE_WRITEUPS };

export interface VaultAppProps {
  initialWriteups?: WriteupItem[];
  initialActiveWriteup?: WriteupItem;
}

export const VaultApp: React.FC<VaultAppProps> = ({
  initialWriteups,
  initialActiveWriteup,
}) => {
  const writeups =
    initialWriteups && initialWriteups.length > 0
      ? initialWriteups
      : SAMPLE_WRITEUPS;

  const [themeProfile, setThemeProfile] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("cyber_theme_profile");
        if (saved && THEMES[saved]) return saved;
      } catch {}
    }
    return "tokyo";
  });

  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("cyber_light_mode");
        if (saved !== null) return saved === "true";
      } catch {}
    }
    return false;
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const [crtActive, setCrtActive] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("cyber_crt_active");
        if (saved !== null) return saved === "true";
      } catch {}
    }
    return false;
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWriteup, setActiveWriteup] = useState<WriteupItem | null>(
    initialActiveWriteup || null
  );

  const handleNavigateHome = () => {
    try {
      window.history.pushState({ writeupId: null }, "", "/");
    } catch {}
    setActiveWriteup(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenWriteup = (w: WriteupItem) => {
    try {
      window.history.pushState({ writeupId: w.id }, "", `/writeups/${w.id}`);
    } catch {}
    setActiveWriteup(w);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const syncThemeToDom = (themeId: string, light: boolean) => {
    if (typeof document === "undefined") return;
    const themes: Record<string, any> = THEMES;
    const lightTheme = {
      bg: '#f8fafc', surface: '#ffffff', card: 'rgba(255, 255, 255, 0.85)',
      border: 'rgba(5, 150, 105, 0.25)', accent: '#059669', secondary: '#0284c7',
      text: '#0f172a', muted: '#475569', danger: '#e11d48', warning: '#d97706',
      glow: '0 0 15px rgba(5, 150, 105, 0.2)'
    };
    const t = light ? lightTheme : (themes[themeId] || themes.tokyo);
    const root = document.documentElement;
    root.setAttribute('data-theme', light ? 'light' : themeId);
    root.style.setProperty('--cyber-bg', t.bg);
    root.style.setProperty('--cyber-surface', t.surface);
    root.style.setProperty('--cyber-card', t.card);
    root.style.setProperty('--cyber-border', t.border);
    root.style.setProperty('--cyber-accent', t.accent);
    root.style.setProperty('--cyber-secondary', t.secondary);
    root.style.setProperty('--cyber-text', t.text);
    root.style.setProperty('--cyber-muted', t.muted);
    root.style.setProperty('--cyber-danger', t.danger);
    root.style.setProperty('--cyber-warning', t.warning);
    root.style.setProperty('--cyber-glow', t.glow);
    if (light) {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  };

  const handleSetTheme = (newTheme: string) => {
    setThemeProfile(newTheme);
    syncThemeToDom(newTheme, isLightMode);
    try {
      localStorage.setItem("cyber_theme_profile", newTheme);
    } catch {}
  };

  const handleToggleLightMode = () => {
    if (!isLightMode) {
      setThemeProfile("tokyo");
      setIsLightMode(true);
      syncThemeToDom("tokyo", true);
      try {
        localStorage.setItem("cyber_theme_profile", "tokyo");
        localStorage.setItem("cyber_light_mode", "true");
      } catch {}
    } else {
      setIsLightMode(false);
      syncThemeToDom(themeProfile, false);
      try {
        localStorage.setItem("cyber_light_mode", "false");
      } catch {}
    }
  };

  const handleToggleCrt = () => {
    setCrtActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("cyber_crt_active", String(next));
      } catch {}
      return next;
    });
  };

  // Global hotkey: ~ or Ctrl+K opens Quake terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "`" ||
        e.key === "~" ||
        (e.ctrlKey && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/writeups/")) {
        const id = path.replace("/writeups/", "").replace(/\/$/, "");
        const found = writeups.find((item) => item.id === id);
        if (found) {
          setActiveWriteup(found);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
      setActiveWriteup(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [writeups]);

  // Synchronize CSS variables on client mount and state updates
  useEffect(() => {
    syncThemeToDom(themeProfile, isLightMode);
  }, [themeProfile, isLightMode]);

  // Filtered writeups list
  const filteredWriteups = useMemo(() => {
    return writeups.filter((item) => {
      const matchCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchDifficulty =
        selectedDifficulty === "All" ||
        item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        (item.event && item.event.toLowerCase().includes(query)) ||
        item.dossier.cve.toLowerCase().includes(query) ||
        item.dossier.targetIp.toLowerCase().includes(query);

      return matchCategory && matchDifficulty && matchSearch;
    });
  }, [writeups, selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div
      className="min-h-screen flex flex-col text-cyber-text bg-cyber-bg font-sans selection:bg-cyber-accent selection:text-black relative"
    >
      {/* CRT Scanline Overlay Effect */}
      {crtActive && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
          style={{
            background:
              "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))",
            backgroundSize: "100% 3px, 6px 100%",
          }}
        />
      )}

      {/* Quake Dropdown Terminal HUD Drawer */}
      <QuakeTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        activeTheme={themeProfile}
        setTheme={handleSetTheme}
        onFilterCategory={setSelectedCategory}
        onOpenWriteup={handleOpenWriteup}
        writeups={writeups}
        crtActive={crtActive}
        setCrtActive={handleToggleCrt}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-cyber-surface/85 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={handleNavigateHome}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-lg bg-cyber-accent/20 flex items-center justify-center shadow-md shadow-cyber-accent/20 p-1">
              <img
                src="/favicon-w.svg"
                alt="AUKA Logo"
                className="w-full h-full object-contain rounded html-dark-logo"
              />
              <img
                src="/favicon-b.svg"
                alt="AUKA Logo"
                className="w-full h-full object-contain rounded html-light-logo"
              />
              {/* <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyber-accent animate-pulse" /> */}
            </div>
            <div>
              <div className="font-mono font-bold text-sm sm:text-base tracking-tight text-cyber-text group-hover:text-cyber-accent transition-colors flex items-center space-x-1.5">
                <span>AUKA</span>

                <span className="text-cyber-accent">CTF</span>
                <span>VAULT._.</span>
              </div>

              <p className="text-[10px] text-cyber-muted font-mono hidden sm:block">
                CTF Offensive Security Archives
              </p>
            </div>
          </div>

          {/* Action Buttons & HUD trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quake HUD Hotkey Trigger Button */}
            <button
              onClick={() => setIsTerminalOpen((prev) => !prev)}
              className="flex items-center space-x-2 px-2 py-1.5 rounded-lg border border-cyber-border bg-cyber-surface text-cyber-accent font-mono text-xs transition duration-200"
              title="Open Terminal (Press ~ or Ctrl+K)"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">HUD</span>
              <kbd className="hidden md:inline px-1 py-0.5 text-[9px] bg-cyber-surface border border-cyber-border rounded text-cyber-muted">
                Ctrl+K
              </kbd>
            </button>

            {/* CRT Scanline Toggle Button */}
            <button
              onClick={handleToggleCrt}
              className={`p-2 rounded-lg border text-xs transition ${
                crtActive
                  ? "border-cyber-accent bg-cyber-accent/15 text-cyber-accent"
                  : "border-cyber-border bg-cyber-surface text-cyber-muted hover:text-cyber-text"
              }`}
              title="Toggle Retro CRT Scanline Overlay"
            >
              <Monitor className="w-4 h-4" />
            </button>

            {/* Theme Profile Switcher Dropdown */}
            <div
              className={`hidden sm:flex items-center space-x-1 bg-cyber-surface p-1 rounded-lg border border-cyber-border text-xs font-mono transition ${
                isLightMode ? "opacity-40 cursor-not-allowed" : ""
              }`}
              title={
                isLightMode
                  ? "Theme profiles are disabled in Light Mode"
                  : undefined
              }
            >
              <span className="text-cyber-muted px-1 text-[11px]">THEME:</span>
              {Object.keys(THEMES).map((tKey) => (
                <button
                  key={tKey}
                  data-theme-btn={tKey}
                  onClick={() => !isLightMode && handleSetTheme(tKey)}
                  disabled={isLightMode}
                  className={`px-2 py-1 rounded text-[11px] transition text-cyber-muted hover:text-cyber-text ${
                    isLightMode
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                >
                  {tKey.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={handleToggleLightMode}
              className="p-2 rounded-lg border border-cyber-border bg-cyber-surface hover:border-cyber-accent text-cyber-muted hover:text-cyber-text transition"
              title={
                isLightMode
                  ? "Switch to Dark Cyber Mode"
                  : "Switch to Light Mode"
              }
            >
              {isLightMode ? (
                <Moon className="w-4 h-4 text-cyber-accent" />
              ) : (
                <Sun className="w-4 h-4 text-cyber-warning" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body: Either Detail Reader or Vault Dashboard */}
      <main className="flex-1 w-full">
        {activeWriteup ? (
          <WriteupReader
            writeup={activeWriteup}
            activeTheme={themeProfile}
            onBack={handleNavigateHome}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn">
            {/* Hero Banner Section */}
            <div className="relative rounded-2xl border border-cyber-border bg-cyber-card backdrop-blur-2xl p-6 sm:p-10 mb-10 overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-cyber-accent/10 border border-cyber-border text-cyber-accent text-xs font-mono mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  <span>ACTIVE VAULT // RECON & EXPLOITATION MISSION LOGS</span>
                </div>

                <h1 className="text-2xl sm:text-5xl font-extrabold text-cyber-text tracking-tight font-mono mb-4">
                  <DecryptedText text="AUKA CTF Vault :D" speed={25} />
                </h1>

                <p className="text-sm sm:text-base text-cyber-muted leading-relaxed mb-6 font-sans">
                  Comprehensive post-competition intelligence repository
                  containing deep-dive exploitation paths, proof-of-concept
                  scripts, binary patches, and captured root flags across elite
                  CTF categories.
                </p>

                {/* Quick stats counter */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-cyber-surface/70 border border-cyber-border">
                    <div className="text-cyber-muted uppercase text-[10px]">
                      Archived Targets
                    </div>
                    <div className="text-cyber-accent text-lg font-bold">
                      {writeups.length} Machines
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyber-surface/70 border border-cyber-border">
                    <div className="text-cyber-muted uppercase text-[10px]">
                      Active Theme
                    </div>
                    <div className="text-cyber-accent text-lg font-bold uppercase">
                      <span className="theme-label-tokyo">Tokyo Cyan</span>
                      <span className="theme-label-mono">Mono White</span>
                      <span className="theme-label-blood">Red Team Blood</span>
                      <span className="theme-label-light">Emerald Light</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyber-surface/70 border border-cyber-border">
                    <div className="text-cyber-muted uppercase text-[10px]">
                      Terminal Hotkey
                    </div>
                    <div className="text-cyber-text text-lg font-bold">
                      ~ or Ctrl+K
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtering Controls & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              {/* Keyword Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted z-10 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search writeups by CVE, service, keyword, or title..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cyber-border bg-cyber-card backdrop-blur-xl text-cyber-text placeholder:text-cyber-muted text-xs sm:text-sm focus:outline-none focus:border-cyber-accent font-mono transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-cyber-text z-10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  "All",
                  "Web",
                  "Pwn",
                  "Crypto",
                  "Rev",
                  "Forensics",
                  "OSINT",
                ].map((cat) => {
                  const isSelected =
                    selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap ${
                        isSelected
                          ? isLightMode
                            ? "bg-cyber-accent text-white font-bold shadow-md shadow-cyber-accent/25"
                            : "bg-cyber-accent text-black font-bold shadow-md shadow-cyber-accent/25"
                          : "bg-cyber-card border border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-accent/50"
                      }`}
                    >
                      <DecryptedText text={cat} hoverOnly={true} speed={15} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Filter Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-cyber-muted mb-6 px-1">
              <div className="flex items-center space-x-2">
                <Filter className="w-3.5 h-3.5 text-cyber-accent" />
                <span>Difficulty Filter:</span>
                {["All", "Easy", "Medium", "Hard", "Insane"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2 py-0.5 rounded transition ${
                      selectedDifficulty.toLowerCase() === diff.toLowerCase()
                        ? "text-cyber-accent font-bold underline decoration-cyber-accent"
                        : "hover:text-cyber-text"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              <span>
                Showing {filteredWriteups.length} of {writeups.length} Missions
              </span>
            </div>

            {/* Challenge Writeup Grid */}
            {filteredWriteups.length === 0 ? (
              <div className="rounded-2xl border border-cyber-border bg-cyber-card p-12 text-center font-mono">
                <div className="w-12 h-12 rounded-full bg-cyber-accent/10 border border-cyber-accent text-cyber-accent mx-auto flex items-center justify-center mb-4">
                  <Crosshair className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-cyber-text mb-1">
                  No Missions Found
                </h3>
                <p className="text-xs text-cyber-muted mb-4">
                  No archived CTF writeups match your current filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-lg bg-cyber-accent text-black font-semibold text-xs font-mono transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWriteups.map((w) => (
                  <ChallengeCard
                    key={w.id}
                    writeup={w}
                    activeTheme={themeProfile}
                    onSelect={handleOpenWriteup}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-cyber-border/40 text-xs font-mono text-cyber-muted bg-cyber-surface/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
            <span>AUKA CTF Writeup Vault — Official Field Handbook</span>
          </div>

          <div className="flex items-center space-x-4">
            <span
              className="hover:text-cyber-accent cursor-pointer"
              onClick={() => setIsTerminalOpen(true)}
            >
              [ Open Terminal Shell ]
            </span>
            <span>•</span>
            <span
              className="hover:text-cyber-accent cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              [ Back to Top ]
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VaultApp;
