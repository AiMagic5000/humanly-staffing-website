"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  MoreHorizontal,
  Building2,
  Users,
  Briefcase,
  MapPin,
  Globe,
  CheckCircle,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock companies data
const companies = [
  {
    id: "1",
    name: "TechCorp Inc.",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop",
    industry: "Technology",
    location: "San Francisco, CA",
    website: "https://techcorp.com",
    employees: "500-1000",
    status: "verified",
    activeJobs: 8,
    totalApplications: 156,
    joinedAt: "2024-06-15",
  },
  {
    id: "2",
    name: "StartupXYZ",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    industry: "Technology",
    location: "New York, NY",
    website: "https://startupxyz.io",
    employees: "50-200",
    status: "verified",
    activeJobs: 12,
    totalApplications: 89,
    joinedAt: "2024-08-20",
  },
  {
    id: "3",
    name: "DesignCo",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
    industry: "Design",
    location: "Austin, TX",
    website: "https://designco.com",
    employees: "10-50",
    status: "pending",
    activeJobs: 3,
    totalApplications: 24,
    joinedAt: "2025-01-10",
  },
  {
    id: "4",
    name: "CloudServices LLC",
    logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop",
    industry: "Technology",
    location: "Seattle, WA",
    website: "https://cloudservices.io",
    employees: "200-500",
    status: "verified",
    activeJobs: 6,
    totalApplications: 112,
    joinedAt: "2024-03-01",
  },
  {
    id: "5",
    name: "HealthPlus",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&h=100&fit=crop",
    industry: "Healthcare",
    location: "Boston, MA",
    website: "https://healthplus.com",
    employees: "1000+",
    status: "verified",
    activeJobs: 15,
    totalApplications: 234,
    joinedAt: "2023-11-15",
  },
  {
    id: "6",
    name: "FinanceFirst",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop",
    industry: "Finance",
    location: "Chicago, IL",
    website: "https://financefirst.com",
    employees: "500-1000",
    status: "suspended",
    activeJobs: 0,
    totalApplications: 45,
    joinedAt: "2024-05-10",
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  verified: { label: "Verified", bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle },
  pending: { label: "Pending", bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  suspended: { label: "Suspended", bg: "bg-red-100", text: "text-red-700", icon: XCircle },
};

export default function AdminCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const industries = [...new Set(companies.map((c) => c.industry))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600 mt-1">Manage employer accounts and company profiles</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
              <p className="text-sm text-gray-600">Total Companies</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">
                {companies.filter((c) => c.status === "verified").length}
              </p>
              <p className="text-sm text-gray-600">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {companies.filter((c) => c.status === "pending").length}
              </p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {companies.reduce((sum, c) => sum + c.activeJobs, 0)}
              </p>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by company name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      {/* Companies Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-xl border">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-900 font-medium">No companies found</p>
            <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredCompanies.map((company) => {
            const StatusIcon = statusConfig[company.status].icon;
            return (
              <div
                key={company.id}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.industry}</p>
                      </div>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {company.employees} employees
                    </div>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Globe className="w-4 h-4" />
                      {company.website.replace("https://", "")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <strong className="text-gray-900">{company.activeJobs}</strong> jobs
                      </span>
                      <span className="text-gray-600">
                        <strong className="text-gray-900">{company.totalApplications}</strong> apps
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        statusConfig[company.status].bg
                      } ${statusConfig[company.status].text}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[company.status].label}
                    </span>
                  </div>
                </div>

                {company.status === "pending" && (
                  <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 flex items-center justify-between">
                    <span className="text-sm text-amber-700">Awaiting verification</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Reject
                      </Button>
                      <Button size="sm" className="h-7 text-xs">
                        Verify
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{filteredCompanies.length}</span> of{" "}
          <span className="font-medium">{companies.length}</span> companies
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
  );
}
