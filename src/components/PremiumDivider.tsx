export default function PremiumDivider() {
  return (
    <div
      className="relative h-14 flex items-center justify-center overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Full-width faint base line */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Centered ornament cluster */}
      <div className="relative z-10 flex items-center gap-2.5">
        {/* Left wing */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/55" />
        <div className="w-1.5 h-1.5 rotate-45 border border-gold/50 bg-gold/15" />
        <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-gold/60" />

        {/* Center jewel */}
        <div className="relative flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full border border-gold/70 bg-gold/20 shadow-[0_0_16px_rgba(201,169,110,0.45)]" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-gold/70 shadow-[0_0_8px_rgba(201,169,110,0.8)]" />
        </div>

        {/* Right wing */}
        <div className="w-8 h-px bg-gradient-to-l from-gold/40 to-gold/60" />
        <div className="w-1.5 h-1.5 rotate-45 border border-gold/50 bg-gold/15" />
        <div className="w-24 h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/55" />
      </div>
    </div>
  );
}
