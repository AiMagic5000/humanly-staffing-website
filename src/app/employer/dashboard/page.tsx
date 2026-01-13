"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Clock,
  Calendar,
  ArrowRight,
  MapPin,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for the employer dashboard
const stats = [
  {
    name: "Active Jobs",
    value: "8",
    change: "+2 this month",
    changeType: "positive",
    icon: Briefcase,
    color: "blue",
  },
  {
    name: "Total Applications",
    value: "156",
    change: "+23 this week",
    changeType: "positive",
    icon: Users,
    color: "emerald",
  },
  {
    name: "Profile Views",
    value: "2,847",
    change: "+12% vs last month",
    changeType: "positive",
    icon: Eye,
    color: "purple",
  },
  {
    name: "Hire Rate",
    value: "68%",
    change: "+5% vs last month",
    changeType: "positive",
    icon: TrendingUp,
    color: "amber",
  },
];

const recentApplications = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    position: "Senior Software Engineer",
    appliedAt: "2 hours ago",
    status: "new",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    experience: "8 years",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    candidate: "Michael Chen",
    position: "Product Manager",
    appliedAt: "5 hours ago",
    status: "reviewing",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    experience: "6 years",
    location: "New York, NY",
  },
  {
    id: 3,
    candidate: "Emily Rodriguez",
    position: "UX Designer",
    appliedAt: "1 day ago",
    status: "shortlisted",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    experience: "5 years",
    location: "Austin, TX",
  },
  {
    id: 4,
    candidate: "David Kim",
    position: "Senior Software Engineer",
    appliedAt: "1 day ago",
    status: "interviewed",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    experience: "10 years",
    location: "Seattle, WA",
  },
];

const activeJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    applications: 45,
    views: 892,
    postedAt: "Jan 5, 2025",
    status: "active",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $170k",
    applications: 38,
    views: 654,
    postedAt: "Jan 8, 2025",
    status: "active",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    applications: 29,
    views: 521,
    postedAt: "Jan 10, 2025",
    status: "active",
  },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: "bg-blue-100", text: "text-blue-700", label: "New" },
  reviewing: { bg: "bg-amber-100", text: "text-amber-700", label: "Reviewing" },
  shortlisted: { bg: "bg-purple-100", text: "text-purple-700", label: "Shortlisted" },
  interviewed: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Interviewed" },
  rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  hired: { bg: "bg-green-100", text: "text-green-700", label: "Hired" },
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function EmployerDashboard() {
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}!</h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your job postings today.
          </p>
        </div>
        <Button asChild>
          <Link href="/employer/jobs/new">Post New Job</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.color === "blue"
                    ? "bg-blue-100"
                    : stat.color === "emerald"
                    ? "bg-emerald-100"
                    : stat.color === "purple"
                    ? "bg-purple-100"
                    : "bg-amber-100"
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 ${
                    stat.color === "blue"
                      ? "text-blue-600"
                      : stat.color === "emerald"
                      ? "text-emerald-600"
                      : stat.color === "purple"
                      ? "text-purple-600"
                      : "text-amber-600"
                  }`}
                />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === "positive"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl border">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Recent Applications</h2>
            <Link
              href="/employer/applications"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={application.avatar}
                    alt={application.candidate}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {application.candidate}
                        </p>
                        <p className="text-sm text-gray-600">
                          {application.position}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          statusColors[application.status].bg
                        } ${statusColors[application.status].text}`}
                      >
                        {statusColors[application.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {application.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {application.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {application.appliedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white rounded-xl border">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Active Job Postings</h2>
            <Link
              href="/employer/jobs"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Manage jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        Active
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Posted {job.postedAt}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900 font-medium">{job.applications}</span>
                    <span className="text-gray-500">applications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-900 font-medium">{job.views}</span>
                    <span className="text-gray-500">views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold">Ready to find your next great hire?</h2>
            <p className="text-blue-100 mt-2">
              Post a new job and reach thousands of qualified candidates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href="/employer/jobs/new">Post a Job</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/employers/pricing">View Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
