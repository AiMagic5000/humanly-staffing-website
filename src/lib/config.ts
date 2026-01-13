export const siteConfig = {
  name: "Humanly Staffing Inc.",
  legalName: "Humanly Staffing Inc.",
  tagline: "Connecting Top Talent with Growing Companies",
  description: "Premier staffing and recruitment solutions. We connect exceptional candidates with industry-leading employers across technology, healthcare, finance, and more.",

  contact: {
    phone: "(888) 804-8424",
    email: "contact@humanlystaffing.com",
    address: {
      street: "1501 South Greeley Highway",
      suite: "Suite C",
      city: "Cheyenne",
      state: "Wyoming",
      zip: "82007",
      full: "1501 South Greeley Highway, Suite C, Cheyenne, WY 82007"
    }
  },

  social: {
    linkedin: "https://linkedin.com/company/humanlystaffing",
    twitter: "https://twitter.com/humanlystaffing",
    facebook: "https://facebook.com/humanlystaffing"
  },

  domain: "humanlystaffing.com",
  url: "https://humanlystaffing.com",

  stats: {
    placements: "2,500+",
    satisfaction: "98%",
    industries: "12+",
    yearsExperience: "15+"
  },

  colors: {
    primary: "#1E40AF",
    secondary: "#3B82F6",
    accent: "#10B981",
    dark: "#1F2937"
  }
} as const;

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
      children: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about/team" },
        { name: "Why Choose Us", href: "/about/why-choose-us" },
        { name: "Our Process", href: "/about/process" }
      ]
    },
    {
      name: "Services",
      href: "/services",
      children: [
        { name: "All Services", href: "/services" },
        { name: "Executive Search", href: "/services/executive-search" },
        { name: "Contract Staffing", href: "/services/contract-staffing" },
        { name: "Direct Hire", href: "/services/direct-hire" },
        { name: "RPO Services", href: "/services/rpo" },
        { name: "Talent Sourcing", href: "/services/talent-sourcing" },
        { name: "Payroll Services", href: "/services/payroll" }
      ]
    },
    {
      name: "Industries",
      href: "/industries",
      children: [
        { name: "All Industries", href: "/industries" },
        { name: "Technology & IT", href: "/industries/technology" },
        { name: "Healthcare", href: "/industries/healthcare" },
        { name: "Finance & Accounting", href: "/industries/finance" },
        { name: "Manufacturing", href: "/industries/manufacturing" },
        { name: "Retail & Hospitality", href: "/industries/retail" },
        { name: "Logistics & Warehouse", href: "/industries/logistics" }
      ]
    },
    { name: "Jobs", href: "/jobs" },
    {
      name: "Employers",
      href: "/employers",
      children: [
        { name: "Employer Services", href: "/employers" },
        { name: "Request Talent", href: "/employers/request-talent" },
        { name: "Case Studies", href: "/employers/case-studies" }
      ]
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ],
  footer: {
    services: [
      { name: "Executive Search", href: "/services/executive-search" },
      { name: "Contract Staffing", href: "/services/contract-staffing" },
      { name: "Direct Hire", href: "/services/direct-hire" },
      { name: "RPO Services", href: "/services/rpo" }
    ],
    industries: [
      { name: "Technology", href: "/industries/technology" },
      { name: "Healthcare", href: "/industries/healthcare" },
      { name: "Finance", href: "/industries/finance" },
      { name: "Manufacturing", href: "/industries/manufacturing" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about/team" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" }
    ]
  }
} as const;
