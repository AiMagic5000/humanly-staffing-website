"use client";

import { useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const industries = [
  "Technology & IT",
  "Healthcare",
  "Finance & Accounting",
  "Manufacturing",
  "Retail & Hospitality",
  "Logistics & Warehouse",
  "Other",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Contract-to-Hire"];

const urgencyLevels = [
  "Immediately (1-2 weeks)",
  "Soon (2-4 weeks)",
  "Planning ahead (1-2 months)",
  "No rush (3+ months)",
];

export default function RequestTalentPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Request Submitted!</h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your talent request. Our team will review your requirements and
            reach out within 24 hours to discuss next steps.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/employers">Back to Employers</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/employers"
            className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employers
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Request Talent</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Tell us about your hiring needs and we&apos;ll connect you with qualified candidates.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>

            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <Input required placeholder="Acme Corporation" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <Input required placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <Input required placeholder="HR Manager" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input type="email" required placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <Input type="tel" required placeholder="(555) 123-4567" />
                </div>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-xl font-semibold text-gray-900 mb-6">Position Details</h2>

            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position Title *
                  </label>
                  <Input required placeholder="Software Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Positions *
                  </label>
                  <Input type="number" min="1" required placeholder="1" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type *
                  </label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <Input required placeholder="City, State or Remote" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <Input placeholder="$80,000 - $100,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hiring Timeline *
                  </label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description & Requirements *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Describe the role, responsibilities, required skills, and qualifications..."
                  className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Any other details that would help us find the right candidate..."
                  className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
