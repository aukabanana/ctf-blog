import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { DecryptedText } from '@components/common/DecryptedText';
import {
  CATEGORY_COLORS,
  CATEGORY_COLORS_MONO,
  DIFFICULTY_COLORS,
  DIFFICULTY_COLORS_MONO
} from './MissionDossier';
import type { WriteupItem } from '../types';

export interface ChallengeCardProps {
  writeup: WriteupItem;
  activeTheme?: string;
  onSelect: (writeup: WriteupItem) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ writeup, activeTheme, onSelect }) => {
  const isMono = activeTheme === 'mono';
  const catMap = isMono ? CATEGORY_COLORS_MONO : CATEGORY_COLORS;
  const diffMap = isMono ? DIFFICULTY_COLORS_MONO : DIFFICULTY_COLORS;
  const catStyle = catMap[writeup.category] || catMap.Misc || CATEGORY_COLORS.Misc;
  const diffStyle = diffMap[writeup.difficulty] || diffMap.Medium || DIFFICULTY_COLORS.Medium;

  return (
    <a
      href={`/writeups/${writeup.id}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        onSelect(writeup);
      }}
      className="group relative rounded-xl border border-cyber-border bg-cyber-card backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-cyber-accent hover:shadow-cyber-glow cursor-pointer flex flex-col justify-between overflow-hidden text-inherit no-underline shadow-lg"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-accent/5 rounded-full blur-2xl group-hover:bg-cyber-accent/20 transition-all pointer-events-none" />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide font-mono backdrop-blur-md mono-badge-override"
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
            <DecryptedText text={writeup.category} hoverOnly={true} speed={15} />
          </span>

          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono backdrop-blur-md mono-badge-override"
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
            {writeup.difficulty}
          </span>
        </div>

        {/* Card Title with Hacker Scramble */}
        <h3 className="text-base sm:text-lg font-bold text-cyber-text group-hover:text-cyber-accent transition-colors leading-snug mb-2 font-mono">
          <DecryptedText text={writeup.title} hoverOnly={true} speed={20} />
        </h3>

        {/* Target CVE/IP snippet */}
        <div className="flex items-center space-x-2 text-[11px] font-mono text-cyber-muted mb-3">
          <span className="text-cyber-secondary">{writeup.dossier.cve}</span>
          <span>•</span>
          <span className="truncate">{writeup.dossier.targetIp}</span>
        </div>

        {/* Summary Description */}
        <p className="text-xs sm:text-sm text-cyber-muted line-clamp-3 leading-relaxed mb-4">
          {writeup.summary}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-cyber-border flex items-center justify-between text-xs font-mono text-cyber-muted">
        <div className="flex items-center space-x-1.5 truncate max-w-[65%]">
          <Shield className="w-3.5 h-3.5 text-cyber-accent shrink-0" />
          <span className="font-semibold text-cyber-text truncate">{writeup.author}</span>
          {writeup.event && (
            <>
              <span className="text-cyber-muted/40">•</span>
              <span className="text-cyber-muted truncate">{writeup.event}</span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-1 text-cyber-accent group-hover:translate-x-1 transition-transform shrink-0">
          <span className="font-semibold text-[11px]">ACCESS VAULT</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};

export default ChallengeCard;
