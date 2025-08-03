export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-[1200px] p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  )
} 