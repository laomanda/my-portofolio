import React from 'react';

const ElectricBorder = ({
  children,
  color = '#5227FF',
  borderRadius = 24,
  thickness = 2,
  className,
  style
}) => {
  return (
    <div
      className={`relative group ${className || ''}`}
      style={{
        padding: thickness,
        borderRadius: borderRadius,
        // No isolation needed anymore
        ...style
      }}
    >
      {/* 1. Static Gradient Border (Clean, minimal) */}
      <div
        className="absolute inset-0 z-0 bg-gray-200 dark:bg-white/10"
        style={{
          borderRadius: borderRadius,
          padding: thickness,
          // Subtle static gradient fallback
          background: `linear-gradient(135deg, ${color}40, ${color}10)`, 
        }}
      />

      {/* Content Container */}
      <div
        className="relative h-full w-full bg-light-bg dark:bg-dark-bg transition-colors duration-300 overflow-hidden"
        style={{ borderRadius: borderRadius - thickness }}
      >
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
