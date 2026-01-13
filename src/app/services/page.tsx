import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, FileCheck, Users, Building, Briefcase, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive staffing and recruitment services including executive search, contract staffing, direct hire, RPO, and more.",
};

const services = [
  {
    title: "Executive Search",
    description: "Find C-suite and senior leadership talent through our targeted executive recruitment approach. We leverage our extensive network and rigorous screening process to identify leaders who will drive your organization forward.",
    icon: Search,
    href: "/services/executive-search",
    features: ["C-Suite recruitment", "Board member placement", "Confidential searches", "Leadership assessment"],
    color: "bg-blue-500",
  },
  {
    title: "Contract Staffing",
    description: "Flexible workforce solutions for project-based needs, seasonal demands, or temporary coverage. Get skilled professionals quickly without long-term commitments.",
    icon: FileCheck,
    href: "/services/contract-staffing",
    features: ["Quick turnaround", "Flexible terms", "Payroll management", "Compliance handled"],
    color: "bg-emerald-500",
  },
  {
    title: "Direct Hire",
    description: "Build your core team with permanent employees who fit your culture and have the skills to excel. We manage the entire recruitment process from sourcing to offer.",
    icon: Users,
    href: "/services/direct-hire",
    features: ["Full-cycle recruiting", "Culture matching", "Skills assessment", "Salary benchmarking"],
    color: "bg-purple-500",
  },
  {
    title: "RPO Services",
    description: "Outsource your entire recruitment function or specific hiring projects to our expert team. We become an extension of your HR department.",
    icon: Building,
    href: "/services/rpo",
    features: ["Scalable solutions", "Dedicated team", "Process optimization", "Technology integration"],
    color: "bg-orange-500",
  },
  {
    title: "Talent Sourcing",
    description: "Proactive candidate identification and pipeline building for current and future hiring needs. Never start from scratch when you have a new opening.",
    icon: Briefcase,
    href: "/services/talent-sourcing",
    features: ["Passive candidate outreach", "Talent mapping", "Pipeline development", "Market intelligence"],
    color: "bg-pink-500",
  },
  {
    title: "Payroll Services",
    description: "Comprehensive payroll management for your contingent workforce. We handle compliance, taxes, and administration so you can focus on your business.",
    icon: Calculator,
    href: "/services/payroll",
    features: ["Payroll processing", "Tax compliance", "Benefits administration", "Reporting & analytics"],
    color: "bg-cyan-500",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Our Services</h1>
            <p className="mt-6 text-xl text-blue-100">
              Comprehensive staffing solutions tailored to your unique business needs.
              From executive search to payroll, we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid gap-8 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`inline-flex rounded-xl ${service.color} p-4 text-white mb-6`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  <p className="mt-4 text-lg text-gray-600">{service.description}</p>
                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-600">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-8">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className={`aspect-video rounded-2xl ${service.color} bg-opacity-10 flex items-center justify-center`}>
                    <service.icon className={`h-24 w-24 ${service.color.replace("bg-", "text-")} opacity-50`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Not Sure Which Service Is Right for You?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our team will work with you to understand your needs and recommend the best approach.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/employers/request-talent">Request Talent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
