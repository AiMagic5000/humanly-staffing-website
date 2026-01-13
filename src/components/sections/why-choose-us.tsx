"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Shield,
  Users,
  Award,
  Target,
  HeartHandshake
} from "lucide-react";
import { siteConfig } from "@/lib/config";

const features = [
  {
    icon: Clock,
    title: "Fast Placement",
    description: "Average time-to-fill of just 14 days. Get qualified candidates faster than industry average.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "98% satisfaction rate with a 90-day replacement guarantee on all placements.",
  },
  {
    icon: Users,
    title: "Extensive Network",
    description: "Access to 50,000+ pre-screened candidates across all industries and experience levels.",
  },
  {
    icon: Award,
    title: "Industry Expertise",
    description: "Specialized recruiters with deep knowledge in their respective industries.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "Advanced screening process ensures perfect culture and skill fit every time.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "Personal account managers providing end-to-end support throughout the process.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Companies Choose{" "}
              <span className="text-blue-600">{siteConfig.name}</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We&apos;re not just another staffing agency. We&apos;re your strategic partner
              in building high-performing teams that drive business success.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="rounded-xl bg-blue-50 p-6">
                <p className="text-4xl font-bold text-blue-600">{siteConfig.stats.placements}</p>
                <p className="mt-1 text-sm text-gray-600">Successful Placements</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-6">
                <p className="text-4xl font-bold text-emerald-600">{siteConfig.stats.satisfaction}</p>
                <p className="mt-1 text-sm text-gray-600">Client Satisfaction</p>
              </div>
              <div className="rounded-xl bg-purple-50 p-6">
                <p className="text-4xl font-bold text-purple-600">{siteConfig.stats.industries}</p>
                <p className="mt-1 text-sm text-gray-600">Industries Served</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-6">
                <p className="text-4xl font-bold text-amber-600">{siteConfig.stats.yearsExperience}</p>
                <p className="mt-1 text-sm text-gray-600">Years Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Features */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl border border-gray-100 p-6 hover:border-blue-100 hover:shadow-md transition-all"
              >
                <div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-600">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
