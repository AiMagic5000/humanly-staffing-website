"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Star,
  StarOff,
  ChevronLeft,
  Phone,
  Video,
  Info,
  Filter,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar: string;
    role: string;
    appliedFor: string;
    online: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  starred: boolean;
  status: "active" | "interviewing" | "hired" | "archived";
  messages: Message[];
}

// Mock conversations data for employer
const mockConversations: Conversation[] = [
  {
    id: "1",
    contact: {
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      role: "Senior Software Engineer",
      appliedFor: "Full Stack Developer",
      online: true,
    },
    lastMessage: "Thank you for the opportunity! I'm available for the interview.",
    timestamp: "10:30 AM",
    unread: true,
    starred: true,
    status: "interviewing",
    messages: [
      {
        id: "m1",
        content: "Hi John! We've reviewed your application for the Full Stack Developer position and we're impressed with your experience.",
        timestamp: "Yesterday 2:30 PM",
        isOwn: true,
      },
      {
        id: "m2",
        content: "Thank you so much for reaching out! I'm very excited about this opportunity.",
        timestamp: "Yesterday 3:15 PM",
        isOwn: false,
      },
      {
        id: "m3",
        content: "Would you be available for a technical interview next Tuesday at 2 PM PST?",
        timestamp: "Yesterday 4:00 PM",
        isOwn: true,
      },
      {
        id: "m4",
        content: "Thank you for the opportunity! I'm available for the interview.",
        timestamp: "Today 10:30 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    contact: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      role: "Product Manager",
      appliedFor: "Senior Product Manager",
      online: false,
    },
    lastMessage: "I have attached my portfolio for your review.",
    timestamp: "Yesterday",
    unread: false,
    starred: false,
    status: "active",
    messages: [
      {
        id: "m1",
        content: "Hello Sarah, thank you for applying to our Senior Product Manager position.",
        timestamp: "2 days ago",
        isOwn: true,
      },
      {
        id: "m2",
        content: "I have attached my portfolio for your review.",
        timestamp: "Yesterday",
        isOwn: false,
      },
    ],
  },
  {
    id: "3",
    contact: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      role: "DevOps Engineer",
      appliedFor: "Cloud Infrastructure Engineer",
      online: true,
    },
    lastMessage: "Looking forward to hearing from you!",
    timestamp: "Jan 10",
    unread: false,
    starred: true,
    status: "active",
    messages: [
      {
        id: "m1",
        content: "Looking forward to hearing from you!",
        timestamp: "Jan 10",
        isOwn: false,
      },
    ],
  },
  {
    id: "4",
    contact: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      role: "UX Designer",
      appliedFor: "Lead UX Designer",
      online: false,
    },
    lastMessage: "Welcome aboard! We're excited to have you join the team.",
    timestamp: "Jan 8",
    unread: false,
    starred: false,
    status: "hired",
    messages: [
      {
        id: "m1",
        content: "Welcome aboard! We're excited to have you join the team.",
        timestamp: "Jan 8",
        isOwn: true,
      },
    ],
  },
];

type FilterType = "all" | "unread" | "starred" | "interviewing" | "hired";

export default function EmployerMessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.contact.appliedFor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && conv.unread) ||
      (filter === "starred" && conv.starred) ||
      (filter === "interviewing" && conv.status === "interviewing") ||
      (filter === "hired" && conv.status === "hired");

    return matchesSearch && matchesFilter;
  });

  const unreadCount = conversations.filter((c) => c.unread).length;

  const toggleStar = (id: string) => {
    setConversations(
      conversations.map((c) =>
        c.id === id ? { ...c, starred: !c.starred } : c
      )
    );
    if (selectedConversation?.id === id) {
      setSelectedConversation({
        ...selectedConversation,
        starred: !selectedConversation.starred,
      });
    }
  };

  const selectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setShowMobileConversation(true);
    if (conv.unread) {
      setConversations(
        conversations.map((c) =>
          c.id === conv.id ? { ...c, unread: false } : c
        )
      );
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      content: newMessage,
      timestamp: "Just now",
      isOwn: true,
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMsg],
      lastMessage: newMessage,
      timestamp: "Just now",
    };

    setConversations(
      conversations.map((c) =>
        c.id === selectedConversation.id ? updatedConversation : c
      )
    );
    setSelectedConversation(updatedConversation);
    setNewMessage("");
  };

  const getStatusBadge = (status: Conversation["status"]) => {
    switch (status) {
      case "interviewing":
        return "bg-purple-100 text-purple-700";
      case "hired":
        return "bg-emerald-100 text-emerald-700";
      case "archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""} from candidates`
              : "All messages read"}
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Message Candidate
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white rounded-xl border overflow-hidden flex">
        {/* Conversations list */}
        <div
          className={cn(
            "w-full md:w-80 lg:w-96 border-r flex flex-col",
            showMobileConversation && "hidden md:flex"
          )}
        >
          {/* Search and Filter */}
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="flex-1 px-2 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="starred">Starred</option>
                <option value="interviewing">Interviewing</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv)}
                  className={cn(
                    "w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b text-left",
                    selectedConversation?.id === conv.id && "bg-blue-50",
                    conv.unread && "bg-blue-50/50"
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conv.contact.avatar}
                      alt={conv.contact.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    {conv.contact.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "font-medium text-gray-900 truncate",
                          conv.unread && "font-semibold"
                        )}
                      >
                        {conv.contact.name}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {conv.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-gray-500 truncate">
                        Applied: {conv.contact.appliedFor}
                      </p>
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full capitalize",
                          getStatusBadge(conv.status)
                        )}
                      >
                        {conv.status}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-sm text-gray-600 truncate mt-1",
                        conv.unread && "font-medium text-gray-900"
                      )}
                    >
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.starred && (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Conversation view */}
        <div
          className={cn(
            "flex-1 flex flex-col",
            !showMobileConversation && "hidden md:flex"
          )}
        >
          {selectedConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowMobileConversation(false)}
                    className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <Image
                      src={selectedConversation.contact.avatar}
                      alt={selectedConversation.contact.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    {selectedConversation.contact.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">
                        {selectedConversation.contact.name}
                      </p>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full capitalize",
                          getStatusBadge(selectedConversation.status)
                        )}
                      >
                        {selectedConversation.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.contact.role} • Applied for{" "}
                      {selectedConversation.contact.appliedFor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Video className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleStar(selectedConversation.id)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    {selectedConversation.starred ? (
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ) : (
                      <StarOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Info className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.isOwn ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2",
                        msg.isOwn
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          msg.isOwn ? "text-blue-200" : "text-gray-500"
                        )}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <p className="font-medium">Select a conversation</p>
                <p className="text-sm mt-1">
                  Choose a candidate conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
