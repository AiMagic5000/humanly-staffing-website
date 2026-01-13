"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Copy,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock jobs data
const jobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    applications: 45,
    newApplications: 8,
    views: 892,
    postedAt: "2025-01-05",
    expiresAt: "2025-02-05",
    status: "active",
    description: "We are looking for a Senior Software Engineer to join our team...",
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $170k",
    applications: 38,
    newApplications: 5,
    views: 654,
    postedAt: "2025-01-08",
    expiresAt: "2025-02-08",
    status: "active",
    description: "Seeking an experienced Product Manager to lead product strategy...",
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    applications: 29,
    newApplications: 3,
    views: 521,
    postedAt: "2025-01-10",
    expiresAt: "2025-02-10",
    status: "active",
    description: "Looking for a creative UX Designer to improve our product experience...",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$120k - $160k",
    applications: 22,
    newApplications: 0,
    views: 389,
    postedAt: "2024-12-15",
    expiresAt: "2025-01-15",
    status: "paused",
    description: "Seeking a DevOps Engineer to optimize our CI/CD pipelines...",
  },
  {
    id: "5",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
    applications: 56,
    newApplications: 0,
    views: 743,
    postedAt: "2024-12-01",
    expiresAt: "2025-01-01",
    status: "closed",
    description: "Looking for a Marketing Manager to lead our growth initiatives...",
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  active: { label: "Active", bg: "bg-emerald-100", text: "text-emerald-700" },
  paused: { label: "Paused", bg: "bg-amber-100", text: "text-amber-700" },
  closed: { label: "Closed", bg: "bg-gray-100", text: "text-gray-700" },
  draft: { label: "Draft", bg: "bg-blue-100", text: "text-blue-700" },
};

export default function EmployerJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    paused: jobs.filter((j) => j.status === "paused").length,
    closed: jobs.filter((j) => j.status === "closed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-1">
            Manage your job listings and track applications
          </p>
        </div>
        <Button asChild>
          <Link href="/employer/jobs/new">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === "all" ? "border-blue-500 bg-blue-50" : "bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Jobs</p>
        </button>
        <button
          onClick={() => setStatusFilter("active")}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === "active" ? "border-emerald-500 bg-emerald-50" : "bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
          <p className="text-sm text-gray-600">Active</p>
        </button>
        <button
          onClick={() => setStatusFilter("paused")}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === "paused" ? "border-amber-500 bg-amber-50" : "bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-amber-600">{stats.paused}</p>
          <p className="text-sm text-gray-600">Paused</p>
        </button>
        <button
          onClick={() => setStatusFilter("closed")}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === "closed" ? "border-gray-500 bg-gray-50" : "bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
          <p className="text-sm text-gray-600">Closed</p>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl border divide-y">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No jobs found</h3>
            <p className="text-gray-600 mt-1">
              {searchQuery ? "Try a different search term" : "Post your first job to get started"}
            </p>
            {!searchQuery && (
              <Button className="mt-4" asChild>
                <Link href="/employer/jobs/new">Post a Job</Link>
              </Button>
            )}
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/employer/jobs/${job.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {job.title}
                        </Link>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            statusConfig[job.status].bg
                          } ${statusConfig[job.status].text}`}
                        >
                          {statusConfig[job.status].label}
                        </span>
                        {job.newApplications > 0 && (
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                            {job.newApplications} new
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                        <span>{job.type}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">{job.applications}</span>
                      <span className="text-gray-500">applications</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-gray-900">{job.views}</span>
                      <span className="text-gray-500">views</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/employer/applications?job=${job.id}`}>
                      View Applications
                    </Link>
                  </Button>

                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === job.id ? null : job.id)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>

                    {openDropdown === job.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenDropdown(null)}
                        />
                        <div className="absolute right-0 top-full mt-1 z-20 w-48 bg-white rounded-lg shadow-lg border py-1">
                          <Link
                            href={`/employer/jobs/${job.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Job
                          </Link>
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Copy className="w-4 h-4" />
                            Duplicate
                          </button>
                          {job.status === "active" ? (
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Pause className="w-4 h-4" />
                              Pause Job
                            </button>
                          ) : job.status === "paused" ? (
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Play className="w-4 h-4" />
                              Reactivate
                            </button>
                          ) : null}
                          <hr className="my-1" />
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
