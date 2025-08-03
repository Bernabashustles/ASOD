'use client';

import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';

// Define the DraftOrder type
interface DraftOrder {
  id: string;
  // Add other properties as needed
}

// Add dummy data for draft orders
const draftOrders: DraftOrder[] = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  // Add more draft orders as needed
];

export default function DraftOrdersPage() {
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  return (
    <div className="flex flex-col h-full">
      {/* Your other content here */}
      
      <Pagination 
        currentPage={currentPage}
        totalItems={draftOrders.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemName="drafts"
      />
    </div>
  );
} 