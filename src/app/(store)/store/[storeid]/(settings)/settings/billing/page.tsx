'use client';

import React from 'react';
import { 
  CreditCard, 
  Calendar,
  Download,
  ChevronRight,
  Shield,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BillingSettingsPage() {
  return (
    <div className="p-8 max-w-[800px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your billing information and view invoices
        </p>
      </div>

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>
            You are currently on the Basic plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Basic Plan</h3>
              <p className="text-sm text-gray-500">$29/month</p>
            </div>
            <Button>Upgrade plan</Button>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-4">Your plan includes:</h4>
            <ul className="space-y-3">
              {[
                'Up to 1,000 products',
                '2 staff accounts',
                'Basic reports',
                '24/7 support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment method</CardTitle>
          <CardDescription>
            Manage your payment information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-500">Expires 12/2024</div>
              </div>
            </div>
            <Button variant="outline">Update</Button>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Secure payment processing</AlertTitle>
            <AlertDescription>
              Your payment information is encrypted and secure
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Billing history</CardTitle>
          <CardDescription>
            View and download your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'Feb 1, 2024', amount: '$29.00', status: 'Paid' },
              { date: 'Jan 1, 2024', amount: '$29.00', status: 'Paid' },
              { date: 'Dec 1, 2023', amount: '$29.00', status: 'Paid' }
            ].map((invoice, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{invoice.date}</div>
                    <div className="text-sm text-gray-500">{invoice.amount}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-green-600 font-medium">
                    {invoice.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Additional settings</CardTitle>
          <CardDescription>
            Manage your billing preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Billing notifications
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="w-4 h-4 mr-2" />
              Tax settings
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}