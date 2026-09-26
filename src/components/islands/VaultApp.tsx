import React, { useState, useEffect, useMemo } from 'react';
import {
  Terminal, Shield, Search, Crosshair, X,
  Filter, Zap, Monitor, Moon, Sun
} from 'lucide-react';
import { DecryptedText } from '@components/common/DecryptedText';
import { QuakeTerminal, THEMES } from '@features/terminal/components/QuakeTerminal';
import { ChallengeCard } from '@features/writeups/components/ChallengeCard';
import { WriteupReader } from '@features/writeups/components/WriteupReader';
import { SAMPLE_WRITEUPS } from '@features/writeups/data/sample-writeups';
import type { WriteupItem } from '@features/writeups/types';

export { SAMPLE_WRITEUPS };

export interface VaultAppProps {
  initialWriteups?: WriteupItem[];
}

export const VaultApp: React.FC<VaultAppProps> = ({ initialWriteups }) => {
  const writeups = initialWriteups && initialWriteups.length > 0 ? initialWriteups : SAMPLE_WRITEUPS;

  const [themeProfile, setThemeProfile] = useState('tokyo');
  const [isLightMode, setIsLightMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [crtActive, setCrtActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWriteup, setActiveWriteup] = useState<WriteupItem | null>(null);

  const handleToggleLightMode = () => {
    if (!isLightMode) {
      setThemeProfile('tokyo');
      setIsLightMode(true);
    } else {
      setIsLightMode(false);
    }
  };

  // Global hotkey: ~ or Ctrl+K opens Quake terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const curTheme = THEMES[themeProfile] || THEMES.tokyo;

  // Filtered writeups list
  const filteredWriteups = useMemo(() => {
    return writeups.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchDifficulty =
        selectedDifficulty === 'All' ||
        item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.dossier.cve.toLowerCase().includes(query) ||
        item.dossier.targetIp.toLowerCase().includes(query);

      return matchCategory && matchDifficulty && matchSearch;
    });
  }, [writeups, selectedCategory, selectedDifficulty, searchQuery]);

  // Dynamic CSS Variables based on active profile and light mode
  const cssThemeVariables: React.CSSProperties = useMemo(() => {
    if (isLightMode) {
      return {
        '--cyber-bg': '#f8fafc',
        '--cyber-surface': '#ffffff',
        '--cyber-card': 'rgba(255, 255, 255, 0.85)',
        '--cyber-border': 'rgba(5, 150, 105, 0.25)',
        '--cyber-accent': '#059669',
        '--cyber-secondary': '#0284c7',
        '--cyber-text': '#0f172a',
        '--cyber-muted': '#475569',
        '--cyber-danger': '#e11d48',
        '--cyber-warning': '#d97706',
        '--cyber-glow': '0 0 15px rgba(5, 150, 105, 0.2)',
      } as React.CSSProperties;
    }
    return {
      '--cyber-bg': curTheme.bg,
      '--cyber-surface': curTheme.surface,
      '--cyber-card': curTheme.card,
      '--cyber-border': curTheme.border,
      '--cyber-accent': curTheme.accent,
      '--cyber-secondary': curTheme.secondary,
      '--cyber-text': curTheme.text,
      '--cyber-muted': curTheme.muted,
      '--cyber-danger': curTheme.danger,
      '--cyber-warning': curTheme.warning,
      '--cyber-glow': curTheme.glow,
    } as React.CSSProperties;
  }, [curTheme, isLightMode]);

  return (
    <div
      style={cssThemeVariables}
      className="min-h-screen flex flex-col text-cyber-text bg-cyber-bg transition-colors duration-300 font-sans selection:bg-cyber-accent selection:text-black relative"
    >
      {/* CRT Scanline Overlay Effect */}
      {crtActive && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
          style={{
            background:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
            backgroundSize: '100% 3px, 6px 100%',
          }}
        />
      )}

      {/* Quake Dropdown Terminal HUD Drawer */}
      <QuakeTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        activeTheme={themeProfile}
        setTheme={setThemeProfile}
        onFilterCategory={setSelectedCategory}
        onOpenWriteup={(writeup) => setActiveWriteup(writeup)}
        writeups={writeups}
        crtActive={crtActive}
        setCrtActive={setCrtActive}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-cyber-surface/85 border-b border-cyber-border px-4 sm:px-8 py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveWriteup(null)}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-8 h-8 rounded-lg bg-cyber-accent/20 border border-cyber-accent flex items-center justify-center shadow-md shadow-cyber-accent/20">
              <Shield className="w-4 h-4 text-cyber-accent group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
            </div>
            <div>
              <div className="font-mono font-bold text-sm sm:text-base tracking-tight text-cyber-text group-hover:text-cyber-accent transition-colors flex items-center space-x-1.5">
                <span>AUKA</span>
                <span className="text-cyber-accent">CTF</span>
                <span className="text-xs text-cyber-muted font-normal border border-cyber-border/80 px-1 rounded">
                  VAULT
                </span>
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
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-cyber-accent/40 bg-cyber-accent/10 hover:bg-cyber-accent/20 text-cyber-accent font-mono text-xs transition duration-200"
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
              onClick={() => setCrtActive((prev) => !prev)}
              className={`p-2 rounded-lg border text-xs transition ${
                crtActive
                  ? 'border-cyber-accent bg-cyber-accent/15 text-cyber-accent'
                  : 'border-cyber-border bg-cyber-surface text-cyber-muted hover:text-cyber-text'
              }`}
              title="Toggle Retro CRT Scanline Overlay"
            >
              <Monitor className="w-4 h-4" />
            </button>

            {/* Theme Profile Switcher Dropdown */}
            <div
              className={`hidden sm:flex items-center space-x-1 bg-cyber-surface p-1 rounded-lg border border-cyber-border text-xs font-mono transition ${
                isLightMode ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              title={isLightMode ? 'Theme profiles are disabled in Light Mode' : undefined}
            >
              <span className="text-cyber-muted px-1 text-[11px]">THEME:</span>
              {Object.keys(THEMES).map((tKey) => (
                <button
                  key={tKey}
                  onClick={() => !isLightMode && setThemeProfile(tKey)}
                  disabled={isLightMode}
                  className={`px-2 py-0.5 rounded text-[11px] transition ${
                    isLightMode
                      ? 'text-cyber-muted cursor-not-allowed'
                      : themeProfile === tKey
                      ? 'bg-cyber-accent text-black font-bold'
                      : 'text-cyber-muted hover:text-cyber-text'
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
              title={isLightMode ? 'Switch to Dark Cyber Mode' : 'Switch to Light Mode'}
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
            onBack={() => setActiveWriteup(null)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn">
            {/* Hero Banner Section */}
            <div className="relative rounded-2xl border border-cyber-border bg-cyber-card backdrop-blur-2xl p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent text-xs font-mono mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  <span>ACTIVE VAULT // RECON & EXPLOITATION MISSION LOGS</span>
                </div>

                <h1 className="text-2xl sm:text-5xl font-extrabold text-cyber-text tracking-tight font-mono mb-4">
                  <DecryptedText text="AUKA CTF Vault" speed={22} />
                </h1>

                <p className="text-sm sm:text-base text-cyber-muted leading-relaxed mb-6 font-sans">
                  Comprehensive post-competition intelligence repository containing deep-dive exploitation paths, proof-of-concept scripts, binary patches, and captured root flags across elite CTF categories.
                </p>

                {/* Quick stats counter */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-cyber-surface/70 border border-cyber-border/40">
                    <div className="text-cyber-muted uppercase text-[10px]">Archived Targets</div>
                    <div className="text-cyber-accent text-lg font-bold">{writeups.length} Machines</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyber-surface/70 border border-cyber-border/40">
                    <div className="text-cyber-muted uppercase text-[10px]">Active Theme</div>
                    <div className="text-cyber-secondary text-lg font-bold uppercase">{curTheme.name}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyber-surface/70 border border-cyber-border/40">
                    <div className="text-cyber-muted uppercase text-[10px]">Terminal Hotkey</div>
                    <div className="text-cyber-text text-lg font-bold">~ or Ctrl+K</div>
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
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-cyber-text z-10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['All', 'Web', 'Pwn', 'Crypto', 'Rev', 'Forensics', 'OSINT'].map((cat) => {
                  const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap ${
                        isSelected
                          ? isLightMode
                            ? 'bg-cyber-accent text-white font-bold shadow-md shadow-cyber-accent/25'
                            : 'bg-cyber-accent text-black font-bold shadow-md shadow-cyber-accent/25'
                          : 'bg-cyber-card border border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-accent/50'
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
                {['All', 'Easy', 'Medium', 'Hard', 'Insane'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2 py-0.5 rounded transition ${
                      selectedDifficulty.toLowerCase() === diff.toLowerCase()
                        ? 'text-cyber-accent font-bold underline decoration-cyber-accent'
                        : 'hover:text-cyber-text'
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
                <h3 className="text-base font-bold text-cyber-text mb-1">No Missions Found</h3>
                <p className="text-xs text-cyber-muted mb-4">
                  No archived CTF writeups match your current filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                    setSearchQuery('');
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
                    onSelect={(item) => setActiveWriteup(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-cyber-border/40 py-8 px-4 sm:px-8 text-xs font-mono text-cyber-muted bg-cyber-surface/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
