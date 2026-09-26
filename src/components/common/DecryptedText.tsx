import React, { useState, useEffect, useRef } from 'react';

const GLYPHS = '0123456789ABCDEF0x*_$#%&!?~';

export interface DecryptedTextProps {
  text: string;
  className?: string;
  hoverOnly?: boolean;
  speed?: number;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  hoverOnly = false,
  speed = 25,
}) => {
  const [displayed, setDisplayed] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    let iteration = 0;
    const maxIterations = text.length;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    intervalRef.current = setInterval(() => {
      setDisplayed(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayed(text);
      }
      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (!hoverOnly) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, hoverOnly]);

  return (
    <span
      className={`font-mono transition-colors duration-200 inline-block ${className}`}
      onMouseEnter={() => {
        if (hoverOnly && !isScrambling) {
          startScramble();
        }
      }}
    >
      {displayed}
    </span>
  );
};

export default DecryptedText;
