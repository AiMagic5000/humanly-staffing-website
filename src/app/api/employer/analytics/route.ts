import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

// Demo analytics data for fallback
const demoEmployerAnalytics = {
  stats: {
    activeJobs: 8,
    totalApplications: 156,
    profileViews: 2847,
    hireRate: 68,
  },
  changes: {
    jobs: "+2 this month",
    applications: "+23 this week",
    views: "+12% vs last month",
    hireRate: "+5% vs last month",
  },
  recentApplications: [
    {
      id: "1",
      candidate: "Sarah Johnson",
      position: "Senior Software Engineer",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      status: "new",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      experience: "8 years",
      location: "San Francisco, CA",
    },
    {
      id: "2",
      candidate: "Michael Chen",
      position: "Product Manager",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      status: "reviewing",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      experience: "6 years",
      location: "New York, NY",
    },
    {
      id: "3",
      candidate: "Emily Rodriguez",
      position: "UX Designer",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: "shortlisted",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      experience: "5 years",
      location: "Austin, TX",
    },
    {
      id: "4",
      candidate: "David Kim",
      position: "Senior Software Engineer",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: "interviewed",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      experience: "10 years",
      location: "Seattle, WA",
    },
  ],
  activeJobs: [
    {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$150k - $200k",
      applications: 45,
      views: 892,
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
      status: "active",
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $170k",
      applications: 38,
      views: 654,
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      status: "active",
    },
    {
      id: "3",
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100k - $140k",
      applications: 29,
      views: 521,
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      status: "active",
    },
  ],
};

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes("your-project");

    if (isSupabaseConfigured) {
      try {
        // Get the employer's company ID first
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("company_id")
          .eq("user_id", userId)
          .single();

        if (profile?.company_id) {
          // Fetch real data for this employer
          const [
            { count: jobsCount },
            { count: applicationsCount },
          ] = await Promise.all([
            supabaseAdmin
              .from("jobs")
              .select("*", { count: "exact", head: true })
              .eq("company_id", profile.company_id)
              .eq("status", "active"),
            supabaseAdmin
              .from("applications")
              .select("*", { count: "exact", head: true })
              .eq("company_id", profile.company_id),
          ]);

          // Fetch recent applications
          const { data: applications } = await supabaseAdmin
            .from("applications")
            .select(`
              id,
              status,
              created_at,
              jobs (title),
              profiles (
                full_name,
                avatar_url,
                location,
                years_experience
              )
            `)
            .eq("company_id", profile.company_id)
            .order("created_at", { ascending: false })
            .limit(4);

          // Fetch active jobs
          const { data: jobs } = await supabaseAdmin
            .from("jobs")
            .select("*")
            .eq("company_id", profile.company_id)
            .eq("status", "active")
            .order("created_at", { ascending: false })
            .limit(3);

          if (jobsCount !== null || applicationsCount !== null) {
            return NextResponse.json({
              success: true,
              data: {
                ...demoEmployerAnalytics,
                stats: {
                  ...demoEmployerAnalytics.stats,
                  activeJobs: jobsCount || demoEmployerAnalytics.stats.activeJobs,
                  totalApplications: applicationsCount || demoEmployerAnalytics.stats.totalApplications,
                },
                recentApplications: applications?.length ? applications.map((app) => ({
                  id: app.id,
                  candidate: (app.profiles as { full_name?: string })?.full_name || "Unknown",
                  position: (app.jobs as { title?: string })?.title || "Unknown Position",
                  appliedAt: app.created_at,
                  status: app.status,
                  avatar: (app.profiles as { avatar_url?: string })?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                  experience: `${(app.profiles as { years_experience?: number })?.years_experience || 0} years`,
                  location: (app.profiles as { location?: string })?.location || "Unknown",
                })) : demoEmployerAnalytics.recentApplications,
                activeJobs: jobs?.length ? jobs.map((job) => ({
                  id: job.id,
                  title: job.title,
                  department: job.department || "General",
                  location: job.location,
                  type: job.employment_type || "Full-time",
                  salary: job.salary_min && job.salary_max
                    ? `$${(job.salary_min / 1000).toFixed(0)}k - $${(job.salary_max / 1000).toFixed(0)}k`
                    : "Competitive",
                  applications: job.applications_count || 0,
                  views: job.views_count || 0,
                  postedAt: job.created_at,
                  status: job.status,
                })) : demoEmployerAnalytics.activeJobs,
              },
              source: "database",
            });
          }
        }
      } catch (dbError) {
        console.log("Database query failed, using demo data:", dbError);
      }
    }

    // Return demo analytics
    return NextResponse.json({
      success: true,
      data: demoEmployerAnalytics,
      source: "demo",
    });
  } catch (error) {
    console.error("Employer analytics error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
