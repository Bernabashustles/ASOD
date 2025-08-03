import { VariantTemplate } from '@/types/variants';

export const variantTemplates: VariantTemplate[] = [
  {
    id: 'clothing',
    name: 'Clothing',
    options: [
      { 
        id: 'size', 
        name: 'Size', 
        values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] 
      },
      { 
        id: 'color', 
        name: 'Color', 
        values: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Gray', 'Brown'] 
      },
      { 
        id: 'material', 
        name: 'Material', 
        values: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Denim', 'Leather'] 
      }
    ]
  },
  {
    id: 'shoes',
    name: 'Shoes',
    options: [
      { 
        id: 'size', 
        name: 'Size', 
        values: ['5', '6', '7', '8', '9', '10', '11', '12', '13'] 
      },
      { 
        id: 'color', 
        name: 'Color', 
        values: ['Black', 'White', 'Brown', 'Blue', 'Red', 'Gray', 'Beige'] 
      },
      { 
        id: 'width', 
        name: 'Width', 
        values: ['Narrow', 'Regular', 'Wide', 'Extra Wide'] 
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    options: [
      { 
        id: 'storage', 
        name: 'Storage', 
        values: ['64GB', '128GB', '256GB', '512GB', '1TB'] 
      },
      { 
        id: 'color', 
        name: 'Color', 
        values: ['Black', 'White', 'Silver', 'Gold', 'Space Gray', 'Blue'] 
      },
      { 
        id: 'connectivity', 
        name: 'Connectivity', 
        values: ['WiFi', 'WiFi + Cellular', 'Bluetooth'] 
      }
    ]
  },
  {
    id: 'furniture',
    name: 'Furniture',
    options: [
      { 
        id: 'color', 
        name: 'Color', 
        values: ['Black', 'White', 'Brown', 'Gray', 'Beige', 'Walnut', 'Oak'] 
      },
      { 
        id: 'material', 
        name: 'Material', 
        values: ['Wood', 'Metal', 'Glass', 'Fabric', 'Leather', 'Plastic'] 
      },
      { 
        id: 'size', 
        name: 'Size', 
        values: ['Small', 'Medium', 'Large', 'Extra Large'] 
      }
    ]
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    options: [
      { 
        id: 'metal', 
        name: 'Metal', 
        values: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'] 
      },
      { 
        id: 'size', 
        name: 'Size', 
        values: ['Small', 'Medium', 'Large'] 
      },
      { 
        id: 'stone', 
        name: 'Stone', 
        values: ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'None'] 
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    options: [
      { 
        id: 'color', 
        name: 'Color', 
        values: ['Black', 'White', 'Brown', 'Blue', 'Red', 'Green', 'Yellow', 'Purple'] 
      },
      { 
        id: 'material', 
        name: 'Material', 
        values: ['Leather', 'Canvas', 'Nylon', 'Metal', 'Plastic', 'Wood'] 
      },
      { 
        id: 'size', 
        name: 'Size', 
        values: ['One Size', 'Small', 'Medium', 'Large'] 
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports Equipment',
    options: [
      { 
        id: 'size', 
        name: 'Size', 
        values: ['Youth', 'Small', 'Medium', 'Large', 'Extra Large'] 
      },
      { 
        id: 'color', 
        name: 'Color', 
        values: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Orange'] 
      },
      { 
        id: 'material', 
        name: 'Material', 
        values: ['Rubber', 'Plastic', 'Metal', 'Composite', 'Fabric'] 
      }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty Products',
    options: [
      { 
        id: 'size', 
        name: 'Size', 
        values: ['Sample', 'Travel', 'Regular', 'Large', 'Jumbo'] 
      },
      { 
        id: 'shade', 
        name: 'Shade', 
        values: ['Light', 'Medium', 'Dark', 'Fair', 'Deep'] 
      },
      { 
        id: 'type', 
        name: 'Type', 
        values: ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'] 
      }
    ]
  }
]; 