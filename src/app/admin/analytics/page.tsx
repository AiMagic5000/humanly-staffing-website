"use client";

import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  FileText,
  Building2,
  DollarSign,
  Clock,
  Target,
  BarChart3,
  PieChart,
} from "lucide-react";

// Mock analytics data
const overviewStats = [
  {
    label: "Total Revenue",
    value: "$284,500",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "vs. last month",
  },
  {
    label: "Active Users",
    value: "12,847",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Users,
    description: "vs. last month",
  },
  {
    label: "Applications",
    value: "3,456",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: FileText,
    description: "vs. last month",
  },
  {
    label: "Placements",
    value: "287",
    change: "+5.4%",
    changeType: "positive" as const,
    icon: Target,
    description: "vs. last month",
  },
];

const topJobs = [
  { title: "Senior Software Engineer", applications: 156, views: 2340, conversion: "6.7%" },
  { title: "Product Manager", applications: 134, views: 1890, conversion: "7.1%" },
  { title: "UX Designer", applications: 98, views: 1456, conversion: "6.7%" },
  { title: "Data Analyst", applications: 87, views: 1234, conversion: "7.0%" },
  { title: "DevOps Engineer", applications: 76, views: 987, conversion: "7.7%" },
];

const topIndustries = [
  { name: "Technology", jobs: 156, applications: 2340, percentage: 35 },
  { name: "Healthcare", jobs: 98, applications: 1567, percentage: 24 },
  { name: "Finance", jobs: 87, applications: 1234, percentage: 19 },
  { name: "Manufacturing", jobs: 65, applications: 876, percentage: 13 },
  { name: "Retail", jobs: 45, applications: 543, percentage: 9 },
];

const monthlyData = [
  { month: "Aug", applications: 2100, placements: 189 },
  { month: "Sep", applications: 2400, placements: 215 },
  { month: "Oct", applications: 2800, placements: 242 },
  { month: "Nov", applications: 3100, placements: 268 },
  { month: "Dec", applications: 2900, placements: 251 },
  { month: "Jan", applications: 3456, placements: 287 },
];

const recentActivity = [
  { action: "New employer registered", company: "TechStart Inc.", time: "2 min ago" },
  { action: "Application submitted", candidate: "Sarah Johnson", job: "Senior Engineer", time: "5 min ago" },
  { action: "Job posting approved", job: "Product Manager at StartupXYZ", time: "12 min ago" },
  { action: "Placement confirmed", candidate: "Michael Chen", company: "CloudServices", time: "28 min ago" },
  { action: "New candidate registered", candidate: "Emily Rodriguez", time: "45 min ago" },
];

export default function AdminAnalyticsPage() {
  const maxApplications = Math.max(...monthlyData.map(d => d.applications));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Platform performance and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="7d">Last 7 days</option>
            <option value="30d" selected>Last 30 days</option>
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Applications Chart */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Applications Over Time</h2>
              <p className="text-sm text-gray-600">Monthly application trends</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center gap-4">
                <span className="w-10 text-sm text-gray-600">{data.month}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all"
                    style={{ width: `${(data.applications / maxApplications) * 100}%` }}
                  />
                </div>
                <span className="w-16 text-sm font-medium text-gray-900 text-right">
                  {data.applications.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Distribution */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Industry Distribution</h2>
              <p className="text-sm text-gray-600">Jobs by industry sector</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="space-y-4">
            {topIndustries.map((industry, index) => {
              const colors = [
                "bg-blue-500",
                "bg-emerald-500",
                "bg-purple-500",
                "bg-amber-500",
                "bg-rose-500",
              ];
              return (
                <div key={industry.name} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                  <span className="flex-1 text-sm text-gray-700">{industry.name}</span>
                  <span className="text-sm text-gray-500">{industry.jobs} jobs</span>
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[index]} rounded-full`}
                      style={{ width: `${industry.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-sm font-medium text-gray-900 text-right">
                    {industry.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Top Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl border">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <h2 className="font-semibold text-gray-900">Top Performing Jobs</h2>
              <p className="text-sm text-gray-600">By application count</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-emerald-600" />
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
                    Applications
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topJobs.map((job, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{job.title}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-gray-900 font-medium">{job.applications}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-gray-600">{job.views.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        {job.conversion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <h2 className="font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-600">Platform events</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="divide-y">
            {recentActivity.map((activity, index) => (
              <div key={index} className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {activity.company || activity.candidate || activity.job}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <Users className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">8,542</p>
          <p className="text-sm text-blue-100 mt-1">Total Candidates</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <Building2 className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">456</p>
          <p className="text-sm text-purple-100 mt-1">Total Companies</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <Briefcase className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-emerald-100 mt-1">Active Jobs</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
          <Target className="w-8 h-8 mb-4 opacity-80" />
          <p className="text-3xl font-bold">89%</p>
          <p className="text-sm text-amber-100 mt-1">Placement Rate</p>
        </div>
      </div>
    </div>
  );
}
