"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { resetPassword } from "@/lib/auth-client"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    const token = searchParams.get('token')
    if (!token) {
      toast.error("Invalid reset link. Please request a new one.")
      return
    }

    setIsLoading(true)

    try {
      await resetPassword({
        token,
        newPassword: password,
      })

      toast.success("Password reset successfully!")
      router.push("/auth")
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToSignIn = () => {
    router.push("/auth")
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
            <h1 className="text-2xl font-bold text-white">Set New Password</h1>
            <div className="text-white/70 mt-2 text-center">Please enter your new password below.</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
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
              {isLoading ? "Resetting..." : "Reset Password"}
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
  )
}

