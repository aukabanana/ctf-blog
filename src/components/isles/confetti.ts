export function triggerConfettiBurst() {
  if (typeof window !== 'undefined' && (window as any).confetti) {
    (window as any).confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#00ffaa', '#00d4ff', '#ff3344', '#ffbb00'],
    });
    return;
  }

  // Lightweight native canvas fallback
  try {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }).map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.65,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.9) * 16,
      size: Math.random() * 6 + 4,
      color: ['#00ffaa', '#00d4ff', '#ffffff', '#ff3344'][Math.floor(Math.random() * 4)],
      alpha: 1,
    }));

    let frame = 0;
    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.alpha -= 0.015;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      frame++;
      if (frame < 65) {
        requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    }
    render();
  } catch (err) {
    // Silently continue
  }
}
