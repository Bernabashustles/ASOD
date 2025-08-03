"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { forgetPassword } from "@/lib/auth-client";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await forgetPassword({
        email,
        redirectTo: "/auth/reset-password", // This should be the URL to your reset password page
      });

      setIsSuccess(true);
      toast.success("Reset instructions sent to your email!");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setError(error.message || "An unexpected error occurred");
      toast.error("Failed to send reset instructions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    router.push("/auth");
  };

  // Success state
  if (isSuccess) {
    return (
      <TooltipProvider delayDuration={200}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-500 p-4 rounded-full mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
              <p className="text-white/70 mb-6">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <p className="text-white/60 text-sm mb-6">
                Didn't receive the email? Check your spam folder or click the button below to try again.
              </p>
              <div className="space-y-3 w-full">
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 rounded-xl transition-all duration-300 font-medium"
                >
                  Send Again
                </Button>
                <button
                  onClick={handleBackToSignIn}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
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
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <div className="text-white/70 mt-2 text-center">
              Enter your email address and we'll send you instructions to reset your password.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(""); // Clear error when user types
                }}
                placeholder="Enter your email"
                className="peer"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-white hover:bg-white/90 text-black py-3 rounded-xl transition-all duration-300 btn-signin font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                'Send Reset Instructions'
              )}
            </Button>

            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleBackToSignIn}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                  >
                    Back to Sign In
                  </button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Return to login page
                </TooltipContent>
              </Tooltip>
            </div>
          </form>
        </div>
      </div>
    </TooltipProvider>
  );
}