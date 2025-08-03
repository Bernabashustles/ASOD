"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { verifyEmail } from "@/lib/auth-client";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  KeyRound,
  Mail,
  Smartphone
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type VerificationMethod = 'email' | 'sms' | 'authenticator';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('email');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Get verification method and user info from URL params
  useEffect(() => {
    const method = searchParams.get('method') as VerificationMethod;
    const emailParam = searchParams.get('email');
    const phoneParam = searchParams.get('phone');
    const token = searchParams.get('token');

    if (method && ['email', 'sms', 'authenticator'].includes(method)) {
      setVerificationMethod(method);
    }

    if (emailParam) {
      setEmail(emailParam);
    }

    if (phoneParam) {
      setPhoneNumber(phoneParam);
    }

    // If we have a token, automatically verify
    if (token && verificationMethod === 'email') {
      handleSubmit();
    }

    // Start resend timer on mount
    setResendTimer(60);
  }, [searchParams]);

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Auto-submit when all fields are filled
  useEffect(() => {
    const otpValue = otp.join('');
    if (otpValue.length === 6 && !isVerifying) {
      handleSubmit();
    }
  }, [otp, isVerifying]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(""); // Clear error when user types

      // Move to next input if value is entered
      if (value !== "" && index < 5) {
        refs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      refs[index - 1].current?.focus();
    }

    // Handle paste
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    // Only process if it's 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      refs[5].current?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      let result;

      if (verificationMethod === 'email') {
        // Email verification - using the token from URL
        const token = searchParams.get('token');
        if (token) {
          // Direct email verification with token from URL
          result = await verifyEmail({
            query: { token }
          });
        } else {
          // For OTP-based verification, we need to handle this differently
          // better-auth's verifyEmail expects a token, not an OTP code
          setError("Email verification requires a valid token from your email");
          return;
        }
      } else if (verificationMethod === 'sms') {
        // Phone verification - better-auth doesn't have built-in SMS verification
        // This would need to be implemented with a third-party SMS service
        setError("SMS verification requires additional setup with an SMS provider");
        return;
      } else {
        setError("Authenticator verification not supported yet");
        return;
      }

      if (result.error) {
        setError("Invalid verification code. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        refs[0].current?.focus();
        return;
      }

      if (result.data) {
        setSuccess(true);
        toast.success("Verification successful!");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setError(error.message || "Verification failed. Please try again.");
      toast.error("Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      let result;

      if (verificationMethod === 'email' && email) {
        // Resend email verification - better-auth handles this through the sign-up process
        // For resending, user should go back to signup or contact support
        setError("To resend verification email, please sign up again or contact support");
        return;
      } else if (verificationMethod === 'sms' && phoneNumber) {
        // SMS resend would need third-party implementation
        setError("SMS verification requires additional setup with an SMS provider");
        return;
      } else {
        setError("Unable to resend code. Missing contact information.");
        return;
      }

    } catch (error: any) {
      console.error("Resend error:", error);
      setError(error.message || "Failed to resend code. Please try again.");
      toast.error("Failed to resend code");
    }
  };

  const handleBackToSignIn = () => {
    router.push("/auth");
  };

  const handleChangeMethod = (method: VerificationMethod) => {
    setVerificationMethod(method);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    refs[0].current?.focus();
  };

  const getMethodConfig = () => {
    switch (verificationMethod) {
      case 'email':
        return {
          icon: Mail,
          title: "Email Verification",
          description: email
            ? `We've sent a 6-digit code to ${email.replace(/(.{2})(.*)(.{2})/, '$1***$3')}`
            : "We've sent a 6-digit code to your email address",
          destination: "your email"
        };
      case 'sms':
        return {
          icon: Smartphone,
          title: "SMS Verification",
          description: phoneNumber
            ? `We've sent a 6-digit code to ${phoneNumber.replace(/(.{3})(.*)(.{2})/, '$1***$3')}`
            : "We've sent a 6-digit code to your phone number",
          destination: "your phone"
        };
      case 'authenticator':
        return {
          icon: KeyRound,
          title: "Authenticator Code",
          description: "Enter the 6-digit code from your authenticator app",
          destination: "your authenticator app"
        };
    }
  };

  const methodConfig = getMethodConfig();
  const MethodIcon = methodConfig.icon;

  if (success) {
    return (
      <TooltipProvider delayDuration={200}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-500 p-4 rounded-full mb-6 animate-pulse">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Verification Successful!</h1>
              <p className="text-white/70">Redirecting you to your dashboard...</p>
            </div>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-white/90 to-slate-100/90 p-2 rounded-xl mb-4 transform transition-transform hover:scale-110 hover:rotate-3">
              <Image
                src="/assets/icon.png"
                alt="Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">{methodConfig.title}</h1>
            <div className="text-white/70 mt-2 text-center text-sm">
              {methodConfig.description}
            </div>
          </div>

          {/* Verification Method Selector */}
          <div className="flex justify-center gap-2 mb-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleChangeMethod('email')}
                  className={`p-3 rounded-xl transition-all ${verificationMethod === 'email'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  <Mail className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                Verify via Email
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleChangeMethod('sms')}
                  className={`p-3 rounded-xl transition-all ${verificationMethod === 'sms'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  <Smartphone className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                Verify via SMS
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleChangeMethod('authenticator')}
                  className={`p-3 rounded-xl transition-all ${verificationMethod === 'authenticator'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  <KeyRound className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                Use Authenticator App
              </TooltipContent>
            </Tooltip>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={refs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl font-bold bg-white/5 border-2 rounded-xl focus:outline-none transition-all text-white ${error
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                    : 'border-white/20 focus:border-white/80 focus:ring-2 focus:ring-white/10'
                    } ${digit ? 'border-white/80 bg-white/10' : ''}`}
                  disabled={isVerifying}
                  style={{ aspectRatio: "1" }}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isVerifying || otp.join('').length !== 6}
              className="w-full bg-white hover:bg-white/90 text-black py-3 rounded-xl transition-all duration-300 btn-signin disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Code'
              )}
            </Button>

            {/* Resend and Navigation */}
            <div className="text-center space-y-3">
              {verificationMethod !== 'authenticator' && (
                <p className="text-sm text-white/70">
                  Didn&apos;t receive the code?{" "}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendTimer > 0}
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {resendTimer > 0 ? (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Resend in {resendTimer}s
                          </span>
                        ) : (
                          'Resend Code'
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                      {resendTimer > 0 ? `Wait ${resendTimer} seconds to resend` : `Send a new code to ${methodConfig.destination}`}
                    </TooltipContent>
                  </Tooltip>
                </p>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleBackToSignIn}
                    className="flex items-center gap-2 mx-auto text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Return to login page
                </TooltipContent>
              </Tooltip>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <p className="text-xs text-blue-400 text-center">
              <span className="font-medium">Tip:</span> You can paste a 6-digit code directly into any field
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}