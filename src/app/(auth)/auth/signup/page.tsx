"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signIn, signUp } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CountryCodeDial } from "../_components/country-code-dial";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../_components/icons";


export default function SignUpPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "+251",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setMounted(true);

    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');

    if (error === 'social_signup_failed') {
      toast.error('Social sign up failed. Please try again.');
      router.replace('/auth/signup');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const numbersOnly = value.replace(/\D/g, "");
      setFormData(prev => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const phoneNumber = formData.phoneNumber
        ? `${formData.countryCode}${formData.phoneNumber}`
        : undefined;

      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        ...(phoneNumber && { phoneNumber }),
      });

      toast.success("Account created successfully! Please check your email for verification.");

      // Redirect to verification page
      const verifyUrl = `/auth/verify?method=email&email=${encodeURIComponent(formData.email)}`;
      router.push(verifyUrl);
    } catch (error: any) {
      toast.error(error.message || "Sign up failed");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push("/auth");
  };

  const handleSocialSignUp = async (provider: "google" | "apple" | "facebook") => {
    setIsLoading(true);

    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error: any) {
      toast.error(`${provider} sign up failed`);
      console.error(`${provider} sign up error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
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
            <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
            <div className="text-white/70 mt-2">
              Already have an account?{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSignIn}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                  >
                    Sign in
                  </button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                  Sign in to your account
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="peer"
                autoComplete="email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="peer"
                  autoComplete="given-name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="peer"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="relative">
                <CountryCodeDial
                  countryCode={formData.countryCode}
                  phoneNumber={formData.phoneNumber}
                  onCountryCodeChange={handleCountryCodeChange}
                  onPhoneNumberChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="peer password-input"
                autoComplete="new-password"
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="peer password-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[38px] text-white/60 hover:text-white/80 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-white/90 text-black py-3 rounded-xl transition-all duration-300 btn-signin font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/5 text-white/60">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleSocialSignUp("apple")}
                      className="w-full border-2 border-white/20 rounded-xl p-2 flex items-center justify-center social-btn bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <AppleIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                    Sign up with Apple
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleSocialSignUp("google")}
                      className="w-full border-2 border-white/20 rounded-xl p-2 flex items-center justify-center social-btn bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <GoogleIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                    Sign up with Google
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleSocialSignUp("facebook")}
                      className="w-full border-2 border-white/20 rounded-xl p-2 flex items-center justify-center social-btn bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FacebookIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="tooltip-content bg-white/10 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white shadow-lg rounded-lg border border-white/20">
                    Sign up with Facebook
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <p className="text-xs text-center text-white/60 mt-4">
              By clicking Create Account, you agree to our{" "}
              <a href="/terms" className="text-blue-400 hover:text-blue-300 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </TooltipProvider>
  );
}