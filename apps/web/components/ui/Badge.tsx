import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'blue' | 'navy';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'teal' }) => {
  const styles = {
    teal: "bg-mavora-teal/15 text-teal-800 border-mavora-teal/30",
    blue: "bg-mavora-blue/10 text-mavora-blue border-mavora-blue/20",
    navy: "bg-mavora-navy/10 text-mavora-navy border-mavora-navy/20",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${styles[variant]}`}>
      {children}
    </span>
  );
};