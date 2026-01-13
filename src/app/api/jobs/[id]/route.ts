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
      // Increment view count (ignore errors if RPC doesn't exist)
      try {
        await supabaseAdmin.rpc("increment_job_views", { job_id: id });
      } catch {
        // RPC may not exist, ignore
      }

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
