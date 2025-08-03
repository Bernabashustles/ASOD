"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface PageHeaderAction {
  label: string
  onClick?: () => void
  variant?: 'default' | 'outline'
  disabled?: boolean
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  status?: string
  backButton?: boolean
  onBackClick?: () => void
  actions?: PageHeaderAction[]
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  status,
  backButton,
  onBackClick,
  actions,
  className
}: PageHeaderProps) {
  return (
    <div className={cn("sticky  ", className)}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="flex flex-1 items-center gap-4">
            {backButton && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 lg:hidden"
                onClick={onBackClick}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            )}
            <div>
              <div className="flex items-center gap-4">
                {backButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={onBackClick}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold">{title}</h1>
                  {status && (
                    <>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{status}</span>
                    </>
                  )}
                </div>
              </div>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && actions.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className="hidden sm:inline-flex"
                >
                  {action.label}
                </Button>
              ))}
              <div className="sm:hidden">
                <Button size="sm">
                  {actions[actions.length - 1].label}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}