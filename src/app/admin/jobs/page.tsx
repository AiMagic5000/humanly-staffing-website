"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salary: string;
  status: "active" | "paused" | "closed" | "draft";
  applications: number;
  views: number;
  postedDate: string;
  expiresDate: string;
  featured: boolean;
}

// Mock jobs data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    companyLogo: "TC",
    location: "San Francisco, CA",
    type: "full-time",
    salary: "$150,000 - $200,000",
    status: "active",
    applications: 45,
    views: 1234,
    postedDate: "2025-01-10",
    expiresDate: "2025-02-10",
    featured: true,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    companyLogo: "SX",
    location: "New York, NY",
    type: "full-time",
    salary: "$120,000 - $160,000",
    status: "active",
    applications: 32,
    views: 856,
    postedDate: "2025-01-08",
    expiresDate: "2025-02-08",
    featured: false,
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignCo",
    companyLogo: "DC",
    location: "Remote",
    type: "remote",
    salary: "$90,000 - $120,000",
    status: "paused",
    applications: 28,
    views: 542,
    postedDate: "2025-01-05",
    expiresDate: "2025-02-05",
    featured: false,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudServices Co.",
    companyLogo: "CS",
    location: "Seattle, WA",
    type: "full-time",
    salary: "$130,000 - $170,000",
    status: "active",
    applications: 19,
    views: 421,
    postedDate: "2025-01-12",
    expiresDate: "2025-02-12",
    featured: true,
  },
  {
    id: "5",
    title: "Marketing Coordinator",
    company: "GrowthScale",
    companyLogo: "GS",
    location: "Austin, TX",
    type: "full-time",
    salary: "$55,000 - $70,000",
    status: "closed",
    applications: 67,
    views: 1567,
    postedDate: "2024-12-15",
    expiresDate: "2025-01-15",
    featured: false,
  },
  {
    id: "6",
    title: "Data Analyst",
    company: "DataDriven Inc.",
    companyLogo: "DD",
    location: "Chicago, IL",
    type: "contract",
    salary: "$75/hour",
    status: "draft",
    applications: 0,
    views: 0,
    postedDate: "2025-01-13",
    expiresDate: "2025-02-13",
    featured: false,
  },
];

type FilterType = "all" | "active" | "paused" | "closed" | "draft" | "featured";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "featured" && job.featured) ||
      job.status === filter;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    totalApplications: jobs.reduce((sum, j) => sum + j.applications, 0),
    featured: jobs.filter((j) => j.featured).length,
  };

  const toggleJobSelection = (id: string) => {
    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map((j) => j.id));
    }
  };

  const updateJobStatus = (id: string, status: Job["status"]) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));
    setShowActions(null);
  };

  const toggleFeatured = (id: string) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, featured: !j.featured } : j)));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));
    setShowActions(null);
  };

  const getStatusBadge = (status: Job["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "paused":
        return "bg-yellow-100 text-yellow-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      case "draft":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: Job["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "paused":
        return <Clock className="w-3.5 h-3.5" />;
      case "closed":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-1">Manage all job listings on the platform</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-sm text-gray-500">Active Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
              <p className="text-sm text-gray-500">Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
              <p className="text-sm text-gray-500">Featured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs by title or company..."
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
              <option value="all">All Jobs</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm text-blue-800">
            <strong>{selectedJobs.length}</strong> job{selectedJobs.length > 1 ? "s" : ""} selected
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Activate All
            </Button>
            <Button variant="outline" size="sm">
              Pause All
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              Delete All
            </Button>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Job
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Posted
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => toggleJobSelection(job.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                        {job.companyLogo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{job.title}</p>
                          {job.featured && (
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>{job.company}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                        getStatusBadge(job.status)
                      )}
                    >
                      {getStatusIcon(job.status)}
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{job.applications}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{job.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-600">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      Expires: {new Date(job.expiresDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() => setShowActions(showActions === job.id ? null : job.id)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      {showActions === job.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4" />
                            View Job
                          </Link>
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                            <Edit className="w-4 h-4" />
                            Edit Job
                          </button>
                          <button
                            onClick={() => toggleFeatured(job.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {job.featured ? "Remove Featured" : "Mark Featured"}
                          </button>
                          <div className="border-t my-1" />
                          {job.status !== "active" && (
                            <button
                              onClick={() => updateJobStatus(job.id, "active")}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-gray-50 w-full text-left"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Activate
                            </button>
                          )}
                          {job.status === "active" && (
                            <button
                              onClick={() => updateJobStatus(job.id, "paused")}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-yellow-600 hover:bg-gray-50 w-full text-left"
                            >
                              <Clock className="w-4 h-4" />
                              Pause
                            </button>
                          )}
                          <button
                            onClick={() => updateJobStatus(job.id, "closed")}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full text-left"
                          >
                            <XCircle className="w-4 h-4" />
                            Close
                          </button>
                          <div className="border-t my-1" />
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> jobs
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
