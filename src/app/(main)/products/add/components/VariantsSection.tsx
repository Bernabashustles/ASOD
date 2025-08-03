'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Image, Upload, Copy, Settings, ArrowUpDown, Filter, Search, ChevronDown, Columns, Group, Layers, X, ChevronUp, CornerDownRight, Check, DollarSign, Package, Barcode } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { variantTemplates } from '@/data/variantTemplates';
import { variantOptions } from '@/data/variantOptions';

interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

interface LocationInventory {
  locationId: string;
  locationName: string;
  quantity: number;
}

interface VariantMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  altText?: string;
}

interface CompareAtPrice {
  value: number;
  reason?: string;
}

interface ProductVariant {
  id: string;
  optionValues: { [optionName: string]: string };
  price?: number;
  compareAtPrice?: CompareAtPrice;
  sku?: string;
  barcode?: string;
  inventory?: LocationInventory[];
  media?: VariantMedia[];
  weight?: number;
  weightUnit?: string;
  isActive?: boolean;
  taxable?: boolean;
  cost?: number;
}

interface VariantTemplate {
  id: string;
  name: string;
  options: ProductOption[];
}

// Define the expected shape for the specific fields this component handles
interface VariantsData {
    hasVariants?: boolean;
    options?: ProductOption[];
    variants?: ProductVariant[];
    // Include necessary fields from parent form like price, sku, barcode if no variants exist
    price?: number; // Needed for default variant price
    // sku?: string; // Base sku/barcode not directly needed here, handled in variant generation
    // barcode?: string;
    // quantity?: number;
}

interface VariantsSectionProps {
  formData: VariantsData; // Use the specific shape
  onChange: (field: keyof VariantsData, value: any) => void; // Use keyof specific shape
}

interface VariantComparison {
  id: string;
  name: string;
  variants: string[]; // variant IDs
  priceDifference?: number;
  media?: VariantMedia[];
}

interface BulkAction {
  type: 'price' | 'inventory' | 'status' | 'media';
  value: any;
  selectedVariants: string[];
}

const optionNameSuggestions = ['Size', 'Color', 'Material', 'Style'];

const VariantsSection: React.FC<VariantsSectionProps> = ({ formData, onChange }) => {
  const hasVariants = formData.hasVariants ?? false;
  const [options, setOptions] = useState<ProductOption[]>(formData.options || []);
  const [variants, setVariants] = useState<ProductVariant[]>(formData.variants || []);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<BulkAction | null>(null);
  const [comparisons, setComparisons] = useState<VariantComparison[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [isEditingVariant, setIsEditingVariant] = useState(false);
  const [bulkPriceValue, setBulkPriceValue] = useState<number | null>(null);
  const [bulkPriceType, setBulkPriceType] = useState<'fixed' | 'percentage'>('fixed');
  const [locationsList] = useState([
    { id: 'loc1', name: 'Main Warehouse' },
    { id: 'loc2', name: 'Store Front' },
    { id: 'loc3', name: 'Online Fulfillment' },
  ]);
  const [groupByOption, setGroupByOption] = useState<string>('none');
  const [filterCriteria, setFilterCriteria] = useState<{ [key: string]: string[] }>({});
  const [showVariantCombinator, setShowVariantCombinator] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([locationsList[0].id]);
  const [collapsedGroups, setCollapsedGroups] = useState<{ [key: string]: boolean }>({});
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [openTemplateIds, setOpenTemplateIds] = useState<Set<string>>(new Set());
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);

  // Update internal state when props change (e.g., form reset)
  React.useEffect(() => {
      setOptions(formData.options || []);
  }, [formData.options]);

  React.useEffect(() => {
      setVariants(formData.variants || []);
  }, [formData.variants]);

  const triggerChange = (field: keyof VariantsData, value: any) => {
     onChange(field, value);
  };

  const handleHasVariantsChange = (checked: boolean) => {
    triggerChange('hasVariants', checked);
    if (checked && options.length === 0) {
      addOption(); // Add a default option if switching to variants
    } else if (!checked) {
      // Clear options and variants when switching off
      setOptions([]);
      setVariants([]);
      triggerChange('options', []);
      triggerChange('variants', []);
    }
  };

  const getPredefinedValues = (optionName: string) => {
    const normalizedName = optionName.toLowerCase();
    
    if (normalizedName.includes('color')) {
      return variantOptions.colors;
    } else if (normalizedName.includes('size')) {
      if (normalizedName.includes('shoe')) {
        return variantOptions.sizes.shoes;
      } else if (normalizedName.includes('youth')) {
        return variantOptions.sizes.youth;
      } else if (normalizedName.includes('clothing')) {
        return variantOptions.sizes.clothing;
      } else {
        return variantOptions.sizes.general;
      }
    } else if (normalizedName.includes('material')) {
      return variantOptions.materials;
    } else if (normalizedName.includes('width')) {
      return variantOptions.shoeWidths;
    } else if (normalizedName.includes('storage')) {
      return variantOptions.storage;
    } else if (normalizedName.includes('connectivity')) {
      return variantOptions.connectivity;
    } else if (normalizedName.includes('metal')) {
      return variantOptions.metals;
    } else if (normalizedName.includes('stone')) {
      return variantOptions.stones;
    } else if (normalizedName.includes('shade')) {
      return [...variantOptions.beautyShades.foundation, ...variantOptions.beautyShades.lipstick];
    } else if (normalizedName.includes('skin')) {
      return variantOptions.skinTypes;
    } else if (normalizedName.includes('style')) {
      return variantOptions.furnitureStyles;
    } else if (normalizedName.includes('finish')) {
      return variantOptions.furnitureFinishes;
    }
    
    return [];
  };

  const updateOptionName = (id: string, name: string) => {
    const updatedOptions = options.map(opt => {
      if (opt.id === id) {
        return { 
          ...opt, 
          name,
          values: [] // Clear values when name changes
        };
      }
      return opt;
    });
    setOptions(updatedOptions);
    triggerChange('options', updatedOptions);
    generateVariants(updatedOptions);
  };

  const updateOptionValue = (optionId: string, valueIndex: number, value: string) => {
    const updatedOptions = options.map(opt => {
      if (opt.id === optionId) {
        const newValues = [...opt.values];
        newValues[valueIndex] = value;
        return { ...opt, values: newValues };
      }
      return opt;
    });
    setOptions(updatedOptions);
    triggerChange('options', updatedOptions);
     generateVariants(updatedOptions);
  };

  const addOptionValue = (optionId: string) => {
     const updatedOptions = options.map(opt => 
         opt.id === optionId ? { ...opt, values: [...opt.values, ''] } : opt
     );
     setOptions(updatedOptions);
     triggerChange('options', updatedOptions);
      generateVariants(updatedOptions);
  };

  const removeOptionValue = (optionId: string, valueIndex: number) => {
     const updatedOptions = options.map(opt => {
         if (opt.id === optionId) {
             const newValues = opt.values.filter((_, index) => index !== valueIndex);
             // Ensure at least one value remains
             return { ...opt, values: newValues.length > 0 ? newValues : [''] }; 
         }
         return opt;
     });
     setOptions(updatedOptions);
     triggerChange('options', updatedOptions);
      generateVariants(updatedOptions);
  };

  const removeOption = (id: string) => {
    const updatedOptions = options.filter(opt => opt.id !== id);
    setOptions(updatedOptions);
    triggerChange('options', updatedOptions);
     generateVariants(updatedOptions);
     if (updatedOptions.length === 0) {
        handleHasVariantsChange(false); // Turn off variants if last option removed
     }
  };

  const applyTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = variantTemplates.find(t => t.id === templateId);
    if (template) {
      setOptions(template.options);
      triggerChange('options', template.options);
      generateVariants(template.options);
    }
    setIsTemplateOpen(false);
  };

  const generateVariants = (currentOptions: ProductOption[]) => {
     if (!currentOptions || currentOptions.length === 0 || currentOptions.some(opt => !opt.name || opt.values.every(v => !v))) {
        setVariants([]);
        triggerChange('variants', []);
        return;
     }

     let combinations: { [key: string]: string }[] = [{}];

     currentOptions.forEach(option => {
        const newCombinations: { [key: string]: string }[] = [];
      const validValues = option.values.filter(v => v && v.trim() !== '');
      if (validValues.length === 0) return;

        combinations.forEach(existingCombination => {
           validValues.forEach(value => {
               if (option.name && option.name.trim() !== '') {
                 newCombinations.push({ ...existingCombination, [option.name]: value });
               }
           });
        });
        combinations = newCombinations;
     });

      combinations = combinations.filter(combo => Object.keys(combo).length > 0);

    // Check if combinations exceed limit
    if (combinations.length > 100) {
      alert('Warning: The number of variant combinations exceeds the limit of 100. Please reduce the number of options or values.');
      return;
    }

     const newVariants: ProductVariant[] = combinations.map((combo, index) => {
        const existingVariant = variants.find(v => 
           Object.keys(combo).length === Object.keys(v.optionValues).length &&
           Object.keys(combo).every(key => combo[key] === v.optionValues[key])
        );
        return {
           id: existingVariant?.id || `variant-${Date.now()}-${index}`,
           optionValues: combo,
        price: existingVariant?.price ?? formData.price,
        compareAtPrice: existingVariant?.compareAtPrice,
           sku: existingVariant?.sku,
           barcode: existingVariant?.barcode,
        inventory: existingVariant?.inventory || [],
        media: existingVariant?.media || [],
        weight: existingVariant?.weight,
        weightUnit: existingVariant?.weightUnit,
        isActive: existingVariant?.isActive ?? true,
        taxable: existingVariant?.taxable,
        cost: existingVariant?.cost,
        };
     });

     setVariants(newVariants);
     triggerChange('variants', newVariants);
  };

  const updateVariantField = (variantId: string, field: keyof ProductVariant, value: any) => {
     const updatedVariants = variants.map(v => 
         v.id === variantId ? { ...v, [field]: value } : v
     );
     setVariants(updatedVariants);
     triggerChange('variants', updatedVariants); // Propagate change up
  };

  const updateVariantInventory = (variantId: string, locationId: string, quantity: number) => {
    const updatedVariants = variants.map(v => {
      if (v.id === variantId) {
        const inventory = v.inventory || [];
        const locationIndex = inventory.findIndex(loc => loc.locationId === locationId);
        
        if (locationIndex >= 0) {
          inventory[locationIndex] = { ...inventory[locationIndex], quantity };
        } else {
          inventory.push({ locationId, locationName: `Location ${locationId}`, quantity });
        }
        
        return { ...v, inventory };
      }
      return v;
    });
    
    setVariants(updatedVariants);
    triggerChange('variants', updatedVariants);
  };

  const updateVariantMedia = (variantId: string, media: VariantMedia[]) => {
    const updatedVariants = variants.map(v => 
      v.id === variantId ? { ...v, media } : v
    );
    setVariants(updatedVariants);
    triggerChange('variants', updatedVariants);
  };

  // Filtered and sorted variants
  const processedVariants = useMemo(() => {
    let result = variants;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(variant => 
        Object.values(variant.optionValues).some(value => 
          value.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        variant.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variant.barcode?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig) {
      result = [...result].sort((a, b) => {
        if (sortConfig.key === 'price') {
          return sortConfig.direction === 'asc' 
            ? (a.price || 0) - (b.price || 0)
            : (b.price || 0) - (a.price || 0);
        }
        // Add more sorting options
        return 0;
      });
    }

    return result;
  }, [variants, searchQuery, sortConfig]);

  const handleBulkAction = (action: BulkAction) => {
    const updatedVariants = variants.map(variant => {
      if (action.selectedVariants.includes(variant.id)) {
        switch (action.type) {
          case 'price':
            return { ...variant, price: action.value };
          case 'inventory':
            return { ...variant, inventory: action.value };
          case 'status':
            return { ...variant, isActive: action.value };
          case 'media':
            return { ...variant, media: action.value };
          default:
            return variant;
        }
      }
      return variant;
    });
    setVariants(updatedVariants);
    triggerChange('variants', updatedVariants);
  };

  const createComparison = (name: string, variantIds: string[]) => {
    const newComparison: VariantComparison = {
      id: `comp-${Date.now()}`,
      name,
      variants: variantIds,
    };
    setComparisons([...comparisons, newComparison]);
  };

  const selectedVariant = useMemo(() => {
    return variants.find(v => v.id === selectedVariantId) || null;
  }, [variants, selectedVariantId]);

  const handleBulkPriceUpdate = () => {
    if (bulkPriceValue === null || selectedVariants.length === 0) return;
    
    const updatedVariants = variants.map(variant => {
      if (selectedVariants.includes(variant.id)) {
        if (bulkPriceType === 'fixed') {
          return { ...variant, price: bulkPriceValue };
        } else {
          // Percentage adjustment
          const currentPrice = variant.price || 0;
          const newPrice = currentPrice * (1 + bulkPriceValue / 100);
          return { ...variant, price: parseFloat(newPrice.toFixed(2)) };
        }
      }
      return variant;
    });
    
    setVariants(updatedVariants);
    triggerChange('variants', updatedVariants);
    setBulkPriceValue(null);
  };

  // Group variants by selected option
  const groupedVariants = useMemo(() => {
    if (groupByOption === 'none' || !processedVariants.length) {
      return { ungrouped: processedVariants };
    }

    return processedVariants.reduce((groups: { [key: string]: ProductVariant[] }, variant) => {
      const groupValue = variant.optionValues[groupByOption] || 'Other';
      if (!groups[groupValue]) {
        groups[groupValue] = [];
      }
      groups[groupValue].push(variant);
      return groups;
    }, {});
  }, [processedVariants, groupByOption]);

  // Get available option names from current variants
  const availableOptionNames = useMemo(() => {
    if (!processedVariants.length) return [];
    
    const optionNames = new Set<string>();
    processedVariants.forEach(variant => {
      Object.keys(variant.optionValues).forEach(key => optionNames.add(key));
    });
    
    return Array.from(optionNames);
  }, [processedVariants]);

  // Get total inventory across all variants
  const totalInventory = useMemo(() => {
    return processedVariants.reduce((total, variant) => {
      if (!variant.inventory?.length) return total;
      
      return total + variant.inventory.reduce((sum, loc) => {
        if (selectedLocations.includes(loc.locationId)) {
          return sum + loc.quantity;
        }
        return sum;
      }, 0);
    }, 0);
  }, [processedVariants, selectedLocations]);

  // Handle filtering by option value
  const handleFilterChange = (optionName: string, value: string, isChecked: boolean) => {
    setFilterCriteria(prev => {
      const newCriteria = { ...prev };
      
      if (!newCriteria[optionName]) {
        newCriteria[optionName] = [];
      }
      
      if (isChecked) {
        newCriteria[optionName] = [...newCriteria[optionName], value];
      } else {
        newCriteria[optionName] = newCriteria[optionName].filter(v => v !== value);
      }
      
      if (newCriteria[optionName].length === 0) {
        delete newCriteria[optionName];
      }
      
      return newCriteria;
    });
  };

  // Helper function to get unique option values for a given option name
  const getUniqueOptionValues = (optionName: string) => {
    const values = new Set<string>();
    variants.forEach(variant => {
      if (variant.optionValues[optionName]) {
        values.add(variant.optionValues[optionName]);
      }
    });
    return Array.from(values);
  };

  // Helper function to toggle a specific group's collapsed state
  const toggleGroupCollapse = (groupName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Helper to toggle all groups collapse state
  const toggleAllCollapsed = () => {
    const newState = !allCollapsed;
    setAllCollapsed(newState);
    
    const groups = Object.keys(groupedVariants);
    const newCollapseState: { [key: string]: boolean } = {};
    
    groups.forEach(group => {
      newCollapseState[group] = newState;
    });
    
    setCollapsedGroups(newCollapseState);
  };

  const handleTemplateOpen = (optionId: string, isOpen: boolean) => {
    setOpenTemplateIds(prev => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(optionId);
      } else {
        newSet.delete(optionId);
      }
      return newSet;
    });
  };

  const handleOptionClick = (optionId: string) => {
    // Close any previously open option
    if (openOptionId === optionId) {
      setOpenOptionId(null);
    } else {
      setOpenOptionId(optionId);
    }
    // Reset other states
    setOpenTemplateIds(new Set());
    setIsTemplateOpen(false);
  };

  const addOption = () => {
    setIsAddingOption(true);
    // Close all open templates and options
    setOpenTemplateIds(new Set());
    setOpenOptionId(null);
    setIsTemplateOpen(false);
    
    const newOption: ProductOption = { 
      id: `option-${Date.now()}`,
      name: '', 
      values: [''] 
    };
    const updatedOptions = [...options, newOption];
    setOptions(updatedOptions);
    triggerChange('options', updatedOptions);
    generateVariants(updatedOptions);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAddingOption(false);
    }, 300);
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-gray-50/50 border-b px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-semibold">Product Variants</CardTitle>
          <div className="flex items-center gap-2 self-end xs:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
              className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
            >
              {viewMode === 'table' ? 'Grid View' : 'Table View'}
            </Button>
            <DropdownMenu open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3">
                  <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Templates
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {variantTemplates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onClick={() => applyTemplate(template.id)}
                    className={`flex items-center justify-between ${
                      selectedTemplate === template.id ? 'bg-accent text-accent-foreground' : ''
                    }`}
                  >
                    <span>{template.name}</span>
                    {selectedTemplate === template.id && (
                      <Check className="h-4 w-4" />
                    )}
                </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Checkbox to toggle variants */}
          <div className="flex items-center space-x-2">
          <Checkbox 
            id="has-variants"
            checked={hasVariants}
            onCheckedChange={handleHasVariantsChange}
          />
          <Label htmlFor="has-variants" className="text-xs sm:text-sm font-normal">
              This product has multiple options, like different sizes or colors
          </Label>
        </div>

        {hasVariants && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Options Editor */}
          <div className="space-y-4 sm:space-y-6">
                {/* Options Display */}
                <div className="space-y-3 sm:space-y-4 bg-white rounded-lg border p-3 sm:p-4">
                  {options.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="space-y-1.5 sm:space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs sm:text-sm font-medium uppercase">{option.name || "OPTION"}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {option.values
                          .filter(v => v.trim() !== '')
                          .map((value, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge 
                              variant="outline" 
                              className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-[10px] sm:text-xs px-1.5 sm:px-2 h-5 sm:h-6"
                            >
                              {value}
                            </Badge>
                            </motion.div>
                          ))
                        }
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                      className={`mt-1 sm:mt-2 text-xs sm:text-sm h-7 sm:h-8 w-full transition-all duration-200 ${
                        isAddingOption ? 'bg-accent text-accent-foreground' : ''
                      }`}
                  >
                      <PlusCircle className={`h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-transform duration-200 ${
                        isAddingOption ? 'rotate-180' : ''
                      }`} />
                    Add another option
                  </Button>
                  </motion.div>
                </div>
                
                {/* Options Editor */}
            <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-medium">Options</h3>
                  {options.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <Card className="p-3 sm:p-4 bg-gray-50/50 border">
                     <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="flex-1 mr-2">
                          <Label htmlFor={`option-name-${option.id}`} className="text-[10px] sm:text-xs font-medium">
                            Option name
                          </Label>
                          <Input
                            id={`option-name-${option.id}`}
                              value={option.name}
                            onClick={() => handleOptionClick(option.id)}
                            onChange={(e) => updateOptionName(option.id, e.target.value)}
                            placeholder="e.g., Size, Color"
                            className="mt-1 h-8 sm:h-9 text-xs sm:text-sm"
                          />
                        </div>
                         <Button 
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(option.id)}
                          className="text-red-500 hover:text-red-700 h-7 w-7 sm:h-8 sm:w-8"
                         >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                         </Button>
                     </div>
                      
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-[10px] sm:text-xs font-medium">Option values</Label>
                          <div className={`flex flex-wrap gap-2 ${openOptionId === option.id ? 'block' : 'hidden'}`}>
                            {getPredefinedValues(option.name).map((predefinedValue) => (
                              <Button
                                key={predefinedValue}
                                variant={option.values.includes(predefinedValue) ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  if (option.values.includes(predefinedValue)) {
                                    const valueIndex = option.values.indexOf(predefinedValue);
                                    removeOptionValue(option.id, valueIndex);
                                  } else {
                                    const updatedOptions = options.map(opt => 
                                      opt.id === option.id ? { ...opt, values: [...opt.values, predefinedValue] } : opt
                                    );
                                    setOptions(updatedOptions);
                                    triggerChange('options', updatedOptions);
                                    generateVariants(updatedOptions);
                                  }
                                }}
                                className={`h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm transition-all duration-200 ${
                                  option.values.includes(predefinedValue) 
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm' 
                                    : 'hover:bg-accent hover:text-accent-foreground border-gray-200'
                                }`}
                              >
                                {predefinedValue}
                                {option.values.includes(predefinedValue) && (
                                  <X className="h-3 w-3 ml-1" />
                                )}
                              </Button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="relative flex-1 group">
                              <Input 
                                placeholder="Add custom value..."
                                className="h-7 sm:h-8 text-xs sm:text-sm pl-3 pr-8 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                    const customValue = e.currentTarget.value.trim();
                                    if (!option.values.includes(customValue)) {
                                      const updatedOptions = options.map(opt => 
                                        opt.id === option.id ? { ...opt, values: [...opt.values, customValue] } : opt
                                      );
                                      setOptions(updatedOptions);
                                      triggerChange('options', updatedOptions);
                                      generateVariants(updatedOptions);
                                      e.currentTarget.value = '';
                                    }
                                  }
                                }}
                              />
                               <Button 
                                  variant="ghost" 
                                  size="icon" 
                                className="absolute right-0 top-0 h-7 sm:h-8 w-7 sm:w-8 text-gray-400 hover:text-primary transition-colors duration-200"
                                onClick={() => {
                                  const input = document.querySelector('input[placeholder="Add custom value..."]') as HTMLInputElement;
                                  if (input && input.value.trim()) {
                                    const customValue = input.value.trim();
                                    if (!option.values.includes(customValue)) {
                                      const updatedOptions = options.map(opt => 
                                        opt.id === option.id ? { ...opt, values: [...opt.values, customValue] } : opt
                                      );
                                      setOptions(updatedOptions);
                                      triggerChange('options', updatedOptions);
                                      generateVariants(updatedOptions);
                                      input.value = '';
                                    }
                                  }
                                }}
                              >
                                <PlusCircle className="h-4 w-4" />
                               </Button>
                           </div>
                        </div>
                     </div>
                  </Card>
                    </motion.div>
               ))}
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                      className={`w-full h-8 sm:h-9 text-xs sm:text-sm transition-all duration-200 ${
                        isAddingOption ? 'bg-accent text-accent-foreground' : ''
                      }`}
                  >
                      <PlusCircle className={`h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-transform duration-200 ${
                        isAddingOption ? 'rotate-180' : ''
                      }`} />
                      Add another option
                  </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Variant Controls */}
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-3 border-b pb-3 sm:pb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="min-w-[180px] sm:min-w-[200px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Group by</div>
                    <Select 
                      value={groupByOption} 
                      onValueChange={(value) => {
                        setGroupByOption(value);
                        setCollapsedGroups({}); // Reset collapsed state when changing group
                      }}
                    >
                      <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" className="text-xs sm:text-sm">None</SelectItem>
                        {availableOptionNames.map(optionName => (
                          <SelectItem key={optionName} value={optionName} className="text-xs sm:text-sm">
                            {optionName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 sm:h-9 text-xs sm:text-sm">
                    <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {availableOptionNames.map(optionName => (
                    <DropdownMenuSub key={optionName}>
                      <DropdownMenuSubTrigger className="text-xs sm:text-sm">
                        {optionName}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {getUniqueOptionValues(optionName).map(value => (
                          <DropdownMenuCheckboxItem
                            key={value}
                            checked={filterCriteria[optionName]?.includes(value)}
                            onCheckedChange={(checked: boolean) => handleFilterChange(optionName, value, checked)}
                            className="text-xs sm:text-sm"
                          >
                            {value}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 w-full xs:w-auto">
                  <div className="relative w-full xs:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                    <Input
                      placeholder="Search variants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 sm:pl-10 w-full xs:w-[200px] sm:w-[250px] h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>
                  
                  <Select value={selectedLocations.join(',')} onValueChange={(value) => {
                    if (value === 'all') {
                      setSelectedLocations(locationsList.map(loc => loc.id));
                    } else {
                      setSelectedLocations(value.split(','));
                    }
                  }}>
                    <SelectTrigger className="w-full xs:w-[150px] sm:w-[180px] h-8 sm:h-9 text-xs sm:text-sm">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs sm:text-sm">All locations</SelectItem>
                      {locationsList.map(location => (
                        <SelectItem key={location.id} value={location.id} className="text-xs sm:text-sm">
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

          {/* Bulk Actions Bar */}
          {selectedVariants.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border rounded-lg p-2 sm:p-3 mb-3 sm:mb-4"
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {selectedVariants.length} variant{selectedVariants.length !== 1 ? 's' : ''} selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedVariants([])}
                    className="h-6 sm:h-7 text-[10px] sm:text-xs"
                  >
                    Clear selection
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs">
                        <ArrowUpDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        Bulk edit
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem
                        onClick={() => {
                          setBulkAction({ type: 'price', value: null, selectedVariants });
                          // Handle price dialog
                        }}
                        className="text-xs sm:text-sm"
                      >
                        Price
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setBulkAction({ type: 'inventory', value: null, selectedVariants });
                          // Handle inventory dialog
                        }}
                        className="text-xs sm:text-sm"
                      >
                        Inventory
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setBulkAction({ type: 'status', value: null, selectedVariants });
                          // Handle status dialog
                        }}
                        className="text-xs sm:text-sm"
                      >
                        Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setBulkAction({ type: 'media', value: null, selectedVariants });
                          // Handle media dialog
                        }}
                        className="text-xs sm:text-sm"
                      >
                        Media
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setVariants(variants.filter(v => !selectedVariants.includes(v.id)));
                      setSelectedVariants([]);
                    }}
                    className="h-7 sm:h-8 text-[10px] sm:text-xs"
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

              {/* Variants Display */}
              {processedVariants.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Checkbox
                          checked={selectedVariants.length === processedVariants.length}
                          onCheckedChange={(checked) => {
                            setSelectedVariants(checked ? processedVariants.map(v => v.id) : []);
                          }}
                        />
                        <Label className="text-xs sm:text-sm font-medium">
                          Variant
                        </Label>
                        <Button 
                          variant="link" 
                          size="sm"
                          onClick={toggleAllCollapsed}
                          className="text-[10px] sm:text-xs h-6 sm:h-7 px-1.5 sm:px-2 font-normal text-blue-600"
                        >
                          · {allCollapsed ? 'Expand' : 'Collapse'} all
                        </Button>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVariantCombinator(true)}
                      className="text-xs sm:text-sm h-8 sm:h-9 w-full xs:w-auto"
                    >
                      <Group className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Edit combinations
                    </Button>
                  </div>

                  {/* Enhanced Grouped Variants Display */}
                  <div className="border rounded-lg overflow-hidden overflow-x-auto">
                     <Table>
                        <TableHeader>
                           <TableRow>
                          <TableHead className="w-[30px]">
                            <span className="sr-only">Select</span>
                          </TableHead>
                          <TableHead className="w-[50%] text-xs sm:text-sm whitespace-nowrap">Variant</TableHead>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap">Price</TableHead>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap">Available</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                        {groupByOption === 'none' ? (
                          // When no grouping is applied
                          processedVariants.map((variant) => (
                            <TableRow 
                              key={variant.id}
                              className="cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                setSelectedVariantId(variant.id);
                                setIsEditingVariant(true);
                              }}
                            >
                              <TableCell onClick={(e) => e.stopPropagation()} className="py-1.5 sm:py-2">
                                <Checkbox
                                  checked={selectedVariants.includes(variant.id)}
                                  onCheckedChange={(checked) => {
                                    setSelectedVariants(checked
                                      ? [...selectedVariants, variant.id]
                                      : selectedVariants.filter(id => id !== variant.id)
                                    );
                                  }}
                                />
                               </TableCell>
                              <TableCell className="py-1.5 sm:py-2">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                                    {variant.media?.[0] ? (
                                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden">
                                        <img 
                                          src={variant.media[0].url} 
                                          alt="" 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                                        <Image className="h-4 w-4 sm:h-5 sm:w-5" />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    {Object.entries(variant.optionValues).map(([name, value]) => (
                                      <div key={name} className="text-xs sm:text-sm">
                                        <span className="text-gray-500">{name}:</span> {value}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TableCell>
                               <TableCell className="py-1.5 sm:py-2">
                                       <Input 
                                  type="text"
                                  value={`ETB ${variant.price?.toFixed(2) || '0.00'}`}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9.]/g, '');
                                    updateVariantField(variant.id, 'price', parseFloat(value) || 0);
                                  }}
                                  className="w-24 sm:w-36 h-7 sm:h-8 text-xs sm:text-sm"
                                />
                              </TableCell>
                              <TableCell className="py-1.5 sm:py-2 text-center text-xs sm:text-sm">
                                <div className="text-center">
                                  {variant.inventory && variant.inventory.length > 0 ? (
                                    <div>
                                      {variant.inventory
                                        .filter(loc => selectedLocations.includes(loc.locationId))
                                        .reduce((sum, loc) => sum + loc.quantity, 0)}
                                    </div>
                                  ) : (
                                    <div className="text-gray-500">0</div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          // When grouping is applied
                          Object.entries(groupedVariants).map(([groupName, variants]) => (
                            <React.Fragment key={groupName}>
                              {/* Group Header Row */}
                              <TableRow 
                                className="cursor-pointer bg-gray-50 hover:bg-gray-100"
                                onClick={() => toggleGroupCollapse(groupName)}
                              >
                                <TableCell onClick={(e) => e.stopPropagation()} className="py-1.5 sm:py-2">
                                  <Checkbox
                                    checked={variants.every(v => selectedVariants.includes(v.id))}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedVariants(prev => [
                                          ...prev, 
                                          ...variants.map(v => v.id).filter(id => !prev.includes(id))
                                        ]);
                                      } else {
                                        setSelectedVariants(prev => 
                                          prev.filter(id => !variants.some(v => v.id === id))
                                        );
                                      }
                                    }}
                                  />
                                </TableCell>
                                <TableCell className="font-medium py-1.5 sm:py-2">
                                  <div className="flex items-center">
                                    <span className="uppercase text-xs sm:text-sm">{groupName}</span>
                                    <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-sm text-gray-500">
                                      {variants.length} variant{variants.length !== 1 ? 's' : ''}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="ml-2 h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleGroupCollapse(groupName);
                                      }}
                                    >
                                    {collapsedGroups[groupName] ? (
                                        <ChevronDown className="h-3.5 w-3.5" />
                                    ) : (
                                        <ChevronUp className="h-3.5 w-3.5" />
                                    )}
                                    </Button>
                                   </div>
                               </TableCell>
                                <TableCell className="py-1.5 sm:py-2">
                                    <Input 
                                    type="text"
                                    value={`ETB ${variants[0]?.price?.toFixed(2) || '0.00'}`}
                                    readOnly
                                    className="w-24 sm:w-36 h-7 sm:h-8 text-xs sm:text-sm bg-gray-50"
                                  />
                                 </TableCell>
                               <TableCell className="py-1.5 sm:py-2">
                                  <div className="text-center text-xs sm:text-sm">
                                    {variants.reduce((total, variant) => {
                                      if (!variant.inventory?.length) return total;
                                      return total + variant.inventory
                                        .filter(loc => selectedLocations.includes(loc.locationId))
                                        .reduce((sum, loc) => sum + loc.quantity, 0);
                                    }, 0)}
                                  </div>
                                </TableCell>
                             </TableRow>
                            </React.Fragment>
                          ))
                        )}
                        </TableBody>
                     </Table>
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-t text-[10px] sm:text-xs text-gray-500 text-right">
                      Total inventory across all locations: {totalInventory} available
                    </div>
                  </div>
               </div>
             )}
        </div>

        {/* Enhanced Variant Edit Dialog */}
              <Dialog open={isEditingVariant} onOpenChange={setIsEditingVariant}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-lg shadow-xl">
                  {selectedVariant && (
                    <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col bg-white"
              >
                <DialogHeader className="px-6 py-4 border-b bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-primary" />
                      </div>
                                Edit Variant
                              </DialogTitle>
                              <Button
                      variant="ghost"
                      size="icon"
                                onClick={() => setIsEditingVariant(false)}
                      className="h-8 w-8 hover:bg-gray-100"
                              >
                      <X className="h-4 w-4" />
                              </Button>
                          </div>
                        </DialogHeader>
                
                <div className="p-6 space-y-6">
                  {/* Variant Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                      <div className="bg-gray-50/50 rounded-lg p-4">
                        <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                          <Layers className="h-4 w-4 text-gray-500" />
                          Variant Details
                        </Label>
                        <div className="space-y-2">
                          {Object.entries(selectedVariant.optionValues).map(([name, value]) => (
                            <div key={name} className="flex items-center justify-between bg-white rounded-md p-2 shadow-sm">
                              <span className="text-sm text-gray-500">{name}</span>
                              <span className="text-sm font-medium bg-primary/5 px-2 py-1 rounded">{value}</span>
                            </div>
                          ))}
                                      </div>
                                    </div>
                                    
                      <div className="bg-gray-50/50 rounded-lg p-4">
                        <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          Pricing
                        </Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-500">Price</Label>
                            <div className="flex items-center gap-2">
                                        <Input
                                type="text"
                                value={selectedVariant.price?.toFixed(2) || '0.00'}
                                          onChange={(e) => {
                                  const value = e.target.value.replace(/[^0-9.]/g, '');
                                  updateVariantField(selectedVariant.id, 'price', parseFloat(value) || 0);
                                }}
                                className="w-32 bg-white"
                              />
                              <span className="text-sm text-gray-500">ETB</span>
                                    </div>
                                  </div>
                                  
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-500">Compare at Price</Label>
                            <div className="flex items-center gap-2">
                                        <Input
                                type="text"
                                value={selectedVariant.compareAtPrice?.value?.toFixed(2) || '0.00'}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^0-9.]/g, '');
                                  updateVariantField(selectedVariant.id, 'compareAtPrice', {
                                    value: parseFloat(value) || 0,
                                    reason: selectedVariant.compareAtPrice?.reason || ''
                                  });
                                }}
                                className="w-32 bg-white"
                              />
                              <span className="text-sm text-gray-500">ETB</span>
                                      </div>
                                    </div>
                                        </div>
                                        </div>
                                  </div>

                                <div className="space-y-4">
                      <div className="bg-gray-50/50 rounded-lg p-4">
                        <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                          <Package className="h-4 w-4 text-gray-500" />
                          Inventory
                        </Label>
                                    <div className="space-y-3">
                                      {locationsList.map(location => {
                            const inventory = selectedVariant.inventory?.find(
                              inv => inv.locationId === location.id
                            );
                                        return (
                              <div key={location.id} className="flex items-center justify-between bg-white rounded-md p-2 shadow-sm">
                                <span className="text-sm text-gray-500">{location.name}</span>
                                            <Input
                                              type="number"
                                  value={inventory?.quantity || 0}
                                  onChange={(e) => {
                                    updateVariantInventory(
                                                selectedVariant.id, 
                                                location.id, 
                                                parseInt(e.target.value) || 0
                                    );
                                  }}
                                  className="w-24 bg-white"
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                      
                      <div className="bg-gray-50/50 rounded-lg p-4">
                        <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                          <Barcode className="h-4 w-4 text-gray-500" />
                          Identification
                                    </Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-500">SKU</Label>
                            <Input
                              value={selectedVariant.sku || ''}
                              onChange={(e) => {
                                updateVariantField(selectedVariant.id, 'sku', e.target.value);
                              }}
                              className="bg-white"
                              placeholder="Enter SKU"
                            />
                                  </div>
                          
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-500">Barcode</Label>
                            <Input
                              value={selectedVariant.barcode || ''}
                              onChange={(e) => {
                                updateVariantField(selectedVariant.id, 'barcode', e.target.value);
                              }}
                              className="bg-white"
                              placeholder="Enter barcode"
                            />
                                    </div>
                                  </div>
                                </div>
                          </div>
                                </div>
                  
                  {/* Variant Media */}
                  <div className="bg-gray-50/50 rounded-lg p-4">
                    <Label className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Image className="h-4 w-4 text-gray-500" />
                      Variant Media
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {selectedVariant.media?.map((media) => (
                        <motion.div
                          key={media.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
                                            <img
                                              src={media.url}
                              alt={media.altText || ''}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                            onClick={() => {
                                                    updateVariantMedia(
                                                      selectedVariant.id,
                                selectedVariant.media?.filter(m => m.id !== media.id) || []
                              );
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                    </motion.div>
                      ))}
                  <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-white"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                          <span className="text-xs text-gray-500">Upload Image</span>
                          </div>
                      </motion.div>
                        </div>
                    </div>
                        </div>
                        
                <div className="px-6 py-4 border-t bg-gray-50/50 flex justify-end gap-2">
                              <Button 
                                variant="outline"
                    onClick={() => setIsEditingVariant(false)}
                    className="h-9"
                      >
                        Cancel
                      </Button>
                      <Button 
                    onClick={() => setIsEditingVariant(false)}
                    className="h-9"
                  >
                    Save Changes
                      </Button>
                    </div>
                  </motion.div>
            )}
                </DialogContent>
              </Dialog>
      </CardContent>
    </Card>
  );
};

export default VariantsSection; 