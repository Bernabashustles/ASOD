'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Plus, 
  X, 
  ChevronDown,
  ChevronUp,
  Globe,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Info,
  CreditCard,
  Truck,
  FileCheck,
  Users,
  Home,
  Briefcase,
  Package,
  DollarSign,
  Percent,
  Calendar,
  Clock,
  Shield,
  FileSpreadsheet,
  FileBarChart,
  FileCode,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileText as FileTextIcon,
  File,
  FileX,
  FileCheck2,
  FileClock,
  FileWarning,
  FileMinus,
  FilePlus,
  FileSearch,
  FileSymlink,
  FileUp,
  FileDown,
  FileInput,
  FileOutput,
  FileHeart,
  FileJson,
  FilePieChart,
  FileSpreadsheetIcon,
  FileBarChart2,
  FileCode2,
  FileImage2,
  FileVideo2,
  FileAudio2,
  FileArchive2,
  FileText2,
  File2,
  FileX2,
  FileCheck22,
  FileClock2,
  FileWarning2,
  FileMinus2,
  FilePlus2,
  FileSearch2,
  FileSymlink2,
  FileUp2,
  FileDown2,
  FileInput2,
  FileOutput2,
  FileHeart2,
  FileJson2,
  FilePieChart2,
  FileSpreadsheet2,
  FileBarChart3,
  FileCode3,
  FileImage3,
  FileVideo3,
  FileAudio3,
  FileArchive3,
  FileText3,
  File3,
  FileX3,
  FileCheck23,
  FileClock3,
  FileWarning3,
  FileMinus3,
  FilePlus3,
  FileSearch3,
  FileSymlink3,
  FileUp3,
  FileDown3,
  FileInput3,
  FileOutput3,
  FileHeart3,
  FileJson3,
  FilePieChart3,
  FileSpreadsheet3,
  FileBarChart4,
  FileCode4,
  FileImage4,
  FileVideo4,
  FileAudio4,
  FileArchive4,
  FileText4,
  File4,
  FileX4,
  FileCheck24,
  FileClock4,
  FileWarning4,
  FileMinus4,
  FilePlus4,
  FileSearch4,
  FileSymlink4,
  FileUp4,
  FileDown4,
  FileInput4,
  FileOutput4,
  FileHeart4,
  FileJson4,
  FilePieChart4
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ContactPerson {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
  department: string;
}

interface FormData {
  companyName: string;
  supplierType: string;
  paymentTerms: string;
  status: string;
  notes: string;
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  metadata: {
    preferredShippingMethod: string;
    minimumOrderValue: string;
    taxId: string;
    creditLimit: string;
    leadTime: string;
    qualityRating: string;
    complianceStatus: string;
    certifications: string[];
    preferredCommunication: string;
    businessHours: string;
    website: string;
    socialMedia: {
      linkedin: string;
      twitter: string;
      facebook: string;
    };
  };
}

const steps = [
  { id: 'basic', title: 'Basic Information', icon: Building2 },
  { id: 'address', title: 'Address', icon: MapPin },
  { id: 'contacts', title: 'Contacts', icon: Users },
  { id: 'additional', title: 'Additional Info', icon: Info },
  { id: 'review', title: 'Review', icon: FileCheck }
];

export default function CreateSupplierPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([]);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    supplierType: '',
    paymentTerms: '',
    status: 'active',
    notes: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    metadata: {
      preferredShippingMethod: '',
      minimumOrderValue: '',
      taxId: '',
      creditLimit: '',
      leadTime: '',
      qualityRating: '',
      complianceStatus: '',
      certifications: [],
      preferredCommunication: '',
      businessHours: '',
      website: '',
      socialMedia: {
        linkedin: '',
        twitter: '',
        facebook: '',
      },
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 0:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.supplierType) newErrors.supplierType = 'Supplier type is required';
        break;
      case 1:
        if (!formData.address.address1) newErrors['address.address1'] = 'Address is required';
        if (!formData.address.city) newErrors['address.city'] = 'City is required';
        if (!formData.address.country) newErrors['address.country'] = 'Country is required';
        break;
      case 2:
        if (contactPersons.length === 0) newErrors.contacts = 'At least one contact is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddContact = (contact: Omit<ContactPerson, 'id'>) => {
    const newContact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9)
    };
    setContactPersons(prev => [...prev, newContact]);
    setShowContactForm(false);
    toast.success('Contact added successfully');
  };

  const handleRemoveContact = (id: string) => {
    setContactPersons(prev => prev.filter(contact => contact.id !== id));
    toast.info('Contact removed');
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      console.log({ ...formData, contactPersons });
      toast.success('Supplier created successfully');
      router.push('/supplier');
    } catch (error) {
      toast.error('Failed to create supplier');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Create New Supplier</h1>
          <p className="text-sm text-gray-500 mt-1">
            Add a new supplier to your inventory management system
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-5 gap-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center p-4 rounded-lg transition-all duration-200",
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <StepIcon className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Form */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>
                        Enter the basic details about your supplier
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Enter company name"
                            className={errors.companyName ? "border-red-500" : ""}
                          />
                          {errors.companyName && (
                            <p className="text-sm text-red-500">{errors.companyName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="supplierType">Supplier Type</Label>
                          <Select
                            value={formData.supplierType}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, supplierType: value }))}
                          >
                            <SelectTrigger className={errors.supplierType ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manufacturer">Manufacturer</SelectItem>
                              <SelectItem value="distributor">Distributor</SelectItem>
                              <SelectItem value="wholesaler">Wholesaler</SelectItem>
                              <SelectItem value="retailer">Retailer</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.supplierType && (
                            <p className="text-sm text-red-500">{errors.supplierType}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="paymentTerms">Payment Terms</Label>
                          <Select
                            value={formData.paymentTerms}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select terms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="net30">Net 30</SelectItem>
                              <SelectItem value="net60">Net 60</SelectItem>
                              <SelectItem value="net90">Net 90</SelectItem>
                              <SelectItem value="immediate">Immediate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Enter any additional notes about this supplier"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Address Information</CardTitle>
                      <CardDescription>
                        Enter the supplier's physical address
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address.address1">Street Address</Label>
                        <Input
                          id="address.address1"
                          name="address.address1"
                          value={formData.address.address1}
                          onChange={handleInputChange}
                          placeholder="Enter street address"
                          className={errors['address.address1'] ? "border-red-500" : ""}
                        />
                        {errors['address.address1'] && (
                          <p className="text-sm text-red-500">{errors['address.address1']}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address.address2">Address Line 2</Label>
                        <Input
                          id="address.address2"
                          name="address.address2"
                          value={formData.address.address2}
                          onChange={handleInputChange}
                          placeholder="Enter additional address information"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="address.city">City</Label>
                          <Input
                            id="address.city"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                            className={errors['address.city'] ? "border-red-500" : ""}
                          />
                          {errors['address.city'] && (
                            <p className="text-sm text-red-500">{errors['address.city']}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address.state">State/Province</Label>
                          <Input
                            id="address.state"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address.postalCode">Postal Code</Label>
                          <Input
                            id="address.postalCode"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleInputChange}
                            placeholder="Enter postal code"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address.country">Country</Label>
                        <Input
                          id="address.country"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                          placeholder="Enter country"
                          className={errors['address.country'] ? "border-red-500" : ""}
                        />
                        {errors['address.country'] && (
                          <p className="text-sm text-red-500">{errors['address.country']}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 2 && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Contact Persons</CardTitle>
                        <CardDescription>
                          Add contact persons for this supplier
                        </CardDescription>
                      </div>
                      <Button onClick={() => setShowContactForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Contact
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {errors.contacts && (
                        <p className="text-sm text-red-500 mb-4">{errors.contacts}</p>
                      )}
                      <AnimatePresence>
                        {contactPersons.map((contact) => (
                          <motion.div
                            key={contact.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="border rounded-lg p-4 mb-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{contact.name}</h4>
                                  {contact.isPrimary && (
                                    <Badge variant="secondary">Primary</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">{contact.position}</p>
                                <p className="text-sm text-gray-500">{contact.department}</p>
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span>{contact.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span>{contact.phone}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveContact(contact.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                      <CardDescription>
                        Enter additional details about the supplier
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="metadata.preferredShippingMethod">Preferred Shipping Method</Label>
                          <Input
                            id="metadata.preferredShippingMethod"
                            name="metadata.preferredShippingMethod"
                            value={formData.metadata.preferredShippingMethod}
                            onChange={handleInputChange}
                            placeholder="Enter preferred shipping method"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="metadata.minimumOrderValue">Minimum Order Value</Label>
                          <Input
                            id="metadata.minimumOrderValue"
                            name="metadata.minimumOrderValue"
                            value={formData.metadata.minimumOrderValue}
                            onChange={handleInputChange}
                            placeholder="Enter minimum order value"
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metadata.taxId">Tax ID</Label>
                        <Input
                          id="metadata.taxId"
                          name="metadata.taxId"
                          value={formData.metadata.taxId}
                          onChange={handleInputChange}
                          placeholder="Enter tax ID"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metadata.website">Website</Label>
                        <Input
                          id="metadata.website"
                          name="metadata.website"
                          value={formData.metadata.website}
                          onChange={handleInputChange}
                          placeholder="Enter website URL"
                          type="url"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Social Media</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            placeholder="LinkedIn"
                            value={formData.metadata.socialMedia.linkedin}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              metadata: {
                                ...prev.metadata,
                                socialMedia: {
                                  ...prev.metadata.socialMedia,
                                  linkedin: e.target.value
                                }
                              }
                            }))}
                          />
                          <Input
                            placeholder="Twitter"
                            value={formData.metadata.socialMedia.twitter}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              metadata: {
                                ...prev.metadata,
                                socialMedia: {
                                  ...prev.metadata.socialMedia,
                                  twitter: e.target.value
                                }
                              }
                            }))}
                          />
                          <Input
                            placeholder="Facebook"
                            value={formData.metadata.socialMedia.facebook}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              metadata: {
                                ...prev.metadata,
                                socialMedia: {
                                  ...prev.metadata.socialMedia,
                                  facebook: e.target.value
                                }
                              }
                            }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 4 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Information</CardTitle>
                      <CardDescription>
                        Review all the information before submitting
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Company Name</p>
                            <p>{formData.companyName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Supplier Type</p>
                            <p>{formData.supplierType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Terms</p>
                            <p>{formData.paymentTerms}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p>{formData.status}</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Address</h3>
                        <div>
                          <p>{formData.address.address1}</p>
                          {formData.address.address2 && <p>{formData.address.address2}</p>}
                          <p>{`${formData.address.city}, ${formData.address.state} ${formData.address.postalCode}`}</p>
                          <p>{formData.address.country}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Contacts</h3>
                        <div className="space-y-4">
                          {contactPersons.map((contact) => (
                            <div key={contact.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{contact.name}</p>
                                  <p className="text-sm text-gray-500">{contact.position}</p>
                                </div>
                                {contact.isPrimary && (
                                  <Badge variant="secondary">Primary</Badge>
                                )}
                              </div>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm">{contact.email}</p>
                                <p className="text-sm">{contact.phone}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Additional Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Preferred Shipping Method</p>
                            <p>{formData.metadata.preferredShippingMethod}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Minimum Order Value</p>
                            <p>{formData.metadata.minimumOrderValue}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tax ID</p>
                            <p>{formData.metadata.taxId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <p>{formData.metadata.website}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Supplier</CardTitle>
                <CardDescription>
                  Review and submit the supplier information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Required Fields</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {formData.companyName ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm">Company Name</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.supplierType ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm">Supplier Type</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.address.address1 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm">Address</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Optional Fields</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {contactPersons.length > 0 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-sm">Contact Persons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.notes ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-sm">Notes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.companyName || !formData.supplierType || !formData.address.address1}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Supplier'}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Contact Dialog */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Contact Person</CardTitle>
              <CardDescription>
                Enter the contact person's details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Full Name</Label>
                <Input id="contactName" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPosition">Position</Label>
                <Input id="contactPosition" placeholder="Enter position" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactDepartment">Department</Label>
                <Input id="contactDepartment" placeholder="Enter department" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input id="contactEmail" type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input id="contactPhone" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isPrimary" />
                <Label htmlFor="isPrimary">Primary Contact</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowContactForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                const name = (document.getElementById('contactName') as HTMLInputElement).value;
                const position = (document.getElementById('contactPosition') as HTMLInputElement).value;
                const department = (document.getElementById('contactDepartment') as HTMLInputElement).value;
                const email = (document.getElementById('contactEmail') as HTMLInputElement).value;
                const phone = (document.getElementById('contactPhone') as HTMLInputElement).value;
                const isPrimary = (document.getElementById('isPrimary') as HTMLInputElement).checked;
                handleAddContact({ name, position, department, email, phone, isPrimary });
              }}>
                Add Contact
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
} 