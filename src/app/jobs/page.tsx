"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobs, industries, jobTypes, locations } from "@/data/jobs";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIndustry =
        selectedIndustry === "all" || job.industry === selectedIndustry;

      const matchesType =
        selectedType === "all" || job.type === selectedType;

      const matchesLocation =
        selectedLocation === "all" || job.location === selectedLocation;

      return matchesSearch && matchesIndustry && matchesType && matchesLocation;
    });
  }, [searchQuery, selectedIndustry, selectedType, selectedLocation]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("all");
    setSelectedType("all");
    setSelectedLocation("all");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedIndustry !== "all" ||
    selectedType !== "all" ||
    selectedLocation !== "all";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Find Your Next Opportunity
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Browse {jobs.length}+ open positions across top companies
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="flex gap-2 bg-white rounded-xl p-2 shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0 focus-visible:ring-0"
                />
              </div>
              <Button
                variant="ghost"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
              </Button>
              <Button type="submit">Search</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-72 flex-shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Industry Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry.slug} value={industry.name}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Close button for mobile */}
              <Button
                variant="outline"
                className="w-full mt-6 lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Jobs List */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span>{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedIndustry}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedIndustry("all")}
                      />
                    </Badge>
                  )}
                  {selectedType !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedType}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedType("all")}
                      />
                    </Badge>
                  )}
                  {selectedLocation !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedLocation}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedLocation("all")}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/jobs/${job.id}`}
                      className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge>{job.industry}</Badge>
                            {job.featured && (
                              <Badge variant="success">Featured</Badge>
                            )}
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="mt-1 text-gray-600">{job.company}</p>
                          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(job.postedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button className="sm:self-center">Apply Now</Button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">No jobs found</h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
