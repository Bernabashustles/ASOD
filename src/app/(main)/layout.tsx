import ClientLayout from '@/components/ClientLayout';

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClientLayout>{children}</ClientLayout>

  );
}