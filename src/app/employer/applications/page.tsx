"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Star,
  ExternalLink,
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
      phone: "(555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      location: "San Francisco, CA",
      currentTitle: "Senior Software Engineer",
      experience: "8 years",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      portfolio: "https://sarahjohnson.dev",
    },
    job: {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
    },
    appliedAt: "2025-01-13T10:30:00Z",
    status: "new",
    rating: 0,
    notes: "",
    coverLetter: "I am excited to apply for the Senior Software Engineer position at your company...",
    resumeUrl: "/resumes/sarah-johnson.pdf",
  },
  {
    id: "2",
    candidate: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "(555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      location: "New York, NY",
      currentTitle: "Product Manager",
      experience: "6 years",
      linkedin: "https://linkedin.com/in/michaelchen",
    },
    job: {
      id: "2",
      title: "Product Manager",
      department: "Product",
    },
    appliedAt: "2025-01-13T08:15:00Z",
    status: "reviewing",
    rating: 4,
    notes: "Strong background in B2B SaaS. Schedule a call.",
    coverLetter: "With 6 years of experience in product management...",
    resumeUrl: "/resumes/michael-chen.pdf",
  },
  {
    id: "3",
    candidate: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "(555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      location: "Austin, TX",
      currentTitle: "UX Designer",
      experience: "5 years",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      portfolio: "https://emilyrodriguez.design",
    },
    job: {
      id: "3",
      title: "UX Designer",
      department: "Design",
    },
    appliedAt: "2025-01-12T14:45:00Z",
    status: "shortlisted",
    rating: 5,
    notes: "Excellent portfolio. Moving to final interview round.",
    coverLetter: "As a UX designer with a passion for user-centered design...",
    resumeUrl: "/resumes/emily-rodriguez.pdf",
  },
  {
    id: "4",
    candidate: {
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "(555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      location: "Seattle, WA",
      currentTitle: "Staff Engineer",
      experience: "10 years",
      linkedin: "https://linkedin.com/in/davidkim",
    },
    job: {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
    },
    appliedAt: "2025-01-12T09:20:00Z",
    status: "interviewed",
    rating: 4,
    notes: "Technical interview completed. Strong systems design skills.",
    coverLetter: "I bring 10 years of experience in building scalable systems...",
    resumeUrl: "/resumes/david-kim.pdf",
  },
  {
    id: "5",
    candidate: {
      name: "Jennifer Lee",
      email: "jennifer.lee@email.com",
      phone: "(555) 567-8901",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      location: "Los Angeles, CA",
      currentTitle: "Marketing Coordinator",
      experience: "3 years",
    },
    job: {
      id: "2",
      title: "Product Manager",
      department: "Product",
    },
    appliedAt: "2025-01-11T16:00:00Z",
    status: "rejected",
    rating: 2,
    notes: "Does not meet minimum experience requirements.",
    coverLetter: "I am eager to transition into product management...",
    resumeUrl: "/resumes/jennifer-lee.pdf",
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  new: { label: "New", bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  reviewing: { label: "Reviewing", bg: "bg-amber-100", text: "text-amber-700", icon: Eye },
  shortlisted: { label: "Shortlisted", bg: "bg-purple-100", text: "text-purple-700", icon: Star },
  interviewed: { label: "Interviewed", bg: "bg-emerald-100", text: "text-emerald-700", icon: MessageSquare },
  offered: { label: "Offered", bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700", icon: XCircle },
  hired: { label: "Hired", bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
};

export default function EmployerApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<typeof applications[0] | null>(null);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Applications List */}
      <div className={`flex-1 flex flex-col min-w-0 ${selectedApplication ? "hidden lg:flex" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-1">
              {filteredApplications.length} total applications
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search candidates or jobs..."
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
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewed</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>

        {/* Applications List */}
        <div className="flex-1 overflow-auto bg-white rounded-xl border divide-y">
          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No applications found</h3>
              <p className="text-gray-600 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <button
                key={application.id}
                onClick={() => setSelectedApplication(application)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedApplication?.id === application.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={application.candidate.avatar}
                    alt={application.candidate.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900">{application.candidate.name}</p>
                        <p className="text-sm text-gray-600">{application.job.title}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            statusConfig[application.status].bg
                          } ${statusConfig[application.status].text}`}
                        >
                          {statusConfig[application.status].label}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(application.appliedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {application.candidate.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {application.candidate.location}
                      </span>
                      {application.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {application.rating}/5
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Application Detail Panel */}
      {selectedApplication && (
        <div className="lg:w-[480px] bg-white rounded-xl border flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <button
                onClick={() => setSelectedApplication(null)}
                className="lg:hidden text-sm text-gray-600 hover:text-gray-900 mb-4"
              >
                &larr; Back to list
              </button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button size="sm">Schedule Interview</Button>
              </div>
            </div>

            <div className="flex items-start gap-4 mt-4">
              <Image
                src={selectedApplication.candidate.avatar}
                alt={selectedApplication.candidate.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedApplication.candidate.name}
                </h2>
                <p className="text-gray-600">{selectedApplication.candidate.currentTitle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      statusConfig[selectedApplication.status].bg
                    } ${statusConfig[selectedApplication.status].text}`}
                  >
                    {statusConfig[selectedApplication.status].label}
                  </span>
                  <span className="text-sm text-gray-500">
                    Applied {formatDate(selectedApplication.appliedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6 space-y-6">
            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <a
                  href={`mailto:${selectedApplication.candidate.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-4 h-4" />
                  {selectedApplication.candidate.email}
                </a>
                <a
                  href={`tel:${selectedApplication.candidate.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Phone className="w-4 h-4" />
                  {selectedApplication.candidate.phone}
                </a>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {selectedApplication.candidate.location}
                </p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Links</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApplication.candidate.linkedin && (
                  <a
                    href={selectedApplication.candidate.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {selectedApplication.candidate.portfolio && (
                  <a
                    href={selectedApplication.candidate.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Portfolio
                  </a>
                )}
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
                  <Download className="w-3.5 h-3.5" />
                  Resume
                </button>
              </div>
            </div>

            {/* Applied For */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Applied For</h3>
              <Link
                href={`/employer/jobs/${selectedApplication.job.id}`}
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-gray-900">{selectedApplication.job.title}</p>
                <p className="text-sm text-gray-600">{selectedApplication.job.department}</p>
              </Link>
            </div>

            {/* Cover Letter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Cover Letter</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {selectedApplication.coverLetter}
              </p>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Rating</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= selectedApplication.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Internal Notes</h3>
              <textarea
                defaultValue={selectedApplication.notes}
                placeholder="Add notes about this candidate..."
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <select
                value={selectedApplication.status}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="offered">Offered</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button>Update Status</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
