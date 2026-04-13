import { useState, useEffect } from 'react';
import type { FormData } from '../types';

const STYLES = ["Classic","Wild & Natural","Minimalist","Grand & Dramatic","Seasonal"];
const EVENTS = ["Wedding","Anniversary","Corporate","Sympathy","Birthday","Personal Gift"];

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({ 
    name: "", 
    email: "", 
    event: "", 
    date: "", 
    style: "", 
    notes: "" 
  });

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

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3400);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="booking" className="min-h-screen flex items-center py-[clamp(56px,8vw,104px)] px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[820px] mx-auto w-full">
        <div className="rv text-center mb-12">
          <p className="text-[14.5px] tracking-[6px] text-gold/60 uppercase mb-3">Bespoke Service</p>
          <h2 className="font-[Playfair_Display,Georgia,serif] text-[clamp(2rem,5vw,3rem)] font-normal text-cream mb-3.5">
            Request a Consultation
          </h2>
          <p className="text-cream/38 text-base leading-[1.8]">
            Every extraordinary arrangement begins with a conversation.
          </p>
          <div className="w-10 h-px bg-gold/35 mt-4 mx-auto"/>
        </div>

        <div className="rv grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div>
            <label className="text-[14.5px] tracking-[3px] text-cream/55 uppercase block mb-1.5">Full Name</label>
            <input 
              placeholder="Marguerite Dupont" 
              value={form.name} 
              onChange={e => updateField('name', e.target.value)}
              className="w-full bg-white/90 border border-crimson/14 text-ink py-3 px-4 font-[Cormorant_Garamond,Georgia,serif] text-base outline-none focus:border-crimson transition-colors"
            />
          </div>
          <div>
            <label className="text-[14.5px] tracking-[3px] text-cream/55 uppercase block mb-1.5">Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={form.email} 
              onChange={e => updateField('email', e.target.value)}
              className="w-full bg-white/90 border border-crimson/14 text-ink py-3 px-4 font-[Cormorant_Garamond,Georgia,serif] text-base outline-none focus:border-crimson transition-colors"
            />
          </div>
          <div>
            <label className="text-[14.5px] tracking-[3px] text-cream/55 uppercase block mb-1.5">Occasion</label>
            <select 
              value={form.event} 
              onChange={e => updateField('event', e.target.value)}
              className="w-full bg-white/90 border border-crimson/14 text-ink py-3 px-4 font-[Cormorant_Garamond,Georgia,serif] text-base outline-none focus:border-crimson transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23620000' stroke-width='1.2' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
                paddingRight: '36px'
              }}
            >
              <option value="">Select…</option>
              {EVENTS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[14.5px] tracking-[3px] text-cream/55 uppercase block mb-1.5">Preferred Date</label>
            <input 
              type="date" 
              value={form.date} 
              onChange={e => updateField('date', e.target.value)}
              className="w-full bg-white/90 border border-crimson/14 text-ink py-3 px-4 font-[Cormorant_Garamond,Georgia,serif] text-base outline-none focus:border-crimson transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[14.5px] tracking-[3px] text-cream/55 uppercase block mb-2.5">Style Preference</label>
            <div className="flex gap-2.5 flex-wrap">
              {STYLES.map(s => (
                <label key={s} className="flex items-center gap-1.5 cursor-pointer text-cream/45 text-[0.95rem]">
                  <input 
                    type="radio" 
                    name="style" 
                    value={s} 
                    checked={form.style === s} 
                    onChange={e => updateField('style', e.target.value)}
                    className="accent-crimson"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-[14.5px] tracking-[3px] text-cream/55 uppercase block mb-1.5">Special Notes</label>
            <textarea 
              rows={3} 
              placeholder="Colour preferences, inspirations, or any special requests…" 
              value={form.notes} 
              onChange={e => updateField('notes', e.target.value)}
              className="w-full bg-white/90 border border-crimson/14 text-ink py-3 px-4 font-[Cormorant_Garamond,Georgia,serif] text-base outline-none focus:border-crimson transition-colors resize-none"
            />
          </div>
          <div className="md:col-span-2 text-center mt-1.5">
            <button 
              onClick={handleSubmit}
              className="py-3.5 px-11 bg-gold border-none text-ink font-[Cormorant_Garamond,Georgia,serif] text-[11px] tracking-[4px] uppercase cursor-pointer hover:bg-[#e0a600] transition-colors"
            >
              {submitted ? "✓ Enquiry Received" : "Submit Enquiry"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}