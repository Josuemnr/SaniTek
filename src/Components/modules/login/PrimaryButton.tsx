import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  text: string;
  loadingText?: string;
}

export const PrimaryButton = ({ isLoading, text, loadingText, className, ...props }: Props) => {
  return (
    <button
      disabled={isLoading}
      className={`w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl h-14 font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className || ''}`}
      {...props}
    >
      {isLoading ? (loadingText || "Cargando...") : text}
    </button>
  );
};