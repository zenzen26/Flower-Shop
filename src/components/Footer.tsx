export function Footer() {
  return (
    <footer className="py-10 px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Left: Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-[Playfair_Display,Georgia,serif] text-[1.6rem] text-white mb-2">
              La Maison <em className="text-gold">des Fleurs</em>
            </h3>
            <p className="text-white/40 text-sm italic">
              “Bespoke floral artistry for life’s most meaningful moments.”
            </p>
          </div>

          {/* Right: Contact */}
          <div className="text-white/50 text-sm text-center md:text-right md:flex md:gap-6 md:items-center">
            <p>hello@fakeflowers.com</p>
            <p>+61 000 000 000</p>
            <p>12 Lorem Ipsum, Sydney, AU</p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-4 text-center md:text-left">
          <p className="text-xs text-white/20">
            © 2026 La Maison des Fleurs
          </p>
        </div>

      </div>
    </footer>
  );
}