import React from 'react';
import { cn } from "@/lib/utils";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 999999,
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const baseButtonClasses = "h-8 w-8 flex items-center justify-center transition-colors";
  const disabledClasses = "text-gray-300 cursor-not-allowed";
  const enabledClasses = "text-gray-600 hover:bg-gray-50";

  return (
    <div className="inline-flex items-center rounded-full border bg-white">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className={cn(
          baseButtonClasses,
          "rounded-l-full",
          value <= min ? disabledClasses : enabledClasses
        )}
      >
        <span className="sr-only">Decrease</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || 0;
          if (newValue >= min && newValue <= max) {
            onChange(newValue);
          }
        }}
        className="w-12 h-8 text-center text-sm text-black bg-gray-50 border-x [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className={cn(
          baseButtonClasses,
          "rounded-r-full",
          value >= max ? disabledClasses : enabledClasses
        )}
      >
        <span className="sr-only">Increase</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}; 