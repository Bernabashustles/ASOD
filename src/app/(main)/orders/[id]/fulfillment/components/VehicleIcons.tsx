import { LucideIcon } from 'lucide-react';

type IconComponent = React.FC<{ className?: string }>;

interface VehicleIconProps {
  className?: string;
}

export const MotorbikeIcon: IconComponent = ({ className }: VehicleIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 8V6a2 2 0 0 0-2-2H8" />
    <path d="M16 10V6a2 2 0 0 0-2-2h-2" />
    <path d="M4.5 14h4.5" />
    <path d="M16 14h3.5" />
    <circle cx="6.5" cy="17" r="3" />
    <circle cx="17.5" cy="17" r="3" />
  </svg>
);

export const CarIcon: IconComponent = ({ className }: VehicleIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);

export const VanIcon: IconComponent = ({ className }: VehicleIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 17h13v-6H3v6Zm0 0h.01" />
    <path d="M6 17h.01" />
    <path d="M9 17h.01" />
    <path d="M12 17h.01" />
    <path d="M15 17h.01" />
    <path d="M16 11V7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v4" />
    <path d="M21 11v4a2 2 0 0 1-2 2h-3" />
    <path d="M16 11h5" />
  </svg>
);

export const TruckIcon: IconComponent = ({ className }: VehicleIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 17h4V5H2v12h3" />
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

export const vehicleIcons: Record<string, IconComponent> = {
  motorbike: MotorbikeIcon,
  car: CarIcon,
  van: VanIcon,
  truck: TruckIcon,
}; 