"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Eye, EyeOff, Info } from "lucide-react";

export interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'url';
  isRequired?: boolean;
  isLoading?: boolean;
  validationStatus?: 'idle' | 'checking' | 'valid' | 'invalid';
  validationMessage?: string;
  helpText?: string;
  autoComplete?: string;
  maxLength?: number;
  pattern?: string;
  debounceMs?: number;
  showCharCount?: boolean;
  className?: string;
  suffix?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  isRequired = false,
  isLoading = false,
  validationStatus = 'idle',
  validationMessage,
  helpText,
  autoComplete,
  maxLength,
  pattern,
  debounceMs = 0,
  showCharCount = false,
  className = '',
  suffix,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Debounced value for validation
  useEffect(() => {
    if (debounceMs > 0) {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, debounceMs);

      return () => clearTimeout(timer);
    } else {
      setDebouncedValue(value);
    }
  }, [value, debounceMs]);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getValidationIcon = () => {
    switch (validationStatus) {
      case 'checking':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-400" />;
      case 'valid':
        return <CheckCircle2 className="w-4 h-4 text-white" />;
      case 'invalid':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getValidationColor = () => {
    switch (validationStatus) {
      case 'checking':
        return 'border-blue-400/50 ring-blue-400/20';
      case 'valid':
        return 'border-white/50 ring-white/20';
      case 'invalid':
        return 'border-red-400/50 ring-red-400/20';
      default:
        return isFocused 
          ? 'border-blue-400/50 ring-blue-400/20' 
          : 'border-white/20';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <motion.label
        htmlFor={label}
        className="block text-sm font-medium text-zinc-300"
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          color: isFocused ? '#ffffff' : '#d4d4d8'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {isRequired && (
          <span className="text-red-400 ml-1">*</span>
        )}
      </motion.label>

      {/* Help text */}
      {helpText && (
        <div className="flex items-start gap-2 text-xs text-zinc-400">
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{helpText}</span>
        </div>
      )}

      {/* Input Container */}
      <div className="relative">
        <motion.div
          className={`
            flex items-center bg-white/10 backdrop-blur-sm rounded-lg border 
            transition-all duration-200 overflow-hidden
            ${getValidationColor()}
            ${isFocused ? 'ring-2' : ''}
            hover:border-white/30 hover:bg-white/15
          `}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <input
            id={label}
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            maxLength={maxLength}
            pattern={pattern}
            required={isRequired}
            disabled={isLoading}
            className="
              flex-1 h-11 px-4 bg-transparent outline-none text-white 
              placeholder:text-white/50 disabled:opacity-50 disabled:cursor-not-allowed
            "
          />

          {/* Suffix */}
          {suffix && (
            <div className="px-4 h-full flex items-center bg-white/5 backdrop-blur-sm border-l border-white/20 text-sm text-white/70 select-none">
              {suffix}
            </div>
          )}

          {/* Password visibility toggle */}
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 h-full flex items-center text-white/60 hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Validation icon */}
          {validationStatus !== 'idle' && (
            <div className="px-3 h-full flex items-center">
              {getValidationIcon()}
            </div>
          )}
        </motion.div>

        {/* Character count */}
        {showCharCount && maxLength && (
          <div className="absolute top-full right-0 mt-1">
            <span className={`text-xs ${
              value.length > maxLength * 0.8 ? 'text-amber-400' : 'text-zinc-500'
            }`}>
              {value.length}/{maxLength}
            </span>
          </div>
        )}
      </div>

      {/* Validation message */}
      <AnimatePresence mode="wait">
        {validationMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-xs flex items-center gap-2 ${
              validationStatus === 'valid' ? 'text-white' :
              validationStatus === 'invalid' ? 'text-red-400' :
              validationStatus === 'checking' ? 'text-blue-400' :
              'text-zinc-400'
            }`}
          >
            {getValidationIcon()}
            <span>{validationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
        >
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        </motion.div>
      )}
    </div>
  );
};

export interface TextAreaFieldProps extends Omit<FormFieldProps, 'type'> {
  rows?: number;
  resize?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isRequired = false,
  rows = 3,
  resize = false,
  maxLength,
  showCharCount = false,
  className = '',
  helpText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <motion.label
        htmlFor={label}
        className="block text-sm font-medium text-zinc-300"
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          color: isFocused ? '#ffffff' : '#d4d4d8'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {isRequired && (
          <span className="text-red-400 ml-1">*</span>
        )}
      </motion.label>

      {/* Help text */}
      {helpText && (
        <div className="flex items-start gap-2 text-xs text-zinc-400">
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{helpText}</span>
        </div>
      )}

      {/* Textarea Container */}
      <div className="relative">
        <motion.textarea
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          required={isRequired}
          className={`
            w-full p-3 text-sm border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 
            bg-white/10 backdrop-blur-sm text-white placeholder-white/50 
            transition-all duration-200 border-white/20
            hover:border-white/30 hover:bg-white/15
            ${resize ? 'resize-y' : 'resize-none'}
          `}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        />

        {/* Character count */}
        {showCharCount && maxLength && (
          <div className="absolute bottom-3 right-3">
            <span className={`text-xs ${
              value.length > maxLength * 0.8 ? 'text-amber-400' : 'text-zinc-500'
            }`}>
              {value.length}/{maxLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export { FormField, TextAreaField };
export default FormField; 