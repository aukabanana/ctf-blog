import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export const THEMES: Record<string, any> = {
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

interface QuakeTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: string;
  setTheme: (theme: string) => void;
  onFilterCategory: (cat: string) => void;
  onOpenWriteup: (writeup: any) => void;
  writeups: any[];
  crtActive: boolean;
  setCrtActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuakeTerminal: React.FC<QuakeTerminalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  setTheme,
  onFilterCategory,
  onOpenWriteup,
  writeups,
  crtActive,
  setCrtActive,
}) => {
  const [history, setHistory] = useState<Array<{ text: string; type: string }>>([
    { text: 'AUKA CTF Writeup Vault — Quake HUD Shell v3.1', type: 'system' },
    { text: "Type 'help' for tactical commands or 'ls' to list catalog.", type: 'system' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [historyLog, setHistoryLog] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const raw = inputVal.trim();
      if (!raw) return;

      setHistoryLog((prev) => [...prev, raw]);
      setCmdIndex(-1);

      const parts = raw.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ').toLowerCase();

      const newHistory = [...history, { text: `studio@vault:~$ ${raw}`, type: 'prompt' }];

      switch (cmd) {
        case 'help':
          newHistory.push({
            text: `Available Terminal Commands:
  • ls | list                 : List all CTF writeups with IDs and stats
  • filter <category>         : Filter writeup grid (web, pwn, crypto, rev, forensics, osint, all)
  • open <id>                 : Open a writeup reader by ID (e.g. open cve-2024-9134-neural)
  • theme <tokyo|mono|blood>: Switch visual theme profile dynamically
  • crt toggle                : Turn CRT monitor scanlines on or off
  • whoami                    : Display authenticated player handle and rank
  • cat flag                  : Query hidden master easter egg flag
  • clear                     : Clear terminal history buffer
  • exit                      : Close Quake HUD terminal drawer`,
            type: 'output',
          });
          break;

        case 'ls':
        case 'list':
          newHistory.push({
            text: writeups
              .map((w) => `[${w.id}] :: ${w.title} (${w.category} | ${w.difficulty} | ${w.points}pts)`)
              .join('\n'),
            type: 'output',
          });
          break;

        case 'filter':
          if (!arg) {
            newHistory.push({ text: 'Usage: filter <category|all> (e.g. filter pwn)', type: 'error' });
          } else {
            onFilterCategory(arg === 'all' ? 'All' : arg);
            newHistory.push({ text: `[+] Grid filter applied to category: '${arg}'`, type: 'success' });
          }
          break;

        case 'open':
          if (!arg) {
            newHistory.push({ text: 'Usage: open <challenge-id>', type: 'error' });
          } else {
            const found = writeups.find(
              (w) => w.id.toLowerCase() === arg || w.title.toLowerCase().includes(arg)
            );
            if (found) {
              onOpenWriteup(found);
              newHistory.push({ text: `[+] Opening mission dossier: ${found.title}`, type: 'success' });
              onClose();
            } else {
              newHistory.push({ text: `[-] Challenge ID '${arg}' not found. Run 'ls' to see IDs.`, type: 'error' });
            }
          }
          break;

        case 'theme':
          if (THEMES[arg]) {
            setTheme(arg);
            newHistory.push({ text: `[+] Switched theme profile to: ${THEMES[arg].name}`, type: 'success' });
          } else {
            newHistory.push({ text: 'Usage: theme <tokyo | mono | blood>', type: 'error' });
          }
          break;

        case 'crt':
          if (arg === 'toggle') {
            setCrtActive((prev) => !prev);
            newHistory.push({ text: `[+] CRT scanline filter toggled.`, type: 'success' });
          } else {
            newHistory.push({ text: 'Usage: crt toggle', type: 'error' });
          }
          break;

        case 'whoami':
          newHistory.push({
            text: `Operator: 0xSpecter
Handle  : @studio_ctf_elite
Team    : STUDIO-Sec
Rank    : #1 Global CTF Champion
Access  : ROOT / LEVEL 5 TOP SECRET
Badge   : Master of Exploitation`,
            type: 'output',
          });
          break;

        case 'cat':
          if (arg.includes('flag')) {
            newHistory.push({
              text: `[!] Nice try! The flag is protected by an ironclad Supabase RLS policy 😉.
Try reading the writeups to earn real operational flags!`,
              type: 'warning',
            });
          } else {
            newHistory.push({ text: `cat: ${arg}: No such file in current context`, type: 'error' });
          }
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case 'exit':
          onClose();
          break;

        default:
          newHistory.push({
            text: `Command not found: '${cmd}'. Type 'help' for available actions.`,
            type: 'error',
          });
          break;
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyLog.length > 0) {
        const nextIdx = cmdIndex === -1 ? historyLog.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(historyLog[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx < historyLog.length) {
          setCmdIndex(nextIdx);
          setInputVal(historyLog[nextIdx]);
        } else {
          setCmdIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-cyber-bg/95 border-b-2 border-cyber-accent shadow-2xl backdrop-blur-2xl max-h-[75vh] flex flex-col font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-cyber-surface/90 border-b border-cyber-border text-xs text-cyber-muted">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent animate-ping" />
            <span className="text-cyber-accent font-bold">DROPDOWN QUAKE HUD // TACTICAL SHELL</span>
            <span className="hidden sm:inline text-cyber-muted">(`~` or Ctrl+K to toggle)</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-cyber-muted hidden md:inline">
              Active Theme: <span className="text-cyber-accent font-bold">{THEMES[activeTheme]?.name}</span>
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-cyber-card text-cyber-muted hover:text-white transition"
              title="Close Terminal [Esc]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal History Log */}
        <div className="p-4 overflow-y-auto space-y-2 text-xs sm:text-sm flex-1 scrollbar-thin scrollbar-thumb-cyber-border max-h-[50vh]">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === 'prompt'
                  ? 'text-cyber-accent font-bold'
                  : line.type === 'error'
                  ? 'text-cyber-danger'
                  : line.type === 'warning'
                  ? 'text-cyber-warning'
                  : line.type === 'success'
                  ? 'text-cyber-secondary font-bold'
                  : 'text-cyber-text'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Prompt */}
        <div className="p-3 bg-cyber-surface/90 border-t border-cyber-border/40 flex items-center space-x-2">
          <span className="text-cyber-accent font-bold text-xs sm:text-sm whitespace-nowrap">
            studio@vault:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type 'help', 'ls', 'theme blood', 'filter pwn'..."
            className="flex-1 bg-transparent text-cyber-text text-xs sm:text-sm focus:outline-none font-mono caret-cyber-accent"
          />
          <button
            onClick={() => handleCommand({ key: 'Enter' } as any)}
            className="px-2.5 py-1 text-xs font-mono bg-cyber-accent/20 border border-cyber-accent text-cyber-accent rounded hover:bg-cyber-accent hover:text-black transition"
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuakeTerminal;
