"use client";
import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const createGradient = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(8, 20, 28, 0.9)");
  gradient.addColorStop(0.35, "rgba(5, 40, 36, 0.95)");
  gradient.addColorStop(0.7, "rgba(8, 9, 28, 0.98)");
  gradient.addColorStop(1, "rgba(2, 4, 12, 1)");
  return gradient;
};

const drawGlow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  intensity: number,
) => {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = size * intensity;
  ctx.globalAlpha = 0.7 * intensity;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawCircuit = (
  ctx: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
  glowColor: string,
  baseColor: string,
  width = 2,
) => {
  ctx.save();
  ctx.strokeStyle = baseColor;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 20;
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = glowColor;
  ctx.stroke();
  ctx.restore();
};

const drawNumericGlitch = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  ctx.save();
  const layers = 40;
  for (let i = 0; i < layers; i += 1) {
    const alpha = Math.random() * 0.25;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = i % 2 === 0 ? "rgba(0, 255, 197, 0.6)" : "rgba(145, 91, 255, 0.4)";
    const glitchHeight = 4 + Math.random() * 12;
    const y = Math.random() * height;
    ctx.fillRect(-50, y, width + 100, glitchHeight);
  }

  const fragments = 90;
  ctx.font = "12px 'Share Tech Mono', monospace";
  for (let i = 0; i < fragments; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const isCode = Math.random() > 0.6;
    ctx.globalAlpha = 0.4 + Math.random() * 0.45;
    ctx.fillStyle = i % 2 === 0 ? "#00ffc5" : "#8a2be2";
    ctx.fillText(isCode ? `0x${(Math.random() * 0xffffff).toString(16).slice(0, 4)}` : "ERR", x, y);
  }

  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.2 + Math.sin(time / 350) * 0.2;
  ctx.strokeStyle = "rgba(0, 255, 197, 0.4)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  const startX = width * 0.55;
  ctx.moveTo(startX, height * 0.15);
  ctx.bezierCurveTo(width * 0.75, height * 0.3, width * 0.6, height * 0.6, startX + 10, height * 0.8);
  ctx.stroke();
  ctx.restore();
};

const drawCatSilhouette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.save();
  ctx.fillStyle = "rgba(16, 18, 28, 0.95)";
  ctx.strokeStyle = "rgba(0, 255, 197, 0.4)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(width * 0.2, height * 0.75);
  ctx.quadraticCurveTo(width * 0.25, height * 0.6, width * 0.35, height * 0.5);
  ctx.quadraticCurveTo(width * 0.45, height * 0.4, width * 0.47, height * 0.3);
  ctx.quadraticCurveTo(width * 0.48, height * 0.2, width * 0.55, height * 0.18);
  ctx.quadraticCurveTo(width * 0.62, height * 0.16, width * 0.63, height * 0.24);
  ctx.quadraticCurveTo(width * 0.69, height * 0.2, width * 0.74, height * 0.27);
  ctx.quadraticCurveTo(width * 0.79, height * 0.34, width * 0.76, height * 0.45);
  ctx.quadraticCurveTo(width * 0.85, height * 0.47, width * 0.9, height * 0.53);
  ctx.quadraticCurveTo(width * 0.95, height * 0.59, width * 0.83, height * 0.63);
  ctx.quadraticCurveTo(width * 0.88, height * 0.7, width * 0.83, height * 0.76);
  ctx.quadraticCurveTo(width * 0.74, height * 0.92, width * 0.58, height * 0.94);
  ctx.quadraticCurveTo(width * 0.45, height * 0.97, width * 0.33, height * 0.93);
  ctx.quadraticCurveTo(width * 0.25, height * 0.9, width * 0.2, height * 0.75);
  ctx.closePath();
  ctx.fill();

  const limbGradient = ctx.createLinearGradient(width * 0.35, height * 0.4, width * 0.85, height * 0.8);
  limbGradient.addColorStop(0, "rgba(0, 205, 255, 0.1)");
  limbGradient.addColorStop(0.5, "rgba(124, 0, 255, 0.25)");
  limbGradient.addColorStop(1, "rgba(46, 255, 159, 0.35)");
  ctx.strokeStyle = limbGradient;
  ctx.stroke();

  ctx.restore();
};

const drawFaceDetails = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  ctx.save();
  ctx.translate(width * 0.6, height * 0.33);

  ctx.strokeStyle = "rgba(0, 255, 197, 0.5)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-70, -10);
  ctx.quadraticCurveTo(-30, -55, 15, -10);
  ctx.quadraticCurveTo(40, -40, 65, -15);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-75, 15);
  ctx.quadraticCurveTo(-30, 40, 20, 20);
  ctx.quadraticCurveTo(45, 10, 70, 28);
  ctx.stroke();

  const flicker = 0.5 + Math.abs(Math.sin(time / 1200)) * 0.5;
  const neonCycle = 0.5 + Math.abs(Math.sin(time / 800 + Math.PI / 4));

  const leftEyeColor = `rgba(${Math.floor(20 + neonCycle * 50)}, ${Math.floor(
    180 + neonCycle * 75,
  )}, ${Math.floor(255 - neonCycle * 80)}, 0.9)`;
  const rightEyeColor = `rgba(${Math.floor(120 + flicker * 120)}, ${Math.floor(
    40 + flicker * 80,
  )}, ${Math.floor(255 * (1 - flicker * 0.2))}, 0.95)`;

  drawGlow(ctx, -30, 8, 22, leftEyeColor, 1.4 + neonCycle * 0.5);
  drawGlow(ctx, 35, 12, 24, rightEyeColor, 1.6 + flicker * 0.6);

  ctx.fillStyle = "rgba(12, 255, 186, 0.85)";
  ctx.shadowColor = "rgba(0, 255, 197, 0.6)";
  ctx.shadowBlur = 25;
  ctx.globalAlpha = 0.88;
  ctx.beginPath();
  ctx.moveTo(-40, -2);
  ctx.lineTo(-26, 18);
  ctx.lineTo(-18, 10);
  ctx.lineTo(-28, -4);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(25, 2);
  ctx.lineTo(45, 18);
  ctx.lineTo(52, 8);
  ctx.lineTo(32, -6);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(170, 255, 0, 0.3)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.moveTo(-80, -55);
  ctx.lineTo(-120, -110);
  ctx.moveTo(70, -45);
  ctx.lineTo(110, -110);
  ctx.stroke();

  ctx.restore();
};

const drawStructuralDetail = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.save();
  ctx.strokeStyle = "rgba(0, 188, 255, 0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.22, height * 0.7);
  ctx.lineTo(width * 0.3, height * 0.55);
  ctx.lineTo(width * 0.55, height * 0.6);
  ctx.lineTo(width * 0.65, height * 0.82);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width * 0.52, height * 0.52);
  ctx.bezierCurveTo(width * 0.72, height * 0.55, width * 0.8, height * 0.62, width * 0.82, height * 0.8);
  ctx.stroke();

  ctx.globalAlpha = 0.4;
  drawCircuit(
    ctx,
    [
      { x: width * 0.28, y: height * 0.68 },
      { x: width * 0.38, y: height * 0.58 },
      { x: width * 0.44, y: height * 0.48 },
      { x: width * 0.52, y: height * 0.42 },
      { x: width * 0.62, y: height * 0.38 },
      { x: width * 0.7, y: height * 0.34 },
    ],
    "rgba(0, 255, 197, 0.8)",
    "rgba(126, 255, 197, 0.25)",
    2.5,
  );

  drawCircuit(
    ctx,
    [
      { x: width * 0.48, y: height * 0.7 },
      { x: width * 0.58, y: height * 0.65 },
      { x: width * 0.68, y: height * 0.64 },
      { x: width * 0.78, y: height * 0.68 },
    ],
    "rgba(136, 0, 255, 0.85)",
    "rgba(30, 0, 40, 0.5)",
    3,
  );
  ctx.restore();
};

const drawTail = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
  ctx.save();
  const waveOffset = Math.sin(time / 900) * 16;
  ctx.strokeStyle = "rgba(0, 255, 197, 0.45)";
  ctx.lineWidth = 6;
  ctx.shadowColor = "rgba(0, 255, 160, 0.4)";
  ctx.shadowBlur = 18;

  ctx.beginPath();
  ctx.moveTo(width * 0.2, height * 0.7);
  ctx.bezierCurveTo(
    width * 0.05 + waveOffset,
    height * 0.65,
    width * 0.05 - waveOffset,
    height * 0.45,
    width * 0.16,
    height * 0.38,
  );
  ctx.bezierCurveTo(
    width * 0.28,
    height * 0.26,
    width * 0.24,
    height * 0.18,
    width * 0.22 + waveOffset * 0.1,
    height * 0.12,
  );
  ctx.stroke();

  ctx.globalCompositeOperation = "lighter";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(123, 0, 255, 0.45)";
  ctx.shadowColor = "rgba(255, 0, 200, 0.3)";
  ctx.shadowBlur = 30;

  ctx.beginPath();
  ctx.moveTo(width * 0.2, height * 0.7);
  ctx.bezierCurveTo(
    width * 0.09 + waveOffset * 0.2,
    height * 0.64,
    width * 0.08 - waveOffset * 0.3,
    height * 0.47,
    width * 0.18,
    height * 0.36,
  );
  ctx.bezierCurveTo(
    width * 0.28,
    height * 0.25,
    width * 0.26,
    height * 0.18,
    width * 0.24 + waveOffset * 0.08,
    height * 0.12,
  );
  ctx.stroke();
  ctx.restore();
};

const drawForegroundMist = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  ctx.save();
  const gradient = ctx.createRadialGradient(
    width * 0.5,
    height * 0.75,
    height * 0.1,
    width * 0.5,
    height,
    height * 0.7,
  );
  gradient.addColorStop(0, "rgba(0, 255, 197, 0.05)");
  gradient.addColorStop(0.4, "rgba(80, 20, 100, 0.08)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.82)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.14 + Math.sin(time / 1000) * 0.05;
  ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
  ctx.fillRect(0, height * 0.88, width, height * 0.2);
  ctx.restore();
};

const drawAmbientParticles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  ctx.save();
  const particleCount = 180;
  for (let i = 0; i < particleCount; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const pulse = Math.sin((time / 600 + i) % Math.PI) * 0.5 + 0.5;
    const alpha = 0.05 + pulse * 0.15;
    ctx.fillStyle = i % 3 === 0 ? "rgba(0, 255, 197, 0.3)" : "rgba(128, 0, 255, 0.25)";
    ctx.globalAlpha = alpha;
    ctx.fillRect(x, y, 2 + pulse * 3, 2 + pulse * 3);
  }
  ctx.restore();
};

export const CyberCatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationFrame: number;
    const render = (time: number) => {
      const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
      const computedWidth = canvas.clientWidth;
      const computedHeight = canvas.clientHeight;
      if (canvas.width !== computedWidth * dpr || canvas.height !== computedHeight * dpr) {
        canvas.width = computedWidth * dpr;
        canvas.height = computedHeight * dpr;
        if (typeof ctx.resetTransform === "function") {
          ctx.resetTransform();
        } else {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        ctx.scale(dpr, dpr);
      }

      const width = canvas.width / (canvas.width === 0 ? 1 : dpr);
      const height = canvas.height / (canvas.height === 0 ? 1 : dpr);

      ctx.save();
      ctx.fillStyle = createGradient(ctx, width, height);
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      drawAmbientParticles(ctx, width, height, time);
      drawTail(ctx, width, height, time);
      drawCatSilhouette(ctx, width, height);
      drawStructuralDetail(ctx, width, height);
      drawFaceDetails(ctx, width, height, time);
      drawNumericGlitch(ctx, width, height, time);
      drawForegroundMist(ctx, width, height, time);

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full rounded-[32px] border border-white/10 bg-black/80 shadow-[0_0_120px_rgba(0,255,197,0.25)]"
      style={{ maxWidth: "min(1200px, 90vw)", aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
    />
  );
};
