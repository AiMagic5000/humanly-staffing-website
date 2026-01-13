"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Download,
  Mail,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock applications data
const applications = [
  {
    id: "1",
    candidate: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      location: "San Francisco, CA",
    },
    job: {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
    },
    appliedAt: "2025-01-13T10:30:00Z",
    status: "new",
  },
  {
    id: "2",
    candidate: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      location: "New York, NY",
    },
    job: {
      id: "2",
      title: "Product Manager",
      company: "StartupXYZ",
    },
    appliedAt: "2025-01-13T08:15:00Z",
    status: "reviewing",
  },
  {
    id: "3",
    candidate: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      location: "Austin, TX",
    },
    job: {
      id: "3",
      title: "UX Designer",
      company: "DesignCo",
    },
    appliedAt: "2025-01-12T14:45:00Z",
    status: "shortlisted",
  },
  {
    id: "4",
    candidate: {
      name: "David Kim",
      email: "david.kim@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      location: "Seattle, WA",
    },
    job: {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
    },
    appliedAt: "2025-01-12T09:20:00Z",
    status: "interviewed",
  },
  {
    id: "5",
    candidate: {
      name: "Jennifer Lee",
      email: "jennifer.lee@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      location: "Los Angeles, CA",
    },
    job: {
      id: "4",
      title: "Marketing Manager",
      company: "BrandBoost",
    },
    appliedAt: "2025-01-11T16:00:00Z",
    status: "hired",
  },
  {
    id: "6",
    candidate: {
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      location: "Chicago, IL",
    },
    job: {
      id: "5",
      title: "Data Analyst",
      company: "DataDriven",
    },
    appliedAt: "2025-01-11T11:30:00Z",
    status: "rejected",
  },
  {
    id: "7",
    candidate: {
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
      location: "Denver, CO",
    },
    job: {
      id: "2",
      title: "Product Manager",
      company: "StartupXYZ",
    },
    appliedAt: "2025-01-10T09:45:00Z",
    status: "new",
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  new: { label: "New", bg: "bg-blue-100", text: "text-blue-700" },
  reviewing: { label: "Reviewing", bg: "bg-amber-100", text: "text-amber-700" },
  shortlisted: { label: "Shortlisted", bg: "bg-purple-100", text: "text-purple-700" },
  interviewed: { label: "Interviewed", bg: "bg-emerald-100", text: "text-emerald-700" },
  offered: { label: "Offered", bg: "bg-green-100", text: "text-green-700" },
  hired: { label: "Hired", bg: "bg-green-100", text: "text-green-700" },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700" },
};

export default function AdminApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map((a) => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedApplications((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">
            Manage and review all job applications
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        <button
          onClick={() => setStatusFilter("all")}
          className={`p-3 rounded-lg border text-center transition-all ${
            statusFilter === "all" ? "border-gray-900 bg-gray-50" : "bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-lg font-bold text-gray-900">{applications.length}</p>
          <p className="text-xs text-gray-600">Total</p>
        </button>
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = applications.filter((a) => a.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`p-3 rounded-lg border text-center transition-all ${
                statusFilter === key
                  ? `${config.bg} border-current`
                  : "bg-white hover:border-gray-300"
              }`}
            >
              <p className={`text-lg font-bold ${statusFilter === key ? config.text : "text-gray-900"}`}>
                {count}
              </p>
              <p className={`text-xs ${statusFilter === key ? config.text : "text-gray-600"}`}>
                {config.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name, email, job, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedApplications.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700 font-medium">
            {selectedApplications.length} selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Change Status
            </Button>
            <Button size="sm" variant="outline">
              Send Email
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applied For
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-900 font-medium">No applications found</p>
                    <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(application.id)}
                        onChange={() => toggleSelect(application.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={application.candidate.avatar}
                          alt={application.candidate.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{application.candidate.name}</p>
                          <p className="text-sm text-gray-600">{application.candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">{application.job.title}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-gray-600">{application.job.company}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600">{formatDate(application.appliedAt)}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                          statusConfig[application.status].bg
                        } ${statusConfig[application.status].text}`}
                      >
                        {statusConfig[application.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredApplications.length}</span> of{" "}
            <span className="font-medium">{applications.length}</span> results
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
