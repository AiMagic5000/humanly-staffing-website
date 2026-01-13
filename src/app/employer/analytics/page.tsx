"use client";

import {
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  UserCheck,
  Clock,
  Briefcase,
  Users,
  BarChart3,
  Calendar,
} from "lucide-react";

// Mock analytics data
const overviewStats = [
  {
    label: "Total Views",
    value: "4,328",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: Eye,
    description: "vs. last month",
  },
  {
    label: "Applications",
    value: "187",
    change: "+24.5%",
    changeType: "positive" as const,
    icon: FileText,
    description: "vs. last month",
  },
  {
    label: "Interviews",
    value: "42",
    change: "+12.3%",
    changeType: "positive" as const,
    icon: Calendar,
    description: "vs. last month",
  },
  {
    label: "Hires",
    value: "8",
    change: "-5.2%",
    changeType: "negative" as const,
    icon: UserCheck,
    description: "vs. last month",
  },
];

const jobPerformance = [
  { title: "Senior Software Engineer", views: 1245, applications: 56, conversion: "4.5%", status: "Active" },
  { title: "Product Manager", views: 987, applications: 43, conversion: "4.4%", status: "Active" },
  { title: "UX Designer", views: 756, applications: 38, conversion: "5.0%", status: "Active" },
  { title: "DevOps Engineer", views: 654, applications: 28, conversion: "4.3%", status: "Active" },
  { title: "Data Analyst", views: 432, applications: 22, conversion: "5.1%", status: "Paused" },
];

const weeklyData = [
  { day: "Mon", views: 156, applications: 8 },
  { day: "Tue", views: 189, applications: 12 },
  { day: "Wed", views: 234, applications: 15 },
  { day: "Thu", views: 198, applications: 11 },
  { day: "Fri", views: 167, applications: 9 },
  { day: "Sat", views: 78, applications: 4 },
  { day: "Sun", views: 65, applications: 3 },
];

const sourceData = [
  { source: "Direct Search", applications: 67, percentage: 36 },
  { source: "Job Boards", applications: 52, percentage: 28 },
  { source: "Social Media", applications: 38, percentage: 20 },
  { source: "Referrals", applications: 30, percentage: 16 },
];

const pipelineData = [
  { stage: "Applied", count: 187, color: "bg-blue-500" },
  { stage: "Screening", count: 89, color: "bg-purple-500" },
  { stage: "Interview", count: 42, color: "bg-amber-500" },
  { stage: "Offer", count: 12, color: "bg-emerald-500" },
  { stage: "Hired", count: 8, color: "bg-green-600" },
];

export default function EmployerAnalyticsPage() {
  const maxViews = Math.max(...weeklyData.map(d => d.views));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your recruiting performance</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === "positive" ? "text-emerald-600" : "text-red-600"
              }`}>
                {stat.changeType === "positive" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hiring Pipeline */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-gray-900">Hiring Pipeline</h2>
            <p className="text-sm text-gray-600">Current candidate distribution</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pipelineData.map((stage, index) => (
            <div key={stage.stage} className="flex-1">
              <div className="relative">
                <div className={`h-16 ${stage.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{stage.count}</span>
                </div>
                {index < pipelineData.length - 1 && (
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center z-10">
                    <span className="text-gray-400 text-xs">→</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 text-center mt-2">{stage.stage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weekly Performance */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Weekly Performance</h2>
              <p className="text-sm text-gray-600">Views and applications this week</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            {weeklyData.map((data) => (
              <div key={data.day} className="flex items-center gap-4">
                <span className="w-10 text-sm text-gray-600">{data.day}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all"
                    style={{ width: `${(data.views / maxViews) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-4 w-28">
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{data.views}</span>
                  <span className="text-sm text-gray-500 w-8 text-right">{data.applications}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-6 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-xs text-gray-600">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-400" />
              <span className="text-xs text-gray-600">Applications</span>
            </div>
          </div>
        </div>

        {/* Application Sources */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Application Sources</h2>
              <p className="text-sm text-gray-600">Where candidates find your jobs</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Eye className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-4">
            {sourceData.map((source, index) => {
              const colors = [
                "bg-blue-500",
                "bg-purple-500",
                "bg-amber-500",
                "bg-emerald-500",
              ];
              return (
                <div key={source.source} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                  <span className="flex-1 text-sm text-gray-700">{source.source}</span>
                  <span className="text-sm text-gray-500">{source.applications} apps</span>
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[index]} rounded-full`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-sm font-medium text-gray-900 text-right">
                    {source.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Job Performance Table */}
      <div className="bg-white rounded-xl border">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="font-semibold text-gray-900">Job Performance</h2>
            <p className="text-sm text-gray-600">Individual job listing metrics</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobPerformance.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{job.title}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-gray-900">{job.views.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-gray-900 font-medium">{job.applications}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      {job.conversion}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <Briefcase className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-blue-100 mt-1">Active Jobs</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <Clock className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">3.2</p>
          <p className="text-sm text-purple-100 mt-1">Avg. Days to Hire</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <UserCheck className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">92%</p>
          <p className="text-sm text-emerald-100 mt-1">Offer Accept Rate</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
          <TrendingUp className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">4.7%</p>
          <p className="text-sm text-amber-100 mt-1">Avg. Conversion</p>
        </div>
      </div>
    </div>
  );
}
