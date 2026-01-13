"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Edit,
  Upload,
  Save,
  Check,
  Linkedin,
  Twitter,
  Instagram,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock company data
const mockCompany = {
  name: "TechCorp Inc.",
  logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop",
  banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
  tagline: "Building the future of technology, one innovation at a time",
  website: "https://techcorp.com",
  industry: "Technology",
  size: "501-1000 employees",
  founded: "2010",
  headquarters: "San Francisco, CA",
  locations: ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA"],
  about: "TechCorp Inc. is a leading technology company specializing in enterprise software solutions. We build innovative products that help businesses transform and scale. Our mission is to empower organizations with cutting-edge technology that drives growth and efficiency.",
  culture: "We believe in fostering a culture of innovation, collaboration, and continuous learning. Our team is diverse, inclusive, and committed to excellence. We offer flexible work arrangements, competitive benefits, and opportunities for professional growth.",
  benefits: [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "401(k) with company match",
    "Unlimited PTO",
    "Remote work options",
    "Professional development budget",
    "Wellness programs",
    "Parental leave",
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/company/techcorp",
    twitter: "https://twitter.com/techcorp",
    instagram: "https://instagram.com/techcorp",
  },
  stats: {
    employees: 750,
    offices: 4,
    openJobs: 12,
    avgTenure: "3.5 years",
  },
};

export default function CompanyProfilePage() {
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState(mockCompany);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">Manage how candidates see your company</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <a href="/company/techcorp" target="_blank">Preview Profile</a>
          </Button>
          <Button onClick={handleSave} className="gap-2">
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Banner & Logo */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
          <Image
            src={company.banner}
            alt="Company banner"
            fill
            className="object-cover opacity-80"
          />
          <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 relative z-10">
            <div className="relative">
              <Image
                src={company.logo}
                alt={company.name}
                width={100}
                height={100}
                className="rounded-xl border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute -bottom-2 -right-2 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Edit className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
              <p className="text-gray-600">{company.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-900 mb-6">Basic Information</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <Input
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <Input
                  value={company.tagline}
                  onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                  placeholder="A short description of your company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="education">Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Founded Year
                </label>
                <Input
                  value={company.founded}
                  onChange={(e) => setCompany({ ...company, founded: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headquarters
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={company.headquarters}
                    onChange={(e) => setCompany({ ...company, headquarters: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-900 mb-6">About the Company</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  value={company.about}
                  onChange={(e) => setCompany({ ...company, about: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell candidates about your company's mission, products, and what makes you unique..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Culture
                </label>
                <textarea
                  value={company.culture}
                  onChange={(e) => setCompany({ ...company, culture: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your company culture and work environment..."
                />
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Benefits & Perks</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Benefit
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {company.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <span className="text-gray-700">{benefit}</span>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Office Locations */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Office Locations</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Location
              </Button>
            </div>
            <div className="space-y-3">
              {company.locations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{location}</span>
                    {index === 0 && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        Headquarters
                      </span>
                    )}
                  </div>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Stats */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Company Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Employees</span>
                </div>
                <span className="font-medium text-gray-900">{company.stats.employees}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Offices</span>
                </div>
                <span className="font-medium text-gray-900">{company.stats.offices}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Avg. Tenure</span>
                </div>
                <span className="font-medium text-gray-900">{company.stats.avgTenure}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Social Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={company.socialLinks.linkedin}
                    className="pl-10"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter / X
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={company.socialLinks.twitter}
                    className="pl-10"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={company.socialLinks.instagram}
                    className="pl-10"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Photos & Media</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=200&h=200&fit=crop",
              ].map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={img}
                    alt={`Office photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="p-1.5 bg-white rounded-full text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
