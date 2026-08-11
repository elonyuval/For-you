import { useEffect, useRef } from 'react';

const COLORS = ['#A52236', '#7C1B2C', '#C93A4E', '#E0B0A9', '#F3E4CE'];

/**
 * A short, soft shower of rose petals on a canvas.
 *
 * Canvas keeps this to a single composited layer — 40-odd DOM nodes animating
 * at once is what makes this sort of thing stutter on a phone.
 */
export default function Petals({ run, count = 42, duration = 2900, onDone }) {
  const canvasRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!run) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rand = (a, b) => a + Math.random() * (b - a);

    const petals = Array.from({ length: count }, () => ({
      x: rand(0, width),
      y: rand(-height * 0.45, -20),
      size: rand(7, 15),
      vy: rand(58, 128),
      vx: rand(-26, 26),
      spin: rand(-2.2, 2.2),
      angle: rand(0, Math.PI * 2),
      sway: rand(0.6, 1.7),
      phase: rand(0, Math.PI * 2),
      color: COLORS[(Math.random() * COLORS.length) | 0],
      flip: rand(0.55, 1),
    }));

    let raf = 0;
    let start = 0;

    const drawPetal = (p) => {
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.9, -s * 0.55, s * 0.75, s * 0.6, 0, s);
      ctx.bezierCurveTo(-s * 0.75, s * 0.6, -s * 0.9, -s * 0.55, 0, -s);
      ctx.closePath();
      ctx.fill();
    };

    const frame = (now) => {
      if (!start) start = now;
      const elapsed = now - start;
      const dt = Math.min(0.05, (now - (frame.last || now)) / 1000);
      frame.last = now;

      ctx.clearRect(0, 0, width, height);

      // Ease the whole shower out over the last 700ms
      const fade =
        elapsed > duration - 700
          ? Math.max(0, (duration - elapsed) / 700)
          : 1;

      for (const p of petals) {
        p.y += p.vy * dt;
        p.x += (p.vx + Math.sin(p.phase + elapsed / 700) * 18 * p.sway) * dt;
        p.angle += p.spin * dt;

        if (p.y > height + 40) {
          p.y = -30;
          p.x = rand(0, width);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        // A little vertical squash reads as the petal turning in the air
        ctx.scale(1, p.flip * (0.7 + 0.3 * Math.sin(p.angle * 1.6)));
        ctx.globalAlpha = 0.88 * fade;
        ctx.fillStyle = p.color;
        drawPetal(p);
        ctx.restore();
      }

      if (elapsed < duration) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, width, height);
        doneRef.current?.();
      }
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [run, count, duration]);

  if (!run) return null;
  return <canvas ref={canvasRef} className="petals-canvas" aria-hidden="true" />;
}
