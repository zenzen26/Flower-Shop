import { useEffect, useRef, useState } from "react";

const STATS = [
  ["20+", "Years of craft"],
  ["4,000+", "Arrangements"],
  ["98%", "Client satisfaction"],
  ["12", "Awards won"],
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  // =========================
  // TOAST HANDLER
  // =========================
  const handleAtelierClick = () => {
    setToast("Meet the Atelier");

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    // =========================
    // FADE IN
    // =========================
    gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });

    // =========================
    // COUNT UP (SAFE)
    // =========================
    const counters =
      sectionRef.current?.querySelectorAll<HTMLElement>(".count");

    if (counters && counters.length) {
      const runCount = () => {
        counters.forEach((el) => {
          const raw = el.dataset.value || "0";

          const target = Number(raw.replace(/[^0-9]/g, "")) || 0;
          const suffix = raw.replace(/[0-9,]/g, "");

          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent =
                Math.floor(obj.val).toLocaleString() + suffix;
            },
          });
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: runCount,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center">

      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row w-full">

        {/* LEFT */}
        <div className="lg:flex-[0_0_44%] py-[clamp(48px,7vw,96px)] px-[clamp(32px,5vw,68px)] flex flex-col justify-center">

          <p className="rv text-[14.5px] tracking-[6px] text-gold/65 uppercase mb-4.5">
            Our Philosophy
          </p>

          <h2 className="rv font-[Playfair_Display,Georgia,serif] text-[clamp(3rem,3.5vw,2.5rem)] text-cream leading-[1.2] mb-4.5">
            Flowers are not<br />decoration.<br />
            <em className="text-rose">They are language.</em>
          </h2>

          <div className="w-10 h-px bg-gold/45 mb-5.5" />

          <p className="rv text-cream/58 leading-[1.9] text-[1.2rem]">
            Founded in 2004, our atelier has served private celebrations,
            gallery openings, and intimate ceremonies alike.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 py-[clamp(48px,7vw,96px)] px-[clamp(32px,5vw,68px)] flex flex-col justify-center">

          {/* STATS */}
          <div className="rv grid grid-cols-2 gap-7 mb-8">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <p
                  className="count font-[Playfair_Display,Georgia,serif] text-[clamp(3rem,3vw,2.3rem)] text-cream leading-none"
                  data-value={n}
                >
                  0
                </p>
                <p className="text-[14.5px] tracking-[3px] text-cream/35 uppercase mt-1.5">
                  {l}
                </p>
              </div>
            ))}
          </div>

          <p className="rv text-cream/55 leading-[1.9] text-[1.2rem] mb-6.5">
            Every morning, before the city wakes, our florists walk the market.
          </p>

          <button
            onClick={handleAtelierClick}
            className="rv self-start py-3.5 px-11 bg-gold text-ink text-[11px] tracking-[4px] uppercase hover:bg-[#e0a600] transition"
          >
            Meet the Atelier
          </button>

        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[999] pointer-events-none">
          <div className="bg-black/85 text-white px-5 py-3 rounded-full text-sm shadow-lg animate-fadeIn">
            {toast} (demo web: button clicked!)
          </div>
        </div>
      )}

    </div>
  );
}