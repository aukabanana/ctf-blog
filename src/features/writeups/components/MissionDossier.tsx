import React from 'react';
import { Crosshair, Radio, Server, Cpu, Shield } from 'lucide-react';
import type { DossierData, BadgeStyle } from '../types';

const DARK_GLASS_BG = 'rgba(255, 255, 255, 0.05)';
const DARK_GLASS_SHADOW = 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 2px rgba(0, 0, 0, 0.3)';

const MONO_BADGE: BadgeStyle = {
  color: '#e2e8f0',
  bg: DARK_GLASS_BG,
  text: '#e2e8f0',
  shadow: DARK_GLASS_SHADOW,
};

export const CATEGORY_COLORS: Record<string, BadgeStyle> = {
  Web:       { color: '#38bdf8', text: '#38bdf8', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Pwn:       { color: '#f87171', text: '#f87171', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Crypto:    { color: '#c084fc', text: '#c084fc', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Rev:       { color: '#fbbf24', text: '#fbbf24', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Forensics: { color: '#2dd4bf', text: '#2dd4bf', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  OSINT:     { color: '#22d3ee', text: '#22d3ee', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Misc:      { color: '#94a3b8', text: '#94a3b8', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
};

export const CATEGORY_COLORS_MONO: Record<string, BadgeStyle> = {
  Web: MONO_BADGE, Pwn: MONO_BADGE, Crypto: MONO_BADGE,
  Rev: MONO_BADGE, Forensics: MONO_BADGE, OSINT: MONO_BADGE, Misc: MONO_BADGE,
};

export const DIFFICULTY_COLORS: Record<string, BadgeStyle> = {
  Easy:   { color: '#4ade80', text: '#4ade80', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Medium: { color: '#facc15', text: '#facc15', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Hard:   { color: '#fb923c', text: '#fb923c', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
  Insane: { color: '#ef4444', text: '#ef4444', bg: DARK_GLASS_BG, shadow: DARK_GLASS_SHADOW },
};

export const DIFFICULTY_COLORS_MONO: Record<string, BadgeStyle> = {
  Easy: MONO_BADGE, Medium: MONO_BADGE, Hard: MONO_BADGE, Insane: MONO_BADGE,
};

interface MissionDossierProps {
  dossier: DossierData;
  category: string;
  difficulty: string;
  activeTheme?: string;
}

export const MissionDossier: React.FC<MissionDossierProps> = ({
  dossier,
  category,
  difficulty,
  activeTheme,
}) => {
  const isMono = activeTheme === 'mono';
  const catStyle = (isMono ? CATEGORY_COLORS_MONO : CATEGORY_COLORS)[category] || CATEGORY_COLORS.Misc;
  const diffStyle = (isMono ? DIFFICULTY_COLORS_MONO : DIFFICULTY_COLORS)[difficulty] || DIFFICULTY_COLORS.Medium;

  return (
    <div className="rounded-xl border border-cyber-border bg-cyber-card backdrop-blur-xl p-5 mb-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Crosshair className="w-4 h-4 text-cyber-accent animate-pulse" />
          <span className="font-mono text-xs text-cyber-accent font-bold uppercase tracking-wider">
            Target Mission Dossier
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono backdrop-blur-md mono-badge-override"
            style={{
              backgroundColor: catStyle.bg,
              color: catStyle.color,
              boxShadow: catStyle.shadow,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
              style={{
                backgroundColor: catStyle.color,
                boxShadow: `0 0 6px ${catStyle.color}`,
              }}
            />
            {category}
          </span>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono backdrop-blur-md mono-badge-override"
            style={{
              backgroundColor: diffStyle.bg,
              color: diffStyle.color,
              boxShadow: diffStyle.shadow,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
              style={{
                backgroundColor: diffStyle.color,
                boxShadow: `0 0 6px ${diffStyle.color}`,
              }}
            />
            {difficulty}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-3 rounded-lg bg-cyber-surface/60 border border-cyber-border/30">
          <div className="text-cyber-muted uppercase text-[10px] mb-1">Target Host / IP</div>
          <div className="text-cyber-text font-bold flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5 text-cyber-accent" />
            <span className="truncate">{dossier.targetIp}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-cyber-surface/60 border border-cyber-border/30">
          <div className="text-cyber-muted uppercase text-[10px] mb-1">Operating System</div>
          <div className="text-cyber-text font-bold flex items-center space-x-1.5">
            <Server className="w-3.5 h-3.5 text-cyber-secondary" />
            <span className="truncate">{dossier.os}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-cyber-surface/60 border border-cyber-border/30">
          <div className="text-cyber-muted uppercase text-[10px] mb-1">Architecture</div>
          <div className="text-cyber-text font-bold flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyber-accent" />
            <span className="truncate">{dossier.arch}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-cyber-surface/60 border border-cyber-border/30">
          <div className="text-cyber-muted uppercase text-[10px] mb-1">Primary Vulnerability</div>
          <div className="text-cyber-danger font-bold flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span className="truncate">{dossier.cve}</span>
          </div>
        </div>
      </div>

      {dossier.services && dossier.services.length > 0 && (
        <div className="mt-4 pt-3 border-t border-cyber-border/30 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-cyber-muted text-[11px]">Exposed Services:</span>
          {dossier.services.map((svc, idx) => (
            <span
              key={idx}
              className="bg-cyber-surface px-2.5 py-1 rounded text-cyber-text text-[11px] border border-cyber-border/40"
            >
              {svc}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionDossier;
