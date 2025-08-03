import { authClient } from '@/lib/auth-client';
import { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { redirect } from 'next/navigation';
import './globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'Authentication - Store Owner Dashboard',
  description: 'Sign in to your store dashboard',
};


const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await authClient.getSession();
  if (session.data?.user) {
    redirect("/auth");
  }
  return (
    <div className={`${lexend.variable} font-sans`}>
      {children}
    </div>
  );
};

export default AuthLayout;
