const ITEMS = ["Handcrafted Bouquets","·","Est. 2004","·","Same-Day Delivery","·","Sustainably Sourced","·","Award-Winning Atelier","·","Bespoke Arrangements","·"];

export function Marquee() {
  return (
    <div className="w-full overflow-hidden border-y border-gold/10 py-4">
      <div className="animate-[tick_34s_linear_infinite] flex whitespace-nowrap">
        {[0,1].map(k => (
          <span key={k} className="inline-flex">
            {ITEMS.map((t, j) => (
              <span 
                key={j} 
                className={`px-5.5 text-[14.5px] tracking-[4px] uppercase ${t === "·" ? 'text-gold' : 'text-white/50'}`}
              >
                {t}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}