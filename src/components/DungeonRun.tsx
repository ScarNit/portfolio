"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_JUMP, HERO_RUN_A, HERO_RUN_B, PALETTE } from "./sprites";

/**
 * Hero centrepiece: a tiny playable dungeon. It runs itself (and dies a
 * lot) until the visitor clicks, taps or presses Space, then they jump.
 * Drawn on a 192x108 canvas scaled up with crisp pixels.
 */
const W = 192;
const H = 108;
const GROUND = 84;
const HERO_H = 9;
const SPEED = 0.75;
const IDLE_FRAMES = 60 * 9; // hand control back to the auto-runner after 9s

// Spike pits per room as [startX, endX].
const ROOMS: [number, number][][] = [
  [[52, 62], [96, 110], [142, 152]],
  [[44, 56], [84, 94], [122, 136]],
  [[58, 72], [100, 110], [136, 148]],
];

const C = {
  bg: "#0e0c0a",
  brick: "#1b1712",
  brickAlt: "#211c15",
  pillar: "#2a241b",
  pillarLight: "#372f23",
  ground: "#3a3226",
  groundTop: "#6a5b43",
  seam: "#2c261d",
  pit: "#080706",
  spike: "#cfc6b3",
  spikeDark: "#8a8272",
  torch: "#ffb224",
  flame: "#ff7a1a",
  wood: "#6b4a1e",
  blood: "#f0524f",
  dust: "#a0957f",
};

type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };
type Status = "run" | "dead" | "clear";

export default function DungeonRun() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef(false);
  const [tries, setTries] = useState(1);
  const [room, setRoom] = useState(1);
  const [status, setStatus] = useState<Status>("run");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let roomIndex = 0;
    let pits = ROOMS[0];
    let x = 6;
    let y = GROUND - HERO_H;
    let vy = 0;
    let grounded = true;
    let pause = 0;
    let frame = 0;
    let shake = 0;
    let flash = 0;
    let isManual = false;
    let idle = 0;
    let state: Status = "run";
    let willFail = pits.map(() => Math.random() < 0.3);
    let particles: Particle[] = [];
    let graves: number[] = [];

    const burst = (n: number, colors: string[], power: number) => {
      for (let i = 0; i < n; i++) {
        particles.push({
          x: x + 3,
          y: y + 5,
          vx: (Math.random() - 0.5) * power,
          vy: -Math.random() * power,
          life: 24 + Math.random() * 22,
          color: colors[i % colors.length],
        });
      }
    };
    const dust = () => {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: x + 1 + Math.random() * 5,
          y: GROUND - 1,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -Math.random() * 0.5,
          life: 10 + Math.random() * 8,
          color: C.dust,
        });
      }
    };
    const respawn = () => {
      x = 6;
      y = GROUND - HERO_H;
      vy = 0;
      grounded = true;
      state = "run";
      willFail = pits.map(() => Math.random() < 0.3);
      setStatus("run");
    };

    const step = () => {
      frame++;
      if (shake > 0) shake--;
      if (flash > 0) flash--;
      particles = particles.filter((p) => p.life-- > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
      }

      const pressed = jumpRef.current;
      jumpRef.current = false;
      if (pressed) {
        idle = 0;
        if (!isManual) {
          isManual = true;
          setManual(true);
        }
      } else if (isManual && ++idle > IDLE_FRAMES) {
        isManual = false;
        setManual(false);
      }

      if (pause > 0) {
        if (--pause === 0) {
          if (state === "dead") {
            setTries((t) => t + 1);
          } else {
            roomIndex = (roomIndex + 1) % ROOMS.length;
            pits = ROOMS[roomIndex];
            graves = [];
            setRoom((r) => r + 1);
            setTries(1);
          }
          respawn();
        }
        return;
      }

      x += SPEED;
      let jump = isManual && pressed;
      if (!isManual) {
        pits.forEach(([start], i) => {
          if (!willFail[i] && x + 6 >= start - 3 && x + 6 < start) jump = true;
        });
      }
      if (jump && grounded) {
        vy = -3;
        grounded = false;
        dust();
      }
      if (!grounded) {
        vy += 0.16;
        y += vy;
        if (y >= GROUND - HERO_H) {
          y = GROUND - HERO_H;
          vy = 0;
          grounded = true;
          dust();
        }
      }

      const inPit = pits.some(([s, e]) => x + 6 > s && x + 1 < e);
      if (inPit && y + HERO_H > GROUND - 2) {
        state = "dead";
        setStatus("dead");
        pause = 50;
        shake = 12;
        flash = 3;
        graves = [...graves.slice(-7), Math.round(x)];
        burst(18, [C.blood, C.torch, C.blood], 2.8);
      } else if (x > W - 24) {
        state = "clear";
        setStatus("clear");
        pause = 80;
        burst(14, [C.torch, "#ffd75e", "#efe8da"], 2.2);
      }
    };

    const sprite = (rows: string[], sx: number, sy: number) => {
      rows.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
          if (row[rx] === ".") continue;
          ctx.fillStyle = PALETTE[row[rx]];
          ctx.fillRect(sx + rx, sy + ry, 1, 1);
        }
      });
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);
      if (shake > 0) ctx.translate(Math.round((Math.random() - 0.5) * 3), Math.round((Math.random() - 0.5) * 3));

      // brick wall with a few lighter stones
      for (let r = 0; r < 7; r++) {
        for (let c = -1; c < 13; c++) {
          ctx.fillStyle = (r * 31 + c * 17) % 5 === 0 ? C.brickAlt : C.brick;
          ctx.fillRect(c * 16 + (r % 2) * 8, r * 12, 15, 11);
        }
      }

      // pillars
      for (const px of [10, 76, 166]) {
        ctx.fillStyle = C.pillar;
        ctx.fillRect(px, 0, 9, GROUND);
        ctx.fillStyle = C.pillarLight;
        ctx.fillRect(px, 0, 2, GROUND);
        ctx.fillRect(px - 2, GROUND - 4, 13, 4);
        ctx.fillRect(px - 2, 0, 13, 3);
      }

      // torches
      const flicker = (frame >> 3) % 2;
      for (const tx of [40, 122]) {
        ctx.fillStyle = C.wood;
        ctx.fillRect(tx, 45, 2, 8);
        ctx.fillRect(tx - 1, 45, 4, 1);
        ctx.fillStyle = C.flame;
        ctx.fillRect(tx - 1, 39 - flicker, 4, 6 + flicker);
        ctx.fillStyle = C.torch;
        ctx.fillRect(tx, 41 - flicker, 2, 4);
        ctx.fillStyle = "#ffd75e";
        ctx.fillRect(tx, 43, 1, 2);
      }

      // exit door
      const doorX = W - 20;
      ctx.fillStyle = C.wood;
      ctx.fillRect(doorX, GROUND - 20, 14, 20);
      ctx.fillRect(doorX + 2, GROUND - 22, 10, 2);
      ctx.fillStyle = state === "clear" ? "#ffd75e" : C.pit;
      ctx.fillRect(doorX + 2, GROUND - 18, 10, 18);
      ctx.fillStyle = C.torch;
      ctx.fillRect(doorX + 9, GROUND - 9, 1, 2);

      // floor
      ctx.fillStyle = C.ground;
      ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.fillStyle = C.groundTop;
      ctx.fillRect(0, GROUND, W, 2);
      ctx.fillStyle = C.seam;
      for (let sx = 0; sx < W; sx += 16) ctx.fillRect(sx, GROUND + 2, 1, H - GROUND);
      ctx.fillRect(0, GROUND + 12, W, 1);

      // spike pits
      for (const [s, e] of pits) {
        ctx.fillStyle = C.pit;
        ctx.fillRect(s, GROUND, e - s, 9);
        for (let sx = s; sx + 3 <= e; sx += 4) {
          ctx.fillStyle = C.spike;
          ctx.fillRect(sx + 1, GROUND + 1, 1, 2);
          ctx.fillRect(sx, GROUND + 3, 3, 3);
          ctx.fillStyle = C.spikeDark;
          ctx.fillRect(sx + 2, GROUND + 3, 1, 3);
        }
      }

      // markers where earlier attempts ended
      ctx.fillStyle = C.spike;
      for (const gx of graves) {
        ctx.fillRect(gx + 2, GROUND - 6, 1, 4);
        ctx.fillRect(gx + 1, GROUND - 5, 3, 1);
      }

      // hero
      if (state !== "dead") {
        const rows = !grounded ? HERO_JUMP : (frame >> 3) % 2 ? HERO_RUN_A : HERO_RUN_B;
        sprite(rows, Math.round(x), Math.round(y));
      }

      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
      }

      // warm light pools from the torches
      ctx.globalCompositeOperation = "lighter";
      for (const tx of [41, 123]) {
        const radius = 30 + flicker * 2;
        const glow = ctx.createRadialGradient(tx, 42, 1, tx, 42, radius);
        glow.addColorStop(0, "rgba(255, 150, 40, 0.30)");
        glow.addColorStop(1, "rgba(255, 150, 40, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(tx - radius, 42 - radius, radius * 2, radius * 2);
      }
      ctx.globalCompositeOperation = "source-over";

      if (flash > 0) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(-4, -4, W + 8, H + 8);
      }
    };

    if (reduced) {
      draw();
      return;
    }

    // Only simulate while the canvas is on screen.
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(canvas);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      if (visible) {
        acc += Math.min(now - last, 100);
        while (acc >= 1000 / 60) {
          step();
          acc -= 1000 / 60;
        }
        draw();
      }
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  const press = () => {
    jumpRef.current = true;
  };

  return (
    <figure className="crt-frame border-2 border-line bg-panel p-2">
      <div
        role="button"
        tabIndex={0}
        aria-label="Mini dungeon game. Press Space or tap to jump over the spikes."
        onPointerDown={press}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
            e.preventDefault();
            if (!e.repeat) press();
          }
        }}
        className="relative block cursor-pointer touch-manipulation select-none"
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-hidden="true"
          className="block aspect-video w-full [image-rendering:pixelated]"
        />
        <div aria-hidden="true" className="crt-overlay pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3 font-pixel text-[10px] uppercase tracking-wider sm:text-xs">
          <span className="text-bone">
            Room {String(room).padStart(2, "0")} · Try #{String(tries).padStart(3, "0")}
          </span>
          <span
            aria-live="off"
            className={status === "dead" ? "text-[#f0524f]" : status === "clear" ? "text-torch" : "text-dim"}
          >
            {status === "dead" ? "You died" : status === "clear" ? "Room clear!" : manual ? "● Live" : "Demo"}
          </span>
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-1 pt-2 font-pixel text-[10px] uppercase tracking-wider text-dim">
        <span>Fail. Learn. Try again.</span>
        <span className={manual ? "text-torch" : ""}>
          {manual ? "Space / tap = jump" : "▶ Click or press Space to play"}
        </span>
      </figcaption>
    </figure>
  );
}
