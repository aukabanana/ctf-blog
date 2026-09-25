import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DecryptedText } from './DecryptedText';
import { MissionDossier } from './MissionDossier';
import { KillChainBar } from './KillChainBar';
import { TerminalCodeBlock } from './TerminalCodeBlock';
import { SpoilerFlagBox } from './SpoilerFlagBox';
import type { WriteupItem } from './ChallengeCard';

interface WriteupReaderProps {
  writeup: WriteupItem;
  activeTheme?: string;
  onBack: () => void;
}

export const WriteupReader: React.FC<WriteupReaderProps> = ({ writeup, activeTheme, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [writeup]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-20 animate-fadeIn">
      {/* Return Button */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-cyber-border bg-cyber-surface/80 hover:bg-cyber-border/40 text-cyber-text hover:text-cyber-accent font-mono text-xs transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Vault Dashboard</span>
      </button>

      {/* Header Info */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30 font-mono">
            MISSION WRITEUP ID: {writeup.id}
          </span>
          <span className="text-xs font-mono text-cyber-muted">
            Published: {writeup.date} by {writeup.author} {writeup.team ? `(${writeup.team})` : ''}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-cyber-text tracking-tight font-mono mb-3">
          <DecryptedText text={writeup.title} speed={18} />
        </h1>

        <p className="text-sm sm:text-base text-cyber-muted leading-relaxed max-w-3xl">
          {writeup.summary}
        </p>
      </div>

      {/* Mission Dossier Box */}
      <MissionDossier
        dossier={writeup.dossier}
        category={writeup.category}
        difficulty={writeup.difficulty}
        points={writeup.points}
        activeTheme={activeTheme}
      />

      {/* Interactive Kill Chain Bar */}
      <KillChainBar killChain={writeup.killChain} />

      {/* Writeup Main Body Content Sections */}
      <div className="space-y-10">
        {writeup.sections.map((sec, idx) => (
          <section
            key={idx}
            id={writeup.killChain[idx] ? writeup.killChain[idx].id : `step-${idx + 1}`}
            className="rounded-xl border border-cyber-border bg-cyber-card backdrop-blur-xl p-6 shadow-xl scroll-mt-32"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-7 h-7 rounded-lg bg-cyber-accent/20 border border-cyber-accent/40 flex items-center justify-center font-mono text-cyber-accent font-bold text-xs">
                0{idx + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-cyber-text font-mono">
                {sec.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-cyber-muted leading-relaxed whitespace-pre-line mb-4 font-sans">
              {sec.content}
            </p>

            {sec.code && (
              <TerminalCodeBlock
                code={sec.code}
                language={sec.language || 'bash'}
                path={`studio@pwnbox:~/${writeup.id}$`}
                downloadName={sec.downloadName}
                activeTheme={activeTheme}
              />
            )}
          </section>
        ))}
      </div>

      {/* Confetti Spoiler Flag Box */}
      <div className="mt-10">
        <h3 className="text-xs font-mono uppercase tracking-wider text-cyber-accent mb-2">
          Final Target Proof of Compromise
        </h3>
        <SpoilerFlagBox flag={writeup.flag} slug={writeup.id} />
      </div>
    </div>
  );
};

export default WriteupReader;
