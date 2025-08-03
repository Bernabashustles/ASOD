// 'use client';
// 
// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   Home,
//   ShoppingBag,
//   Package,
//   Users,
//   LayoutGrid,
//   BarChart,
//   Settings,
//   Menu
// } from 'lucide-react';
// import { cn } from "@/lib/utils";
// 
// const mainNavItems = [
//   {
//     icon: Home,
//     label: 'Home',
//     href: '/'
//   },
//   {
//     icon: ShoppingBag,
//     label: 'Orders',
//     href: '/orders'
//   },
//   {
//     icon: Package,
//     label: 'Products',
//     href: '/products'
//   },
//   {
//     icon: BarChart,
//     label: 'Analytics',
//     href: '/analytics'
//   },
//   {
//     icon: Menu,
//     label: 'More',
//     href: '#more'
//   }
// ];
// 
// export default function MobileNavigation() {
//   const pathname = usePathname();
// 
//   return (
//     <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-white z-50">
//       <nav className="flex items-center justify-around">
//         {mainNavItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href || 
//             (item.href !== '/' && pathname.startsWith(item.href));
// 
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={cn(
//                 "flex flex-col items-center gap-1 py-2 px-4 relative",
//                 "text-gray-500 hover:text-gray-900",
//                 isActive && "text-black"
//               )}
//             >
//               <Icon className="w-6 h-6" />
//               <span className="text-xs font-medium">{item.label}</span>
//               {isActive && (
//                 <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
//               )}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }

// Placeholder export to maintain imports
export default function MobileNavigation() {
  return null;
}