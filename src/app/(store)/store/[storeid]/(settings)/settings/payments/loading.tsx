import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <SettingsPage title="Payments">
      {/* Payment Providers Skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <div className="h-6 w-[200px] mb-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-[400px] bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-[120px] w-full rounded-lg bg-gray-200 animate-pulse" />
        </CardContent>
      </Card>

      {/* Supported Payment Methods Skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <div className="h-6 w-[180px] mb-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-[350px] bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
        </CardContent>
      </Card>

      {/* Payment Capture Method Skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <div className="h-6 w-[160px] mb-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-[300px] bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-4 w-4 mt-1 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1">
                  <div className="h-5 w-[200px] mb-1 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-[250px] bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Payment Methods Skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <div className="h-6 w-[170px] mb-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-[320px] bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
        </CardContent>
      </Card>

      {/* Payment Customizations Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-[190px] mb-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-[280px] bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
        </CardContent>
      </Card>
    </SettingsPage>
  );
} 