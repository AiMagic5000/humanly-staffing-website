"use client";

import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  RefreshCw,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SystemNotification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  category: "system" | "security" | "billing" | "user" | "job" | "application";
  title: string;
  description: string;
  time: string;
  date: string;
  read: boolean;
  actionRequired: boolean;
}

// Mock system notifications for admin
const mockNotifications: SystemNotification[] = [
  {
    id: "1",
    type: "error",
    category: "system",
    title: "Database Connection Issue",
    description: "Intermittent connection failures detected in the application database. Auto-recovery in progress.",
    time: "10:30 AM",
    date: "Today",
    read: false,
    actionRequired: true,
  },
  {
    id: "2",
    type: "warning",
    category: "security",
    title: "Unusual Login Activity",
    description: "Multiple failed login attempts detected from IP 192.168.1.45. Consider reviewing security logs.",
    time: "9:15 AM",
    date: "Today",
    read: false,
    actionRequired: true,
  },
  {
    id: "3",
    type: "success",
    category: "billing",
    title: "Payment Processing Complete",
    description: "Monthly subscription payments processed successfully. 45 transactions completed.",
    time: "8:00 AM",
    date: "Today",
    read: true,
    actionRequired: false,
  },
  {
    id: "4",
    type: "info",
    category: "user",
    title: "New Employer Registration",
    description: "TechCorp Inc. completed employer registration. Awaiting profile verification.",
    time: "4:30 PM",
    date: "Yesterday",
    read: true,
    actionRequired: false,
  },
  {
    id: "5",
    type: "warning",
    category: "job",
    title: "Job Posting Flagged",
    description: "Job posting #1234 has been flagged for review due to policy violation reports.",
    time: "2:15 PM",
    date: "Yesterday",
    read: true,
    actionRequired: true,
  },
  {
    id: "6",
    type: "info",
    category: "application",
    title: "High Application Volume",
    description: "Senior Software Engineer position received 50+ applications in the last 24 hours.",
    time: "11:00 AM",
    date: "Jan 11, 2025",
    read: true,
    actionRequired: false,
  },
  {
    id: "7",
    type: "success",
    category: "system",
    title: "System Update Complete",
    description: "Platform successfully updated to version 2.4.0. All services running normally.",
    time: "3:00 AM",
    date: "Jan 11, 2025",
    read: true,
    actionRequired: false,
  },
  {
    id: "8",
    type: "error",
    category: "billing",
    title: "Payment Failed",
    description: "Subscription payment for StartupXYZ failed. Customer notified via email.",
    time: "9:45 PM",
    date: "Jan 10, 2025",
    read: true,
    actionRequired: true,
  },
];

const getTypeIcon = (type: SystemNotification["type"]) => {
  switch (type) {
    case "error":
      return XCircle;
    case "warning":
      return AlertTriangle;
    case "success":
      return CheckCircle;
    case "info":
    default:
      return Info;
  }
};

const getTypeColor = (type: SystemNotification["type"]) => {
  switch (type) {
    case "error":
      return "bg-red-100 text-red-600";
    case "warning":
      return "bg-amber-100 text-amber-600";
    case "success":
      return "bg-emerald-100 text-emerald-600";
    case "info":
    default:
      return "bg-blue-100 text-blue-600";
  }
};

const getCategoryLabel = (category: SystemNotification["category"]) => {
  switch (category) {
    case "system":
      return "System";
    case "security":
      return "Security";
    case "billing":
      return "Billing";
    case "user":
      return "Users";
    case "job":
      return "Jobs";
    case "application":
      return "Applications";
    default:
      return category;
  }
};

type FilterType = "all" | "unread" | "actionRequired" | "error" | "warning" | "success" | "info";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    actionRequired: notifications.filter((n) => n.actionRequired).length,
    errors: notifications.filter((n) => n.type === "error").length,
  };

  const filteredNotifications = notifications.filter((n) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !n.read) ||
      (filter === "actionRequired" && n.actionRequired) ||
      n.type === filter;

    const matchesSearch = searchQuery
      ? n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesFilter && matchesSearch;
  });

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, SystemNotification[]>);

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

  const clearResolved = () => {
    setNotifications(notifications.filter((n) => n.actionRequired || !n.read));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Notifications</h1>
          <p className="text-gray-600 mt-1">Monitor platform alerts and system events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Info className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              <p className="text-sm text-gray-500">Unread</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.actionRequired}</p>
              <p className="text-sm text-gray-500">Action Required</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.errors}</p>
              <p className="text-sm text-gray-500">Errors</p>
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
              <option value="actionRequired">Action Required</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            {stats.unread > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={clearResolved} className="gap-2 text-gray-600">
              <Trash2 className="w-4 h-4" />
              Clear resolved
            </Button>
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
              : "System is running smoothly. No alerts at this time."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">{date}</h3>
              <div className="bg-white rounded-xl border divide-y">
                {dateNotifications.map((notification) => {
                  const Icon = getTypeIcon(notification.type);
                  const colorClass = getTypeColor(notification.type);

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
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "text-sm",
                            notification.read ? "text-gray-700" : "text-gray-900 font-semibold"
                          )}>
                            {notification.title}
                          </p>
                          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            {getCategoryLabel(notification.category)}
                          </span>
                          {notification.actionRequired && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                              Action Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.description}
                        </p>
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
    </div>
  );
}
