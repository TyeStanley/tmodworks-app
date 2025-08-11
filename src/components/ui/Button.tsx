import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'link' | 'base300';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  tabIndex?: number;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  tabIndex,
}: ButtonProps) {
  const baseClasses = 'btn font-medium transition-all duration-200';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost hover:bg-base-200',
    outline: 'btn-outline',
    link: 'btn-link',
    base300: 'btn-base-300',
  };

  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const loadingClasses = loading ? 'loading' : '';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    loadingClasses,
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // If href is provided, render as link
  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} tabIndex={disabled ? -1 : 0}>
        {loading && <span className="loading loading-spinner loading-sm"></span>}
        {children}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      tabIndex={disabled ? -1 : (tabIndex ?? 0)}
    >
      {loading && <span className="loading loading-spinner loading-sm"></span>}
      {children}
    </button>
  );
}
