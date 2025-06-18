import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'gradient';
}

export function Card({ children, variant = 'default', className = '', ...props }: CardProps) {
  const variants = {
    default: 'bg-surface',
    hover: 'bg-surface hover:bg-surface-light/50',
    gradient: 'bg-gradient-to-br from-surface to-surface-light'
  };

  return (
    <div
      className={`card rounded-lg p-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
} 