import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

export interface TerminalCodeBlockProps {
  code: string;
  language?: string;
  path?: string;
  downloadName?: string;
  activeTheme?: string;
}

export const TerminalCodeBlock: React.FC<TerminalCodeBlockProps> = ({
  code,
  language = 'bash',
  path = 'studio@pwnbox:~/vault$',
  downloadName,
  activeTheme,
}) => {
  const [copied, setCopied] = useState(false);
  const isMono = activeTheme === 'mono';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = downloadName || `exploit_${Date.now()}.${language === 'python' ? 'py' : 'sh'}`;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-cyber-border bg-cyber-bg/95 shadow-lg my-4 text-xs sm:text-sm font-mono backdrop-blur-md">
      {/* Shell Titlebar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-cyber-surface/90 border-b border-cyber-border select-none">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full mono-dot-red ${isMono ? 'bg-[#555555]' : 'bg-[#ff5f56] shadow-sm shadow-red-500/40'}`} />
          <div className={`w-3 h-3 rounded-full mono-dot-yellow ${isMono ? 'bg-[#444444]' : 'bg-[#ffbd2e] shadow-sm shadow-yellow-500/40'}`} />
          <div className={`w-3 h-3 rounded-full mono-dot-green ${isMono ? 'bg-[#333333]' : 'bg-[#27c93f] shadow-sm shadow-green-500/40'}`} />
          <span className="text-[11px] sm:text-xs text-cyber-muted ml-2 font-mono truncate max-w-[200px] sm:max-w-md">
            {path}
          </span>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {downloadName && (
            <button
              onClick={handleDownload}
              title={`Download ${downloadName}`}
              className="px-2 py-1 flex items-center space-x-1.5 rounded text-[11px] bg-cyber-surface hover:bg-cyber-border text-cyber-accent border border-cyber-border transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save Script</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="p-1 sm:px-2 sm:py-1 flex items-center space-x-1.5 rounded text-[11px] bg-cyber-surface hover:bg-cyber-border text-cyber-text transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyber-accent" />
                <span className="text-cyber-accent hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyber-muted hover:text-cyber-text" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <div className="p-3 sm:p-4 overflow-x-auto text-cyber-text leading-relaxed scrollbar-thin scrollbar-thumb-cyber-border">
        <pre className="font-mono whitespace-pre">{code}</pre>
      </div>
    </div>
  );
};

export default TerminalCodeBlock;
