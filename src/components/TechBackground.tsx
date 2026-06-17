"use client";

import React from "react";

export default function TechBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Subtle global tech grid line pattern */}
      <div className="absolute inset-0 tech-grid-overlay opacity-40" />

      {/* Faint rotating blueprint concentric tech circle (Left Side) */}
      <div className="absolute left-[-180px] top-[12%] w-[450px] h-[450px] opacity-[0.06] dark:opacity-[0.08] text-gold animate-spin-slow">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="15 8" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.2" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Faint reverse-rotating blueprint concentric tech circle (Right Side) */}
      <div className="absolute right-[-180px] top-[45%] w-[500px] h-[500px] opacity-[0.05] dark:opacity-[0.07] text-gold animate-spin-slow-reverse">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="10 12" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
        </svg>
      </div>

      {/* Another blueprint circle lower down on the left */}
      <div className="absolute left-[-150px] top-[75%] w-[400px] h-[400px] opacity-[0.04] dark:opacity-[0.06] text-gold animate-spin-slow">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="6 3" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Subtle tech intersection crosshairs (+) placed strategically to fill empty whitespace */}
      <div className="absolute top-[8%] left-[10%] text-gold/20 font-mono text-[10px] select-none">+ 01.SYS</div>
      <div className="absolute top-[28%] right-[15%] text-gold/15 font-mono text-[10px] select-none">+ SCALE.INIT</div>
      <div className="absolute top-[52%] left-[8%] text-gold/15 font-mono text-[10px] select-none">+ ENG.04</div>
      <div className="absolute top-[72%] right-[12%] text-gold/20 font-mono text-[10px] select-none">+ GTM.FLOW</div>
      <div className="absolute top-[90%] left-[15%] text-gold/15 font-mono text-[10px] select-none">+ EGA.V2</div>

      {/* Decorative vertical running coordinates */}
      <div className="absolute left-[3%] top-[35%] h-[150px] w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent flex items-center justify-center">
        <span className="text-[8px] font-mono text-gold/20 rotate-90 tracking-widest translate-y-12">SYSTEMS_ACTIVE</span>
      </div>
      <div className="absolute right-[3%] top-[65%] h-[150px] w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent flex items-center justify-center">
        <span className="text-[8px] font-mono text-gold/20 rotate-90 tracking-widest translate-y-12">EXECUTION_CORE</span>
      </div>
    </div>
  );
}
