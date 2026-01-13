import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Linkedin, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

const posts = [
  {
    slug: "top-tech-skills-2025",
    title: "Top 10 Tech Skills Employers Are Looking for in 2025",
    excerpt: "Stay ahead of the curve with these in-demand technical skills that are shaping the job market this year.",
    category: "Technology",
    author: "Michael Chen",
    authorRole: "Director of Technology Recruiting",
    date: "2025-01-10",
    readTime: "5 min read",
    content: `
      <p>The technology landscape is evolving rapidly, and so are the skills employers need. Whether you're a seasoned developer or just starting your tech career, staying current with in-demand skills is crucial for career growth.</p>

      <h2>1. Artificial Intelligence & Machine Learning</h2>
      <p>AI and ML continue to dominate the tech hiring landscape. Companies across industries are looking for professionals who can develop, deploy, and maintain AI systems. Key sub-skills include deep learning, natural language processing, and computer vision.</p>

      <h2>2. Cloud Computing</h2>
      <p>With AWS, Azure, and GCP leading the market, cloud expertise is more valuable than ever. Beyond basic cloud services, employers want architects who can design scalable, cost-effective cloud infrastructure.</p>

      <h2>3. Cybersecurity</h2>
      <p>As cyber threats become more sophisticated, the demand for security professionals continues to surge. Skills in threat detection, incident response, and security architecture are particularly valued.</p>

      <h2>4. Data Engineering</h2>
      <p>The ability to build and maintain data pipelines is critical for data-driven organizations. Proficiency in tools like Apache Spark, Kafka, and modern data warehouses is highly sought after.</p>

      <h2>5. DevOps & SRE</h2>
      <p>The bridge between development and operations remains crucial. CI/CD pipelines, container orchestration with Kubernetes, and infrastructure as code are essential competencies.</p>

      <h2>6. Full-Stack Development</h2>
      <p>Versatile developers who can work across the stack continue to be in high demand. Modern frameworks like React, Next.js, and Node.js top the requirements list.</p>

      <h2>7. Blockchain Development</h2>
      <p>Beyond cryptocurrency, blockchain technology is finding applications in supply chain, healthcare, and finance. Solidity developers and blockchain architects are seeing increased opportunities.</p>

      <h2>8. IoT Development</h2>
      <p>As connected devices proliferate, skills in embedded systems, sensor integration, and IoT platforms are becoming increasingly valuable.</p>

      <h2>9. Low-Code/No-Code Platforms</h2>
      <p>Understanding platforms like Salesforce, ServiceNow, and other enterprise low-code tools can significantly boost your marketability.</p>

      <h2>10. Soft Skills</h2>
      <p>Technical skills alone aren't enough. Communication, collaboration, and problem-solving abilities are what separate good technologists from great ones.</p>

      <h2>Preparing for the Future</h2>
      <p>The key to staying relevant in tech is continuous learning. Online courses, certifications, and hands-on projects are excellent ways to build and demonstrate these skills. At Humanly Staffing, we help tech professionals connect with employers who value both technical expertise and growth mindset.</p>
    `,
  },
];

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post Not Found</h1>
          <Button asChild className="mt-4">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <Badge>{post.category}</Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {post.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm">{post.authorRole}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="text-sm">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Share */}
      <section className="py-12 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-medium text-gray-900">Share this article</p>
            <div className="flex gap-3">
              <button className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white">Looking for Your Next Opportunity?</h2>
          <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
            Browse our open positions and take the next step in your career.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6 bg-white text-blue-600 hover:bg-blue-50">
            <Link href="/jobs">View Open Jobs</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
