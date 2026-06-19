import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ErrorSpotlightProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  centerContent?: React.ReactNode;
  /** Characters used in the grid, brightest → dimmest (we pick by intensity). */
  symbolPalette?: string;
  /** Approximate pixel step between grid cells (smaller = denser, heavier). */
  cellSize?: number;
  className?: string;
}

const DEFAULT_PALETTE = '@%#*+=-:.';

function DefaultCenterMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="currentColor">
      <path d="M12 3 21 19H3L12 3Z" />
    </svg>
  );
}

function beamIntensity(
  px: number,
  py: number,
  ox: number,
  oy: number,
  cx: number,
  cy: number,
  beamWidth: number,
): number {
  const vx = cx - ox;
  const vy = cy - oy;
  const len = Math.hypot(vx, vy) || 1;
  const ux = vx / len;
  const uy = vy / len;
  const wx = px - ox;
  const wy = py - oy;
  const t = wx * ux + wy * uy;
  const clampedT = Math.max(-len * 0.15, Math.min(len * 1.25, t));
  const projX = ox + ux * clampedT;
  const projY = oy + uy * clampedT;
  const dist = Math.hypot(px - projX, py - projY);
  const along = t / len;
  const cone = Math.max(0, 1 - along * 0.35);
  const gauss = Math.exp(-(dist * dist) / (beamWidth * beamWidth * cone * cone + 1e-6));
  const edgeFade = Math.min(1, Math.max(0, 1.12 - along));
  /** Sharper cone: light mostly stays in the wedge toward the cursor. */
  return (gauss * edgeFade * cone) ** 1.35;
}

/**
 * Full-viewport error state: ASCII symbol field that “lights up” along a beam
 * from the bottom-center mark toward the cursor (Vercel-style).
 * Pass `centerContent` for a logo instead of the default triangle.
 */
export function ErrorSpotlight({
  title = 'Something went wrong',
  description,
  centerContent,
  symbolPalette = DEFAULT_PALETTE,
  cellSize = 11,
  className,
}: ErrorSpotlightProps) {
  const wrapRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const cursorRef = React.useRef({ x: 0.5, y: 0.35 });
  const rafRef = React.useRef<number>(0);

  const palette = React.useMemo(() => {
    const chars = [...symbolPalette.replace(/\s+/g, '')];
    return chars.length > 0 ? chars : [...DEFAULT_PALETTE.replace(/\s+/g, '')];
  }, [symbolPalette]);

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const section = wrapRef.current;
    if (!canvas || !section) return;

    const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    const w = section.clientWidth;
    const h = section.clientHeight;
    if (w < 1 || h < 1) return;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    const ox = w * 0.5;
    const oy = h - 56;
    const cx = cursorRef.current.x * w;
    const cy = cursorRef.current.y * h;
    const beamW = Math.max(28, Math.min(w, h) * 0.09);

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = `${Math.max(8, cellSize - 2)}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

    const step = Math.max(6, cellSize);
    /** Below this, leave the cell pure black (no symbols visible). */
    const cutoff = 0.045;

    for (let py = step * 0.5; py < h; py += step) {
      for (let px = step * 0.5; px < w; px += step) {
        const raw = beamIntensity(px, py, ox, oy, cx, cy, beamW);
        if (raw < cutoff) continue;

        const intensity = Math.min(1, (raw - cutoff) / (1 - cutoff));
        const idx = Math.floor((1 - intensity) * (palette.length - 1));
        const ch = palette[Math.max(0, Math.min(palette.length - 1, idx))];
        const alpha = 0.08 + intensity ** 1.15 * 0.92;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillText(ch, px, py);
      }
    }
  }, [cellSize, palette]);

  const scheduleDraw = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      draw();
    });
  }, [draw]);

  React.useEffect(() => {
    const section = wrapRef.current;
    if (!section) return;

    const ro = new ResizeObserver(() => scheduleDraw());
    ro.observe(section);
    scheduleDraw();

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleDraw]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    cursorRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
    scheduleDraw();
  };

  return (
    <section
      ref={wrapRef}
      className={cn(
        'relative isolate min-h-screen w-full cursor-crosshair overflow-hidden bg-black text-white',
        className,
      )}
      onPointerMove={onPointerMove}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="pointer-events-none absolute inset-x-0 top-[38%] flex justify-center px-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white/90 md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-xl text-sm text-white/55 md:text-base">{description}</p>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-14">
        <div className="relative flex flex-col items-center">
          <div className="grid place-items-center rounded-full border border-white/20 bg-black/40 p-2.5 backdrop-blur-[2px]">
            {centerContent ?? <DefaultCenterMark />}
          </div>
        </div>
      </div>
    </section>
  );
}
