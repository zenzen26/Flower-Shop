import { useState, useEffect } from 'react';

const QUOTES = [
  "Where beauty blooms, silence speaks.",
  "Every petal, a quiet poem.",
  "Flowers are the earth laughing.",
];

export function Hero() {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % QUOTES.length), 4200);
    return () => clearInterval(t);
  }, []);

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)] z-[1] pointer-events-none" />

      {/* Hero text */}
      <div className="relative z-[2] text-center px-5 w-full max-w-[680px]">
        <p className="text-[14.5px] tracking-[7px] text-gold/70 uppercase mb-5.5">
          Atelier Floral · Est. 2004
        </p>
        <h1 className="font-[Playfair_Display,Georgia,serif] text-[clamp(3.4rem,10vw,6.8rem)] font-normal leading-[1.02] text-white mb-6.5 tracking-tight">
          La Maison<br/><em className="text-gold">des Fleurs</em>
        </h1>

        {/* Quote */}
        <div className="h-10 flex items-center justify-center mb-8.5 overflow-hidden">
          <p 
            key={quoteIdx} 
            className="italic text-[clamp(0.95rem,2vw,1.2rem)] text-white/55 tracking-wide animate-[qIn_0.65s_ease]"
          >
            "{QUOTES[quoteIdx]}"
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <button 
            onClick={scrollToGallery}
            className="py-3.5 px-11 bg-gold border-none text-ink font-[Cormorant_Garamond,Georgia,serif] text-[11px] tracking-[4px] uppercase cursor-pointer hover:bg-[#e0a600] transition-colors"
          >
            Explore Collection
          </button>
          <button 
            onClick={scrollToBooking}
            className="py-3.5 px-8 bg-transparent border border-white/28 text-white/70 font-[Cormorant_Garamond,Georgia,serif] text-[11px] tracking-[4px] uppercase cursor-pointer hover:bg-white/8 transition-colors"
          >
            Book a Consultation
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6.5 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1.5">
        <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"/>
        <p className="text-[8px] tracking-[5px] text-gold/45 uppercase">Scroll</p>
      </div>
    </div>
  );
}