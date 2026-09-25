import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { DecryptedText } from './DecryptedText';
import { CATEGORY_COLORS, DIFFICULTY_COLORS } from './MissionDossier';

export interface WriteupItem {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  author: string;
  team?: string;
  date: string;
  summary: string;
  dossier: {
    targetIp: string;
    os: string;
    arch: string;
    cve: string;
    services?: string[];
  };
  killChain: Array<{ id: string; name: string; label?: string }>;
  sections: Array<{
    title: string;
    content: string;
    code?: string;
    language?: string;
    downloadName?: string;
  }>;
  flag?: string;
}

interface ChallengeCardProps {
  writeup: WriteupItem;
  onSelect: (writeup: WriteupItem) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ writeup, onSelect }) => {
  const catStyle = CATEGORY_COLORS[writeup.category] || CATEGORY_COLORS.Misc;
  const diffStyle = DIFFICULTY_COLORS[writeup.difficulty] || DIFFICULTY_COLORS.Medium;

  return (
    <div
      onClick={() => onSelect(writeup)}
      className="group relative rounded-xl border border-cyber-border bg-cyber-card backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-cyber-accent hover:shadow-cyber-glow cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-accent/5 rounded-full blur-2xl group-hover:bg-cyber-accent/20 transition-all pointer-events-none" />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide font-mono"
            style={{
              backgroundColor: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
            }}
          >
            <DecryptedText text={writeup.category} hoverOnly={true} speed={15} />
          </span>

          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-medium font-mono"
            style={{
              backgroundColor: diffStyle.bg,
              color: diffStyle.text,
              border: `1px solid ${diffStyle.border}`,
            }}
          >
            {writeup.difficulty} • {writeup.points} pts
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
      <div className="pt-3 border-t border-cyber-border/40 flex items-center justify-between text-xs font-mono text-cyber-muted">
        <div className="flex items-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-cyber-accent" />
          <span>{writeup.author}</span>
        </div>

        <div className="flex items-center space-x-1 text-cyber-accent group-hover:translate-x-1 transition-transform">
          <span className="font-semibold text-[11px]">ACCESS VAULT</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
