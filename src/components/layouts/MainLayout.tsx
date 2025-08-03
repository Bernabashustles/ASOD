import { SubscriptionNotice } from '@/components/SubscriptionNotice';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      {children}
      <SubscriptionNotice />
    </>
  );
} 