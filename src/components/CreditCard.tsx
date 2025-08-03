"use client";

import { Share_Tech_Mono } from "next/font/google";
import { Eye, EyeOff } from 'lucide-react';
import { Tilt } from "react-tilt";
import Image from "next/image";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
});

interface CreditCardProps {
  cardNumber: string;
  fullNumber?: string;
  holderName: string;
  expiry: string;
  balance: number;
  showNumber: boolean;
  onToggleNumber: () => void;
  type: string;
}

export const CreditCard = ({
  cardNumber,
  fullNumber,
  holderName,
  expiry,
  balance,
  showNumber,
  onToggleNumber,
  type
}: CreditCardProps) => {
  return (
    <Tilt
      className={`${shareTechMono.className} w-full aspect-[1.586/1] max-w-[450px] bg-gradient-to-br from-[#1a1f2d] to-[#2d354d] rounded-2xl relative overflow-hidden group`}
      options={{
        max: 15,
        scale: 1.02,
        speed: 1000,
        glare: true,
        "max-glare": 0.3,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%, 100% 100%',
        }}
      />
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-shimmer" />
      
      {/* Card Content */}
      <div className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider">Available Balance</p>
            <p className="text-white text-lg sm:text-xl font-medium tracking-tight">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          {type === 'visa' ? (
            <div className="h-6 sm:h-8 relative">
              <Image 
                src="/assets/logocc.png" 
                alt="Card Logo"
                width={32}
                height={32}
                className="h-full w-auto object-contain"
              />
            </div>
          ) : (
            <div className="h-6 sm:h-8 w-10 sm:w-12 rounded bg-white/10 flex items-center justify-center">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 4h16v16H4z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Card Middle Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {/* EMV Chip */}
            <div className="relative w-[35px] sm:w-[45px]">
              <svg width="100%" height="100%" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/40">
                <rect x="1" y="1" width="43" height="33" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M1 12H44" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M1 23H44" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M33 1L33 34" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 1L12 34" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
            </div>
            
            {/* NFC Symbol */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white/40">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2zm0-8h2v6h-2z"/>
            </svg>
          </div>
          
          {/* Card Number */}
          <div className="flex items-center justify-between">
            <p className="text-lg sm:text-[22px] tracking-[0.2em] text-white font-mono leading-none">
              {showNumber ? (fullNumber || cardNumber.replace(/•/g, '1')) : cardNumber}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleNumber();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {showNumber ? (
                <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/80" />
              ) : (
                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/80" />
              )}
            </button>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/60 text-[8px] sm:text-[10px] uppercase tracking-wider mb-0.5">Card Holder</p>
            <p className="text-white text-[11px] sm:text-[13px] tracking-wider font-medium">{holderName}</p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-[8px] sm:text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
            <p className="text-white text-[11px] sm:text-[13px] tracking-wider font-medium">{expiry}</p>
          </div>
        </div>
      </div>
    </Tilt>
  );
};