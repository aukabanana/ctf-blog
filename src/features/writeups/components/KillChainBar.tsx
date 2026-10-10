import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { KillChainStep } from '../types';

export interface KillChainBarProps {
  killChain: KillChainStep[];
}

export const KillChainBar: React.FC<KillChainBarProps> = ({ killChain }) => {
  const [activeStep, setActiveStep] = useState(0);

  const scrollToStep = (id: string, index: number) => {
    setActiveStep(index);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-16 z-30 mb-8 p-2 rounded-xl bg-cyber-surface/90 border border-cyber-border backdrop-blur-xl shadow-lg">
      <div className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider mb-1.5 px-2 flex items-center justify-between">
        <span>Attack Kill Chain Progress</span>
        <span className="text-cyber-accent">
          {activeStep + 1} / {killChain.length} Steps
        </span>
      </div>
      <div className="flex items-center overflow-x-auto space-x-2 pb-1 scrollbar-none">
        {killChain.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => scrollToStep(step.id, idx)}
              className={`flex-shrink-0 flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                isActive
                  ? 'bg-cyber-accent text-white dark:text-black killchain-step-active font-bold shadow-md shadow-cyber-accent/20'
                  : 'bg-cyber-surface/60 text-cyber-muted hover:text-cyber-text hover:bg-cyber-border/40 border border-cyber-border/40'
              }`}
            >
              <span>{step.name}</span>
              {idx < killChain.length - 1 && (
                <ChevronRight
                  className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-black' : 'text-cyber-muted'}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default KillChainBar;
