import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  accent?: string;
}

export function OrnateFrame({ children, accent = "#FFBC00" }: Props) {
  return (
    <div className="relative">
      <svg 
        viewBox="0 0 360 460" 
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
        preserveAspectRatio="none"
      >
        {/* Corner flourishes - elegant curved design */}
        {[[20,20,1,1],[340,20,-1,1],[20,440,1,-1],[340,440,-1,-1]].map(([cx,cy,sx,sy],i) => (
          <g key={i} transform={`translate(${cx},${cy}) scale(${sx},${sy})`}>
            {/* Main corner curve */}
            <path 
              d="M0,0 C-20,0 -35,-15 -35,-35 C-35,-55 -20,-70 0,-70" 
              fill="none" 
              stroke={accent} 
              strokeWidth="2"
              opacity="0.9"
            />
            {/* Inner accent curve */}
            <path 
              d="M0,0 C-12,0 -22,-10 -22,-22 C-22,-34 -12,-44 0,-44" 
              fill="none" 
              stroke={accent} 
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Decorative dot at curve end */}
            <circle cx="0" cy="-35" r="3" fill={accent} opacity="0.8"/>
            {/* Small line extensions */}
            <path d="M0,0 L25,0" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7"/>
            <path d="M0,0 L0,25" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7"/>
            {/* Tiny dots at line ends */}
            <circle cx="25" cy="0" r="1.5" fill={accent}/>
            <circle cx="0" cy="25" r="1.5" fill={accent}/>
          </g>
        ))}
        
        {/* Top center decoration */}
        <g transform="translate(180,15)">
          <path d="M-20,0 Q0,-8 20,0" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6"/>
          <circle cx="0" cy="-4" r="2.5" fill={accent} opacity="0.7"/>
          <path d="M-12,0 L-12,12" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4"/>
          <path d="M12,0 L12,12" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4"/>
        </g>
        
        {/* Bottom center decoration */}
        <g transform="translate(180,445)">
          <path d="M-20,0 Q0,8 20,0" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6"/>
          <circle cx="0" cy="4" r="2.5" fill={accent} opacity="0.7"/>
          <path d="M-12,0 L-12,-12" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4"/>
          <path d="M12,0 L12,-12" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4"/>
        </g>
        
        {/* Subtle inner frame line */}
        <rect x="35" y="35" width="290" height="390" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.25" rx="2"/>
      </svg>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}