import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { supabaseAdmin } from "@/lib/supabase";
import { jobs as mockJobs } from "@/data/jobs";

// GET - Get a single job by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes("your-project");

    if (isSupabaseConfigured) {
      // First try humanly_jobs table (imported jobs)
      const { data: humanlyJob, error: humanlyError } = await supabaseAdmin
        .from("humanly_jobs")
        .select("*")
        .eq("id", id)
        .eq("status", "active")
        .single();

      if (humanlyJob && !humanlyError) {
        // Convert to standard job format
        const job = {
          id: humanlyJob.id,
          externalId: humanlyJob.id,
          title: humanlyJob.title,
          company: humanlyJob.company,
          location: humanlyJob.location,
          locationType: humanlyJob.remote ? "remote" : "onsite",
          type: humanlyJob.job_type || "full-time",
          job_type: humanlyJob.job_type,
          salary: humanlyJob.salary_min && humanlyJob.salary_max
            ? `$${humanlyJob.salary_min.toLocaleString()} - $${humanlyJob.salary_max.toLocaleString()}`
            : null,
          salaryMin: humanlyJob.salary_min,
          salaryMax: humanlyJob.salary_max,
          industry: humanlyJob.industry || "general",
          description: humanlyJob.description || "",
          requirements: humanlyJob.requirements || [],
          benefits: humanlyJob.benefits || [],
          featured: humanlyJob.featured || false,
          postedDate: humanlyJob.created_at,
          expiresDate: humanlyJob.expires_at,
          source: "database",
        };
        return NextResponse.json({ success: true, job });
      }

      // Fall back to jobs table (employer-posted jobs)
      const { data, error } = await supabaseAdmin
        .from("jobs")
        .select(`
          *,
          employer:profiles!jobs_employer_id_fkey (
            id,
            company_name,
            company_logo,
            company_size,
            industry
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return NextResponse.json(
            { success: false, error: "Job not found" },
            { status: 404 }
          );
        }
        console.error("Database error:", error);
        throw new Error("Failed to fetch job");
      }

      return NextResponse.json({ success: true, job: data });
    }

    // Return mock data when database not configured
    const job = mockJobs.find((j) => j.id === id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}
