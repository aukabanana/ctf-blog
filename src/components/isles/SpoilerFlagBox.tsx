import React, { useState } from 'react';
import { Lock, Unlock, Copy, Check, Loader2 } from 'lucide-react';

interface SpoilerFlagBoxProps {
  flag?: string;
  slug?: string;
}

export const SpoilerFlagBox: React.FC<SpoilerFlagBoxProps> = ({ flag: initialFlag, slug }) => {
  const [revealed, setRevealed] = useState(false);
  const [flag, setFlag] = useState<string>(initialFlag || '');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReveal = async () => {
    if (flag) {
      setRevealed(true);
      return;
    }

    if (slug) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/flag?slug=${encodeURIComponent(slug)}`);
        if (!res.ok) {
          throw new Error('Flag not found or network error');
        }
        const data = await res.json();
        setFlag(data.flag || 'STUDIO{flag_not_found_in_database}');
        setRevealed(true);
      } catch (err: any) {
        setError(err.message || 'Failed to retrieve flag');
      } finally {
        setLoading(false);
      }
    } else {
      setFlag('STUDIO{dummy_preview_flag_here}');
      setRevealed(true);
    }
  };

  const handleCopy = () => {
    if (!flag) return;
    navigator.clipboard.writeText(flag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative p-5 sm:p-6 rounded-xl border-2 border-dashed border-cyber-accent/60 bg-cyber-card backdrop-blur-xl my-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyber-accent text-xs font-mono tracking-wider uppercase">
            <Lock className="w-4 h-4" />
            <span>Target Root Capture Flag</span>
          </div>
          <div className="mt-2 font-mono text-sm sm:text-base break-all">
            {revealed ? (
              <span className="text-cyber-accent font-bold tracking-wide select-all bg-cyber-accent/10 px-2 py-1 rounded border border-cyber-accent/30">
                {flag}
              </span>
            ) : (
              <span className="filter blur-md select-none text-cyber-muted tracking-widest bg-white/5 px-3 py-1 rounded">
                STUDIO&#123;pwn3d_fl4g_h1dd3n_h3x_00000&#125;
              </span>
            )}
          </div>
          {error && <p className="text-xs text-cyber-danger font-mono mt-1">{error}</p>}
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {!revealed ? (
            <button
              onClick={handleReveal}
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyber-accent text-black font-semibold text-xs tracking-wider flex items-center justify-center space-x-2 hover:opacity-90 active:scale-95 transition shadow-lg shadow-cyber-accent/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>FETCHING...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>REVEAL FLAG</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyber-surface border border-cyber-accent text-cyber-accent hover:bg-cyber-accent/15 font-semibold text-xs flex items-center justify-center space-x-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-cyber-accent" />
                  <span>FLAG COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY FLAG</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpoilerFlagBox;
