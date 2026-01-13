import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Heart, DollarSign, Factory, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Specialized staffing solutions across technology, healthcare, finance, manufacturing, retail, and logistics industries.",
};

const industries = [
  {
    name: "Technology & IT",
    slug: "technology",
    description: "From software engineers to cybersecurity experts, we connect top tech talent with innovative companies. Our deep understanding of the tech landscape ensures perfect matches.",
    icon: Monitor,
    roles: ["Software Engineers", "Data Scientists", "DevOps Engineers", "Product Managers", "UI/UX Designers"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    description: "We understand the critical nature of healthcare staffing. Our rigorous vetting process ensures you get qualified, compassionate professionals.",
    icon: Heart,
    roles: ["Registered Nurses", "Physicians", "Medical Technicians", "Healthcare Administrators", "Therapists"],
    gradient: "from-rose-500 to-pink-500",
  },
  {
    name: "Finance & Accounting",
    slug: "finance",
    description: "Connect with skilled financial professionals who can drive your business forward. From analysts to CFOs, we find the right fit.",
    icon: DollarSign,
    roles: ["Financial Analysts", "Accountants", "Controllers", "Investment Bankers", "Tax Specialists"],
    gradient: "from-emerald-500 to-green-500",
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    description: "Build your production team with skilled workers who understand quality, safety, and efficiency. We staff all levels of manufacturing operations.",
    icon: Factory,
    roles: ["Production Managers", "Quality Engineers", "CNC Machinists", "Maintenance Technicians", "Plant Managers"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "Retail & Hospitality",
    slug: "retail",
    description: "Customer-facing roles require special skills. We find professionals who deliver exceptional experiences and drive sales.",
    icon: ShoppingBag,
    roles: ["Store Managers", "Sales Associates", "Hotel Managers", "Restaurant GMs", "Visual Merchandisers"],
    gradient: "from-purple-500 to-violet-500",
  },
  {
    name: "Logistics & Warehouse",
    slug: "logistics",
    description: "Keep your supply chain moving with reliable warehouse and logistics professionals. From drivers to distribution managers.",
    icon: Truck,
    roles: ["Warehouse Supervisors", "Logistics Coordinators", "Fleet Managers", "Dispatch Supervisors", "Supply Chain Analysts"],
    gradient: "from-slate-500 to-gray-600",
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Industries We Serve</h1>
            <p className="mt-6 text-xl text-blue-100">
              Deep expertise across multiple sectors ensures we understand your unique
              hiring challenges and deliver candidates who excel.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {industries.map((industry) => {
              const industryJobCount = jobs.filter(
                (job) => job.industry === industry.name.split(" ")[0] ||
                         job.industry === industry.name
              ).length;

              return (
                <div
                  key={industry.slug}
                  className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`h-32 bg-gradient-to-br ${industry.gradient} relative`}>
                    <industry.icon className="absolute bottom-4 right-4 h-16 w-16 text-white/30" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{industry.name}</h2>
                      <span className="text-sm text-gray-500">{industryJobCount}+ jobs</span>
                    </div>
                    <p className="text-gray-600">{industry.description}</p>
                    <div className="mt-6">
                      <p className="text-sm font-medium text-gray-700 mb-3">Common Roles:</p>
                      <div className="flex flex-wrap gap-2">
                        {industry.roles.map((role) => (
                          <span
                            key={role}
                            className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button asChild>
                        <Link href={`/industries/${industry.slug}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/jobs?industry=${industry.name}`}>View Jobs</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Don&apos;t See Your Industry?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We work with companies across many sectors. Contact us to discuss your specific needs.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
