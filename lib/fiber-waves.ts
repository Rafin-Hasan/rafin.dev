// Mint + white fibre-optic ribbons drawn on a canvas, with pulses of light racing along them.
// Horizontal at the top of the page; scrolling turns them vertical over the first ~0.9 screen,
// and scrolling back up turns them horizontal again.

type Ribbon = {
  y: number;
  amp: number;
  freq: number;
  speed: number;
  width: number;
  twist: number;
  strands: number;
  colors: string[];
  alpha: number;
  phase: number;
  lineWidth: number;
};

type Options = {
  intensity: number;
  scrollInfluence: number;
  rotateOver: number;
  maxDpr: number;
};

const RIBBONS: Ribbon[] = [
  // Hero ribbon — mint core that burns to near-white where strands converge
  { y: 0.56, amp: 0.13, freq: 1.05, speed: 0.07, width: 0.11, twist: 1.35, strands: 34, alpha: 1, phase: 0, lineWidth: 1.1,
    colors: ["rgba(52,211,153,0)", "#34d399", "#6ee7b7", "#effff8", "#a7f3d0", "rgba(110,231,183,0)"] },
  // Counter-flowing white / pale-mint highlight
  { y: 0.47, amp: 0.1, freq: 1.45, speed: -0.055, width: 0.065, twist: 2.1, strands: 22, alpha: 0.5, phase: 2.1, lineWidth: 0.8,
    colors: ["rgba(255,255,255,0)", "#d1fae5", "#ffffff", "#b8f5dc", "rgba(209,250,229,0)"] },
  // Deep teal-mint undertone, wide and soft
  { y: 0.68, amp: 0.085, freq: 0.8, speed: 0.045, width: 0.14, twist: 0.85, strands: 26, alpha: 0.38, phase: 4.2, lineWidth: 1,
    colors: ["rgba(15,118,110,0)", "#0f766e", "#5eead4", "#ccfbf1", "rgba(20,184,166,0)"] },
];

const TAU = Math.PI * 2;
const PULSES = 3; // light pulses per ribbon
const PULSE_STEPS = 8; // segments in each pulse tail
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function createFiberWaves(canvas: HTMLCanvasElement, glowCanvas: HTMLCanvasElement | null, initial: Partial<Options> = {}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { onScroll() {}, destroy() {} };
  const gctx = glowCanvas?.getContext("2d") ?? null;
  const canvasFilter = !!gctx && typeof gctx.filter === "string";
  if (glowCanvas && !canvasFilter) glowCanvas.style.filter = "blur(36px)";

  const opts: Options = { intensity: 1, scrollInfluence: 1, rotateOver: 0.9, maxDpr: 1.5, ...initial };
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const host = canvas.parentElement ?? document.body;

  let W = 0, H = 0, D = 1, dpr = 1, quality = 1, step = 16;
  let gradients: CanvasGradient[] | null = null;

  // Smoothed state: scroll progress, rotation, pointer, and a velocity-driven "energy" boost.
  let scrollTarget = 0, scroll = 0, lastScrollTarget = 0, energy = 0;
  let rotTarget = 0, rot = 0;
  let pxTarget = 0.5, pyTarget = 0.5, px = 0.5, py = 0.5, pActive = 0, pActiveTarget = 0;

  function resize() {
    const rect = host.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width || window.innerWidth));
    H = Math.max(1, Math.round(rect.height || window.innerHeight));
    dpr = Math.min(window.devicePixelRatio || 1, W * H > 2.4e6 ? 1.25 : opts.maxDpr);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    if (glowCanvas) {
      glowCanvas.width = Math.max(1, Math.round(W / 4));
      glowCanvas.height = Math.max(1, Math.round(H / 4));
    }
    const small = W < 768;
    quality = Math.min(quality, small ? 0.55 : 1);
    step = small ? 6 : clamp(W / 90, 14, 22);
    D = Math.hypot(W, H);
    gradients = null;
    if (motionQuery.matches) draw(0);
  }

  function buildGradients(c: CanvasRenderingContext2D) {
    return RIBBONS.map((r) => {
      const g = c.createLinearGradient(-D / 2, 0, D / 2, 0);
      const n = r.colors.length - 1;
      r.colors.forEach((color, i) => g.addColorStop(n ? i / n : 0, color));
      return g;
    });
  }

  function readScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollTarget = clamp(window.scrollY / max, 0, 1);
    const over = opts.rotateOver * window.innerHeight;
    rotTarget = smoothstep(over > 0 ? clamp(window.scrollY / over, 0, 1) : 0);
    if (motionQuery.matches) {
      scroll = scrollTarget;
      rot = rotTarget;
      draw(0);
    }
  }

  function onPointer(e: PointerEvent) {
    const rect = host.getBoundingClientRect();
    pxTarget = (e.clientX - rect.left) / W;
    pyTarget = (e.clientY - rect.top) / H;
    pActiveTarget = 1;
  }
  const onPointerLeave = () => { pActiveTarget = 0; };

  function draw(time: number) {
    const c = ctx!;
    gradients ??= buildGradients(c);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.globalCompositeOperation = "source-over";
    c.clearRect(0, 0, W, H);
    c.globalCompositeOperation = "lighter";
    c.lineCap = "round";
    c.lineJoin = "round";

    const theta = rot * Math.PI * 0.5;
    const cos = Math.cos(theta), sin = Math.sin(theta);
    c.translate(W / 2, H / 2);
    c.rotate(theta);

    const L = W + (H - W) * rot; // length along the ribbons
    const C = H + (W - H) * rot; // cross-axis size
    const aspect = L / Math.max(1, C);
    const ampScale = clamp(aspect * 1.1, 0.42, 1);
    const freqScale = clamp(aspect * 1.25, 0.5, 1) * (D / L);
    const si = opts.scrollInfluence;
    const s = scroll;
    const travel = s * Math.PI * 3.2 * si;
    const twistBoost = 1 + s * 0.9 * si;
    const tilt = (s - 0.35) * 0.18 * si * (1 - rot * 0.6);
    const lift = -s * 0.16 * si * (1 - rot);
    const ampBoost = 1 + s * 0.35 * si + energy * 0.6;
    const x0 = -D * 0.53, x1 = D * 0.53;
    const points = Math.ceil((x1 - x0) / step);

    // Pointer position in the rotated frame bends the ribbons gently around the cursor.
    const pdx = px * W - W / 2, pdy = py * H - H / 2;
    const plx = pdx * cos + pdy * sin;
    const ply = -pdx * sin + pdy * cos;
    const bendSigma = L * 0.12;
    const bendAmp = C * 0.06 * pActive;
    const bendDir = clamp(ply / (C * 0.5), -1, 1);

    RIBBONS.forEach((r, ri) => {
      const strands = Math.max(6, Math.round(r.strands * quality));
      c.strokeStyle = gradients![ri];
      c.lineWidth = r.lineWidth;
      const baseY = (r.y - 0.5 + lift) * C;
      const amp = r.amp * C * ampBoost * ampScale;
      const band = r.width * C * (0.5 + 0.5 * ampScale);
      const freq = r.freq * freqScale;
      const twist = r.twist * freqScale;
      const t0 = time * r.speed * TAU + r.phase + travel * (ri % 2 ? -0.7 : 1);

      // Height of the strand at angle `a` around the ribbon, at distance x along it.
      const yAt = (x: number, a: number) => {
        const t = (x - x0) / (x1 - x0);
        const ph = t * freq * TAU + t0;
        let cy = baseY + amp * Math.sin(ph) + amp * 0.32 * Math.sin(ph * 2.3 + time * 0.35 + ri) + x * tilt;
        if (bendAmp) {
          const dx = x - plx;
          cy += bendDir * bendAmp * Math.exp(-(dx * dx) / (2 * bendSigma * bendSigma));
        }
        return cy + band * Math.cos(a + t * twist * twistBoost * TAU + time * 0.22 + r.phase);
      };

      for (let k = 0; k < strands; k++) {
        const a = (strands === 1 ? 0.5 : k / (strands - 1)) * Math.PI;
        c.globalAlpha = clamp((0.18 + 0.82 * Math.sin(a)) * r.alpha * opts.intensity * 0.55, 0, 1);
        c.beginPath();
        for (let i = 0; i <= points; i++) {
          const x = x0 + i * step;
          if (i === 0) c.moveTo(x, yAt(x, a));
          else c.lineTo(x, yAt(x, a));
        }
        c.stroke();
      }

      // Pulses of light travel along the core strand, each with a tail that fades behind it.
      if (motionQuery.matches) return;
      const dir = r.speed < 0 ? -1 : 1;
      const tail = L * 0.1;
      c.strokeStyle = "#eafff6";
      c.lineWidth = r.lineWidth + 0.9;
      for (let p = 0; p < PULSES; p++) {
        const u = (((time * 0.05 * dir + p / PULSES + ri * 0.19) % 1) + 1) % 1;
        const head = x0 + u * (x1 - x0);
        for (let n = 0; n < PULSE_STEPS; n++) {
          const xa = head - dir * tail * (1 - n / PULSE_STEPS);
          const xb = head - dir * tail * (1 - (n + 1) / PULSE_STEPS);
          c.globalAlpha = clamp(((n + 1) / PULSE_STEPS) ** 2 * r.alpha * opts.intensity * 0.9, 0, 1);
          c.beginPath();
          c.moveTo(xa, yAt(xa, Math.PI / 2));
          c.lineTo(xb, yAt(xb, Math.PI / 2));
          c.stroke();
        }
      }
    });

    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalAlpha = 1;
    c.globalCompositeOperation = "source-over";

    if (gctx && glowCanvas) {
      gctx.globalCompositeOperation = "copy";
      if (canvasFilter) gctx.filter = "blur(9px)";
      gctx.drawImage(canvas, 0, 0, glowCanvas.width, glowCanvas.height);
      if (canvasFilter) gctx.filter = "none";
    }
  }

  let raf = 0, last = 0, clock = 0, slowFrames = 0, sampled = 0;

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;
    const k = 1 - Math.pow(1e-3, dt);
    scroll += (scrollTarget - scroll) * k * 1.6;
    rot += (rotTarget - rot) * k * 1.4;
    energy = Math.min(1, energy * Math.pow(0.02, dt) + Math.abs(scrollTarget - lastScrollTarget) * 6);
    lastScrollTarget = scrollTarget;
    px += (pxTarget - px) * k;
    py += (pyTarget - py) * k;
    pActive += (pActiveTarget - pActive) * k * 0.7;
    clock += dt * (1 + energy * 2.5);
    draw(clock);

    // Adaptive quality: drop strand count on devices that can't hold ~40fps.
    if (sampled < 600) {
      sampled++;
      if (dt > 0.024) slowFrames++;
      if (sampled % 90 === 0) {
        if (slowFrames > 45 && quality > 0.4) quality *= 0.75;
        slowFrames = 0;
      }
    }
  }

  function start() {
    cancelAnimationFrame(raf);
    last = 0;
    if (motionQuery.matches) draw(clock);
    else raf = requestAnimationFrame(frame);
  }

  let resizeQueued = false;
  function onResize() {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      resize();
      readScroll();
    });
  }
  const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

  const ro = new ResizeObserver(onResize);
  ro.observe(host);
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibility);
  motionQuery.addEventListener("change", start);

  resize();
  readScroll();
  scroll = scrollTarget;
  rot = rotTarget;
  start();

  // The caller reports scroll changes (see FiberBackground), so no scroll listener lives here.
  return {
    onScroll: readScroll,
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", start);
    },
  };
}
