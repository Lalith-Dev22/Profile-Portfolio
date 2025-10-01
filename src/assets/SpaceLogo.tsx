import React from 'react';

interface SpaceLogoProps {
  className?: string;
  size?: number;
}

const SpaceLogo: React.FC<SpaceLogoProps> = ({ 
  className = '',
  size = 40 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring representing the cosmos */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="url(#cosmicGradient)" 
        strokeWidth="2"
        fill="none"
      />
      
      {/* Planet or celestial body */}
      <circle 
        cx="50" 
        cy="50" 
        r="25" 
        fill="url(#planetGradient)"
      />
      
      {/* Crater details on the planet */}
      <circle cx="40" cy="45" r="3" fill="rgba(0, 0, 0, 0.2)" />
      <circle cx="60" cy="55" r="2" fill="rgba(0, 0, 0, 0.2)" />
      <circle cx="55" cy="40" r="2.5" fill="rgba(0, 0, 0, 0.2)" />
      
      {/* Orbital ring */}
      <ellipse 
        cx="50" 
        cy="50" 
        rx="35" 
        ry="15" 
        stroke="url(#ringGradient)" 
        strokeWidth="1"
        fill="none"
        strokeDasharray="3,3"
      />
      
      {/* Star details */}
      <circle cx="25" cy="25" r="1.5" fill="#FFFFFF" />
      <circle cx="75" cy="20" r="1" fill="#FFFFFF" />
      <circle cx="80" cy="70" r="1.2" fill="#FFFFFF" />
      <circle cx="20" cy="75" r="0.8" fill="#FFFFFF" />
      
      {/* Glowing effect */}
      <circle 
        cx="50" 
        cy="50" 
        r="25" 
        fill="none" 
        stroke="url(#glowGradient)" 
        strokeWidth="3"
        opacity="0.5"
      />
      
      <defs>
        {/* Gradient for the cosmic ring */}
        <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        
        {/* Gradient for the planet */}
        <radialGradient id="planetGradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </radialGradient>
        
        {/* Gradient for the orbital ring */}
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        
        {/* Gradient for the glow effect */}
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default SpaceLogo;