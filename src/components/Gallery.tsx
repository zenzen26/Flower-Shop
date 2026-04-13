import { useState, useEffect, useRef } from "react";
import { OrnateFrame } from "./OrnateFrame";
import { useGallery } from "../hooks/useGallery";

const CATS = ["Featured", "Wedding", "Seasonal", "Occasions", "Sympathy"];

export function Gallery() {
  const [filter, setFilter] = useState("Featured");
  const [toast, setToast] = useState(false);

  const { items, loading } = useGallery();
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    filter === "Featured"
      ? items.filter((g) => g.featured)
      : items.filter((g) => g.category === filter);

  // ✅ SIMPLE FADE-IN (NO ScrollTrigger = NO SCROLL BUGS)
  useEffect(() => {
    if (!window.gsap) return;

    const { gsap } = window;

    const timeout = setTimeout(() => {
      const elements =
        gridRef.current?.querySelectorAll<HTMLElement>(".gc") || [];

      elements.forEach((el, i) => {
        gsap.set(el, {
          opacity: 0,
          y: 12,
          willChange: "transform, opacity",
        });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          delay: (i % 4) * 0.04,
        });
      });
    }, 20);

    return () => clearTimeout(timeout);
  }, [filteredItems]);

  const handleClick = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-crimson/60">Loading collection...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center py-16 px-[clamp(16px,4vw,48px)]">

      <div className="max-w-[1400px] mx-auto w-full">

        {/* HEADER */}
        <div className="text-center mb-8">
          <p className="text-[14.5px] tracking-[6px] text-crimson uppercase mb-3">
            The Collection
          </p>
          <h2 className="font-[Playfair_Display,Georgia,serif] text-[clamp(2rem,5vw,3rem)] text-ink">
            Gallery & Portfolio
          </h2>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`py-2 px-[18px] text-[11px] tracking-[3px] uppercase border transition ${
                filter === c
                  ? "bg-crimson text-white border-crimson"
                  : "bg-transparent text-black/40 border-black/10 hover:border-black/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID (NO SCROLL CONTAINER) */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gc cursor-pointer group"
              onClick={handleClick}
            >
              {/* FIXED HEIGHT VIA ASPECT RATIO */}
              <div className="relative w-full aspect-[303/404] overflow-hidden">

                <OrnateFrame>
                  <div className="relative w-full h-full bg-ink overflow-hidden">

                    <img
                      src={item.image_url}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />

                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-crimson/80 backdrop-blur-[8px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-5">
                      <div>
                        <p className="text-[14px] tracking-[4px] text-gold uppercase mb-2">
                          View Details
                        </p>
                        <p className="text-white/70 text-sm italic">
                          {item.short_desc.slice(0, 72)}…
                        </p>
                      </div>
                    </div>

                  </div>
                </OrnateFrame>
              </div>

              {/* INFO */}
              <div className="py-2 flex justify-between border-b border-black/10">
                <span className="font-[Playfair_Display,Georgia,serif] text-ink">
                  {item.name}
                </span>
                <span className="text-crimson text-sm">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* TOAST (BOTTOM RIGHT) */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-[999] pointer-events-none">
            <div className="bg-ink/85 text-white px-5 py-3 rounded-full text-sm shadow-lg animate-fadeIn">
              Demo web: gallery button clicked!
            </div>
          </div>
        )}

      </div>
    </section>
  );
}