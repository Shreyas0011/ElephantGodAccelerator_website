"use client";

import React from "react";

interface SectionBackgroundProps {
  seed?: string;
  dark?: boolean;
  density?: "low" | "medium" | "high";
}

export default function SectionBackground({
  seed = "section",
  dark = false,
  density = "medium",
}: SectionBackgroundProps) {
  // Color tokens
  // Muted gold-bronze for light mode, soft champagne for dark mode
  const strokeColor = dark ? "rgba(201, 169, 110, 0.14)" : "rgba(162, 128, 69, 0.18)";
  const dotColor    = dark ? "rgba(201, 169, 110, 0.12)" : "rgba(162, 128, 69, 0.14)";
  const glowColor   = dark ? "rgba(201, 169, 110, 0.03)" : "rgba(201, 169, 110, 0.04)";

  // We define exactly 3 elegant, curated floating elements per section instead of chaotic random shapes.
  // Each has a clean, neat technical blueprint structure.
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* ── Very clean, faint dot-grid (highly structured, not messy) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* ── Slow-floating Technical Element 1 (Top Left) ── */}
      <div
        className="absolute left-[5%] top-[12%] w-48 h-48 animate-float hidden md:block"
        style={{ color: strokeColor }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Outer compass/technical dial */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {/* Center ticks */}
          <line x1="50" y1="2" x2="50" y2="10" stroke="currentColor" strokeWidth="0.6" />
          <line x1="50" y1="90" x2="50" y2="98" stroke="currentColor" strokeWidth="0.6" />
          <line x1="2" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="0.6" />
          <line x1="90" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.6" />
          {/* Small label inside */}
          <text x="50" y="53" textAnchor="middle" fontSize="3.5" fontFamily="monospace" fill="currentColor" letterSpacing="1">
            EGA.REF-01
          </text>
        </svg>
      </div>

      {/* ── Slow-floating Technical Element 2 (Bottom Right) ── */}
      <div
        className="absolute right-[6%] bottom-[15%] w-56 h-56 animate-float-delayed hidden md:block"
        style={{ color: strokeColor }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Radar target structure */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="6 6" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Diagonal target crosslines */}
          <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
          <line x1="15" y1="85" x2="85" y2="15" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
          {/* Center point */}
          <circle cx="50" cy="50" r="2" fill="currentColor" />
          <text x="50" y="63" textAnchor="middle" fontSize="3.5" fontFamily="monospace" fill="currentColor" letterSpacing="1">
            SYS.GTM_V4
          </text>
        </svg>
      </div>

      {/* ── Slow-floating Technical Element 3 (Mid Left / Right depending on seed) ── */}
      <div
        className={`absolute ${
          seed.length % 2 === 0 ? "right-[4%] top-[40%]" : "left-[4%] top-[45%]"
        } w-40 h-40 animate-float hidden lg:block`}
        style={{ color: strokeColor, animationDelay: "1s" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Concentric precision rings */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 5" />
          {/* Bracket frame corners */}
          <path d="M 20,35 L 20,20 L 35,20" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 80,35 L 80,20 L 65,20" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 20,65 L 20,80 L 35,80" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 80,65 L 80,80 L 65,80" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <text x="50" y="52" textAnchor="middle" fontSize="3.5" fontFamily="monospace" fill="currentColor" letterSpacing="0.8">
            FLOW.MATRIX
          </text>
        </svg>
      </div>

      {/* ── Subtle architectural line accent at top/bottom border ── */}
      <div
        className="absolute top-0 left-[8%] right-[8%] h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${strokeColor}, transparent)` }}
      />
      <div
        className="absolute bottom-0 left-[15%] right-[15%] h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${strokeColor}, transparent)` }}
      />

      {/* ── Soft, elegant ambient background glow ── */}
      <div
        className="absolute rounded-full"
        style={{
          top: "30%",
          left: seed.length % 2 === 0 ? "10%" : "60%",
          width: "350px",
          height: "350px",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
