"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signIn } from "@/lib/auth-client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppleIcon, FacebookIcon, GoogleIcon } from "./_components/icons";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');

    if (error === 'social_auth_failed') {
      toast.error('Social authentication failed. Please try again.');
      router.replace('/auth');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        rememberMe
      });

      if (result.data) {
        toast.success("Successfully signed in!");
        router.push("/steps/choose");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Authentication failed");
      console.error("Auth error:", error);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  const handleSocialSignIn = async (provider: "google" | "apple" | "facebook") => {
    setIsLoading(true);

    try {
      await signIn.social({
        provider,
        callbackURL: "/steps/choose",
      });
    } catch (error) {
      toast.error(`${provider} sign in failed`);
      console.error(`${provider} sign in error:`, error);
    } finally {
      setIsLoading(false);
    }
  };



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
            <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
            <div className="text-white/70 mt-2">
              Don't Have an account yet?{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSignUp}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                  >
                    Sign up
                  </button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Create a new account
                </TooltipContent>
              </Tooltip>{" "}
              now
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="peer"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="peer password-input"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-white/60 hover:text-white/80 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="checkbox-wrapper">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="transition-all duration-200 data-[state=checked]:bg-white data-[state=checked]:border-white border-white/30"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-white/70 cursor-pointer select-none ml-2 hover:text-white/90 transition-colors"
                    >
                      Remember me
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Stay signed in on this device
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Reset your password
                </TooltipContent>
              </Tooltip>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-white/90 text-black py-3 rounded-xl transition-all duration-300 btn-signin font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/5 text-white/60">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSocialSignIn("apple")}
                    className="w-full border-2 border-white/20 rounded-xl p-2 flex items-center justify-center social-btn bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <AppleIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Continue with Apple
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSocialSignIn("google")}
                    className="w-full border-2 border-white/20 rounded-xl p-2 flex items-center justify-center social-btn bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <GoogleIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Continue with Google
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSocialSignIn("facebook")}
                    className="w-full border-2 border-white/20 rounded-xl p-2 flex items-center justify-center social-btn bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FacebookIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Continue with Facebook
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}