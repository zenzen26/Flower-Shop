import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Process } from './components/Process';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
// import { Modal } from './components/Modal';
import { StickyVideo } from './components/StickyVideo';
import type { GalleryItem } from './types';

function loadScript(src: string): Promise<void> {
  return new Promise((res) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => res();
    document.head.appendChild(s);
  });
}

function App() {
  // const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js")
    ]).then(() => setReady(true));
  }, []);

  if (!ready) {
    return <div className="h-screen bg-crimson flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        
        @keyframes mIn { from{opacity:0} to{opacity:1} }
        @keyframes mUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>
      
      {/* Fixed video background - stays in place, scrubs on scroll */}
      <StickyVideo />
      
      {/* Content scrolls over the video */}
      <div className="relative z-10">
        {/* Hero - full vh */}
        <section className="h-screen bg-crimson/50 backdrop-blur-[5px]">
          <Hero />
        </section>
        
        {/* Marquee - original height (not full vh) */}
        <div className="bg-forest backdrop-blur-[5px]">
          <Marquee />
        </div>
        
        {/* Gallery - full vh */}
        <section className="min-h-screen bg-cream/70 backdrop-blur-[5px]">
          <Gallery />
        </section>
        
        {/* About - full vh */}
        <section className="min-h-screen bg-forest/50 backdrop-blur-[5px]">
          <About />
        </section>
        
        {/* Process - full vh */}
        <section className="min-h-screen bg-cream/70 backdrop-blur-[5px]">
          <Process />
        </section>
        
        {/* Booking - full vh */}
        <section className="min-h-screen bg-ink/50 backdrop-blur-[5px]">
          <Booking />
        </section>
        
        {/* Footer - original height (not full vh) */}
        <div className="bg-crimson backdrop-blur-[5px]">
          <Footer />
        </div>
      </div>
      
      {/* <Modal item={modalItem} onClose={() => setModalItem(null)} /> */}
    </>
  );
}

export default App;