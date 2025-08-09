import ClientLayout from '@/components/ClientLayout';
import StoreResolver from './StoreResolver';

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClientLayout>
        {/* Resolve store by subdomain and expose context */}
        <StoreResolver />
        {children}
      </ClientLayout>

  );
}