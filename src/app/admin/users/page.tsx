"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Download,
  Mail,
  MoreHorizontal,
  UserPlus,
  Shield,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Ban,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock users data
const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "candidate",
    status: "active",
    joinedAt: "2025-01-10",
    lastActive: "2025-01-13T10:30:00Z",
    applications: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@techcorp.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "employer",
    company: "TechCorp Inc.",
    status: "active",
    joinedAt: "2025-01-05",
    lastActive: "2025-01-13T09:15:00Z",
    jobsPosted: 8,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    role: "candidate",
    status: "active",
    joinedAt: "2025-01-08",
    lastActive: "2025-01-12T14:45:00Z",
    applications: 3,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@startupxyz.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    role: "employer",
    company: "StartupXYZ",
    status: "active",
    joinedAt: "2024-12-15",
    lastActive: "2025-01-13T08:20:00Z",
    jobsPosted: 12,
  },
  {
    id: "5",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    role: "candidate",
    status: "suspended",
    joinedAt: "2024-11-20",
    lastActive: "2024-12-01T16:00:00Z",
    applications: 0,
  },
  {
    id: "6",
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    role: "candidate",
    status: "active",
    joinedAt: "2025-01-11",
    lastActive: "2025-01-13T07:30:00Z",
    applications: 2,
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa@designco.com",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    role: "employer",
    company: "DesignCo",
    status: "pending",
    joinedAt: "2025-01-12",
    lastActive: "2025-01-12T11:45:00Z",
    jobsPosted: 0,
  },
  {
    id: "8",
    name: "Admin User",
    email: "admin@humanlystaffing.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-01",
    lastActive: "2025-01-13T10:00:00Z",
  },
];

const roleConfig: Record<string, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  candidate: { label: "Candidate", bg: "bg-blue-100", text: "text-blue-700", icon: User },
  employer: { label: "Employer", bg: "bg-purple-100", text: "text-purple-700", icon: Building2 },
  admin: { label: "Admin", bg: "bg-amber-100", text: "text-amber-700", icon: Shield },
};

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  active: { label: "Active", bg: "bg-emerald-100", text: "text-emerald-700" },
  pending: { label: "Pending", bg: "bg-amber-100", text: "text-amber-700" },
  suspended: { label: "Suspended", bg: "bg-red-100", text: "text-red-700" },
};

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Online";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return formatDate(dateString);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage all platform users</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-2xl font-bold text-blue-600">
            {users.filter((u) => u.role === "candidate").length}
          </p>
          <p className="text-sm text-gray-600">Candidates</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-2xl font-bold text-purple-600">
            {users.filter((u) => u.role === "employer").length}
          </p>
          <p className="text-sm text-gray-600">Employers</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-2xl font-bold text-emerald-600">
            {users.filter((u) => u.status === "active").length}
          </p>
          <p className="text-sm text-gray-600">Active</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="candidate">Candidates</option>
          <option value="employer">Employers</option>
          <option value="admin">Admins</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700 font-medium">
            {selectedUsers.length} selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button size="sm" variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Activate
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
              <Ban className="w-4 h-4 mr-2" />
              Suspend
            </Button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-900 font-medium">No users found</p>
                    <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const RoleIcon = roleConfig[user.role].icon;
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleSelect(user.id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                            roleConfig[user.role].bg
                          } ${roleConfig[user.role].text}`}
                        >
                          <RoleIcon className="w-3.5 h-3.5" />
                          {roleConfig[user.role].label}
                        </span>
                        {'company' in user && user.company && (
                          <p className="text-xs text-gray-500 mt-1">{user.company}</p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                            statusConfig[user.status].bg
                          } ${statusConfig[user.status].text}`}
                        >
                          {statusConfig[user.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-600">{formatDate(user.joinedAt)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-600">{formatLastActive(user.lastActive)}</p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
