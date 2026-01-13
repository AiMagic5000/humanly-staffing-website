"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  StarOff,
  Eye,
  MessageSquare,
  Download,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock candidates data
const mockCandidates = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    headline: "Senior Software Engineer",
    location: "San Francisco, CA",
    experience: "8 years",
    education: "MS Computer Science, Stanford",
    skills: ["JavaScript", "React", "Node.js", "AWS", "Python"],
    matchScore: 95,
    status: "Open to work",
    lastActive: "2 hours ago",
    starred: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    headline: "Full Stack Developer",
    location: "New York, NY",
    experience: "6 years",
    education: "BS Computer Science, MIT",
    skills: ["TypeScript", "React", "Go", "PostgreSQL", "Docker"],
    matchScore: 88,
    status: "Open to work",
    lastActive: "1 day ago",
    starred: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    headline: "Product Manager",
    location: "Austin, TX",
    experience: "5 years",
    education: "MBA, Harvard Business School",
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping"],
    matchScore: 82,
    status: "Actively looking",
    lastActive: "3 hours ago",
    starred: true,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    headline: "DevOps Engineer",
    location: "Seattle, WA",
    experience: "7 years",
    education: "BS Computer Engineering, UC Berkeley",
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Python"],
    matchScore: 79,
    status: "Open to work",
    lastActive: "5 days ago",
    starred: false,
  },
  {
    id: "5",
    name: "Amanda Thompson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    headline: "UX Designer",
    location: "Remote",
    experience: "4 years",
    education: "BFA Design, RISD",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
    matchScore: 76,
    status: "Passively looking",
    lastActive: "1 week ago",
    starred: false,
  },
];

const filterOptions = {
  experience: ["0-2 years", "3-5 years", "6-10 years", "10+ years"],
  location: ["Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA"],
  skills: ["JavaScript", "React", "Python", "AWS", "Node.js", "TypeScript", "Go", "Kubernetes"],
  education: ["High School", "Bachelor's", "Master's", "PhD"],
  status: ["Open to work", "Actively looking", "Passively looking"],
};

export default function CandidateSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [candidates, setCandidates] = useState(mockCandidates);

  const toggleStar = (id: string) => {
    setCandidates(candidates.map(c =>
      c.id === id ? { ...c, starred: !c.starred } : c
    ));
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-emerald-100 text-emerald-700";
    if (score >= 75) return "bg-blue-100 text-blue-700";
    if (score >= 60) return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Candidates</h1>
          <p className="text-gray-600 mt-1">Search and discover talent for your open positions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {candidates.filter(c => c.starred).length} saved candidates
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skills, title..."
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          <Button className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any experience</option>
                {filterOptions.experience.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any location</option>
                {filterOptions.location.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any skills</option>
                {filterOptions.skills.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Education</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any education</option>
                {filterOptions.education.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any status</option>
                {filterOptions.status.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{candidates.length}</span> candidates found
        </p>
        <select className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="match">Sort by: Best Match</option>
          <option value="recent">Most Recent</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-xl border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    src={candidate.avatar}
                    alt={candidate.name}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover"
                  />
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getMatchScoreColor(candidate.matchScore)}`}>
                          {candidate.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-gray-600">{candidate.headline}</p>
                    </div>
                    <button
                      onClick={() => toggleStar(candidate.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {candidate.starred ? (
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      ) : (
                        <StarOff className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      {candidate.education}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {candidate.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 5 && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{candidate.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-6 py-3 border-t bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                  candidate.status === "Actively looking"
                    ? "bg-emerald-100 text-emerald-700"
                    : candidate.status === "Open to work"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {candidate.status}
                </span>
                <span>Active {candidate.lastActive}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Eye className="w-4 h-4" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="w-4 h-4" />
                  Resume
                </Button>
                <Button size="sm" className="gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" disabled>Previous</Button>
        <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <span className="text-gray-400">...</span>
        <Button variant="outline" size="sm">12</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
}
