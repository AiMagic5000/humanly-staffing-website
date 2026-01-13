"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Mail,
  AlertCircle,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Calculate greeting based on time of day
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const stats = [
  {
    name: "Total Users",
    value: "2,847",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    href: "/admin/users",
  },
  {
    name: "Active Jobs",
    value: "156",
    change: "+8%",
    changeType: "positive",
    icon: Briefcase,
    href: "/admin/jobs",
  },
  {
    name: "Applications",
    value: "1,234",
    change: "+23%",
    changeType: "positive",
    icon: FileText,
    href: "/admin/applications",
  },
  {
    name: "Companies",
    value: "89",
    change: "+5%",
    changeType: "positive",
    icon: Building2,
    href: "/admin/companies",
  },
];

const recentApplications = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    job: "Senior Software Engineer",
    company: "TechCorp Inc.",
    appliedAt: "2 hours ago",
    status: "new",
  },
  {
    id: 2,
    candidate: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    job: "Product Manager",
    company: "StartupXYZ",
    appliedAt: "5 hours ago",
    status: "reviewing",
  },
  {
    id: 3,
    candidate: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    job: "UX Designer",
    company: "DesignCo",
    appliedAt: "1 day ago",
    status: "shortlisted",
  },
  {
    id: 4,
    candidate: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    job: "Backend Developer",
    company: "CloudServices",
    appliedAt: "1 day ago",
    status: "interviewed",
  },
  {
    id: 5,
    candidate: "Jennifer Lee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    job: "Data Analyst",
    company: "DataDriven",
    appliedAt: "2 days ago",
    status: "hired",
  },
];

const newUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    type: "candidate",
    joinedAt: "1 hour ago",
  },
  {
    id: 2,
    name: "Lisa Anderson",
    email: "lisa@techcorp.com",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    type: "employer",
    joinedAt: "3 hours ago",
  },
  {
    id: 3,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop",
    type: "candidate",
    joinedAt: "5 hours ago",
  },
];

const pendingActions = [
  {
    id: 1,
    type: "company_verification",
    title: "Company Verification Required",
    description: "NewStartup Inc. needs verification",
    priority: "high",
    icon: Building2,
  },
  {
    id: 2,
    type: "job_review",
    title: "Job Posting Review",
    description: "3 new job postings awaiting approval",
    priority: "medium",
    icon: Briefcase,
  },
  {
    id: 3,
    type: "support_ticket",
    title: "Support Tickets",
    description: "5 unresolved support requests",
    priority: "medium",
    icon: Mail,
  },
];

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: "bg-blue-100", text: "text-blue-700", label: "New" },
  reviewing: { bg: "bg-amber-100", text: "text-amber-700", label: "Reviewing" },
  shortlisted: { bg: "bg-purple-100", text: "text-purple-700", label: "Shortlisted" },
  interviewed: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Interviewed" },
  hired: { bg: "bg-green-100", text: "text-green-700", label: "Hired" },
};

export default function AdminDashboard() {
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{greeting}, Admin!</h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s what&apos;s happening on your platform today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                  stat.changeType === "positive"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {stat.changeType === "positive" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pending Actions */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          Pending Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {pendingActions.map((action) => (
            <div
              key={action.id}
              className={`p-4 rounded-lg border-l-4 ${
                action.priority === "high"
                  ? "border-l-red-500 bg-red-50"
                  : "border-l-amber-500 bg-amber-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    action.priority === "high" ? "bg-red-100" : "bg-amber-100"
                  }`}
                >
                  <action.icon
                    className={`w-5 h-5 ${
                      action.priority === "high" ? "text-red-600" : "text-amber-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl border">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Recent Applications</h2>
            <Link
              href="/admin/applications"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y">
            {recentApplications.map((application) => (
              <div key={application.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Image
                    src={application.avatar}
                    alt={application.candidate}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{application.candidate}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {application.job} at {application.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                        statusConfig[application.status].bg
                      } ${statusConfig[application.status].text}`}
                    >
                      {statusConfig[application.status].label}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{application.appliedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Users */}
        <div className="bg-white rounded-xl border">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">New Users</h2>
            <Link
              href="/admin/users"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y">
            {newUsers.map((user) => (
              <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                        user.type === "employer"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.type === "employer" ? "Employer" : "Candidate"}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{user.joinedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900">Platform Activity</h2>
          <select className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm bg-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Activity chart would be displayed here</p>
            <p className="text-sm text-gray-500 mt-1">Integrate with a charting library like Recharts</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
          <Link href="/admin/jobs">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>Manage Jobs</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
          <Link href="/admin/users">
            <Users className="w-6 h-6 text-blue-600" />
            <span>Manage Users</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
          <Link href="/admin/companies">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span>Manage Companies</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
          <Link href="/admin/settings">
            <Mail className="w-6 h-6 text-blue-600" />
            <span>Email Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
