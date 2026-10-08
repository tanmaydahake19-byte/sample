import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  fill?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, fill = '#192837' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="256" height="256" rx="48" fill={fill} />
      {/* Geometric Water Droplet & SCADA Pipeline Monogram Geometry */}
      <path
        d="M128 44C128 44 72 112 72 152C72 182.928 97.072 208 128 208C158.928 208 184 182.928 184 152C184 112 128 44 128 44Z"
        fill="#7342E2"
      />
      <path
        d="M128 80C128 80 94 124 94 150C94 168.778 109.222 184 128 184C146.778 184 162 168.778 162 150C162 124 128 80 128 80Z"
        fill="#FFFFFF"
        fillOpacity="0.9"
      />
      <circle cx="128" cy="150" r="14" fill="#192837" />
    </svg>
  );
};
