import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Building2,
  Calendar,
  ExternalLink,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Applications",
  description: "Track your job applications",
};

// Mock applications data
const applications = [
  {
    id: "1",
    job: {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop",
    },
    appliedAt: "2025-01-10",
    status: "reviewing",
    lastUpdate: "2025-01-12",
    notes: "Your application is being reviewed by the hiring team.",
  },
  {
    id: "2",
    job: {
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    },
    appliedAt: "2025-01-08",
    status: "interview",
    lastUpdate: "2025-01-13",
    notes: "Interview scheduled for January 15th at 2:00 PM PST",
  },
  {
    id: "3",
    job: {
      title: "UX Designer",
      company: "DesignCo",
      location: "New York, NY",
      type: "Full-time",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
    },
    appliedAt: "2025-01-05",
    status: "offered",
    lastUpdate: "2025-01-11",
    notes: "Congratulations! You have received an offer.",
  },
  {
    id: "4",
    job: {
      title: "Data Analyst",
      company: "DataDriven",
      location: "Boston, MA",
      type: "Full-time",
      logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop",
    },
    appliedAt: "2025-01-01",
    status: "rejected",
    lastUpdate: "2025-01-07",
    notes: "We have decided to move forward with other candidates.",
  },
  {
    id: "5",
    job: {
      title: "DevOps Engineer",
      company: "CloudServices",
      location: "Seattle, WA",
      type: "Full-time",
      logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop",
    },
    appliedAt: "2024-12-28",
    status: "new",
    lastUpdate: "2024-12-28",
    notes: "Application submitted successfully.",
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string; icon: typeof Clock }> = {
  new: { label: "Submitted", bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  reviewing: { label: "Under Review", bg: "bg-amber-100", text: "text-amber-700", icon: Eye },
  interview: { label: "Interview", bg: "bg-purple-100", text: "text-purple-700", icon: Calendar },
  offered: { label: "Offer Received", bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle },
  rejected: { label: "Not Selected", bg: "bg-red-100", text: "text-red-700", icon: XCircle },
};

export default function CandidateApplicationsPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-1">Track and manage your job applications</p>
        </div>
        <Button asChild>
          <Link href="/jobs">Browse More Jobs</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = applications.filter(a => a.status === key).length;
          return (
            <div key={key} className="bg-white rounded-xl border p-4 text-center">
              <p className={`text-2xl font-bold ${config.text}`}>{count}</p>
              <p className="text-sm text-gray-600">{config.label}</p>
            </div>
          );
        })}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No applications yet</h3>
            <p className="text-gray-600 mt-2 mb-6">Start applying to jobs to track your progress here</p>
            <Button asChild>
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        ) : (
          applications.map((application) => {
            const StatusIcon = statusConfig[application.status].icon;
            return (
              <div key={application.id} className="bg-white rounded-xl border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={application.job.logo}
                        alt={application.job.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{application.job.title}</h3>
                          <p className="text-gray-600">{application.job.company}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${statusConfig[application.status].bg} ${statusConfig[application.status].text}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig[application.status].label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {application.job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          {application.job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          Applied {formatDate(application.appliedAt)}
                        </span>
                      </div>
                      {application.notes && (
                        <div className={`mt-4 p-3 rounded-lg ${
                          application.status === "offered" ? "bg-emerald-50" :
                          application.status === "interview" ? "bg-purple-50" :
                          application.status === "rejected" ? "bg-red-50" :
                          "bg-gray-50"
                        }`}>
                          <p className="text-sm text-gray-700 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {application.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Last updated: {formatDate(application.lastUpdate)}
                  </p>
                  <Button variant="outline" size="sm" className="gap-1.5" asChild>
                    <Link href={`/jobs/${application.id}`}>
                      View Job
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
