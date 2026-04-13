import { useEffect } from 'react';
import type { Step } from '../types';

const STEPS: Step[] = [
  { n:"01", title:"Consultation", body:"A private conversation about your vision and occasion." },
  { n:"02", title:"Design", body:"Our florists propose a bespoke arrangement concept." },
  { n:"03", title:"Sourcing", body:"Stems hand-selected at dawn from trusted growers." },
  { n:"04", title:"Handcraft", body:"Each bloom placed with precision in our atelier." },
  { n:"05", title:"Delivery", body:"Delivered in signature packaging at your exact moment." },
];

export function Process() {
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center py-[clamp(56px,8vw,104px)] px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="rv text-center mb-13">
          <p className="text-[14.5px] tracking-[6px] text-crimson uppercase mb-3">The Craft</p>
          <h2 className="font-[Playfair_Display,Georgia,serif] text-[clamp(3rem,5vw,3rem)] font-normal text-ink">
            The Arrangement Process
          </h2>
          <div className="w-11 h-px bg-gold mt-4 mx-auto"/>
        </div>
        <div className="flex flex-col lg:flex-row gap-0">
          {STEPS.map((s, i) => (
            <div 
              key={i} 
              className="rv flex-1 px-[clamp(10px,2.5vw,28px)] text-center lg:border-l first:border-l-0 border-crimson/10 py-6 lg:py-0"
            >
              <p className="font-[Playfair_Display,Georgia,serif] text-[clamp(3rem,4vw,2.6rem)] text-crimson/50 font-normal leading-none mb-3">
                {s.n}
              </p>
              <p className="font-[Playfair_Display,Georgia,serif] text-[clamp(1.5rem,1.5vw,1.05rem)] text-ink mb-2">
                {s.title}
              </p>
              <p className="text-[1rem] text-black/60 leading-[1.8]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}