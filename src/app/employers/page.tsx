import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Shield, Users, Target, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "For Employers",
  description: "Partner with Humanly Staffing to find top talent for your organization. Fast, reliable, and quality-guaranteed staffing solutions.",
};

const benefits = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Get qualified candidates within days, not weeks. Our average time-to-fill is just 14 days.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "90-day replacement guarantee on all placements. We stand behind every candidate we recommend.",
  },
  {
    icon: Users,
    title: "Pre-Screened Talent",
    description: "Every candidate is thoroughly vetted through our rigorous 5-step screening process.",
  },
  {
    icon: Target,
    title: "Industry Expertise",
    description: "Specialized recruiters who understand your industry's unique requirements and challenges.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "Personal account manager providing end-to-end support throughout the hiring process.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We learn about your company culture, requirements, and hiring goals.",
  },
  {
    step: "02",
    title: "Talent Search",
    description: "Our recruiters tap into our network and databases to find matching candidates.",
  },
  {
    step: "03",
    title: "Screening & Vetting",
    description: "Candidates undergo thorough interviews, skills assessments, and background checks.",
  },
  {
    step: "04",
    title: "Candidate Presentation",
    description: "We present top candidates with detailed profiles and our recommendations.",
  },
  {
    step: "05",
    title: "Interview Coordination",
    description: "We schedule interviews and gather feedback to refine the search if needed.",
  },
  {
    step: "06",
    title: "Offer & Onboarding",
    description: "We assist with negotiations and ensure a smooth transition for the new hire.",
  },
];

export default function EmployersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Find Top Talent for Your Team
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                Partner with {siteConfig.name} to access pre-screened, qualified candidates
                who fit your culture and exceed your expectations.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/employers/request-talent">
                    Request Talent
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Schedule a Call</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 backdrop-blur p-6 text-white text-center">
                <p className="text-4xl font-bold">{siteConfig.stats.placements}</p>
                <p className="mt-2 text-blue-100">Placements</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur p-6 text-white text-center">
                <p className="text-4xl font-bold">{siteConfig.stats.satisfaction}</p>
                <p className="mt-2 text-blue-100">Satisfaction</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur p-6 text-white text-center">
                <p className="text-4xl font-bold">14</p>
                <p className="mt-2 text-blue-100">Avg. Days to Fill</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur p-6 text-white text-center">
                <p className="text-4xl font-bold">90</p>
                <p className="mt-2 text-blue-100">Day Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Partner With Us</h2>
            <p className="mt-4 text-lg text-gray-600">
              We&apos;re not just another staffing agency. We&apos;re your strategic hiring partner.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-600">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-3 text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Hiring Process</h2>
            <p className="mt-4 text-lg text-gray-600">
              A streamlined approach to finding your perfect candidate
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm">
                <span className="text-4xl font-bold text-blue-100">{item.step}</span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Build Your Dream Team?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Let&apos;s discuss your hiring needs and how we can help you find the perfect candidates.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/employers/request-talent">Submit a Request</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
