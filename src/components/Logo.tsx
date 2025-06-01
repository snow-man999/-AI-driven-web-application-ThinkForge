import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true }) => {
  // Logo size variants
  const sizeMapping = {
    sm: { img: 'w-8 h-8', text: 'text-lg' },
    md: { img: 'w-10 h-10', text: 'text-xl' },
    lg: { img: 'w-16 h-16', text: 'text-2xl' },
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img 
        src="/assets/lightbulb-logo.svg" 
        alt="ThinkForge Logo" 
        className={`${sizeMapping[size].img} object-contain`} 
      />
      {showText && (
        <span className={`ml-2 font-bold ${sizeMapping[size].text} text-white`}>
          ThinkForge
        </span>
      )}
    </div>
  );
};

export default Logo;
