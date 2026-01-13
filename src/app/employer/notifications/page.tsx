"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  FileText,
  Calendar,
  MessageSquare,
  Star,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "application" | "interview" | "job" | "message" | "billing" | "analytics";
  title: string;
  description: string;
  time: string;
  date: string;
  read: boolean;
  link?: string;
}

// Mock notifications for employers
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "application",
    title: "New Application Received",
    description: "John Smith applied for Senior Software Engineer position.",
    time: "10:30 AM",
    date: "Today",
    read: false,
    link: "/employer/applications",
  },
  {
    id: "2",
    type: "application",
    title: "Application Update",
    description: "Sarah Johnson accepted your interview invitation for Product Manager.",
    time: "9:15 AM",
    date: "Today",
    read: false,
    link: "/employer/applications",
  },
  {
    id: "3",
    type: "interview",
    title: "Interview Scheduled",
    description: "Interview with Michael Chen for DevOps Engineer is confirmed for tomorrow at 2:00 PM.",
    time: "8:00 AM",
    date: "Today",
    read: true,
    link: "/employer/applications",
  },
  {
    id: "4",
    type: "message",
    title: "New Message",
    description: "Emily Rodriguez sent you a message about the UX Designer position.",
    time: "4:30 PM",
    date: "Yesterday",
    read: true,
    link: "/employer/messages",
  },
  {
    id: "5",
    type: "job",
    title: "Job Posting Expiring Soon",
    description: "Your Senior Software Engineer posting will expire in 3 days. Renew to continue receiving applications.",
    time: "2:15 PM",
    date: "Yesterday",
    read: true,
    link: "/employer/jobs",
  },
  {
    id: "6",
    type: "analytics",
    title: "Weekly Performance Report",
    description: "Your job postings received 156 views and 23 applications this week.",
    time: "11:00 AM",
    date: "Jan 11, 2025",
    read: true,
    link: "/employer/analytics",
  },
  {
    id: "7",
    type: "billing",
    title: "Payment Successful",
    description: "Your monthly subscription payment of $299 was processed successfully.",
    time: "9:00 AM",
    date: "Jan 11, 2025",
    read: true,
    link: "/employer/settings",
  },
  {
    id: "8",
    type: "application",
    title: "Candidate Withdrew",
    description: "David Kim withdrew their application for Full Stack Developer position.",
    time: "3:45 PM",
    date: "Jan 10, 2025",
    read: true,
    link: "/employer/applications",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "application":
      return FileText;
    case "interview":
      return Calendar;
    case "job":
      return Star;
    case "message":
      return MessageSquare;
    case "billing":
      return DollarSign;
    case "analytics":
      return TrendingUp;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "application":
      return "bg-blue-100 text-blue-600";
    case "interview":
      return "bg-purple-100 text-purple-600";
    case "job":
      return "bg-emerald-100 text-emerald-600";
    case "message":
      return "bg-amber-100 text-amber-600";
    case "billing":
      return "bg-green-100 text-green-600";
    case "analytics":
      return "bg-indigo-100 text-indigo-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

type FilterType = "all" | "unread" | "application" | "interview" | "job" | "message" | "billing" | "analytics";

export default function EmployerNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    const matchesFilter = filter === "all" || filter === "unread" ? true : n.type === filter;
    const matchesUnread = filter === "unread" ? !n.read : true;
    const matchesSearch = searchQuery
      ? n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesFilter && matchesUnread && matchesSearch;
  });

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter((n) => !n.read));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={deleteAllRead} className="gap-2 text-gray-600">
            <Trash2 className="w-4 h-4" />
            Clear read
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.type === "application").length}
              </p>
              <p className="text-sm text-gray-500">Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.type === "interview").length}
              </p>
              <p className="text-sm text-gray-500">Interviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.type === "message").length}
              </p>
              <p className="text-sm text-gray-500">Messages</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-500">Unread</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="application">Applications</option>
              <option value="interview">Interviews</option>
              <option value="job">Job Alerts</option>
              <option value="message">Messages</option>
              <option value="billing">Billing</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {Object.keys(groupedNotifications).length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No notifications</h3>
          <p className="text-gray-600 mt-2">
            {filter !== "all" || searchQuery
              ? "No notifications match your filter criteria"
              : "You're all caught up! Check back later for updates."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">{date}</h3>
              <div className="bg-white rounded-xl border divide-y">
                {dateNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);

                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors",
                        !notification.read && "bg-blue-50/30"
                      )}
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", colorClass)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {notification.link ? (
                          <Link
                            href={notification.link}
                            onClick={() => markAsRead(notification.id)}
                            className="block"
                          >
                            <p className={cn(
                              "text-sm",
                              notification.read ? "text-gray-700" : "text-gray-900 font-semibold"
                            )}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.description}
                            </p>
                          </Link>
                        ) : (
                          <>
                            <p className={cn(
                              "text-sm",
                              notification.read ? "text-gray-700" : "text-gray-900 font-semibold"
                            )}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.description}
                            </p>
                          </>
                        )}
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification Settings Link */}
      <div className="bg-gray-50 rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Notification Settings</p>
            <p className="text-sm text-gray-600">Manage your email and push notification preferences</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/employer/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
