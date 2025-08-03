'use client';

import React, { useState } from 'react';
import { 
  Search,
  Mail,
  Star,
  Inbox,
  Archive,
  Trash2,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Download,
  User,
  Tag,
  Flag
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination } from '@/components/ui/pagination';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Message {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  preview: string;
  date: string;
  status: 'unread' | 'read' | 'archived' | 'spam';
  priority: 'high' | 'medium' | 'low';
  labels?: string[];
}

const messages: Message[] = [
  {
    id: '1',
    subject: 'Question about my recent order',
    sender: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    preview: "Hi, I wanted to ask about the status of my order #1234. It's been a week and I haven't received any updates...",
    date: '2024-02-25T10:00:00',
    status: 'unread',
    priority: 'high',
    labels: ['Order', 'Support']
  },
  {
    id: '2',
    subject: 'Product availability inquiry',
    sender: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    preview: "Hello, I'm interested in purchasing the limited edition product but it shows as out of stock...",
    date: '2024-02-24T15:30:00',
    status: 'read',
    priority: 'medium',
    labels: ['Product']
  },
  {
    id: '3',
    subject: 'Return request for damaged item',
    sender: {
      name: 'Bob Wilson',
      email: 'bob@example.com',
    },
    preview: 'Unfortunately, the item I received was damaged during shipping. I would like to request a return...',
    date: '2024-02-24T09:15:00',
    status: 'unread',
    priority: 'high',
    labels: ['Returns', 'Urgent']
  }
];

export default function InboxPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages(prev => 
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const getPriorityBadge = (priority: Message['priority']) => {
    const variants = {
      high: 'bg-red-50 text-red-700 border-red-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      low: 'bg-green-50 text-green-700 border-green-200'
    };
    return <Badge variant="outline" className={variants[priority]}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="flex h-16 items-center justify-between py-4">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Inbox</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {messages.filter(m => m.status === 'unread').length} unread messages
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile menu button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="sm:hidden">
                    <Filter className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Desktop buttons */}
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Select>
                <SelectTrigger className="w-[130px] hidden sm:flex">
                  <SelectValue placeholder="All messages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto py-4 sm:py-6 px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="p-3 sm:p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                Total Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-2xl font-semibold">{messages.length}</div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                All time
              </div>
            </CardContent>
          </Card>
          <Card className="p-3 sm:p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                Unread
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-2xl font-semibold text-blue-600">
                {messages.filter(m => m.status === 'unread').length}
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Needs attention
              </div>
            </CardContent>
          </Card>
          <Card className="p-3 sm:p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-2xl font-semibold text-red-600">
                {messages.filter(m => m.priority === 'high').length}
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Urgent messages
              </div>
            </CardContent>
          </Card>
          <Card className="p-3 sm:p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                Response Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-2xl font-semibold text-green-600">98%</div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last 30 days
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-lg border shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search messages..."
                className="pl-9 bg-gray-50/50"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
                <Star className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Starred</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
                <Archive className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Archive</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-red-600 hover:text-red-700 text-xs sm:text-sm">
                <Trash2 className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`
                p-3 sm:p-4 rounded-lg border bg-white hover:shadow-md transition-all duration-200 cursor-pointer
                ${message.status === 'unread' ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'}
              `}
              onClick={() => toggleMessageSelection(message.id)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border flex items-center justify-center shrink-0">
                  {message.sender.avatar ? (
                    <img
                      src={message.sender.avatar}
                      alt={message.sender.name}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <span className="text-sm sm:text-base font-medium text-gray-600">
                      {message.sender.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <div className="font-medium text-sm sm:text-base truncate">{message.subject}</div>
                    <div className="flex items-center gap-2 shrink-0 text-xs sm:text-sm">
                      {getPriorityBadge(message.priority)}
                      <span className="text-gray-500">
                        {new Date(message.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{message.sender.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{message.preview}</div>
                  {message.labels && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                      {message.labels.map((label, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem>
                      <Mail className="w-4 h-4 mr-2" />
                      Mark as read
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="w-4 h-4 mr-2" />
                      Star message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="w-4 h-4 mr-2" />
                      Add label
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalItems={messages.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            itemName="messages"
          />
        </div>
      </div>
    </div>
  );
} 