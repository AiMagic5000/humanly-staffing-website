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
  Flag,
  CheckCircle,
  Clock,
  AlertCircle,
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

interface SupportTicket {
  id: string;
  contact: {
    name: string;
    avatar: string;
    email: string;
    type: "candidate" | "employer";
    company?: string;
  };
  subject: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  starred: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "pending" | "resolved" | "closed";
  messages: Message[];
}

// Mock support tickets data
const mockTickets: SupportTicket[] = [
  {
    id: "TKT-001",
    contact: {
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      email: "john.smith@email.com",
      type: "candidate",
    },
    subject: "Cannot access my application status",
    lastMessage: "I've been trying to check my application but the page keeps loading.",
    timestamp: "10:30 AM",
    unread: true,
    starred: true,
    priority: "high",
    status: "open",
    messages: [
      {
        id: "m1",
        content: "Hi, I applied for a Software Engineer position last week but I cannot access my application status. The dashboard keeps showing a loading spinner.",
        timestamp: "Today 10:15 AM",
        isOwn: false,
      },
      {
        id: "m2",
        content: "I've been trying to check my application but the page keeps loading.",
        timestamp: "Today 10:30 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: "TKT-002",
    contact: {
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      email: "sarah@techcorp.com",
      type: "employer",
      company: "TechCorp Inc.",
    },
    subject: "Billing inquiry - Invoice discrepancy",
    lastMessage: "Thank you for looking into this matter.",
    timestamp: "Yesterday",
    unread: false,
    starred: false,
    priority: "medium",
    status: "pending",
    messages: [
      {
        id: "m1",
        content: "Hello, I noticed a discrepancy in our latest invoice. We were charged for 10 job postings but only posted 8.",
        timestamp: "Yesterday 2:30 PM",
        isOwn: false,
      },
      {
        id: "m2",
        content: "Hi Sarah, thank you for reaching out. I'm looking into this right now and will get back to you shortly.",
        timestamp: "Yesterday 3:00 PM",
        isOwn: true,
      },
      {
        id: "m3",
        content: "Thank you for looking into this matter.",
        timestamp: "Yesterday 3:15 PM",
        isOwn: false,
      },
    ],
  },
  {
    id: "TKT-003",
    contact: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      email: "m.chen@startup.io",
      type: "employer",
      company: "StartupXYZ",
    },
    subject: "Feature request - Bulk candidate export",
    lastMessage: "This would really help streamline our hiring process.",
    timestamp: "Jan 10",
    unread: false,
    starred: true,
    priority: "low",
    status: "open",
    messages: [
      {
        id: "m1",
        content: "Would it be possible to add a feature to export all candidate applications to CSV? This would really help streamline our hiring process.",
        timestamp: "Jan 10",
        isOwn: false,
      },
    ],
  },
  {
    id: "TKT-004",
    contact: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      email: "emily.r@email.com",
      type: "candidate",
    },
    subject: "Account verification issue",
    lastMessage: "Your account has been verified. Let us know if you have any other questions!",
    timestamp: "Jan 8",
    unread: false,
    starred: false,
    priority: "medium",
    status: "resolved",
    messages: [
      {
        id: "m1",
        content: "I'm having trouble verifying my email address. The verification link seems to be expired.",
        timestamp: "Jan 8 10:00 AM",
        isOwn: false,
      },
      {
        id: "m2",
        content: "I've resent you a new verification link. Please check your inbox.",
        timestamp: "Jan 8 10:30 AM",
        isOwn: true,
      },
      {
        id: "m3",
        content: "Your account has been verified. Let us know if you have any other questions!",
        timestamp: "Jan 8 11:00 AM",
        isOwn: true,
      },
    ],
  },
  {
    id: "TKT-005",
    contact: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      email: "david@cloudservices.com",
      type: "employer",
      company: "CloudServices Co.",
    },
    subject: "URGENT: Job posting removed without notice",
    lastMessage: "Our job posting for Senior Engineer was removed. We need this restored ASAP.",
    timestamp: "2 hours ago",
    unread: true,
    starred: false,
    priority: "urgent",
    status: "open",
    messages: [
      {
        id: "m1",
        content: "Our job posting for Senior Engineer was removed. We need this restored ASAP. We have interviews scheduled for this week!",
        timestamp: "2 hours ago",
        isOwn: false,
      },
    ],
  },
];

type FilterType = "all" | "open" | "pending" | "resolved" | "urgent";

export default function AdminMessagesPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "open" && ticket.status === "open") ||
      (filter === "pending" && ticket.status === "pending") ||
      (filter === "resolved" && ticket.status === "resolved") ||
      (filter === "urgent" && ticket.priority === "urgent");

    return matchesSearch && matchesFilter;
  });

  const stats = {
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "pending").length,
    urgent: tickets.filter((t) => t.priority === "urgent").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  };

  const toggleStar = (id: string) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t))
    );
    if (selectedTicket?.id === id) {
      setSelectedTicket({
        ...selectedTicket,
        starred: !selectedTicket.starred,
      });
    }
  };

  const selectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowMobileConversation(true);
    if (ticket.unread) {
      setTickets(tickets.map((t) => (t.id === ticket.id ? { ...t, unread: false } : t)));
    }
  };

  const updateStatus = (status: SupportTicket["status"]) => {
    if (!selectedTicket) return;
    const updated = { ...selectedTicket, status };
    setTickets(tickets.map((t) => (t.id === selectedTicket.id ? updated : t)));
    setSelectedTicket(updated);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      content: newMessage,
      timestamp: "Just now",
      isOwn: true,
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMsg],
      lastMessage: newMessage,
      timestamp: "Just now",
    };

    setTickets(tickets.map((t) => (t.id === selectedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
    setNewMessage("");
  };

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
              <p className="text-sm text-gray-500">Open Tickets</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Flag className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
              <p className="text-sm text-gray-500">Urgent</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
              <p className="text-sm text-gray-500">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="h-[calc(100vh-20rem)] bg-white rounded-xl border overflow-hidden flex">
        {/* Tickets list */}
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
                placeholder="Search tickets..."
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
                <option value="all">All Tickets</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="urgent">Urgent Only</option>
              </select>
            </div>
          </div>

          {/* Ticket list */}
          <div className="flex-1 overflow-y-auto">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No tickets found</div>
            ) : (
              filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => selectTicket(ticket)}
                  className={cn(
                    "w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b text-left",
                    selectedTicket?.id === ticket.id && "bg-blue-50",
                    ticket.unread && "bg-blue-50/50"
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={ticket.contact.avatar}
                      alt={ticket.contact.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    {ticket.priority === "urgent" && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <Flag className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "font-medium text-gray-900 truncate text-sm",
                          ticket.unread && "font-semibold"
                        )}
                      >
                        {ticket.contact.name}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {ticket.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{ticket.id}</span>
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded capitalize",
                          ticket.contact.type === "employer"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {ticket.contact.type}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 truncate mt-1">
                      {ticket.subject}
                    </p>
                    <p
                      className={cn(
                        "text-xs text-gray-500 truncate mt-0.5",
                        ticket.unread && "text-gray-700"
                      )}
                    >
                      {ticket.lastMessage}
                    </p>
                  </div>
                  {ticket.starred && (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Conversation view */}
        <div
          className={cn("flex-1 flex flex-col", !showMobileConversation && "hidden md:flex")}
        >
          {selectedTicket ? (
            <>
              {/* Ticket header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowMobileConversation(false)}
                      className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <Image
                        src={selectedTicket.contact.avatar}
                        alt={selectedTicket.contact.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {selectedTicket.contact.name}
                        </p>
                        <span
                          className={cn(
                            "text-xs px-1.5 py-0.5 rounded capitalize",
                            selectedTicket.contact.type === "employer"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {selectedTicket.contact.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {selectedTicket.contact.email}
                        {selectedTicket.contact.company &&
                          ` • ${selectedTicket.contact.company}`}
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
                      onClick={() => toggleStar(selectedTicket.id)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      {selectedTicket.starred ? (
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

                {/* Ticket info bar */}
                <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Ticket:</span>
                    <span className="text-xs font-medium">{selectedTicket.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Priority:</span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full capitalize font-medium",
                        getPriorityBadge(selectedTicket.priority)
                      )}
                    >
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Status:</span>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) =>
                        updateStatus(e.target.value as SupportTicket["status"])
                      }
                      className={cn(
                        "text-xs px-2 py-1 rounded-full capitalize font-medium border-0 cursor-pointer",
                        getStatusBadge(selectedTicket.status)
                      )}
                    >
                      <option value="open">Open</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="flex-1 text-right">
                    <span className="text-xs text-gray-500">
                      Subject: <span className="text-gray-700">{selectedTicket.subject}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2",
                        msg.isOwn ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
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
                    placeholder="Type a response..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()} size="icon">
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
                <p className="font-medium">Select a support ticket</p>
                <p className="text-sm mt-1">Choose a ticket from the list to respond</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
