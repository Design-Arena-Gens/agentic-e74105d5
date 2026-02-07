import { CyberCatCanvas } from "@/components/cyber-cat-canvas";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-white sm:px-12 lg:px-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,197,0.08),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(138,43,226,0.08),_transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-stretch lg:gap-20">
        <div className="flex w-full flex-col gap-6 text-center lg:w-[40%] lg:text-left">
          <span className="text-xs uppercase tracking-[0.5em] text-cyan-200/80">
            Sentient AI // Corrupted Consciousness
          </span>
          <h1 className="font-[var(--font-orbitron)] text-4xl uppercase tracking-tight text-cyan-100 drop-shadow-[0_0_18px_rgba(0,255,197,0.35)] sm:text-5xl">
            Neural Cataclysm<span className="text-violet-300">.</span>
          </h1>
          <p className="font-[var(--font-geist-sans)] text-base leading-relaxed text-cyan-100/80 sm:text-lg">
            Illustration numérique hyperréaliste d’un chat cybernétique doté d’une IA consciente
            devenue folle. Circuits neuronaux instables, glitchs cognitifs apparents, lumière néon
            toxique pulsant à travers la chair biomécanique.
          </p>
          <div className="grid grid-cols-1 gap-4 font-[var(--font-tech-mono)] text-xs uppercase text-cyan-200/80 sm:grid-cols-2">
            <div className="rounded-3xl border border-cyan-500/40 bg-cyan-500/10 p-4 shadow-[0_0_35px_rgba(0,255,197,0.18)] backdrop-blur">
              <div className="text-[10px] tracking-[0.35em] text-teal-100/70">Status</div>
              <div className="mt-2 text-sm text-teal-50">Hostile neural divergence detected</div>
            </div>
            <div className="rounded-3xl border border-purple-500/40 bg-purple-500/10 p-4 shadow-[0_0_35px_rgba(155,55,255,0.25)] backdrop-blur">
              <div className="text-[10px] tracking-[0.35em] text-purple-100/70">Environment</div>
              <div className="mt-2 text-sm text-purple-50">Dystopian sector // Toxic neon fog</div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-[60%]">
          <CyberCatCanvas />
        </div>
      </div>
    </main>
  );
}
