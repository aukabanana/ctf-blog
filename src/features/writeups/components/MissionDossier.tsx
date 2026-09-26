import React from 'react';
import { Crosshair, Radio, Server, Cpu, Shield } from 'lucide-react';
import type { DossierData, BadgeStyle } from '../types';

const MONO_BADGE: BadgeStyle = { bg: 'rgba(255,255,255,0.06)', text: '#a0a0a0', border: 'rgba(255,255,255,0.12)' };

export const CATEGORY_COLORS: Record<string, BadgeStyle> = {
  Web:       { bg: 'rgba(59, 130, 246, 0.2)',  text: '#60a5fa', border: 'rgba(59, 130, 246, 0.35)' },
  Pwn:       { bg: 'rgba(239, 68, 68, 0.2)',   text: '#f87171', border: 'rgba(239, 68, 68, 0.35)'  },
  Crypto:    { bg: 'rgba(168, 85, 247, 0.2)',  text: '#c084fc', border: 'rgba(168, 85, 247, 0.35)' },
  Rev:       { bg: 'rgba(245, 158, 11, 0.2)',  text: '#fbbf24', border: 'rgba(245, 158, 11, 0.35)' },
  Forensics: { bg: 'rgba(20, 184, 166, 0.2)',  text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.35)' },
  OSINT:     { bg: 'rgba(6, 182, 212, 0.2)',   text: '#22d3ee', border: 'rgba(6, 182, 212, 0.35)'  },
  Misc:      { bg: 'rgba(107, 114, 128, 0.2)', text: '#9ca3af', border: 'rgba(107, 114, 128, 0.35)'},
};

export const CATEGORY_COLORS_MONO: Record<string, BadgeStyle> = {
  Web: MONO_BADGE, Pwn: MONO_BADGE, Crypto: MONO_BADGE,
  Rev: MONO_BADGE, Forensics: MONO_BADGE, OSINT: MONO_BADGE, Misc: MONO_BADGE,
};

export const DIFFICULTY_COLORS: Record<string, BadgeStyle> = {
  Easy:   { bg: 'rgba(34, 197, 94, 0.2)',  text: '#4ade80', border: 'rgba(34, 197, 94, 0.4)'  },
  Medium: { bg: 'rgba(234, 179, 8, 0.2)',  text: '#facc15', border: 'rgba(234, 179, 8, 0.4)'  },
  Hard:   { bg: 'rgba(249, 115, 22, 0.2)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.4)' },
  Insane: { bg: 'rgba(220, 38, 38, 0.25)', text: '#ef4444', border: 'rgba(220, 38, 38, 0.5)'  },
};

export const DIFFICULTY_COLORS_MONO: Record<string, BadgeStyle> = {
  Easy: MONO_BADGE, Medium: MONO_BADGE, Hard: MONO_BADGE, Insane: MONO_BADGE,
};

interface MissionDossierProps {
  dossier: DossierData;
  category: string;
  difficulty: string;
  points: number;
  activeTheme?: string;
}

export const MissionDossier: React.FC<MissionDossierProps> = ({
  dossier,
  category,
  difficulty,
  points,
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
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
            }}
          >
            {category}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: diffStyle.bg,
              color: diffStyle.text,
              border: `1px solid ${diffStyle.border}`,
            }}
          >
            {difficulty} • {points} pts
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
