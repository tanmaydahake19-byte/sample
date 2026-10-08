import React from 'react';
import './GlassSurface.css';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 'auto',
  height = 'auto',
  borderRadius = 24,
  brightness = 100,
  opacity = 1,
  blur = 14,
  backgroundOpacity = 0.18,
  saturation = 1.3,
  className = '',
  style = {},
  onClick
}) => {
  const containerStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: `${borderRadius}px`,
    opacity,
    backdropFilter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturation * 100}%)`,
    WebkitBackdropFilter: `blur(${blur}px) brightness(${brightness}%) saturate(${saturation * 100}%)`,
    backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
    border: '1px solid rgba(25, 40, 55, 0.12)',
    ...style,
  };

  return (
    <div
      className={`glass-surface-container ${className}`}
      style={containerStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassSurface;
