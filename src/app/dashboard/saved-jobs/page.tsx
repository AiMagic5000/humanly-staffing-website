import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  ExternalLink,
  Trash2,
  BellRing,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Saved Jobs",
  description: "Your bookmarked job listings",
};

// Mock saved jobs data
const savedJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop",
    postedAt: "2025-01-10",
    savedAt: "2025-01-11",
    deadline: "2025-02-10",
    status: "active",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $170k",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    postedAt: "2025-01-08",
    savedAt: "2025-01-09",
    deadline: "2025-02-08",
    status: "active",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignCo",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
    postedAt: "2025-01-05",
    savedAt: "2025-01-06",
    deadline: "2025-01-25",
    status: "closing_soon",
  },
  {
    id: "4",
    title: "Marketing Manager",
    company: "BrandBoost",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$90k - $120k",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop",
    postedAt: "2024-12-15",
    savedAt: "2024-12-20",
    deadline: "2025-01-05",
    status: "expired",
  },
];

export default function SavedJobsPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeJobs = savedJobs.filter(job => job.status !== "expired");
  const expiredJobs = savedJobs.filter(job => job.status === "expired");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-600 mt-1">Jobs you&apos;ve bookmarked for later</p>
        </div>
        <Button asChild>
          <Link href="/jobs">Browse More Jobs</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4 text-center">
          <Bookmark className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{savedJobs.length}</p>
          <p className="text-sm text-gray-600">Total Saved</p>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-600">{activeJobs.length}</p>
          <p className="text-sm text-gray-600">Still Open</p>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <BellRing className="w-6 h-6 text-amber-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-amber-600">
            {savedJobs.filter(j => j.status === "closing_soon").length}
          </p>
          <p className="text-sm text-gray-600">Closing Soon</p>
        </div>
      </div>

      {/* Active Jobs */}
      {activeJobs.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Listings</h2>
          <div className="space-y-4">
            {activeJobs.map((job) => {
              const daysLeft = getDaysUntilDeadline(job.deadline);
              return (
                <div key={job.id} className="bg-white rounded-xl border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          {job.status === "closing_soon" && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">
                              <BellRing className="w-3.5 h-3.5" />
                              {daysLeft} days left
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Saved on {formatDate(job.savedAt)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1.5 text-red-600 hover:text-red-700">
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </Button>
                      <Button size="sm" className="gap-1.5" asChild>
                        <Link href={`/jobs/${job.id}/apply`}>
                          Apply Now
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Expired Jobs */}
      {expiredJobs.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expired Listings</h2>
          <div className="space-y-4">
            {expiredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl border opacity-60">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 grayscale">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-500">
                          Expired
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Expired on {formatDate(job.deadline)}
                  </p>
                  <Button variant="outline" size="sm" className="gap-1.5 text-gray-500">
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedJobs.length === 0 && (
        <div className="bg-white rounded-xl border p-12 text-center">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No saved jobs yet</h3>
          <p className="text-gray-600 mt-2 mb-6">Save jobs you&apos;re interested in to apply later</p>
          <Button asChild>
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
