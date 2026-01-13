import { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import {
  FileText,
  Bookmark,
  Eye,
  TrendingUp,
  Briefcase,
  Clock,
  ArrowRight,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Force dynamic rendering for pages that use Clerk
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your job applications and profile",
};

// Mock data - in production, this would come from the database
const stats = [
  { name: "Applications", value: 12, icon: FileText, change: "+3 this week", color: "blue" },
  { name: "Saved Jobs", value: 8, icon: Bookmark, change: "+2 this week", color: "indigo" },
  { name: "Profile Views", value: 47, icon: Eye, change: "+12% vs last week", color: "green" },
  { name: "Interview Invites", value: 3, icon: TrendingUp, change: "+1 this week", color: "purple" },
];

const recentApplications = [
  {
    id: "1",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: "2025-01-10",
    status: "reviewing",
  },
  {
    id: "2",
    jobTitle: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    appliedDate: "2025-01-08",
    status: "interviewing",
  },
  {
    id: "3",
    jobTitle: "Frontend Developer",
    company: "DesignHub",
    location: "New York, NY",
    appliedDate: "2025-01-05",
    status: "pending",
  },
  {
    id: "4",
    jobTitle: "DevOps Engineer",
    company: "CloudSystems",
    location: "Seattle, WA",
    appliedDate: "2025-01-03",
    status: "rejected",
  },
];

const recommendedJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "InnovateTech",
    location: "Austin, TX",
    salary: "$140,000 - $180,000",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "Lead Software Architect",
    company: "Enterprise Solutions",
    location: "Remote",
    salary: "$160,000 - $200,000",
    type: "Full-time",
    posted: "1 day ago",
  },
  {
    id: "3",
    title: "Senior Backend Engineer",
    company: "DataFlow Inc.",
    location: "Denver, CO",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    posted: "3 days ago",
  },
];

const statusColors = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  reviewing: { bg: "bg-blue-100", text: "text-blue-800", label: "Under Review" },
  interviewing: { bg: "bg-purple-100", text: "text-purple-800", label: "Interviewing" },
  offered: { bg: "bg-green-100", text: "text-green-800", label: "Offered" },
  hired: { bg: "bg-green-100", text: "text-green-800", label: "Hired" },
  rejected: { bg: "bg-red-100", text: "text-red-800", label: "Not Selected" },
};

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName || "there"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your job search
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Browse Jobs
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-xs text-green-600 font-medium">{stat.change}</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <Link
              href="/dashboard/applications"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentApplications.map((application) => {
              const status = statusColors[application.status as keyof typeof statusColors];
              return (
                <div key={application.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {application.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.company} • {application.location}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
            <Link
              href="/jobs"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              See more
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recommendedJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-sm text-green-600 font-medium mt-1">{job.salary}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                      {job.type}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Complete Your Profile</h3>
            <p className="text-blue-100 mt-1">
              Profiles with complete information get 3x more views from recruiters.
              Add your skills, experience, and upload your resume to stand out.
            </p>
            <Button variant="secondary" className="mt-4 bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/dashboard/profile">
                Complete Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
