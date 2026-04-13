import { useEffect, useRef } from 'react';

export function StickyVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();
  const smoothScrollPercentRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const duration = video.duration;
      
      const animate = () => {
        // Calculate scroll percent based on total page scrollable height
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        
        // Smooth easing (0.1 = smooth, 0.3 = more responsive)
        smoothScrollPercentRef.current += (currentScrollPercent - smoothScrollPercentRef.current) * 0.15;
        
        // Update video time
        if (video.duration) {
          const targetTime = smoothScrollPercentRef.current * duration;
          // Only update if difference is significant (prevents jitter)
          if (Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
          }
        }
        
        rafRef.current = requestAnimationFrame(animate);
      };
      
      rafRef.current = requestAnimationFrame(animate);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Force load if already cached
    if (video.readyState >= 2) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="./assets/flower.mp4"
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover -z-10"
      style={{ 
        objectPosition: 'center center',
        pointerEvents: 'none'
      }}
    />
  );
}