import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  icon,
  className = '',
  disabled,
  ...props 
}) => {
  // Neo-brutalism base: Thick border, hard shadow, translate on active
  const baseStyles = "inline-flex items-center justify-center border-2 border-black rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-[2px] disabled:translate-y-[2px]";
  
  const variants = {
    // Primary: Indigo/Purple pop
    primary: "bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#7c3aed]",
    // Secondary: Pink pop
    secondary: "bg-[#EC4899] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#db2777]",
    // Outline: White with black border
    outline: "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50",
    // Ghost: No shadow initially, adds border on hover
    ghost: "border-transparent bg-transparent text-black hover:bg-yellow-200 hover:border-black"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;