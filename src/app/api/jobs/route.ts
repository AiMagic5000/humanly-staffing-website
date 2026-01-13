import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { jobs as mockJobs } from "@/data/jobs";

const jobSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  department: z.string().min(2, "Department is required"),
  location: z.string().min(3, "Location is required"),
  locationType: z.enum(["onsite", "remote", "hybrid"]),
  type: z.enum(["full-time", "part-time", "contract", "temporary", "internship"]),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  salaryType: z.enum(["year", "hour", "project"]),
  showSalary: z.boolean(),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
  description: z.string().min(100, "Description must be at least 100 characters"),
  requirements: z.string().min(50, "Requirements must be at least 50 characters"),
  benefits: z.string().optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  applicationDeadline: z.string().optional(),
  startDate: z.string().optional(),
});

// GET - List jobs (public or filtered by employer)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const employerId = searchParams.get("employerId");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes("your-project");

    if (isSupabaseConfigured) {
      let query = supabaseAdmin
        .from("jobs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      // Apply filters
      if (employerId) {
        query = query.eq("employer_id", employerId);
      }
      if (status) {
        query = query.eq("status", status);
      }
      if (featured === "true") {
        query = query.eq("featured", true);
      }

      // Apply pagination
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Database error:", error);
        throw new Error("Failed to fetch jobs");
      }

      return NextResponse.json({
        success: true,
        jobs: data,
        pagination: {
          total: count,
          limit,
          offset,
          hasMore: (count || 0) > offset + limit,
        },
      });
    }

    // Return mock data when database not configured
    let filteredJobs = [...mockJobs];

    // All mock jobs are active by default
    if (featured === "true") {
      filteredJobs = filteredJobs.filter((j) => j.featured);
    }

    const paginatedJobs = filteredJobs.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      jobs: paginatedJobs,
      pagination: {
        total: filteredJobs.length,
        limit,
        offset,
        hasMore: filteredJobs.length > offset + limit,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST - Create a new job (employer only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = jobSchema.parse(body);

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes("your-project");

    if (isSupabaseConfigured) {
      // Format salary range
      let salaryRange = null;
      if (validatedData.salaryMin || validatedData.salaryMax) {
        salaryRange = `$${validatedData.salaryMin || "0"} - $${validatedData.salaryMax || "0"}/${validatedData.salaryType}`;
      }

      const { data, error } = await supabaseAdmin
        .from("jobs")
        .insert({
          employer_id: userId,
          title: validatedData.title,
          department: validatedData.department,
          location: validatedData.location,
          location_type: validatedData.locationType,
          type: validatedData.type,
          salary_range: salaryRange,
          show_salary: validatedData.showSalary,
          experience_level: validatedData.experienceLevel,
          description: validatedData.description,
          requirements: validatedData.requirements,
          benefits: validatedData.benefits || null,
          skills: validatedData.skills,
          application_deadline: validatedData.applicationDeadline || null,
          start_date: validatedData.startDate || null,
          status: "active",
          featured: false,
          views: 0,
          applications_count: 0,
        })
        .select()
        .single();

      if (error) {
        console.error("Database error:", error);
        throw new Error("Failed to create job");
      }

      return NextResponse.json(
        {
          success: true,
          message: "Job posted successfully",
          job: data,
        },
        { status: 201 }
      );
    }

    // Mock response when database not configured
    const mockJob = {
      id: `job_${Date.now()}`,
      ...validatedData,
      employer_id: userId,
      status: "active",
      featured: false,
      views: 0,
      applications_count: 0,
      created_at: new Date().toISOString(),
    };

    console.log("Database not configured, mock job created:", mockJob);

    return NextResponse.json(
      {
        success: true,
        message: "Job posted successfully (mock)",
        job: mockJob,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid job data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Job creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create job" },
      { status: 500 }
    );
  }
}

// PATCH - Update a job
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { jobId, ...updateData } = body;

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes("your-project");

    if (isSupabaseConfigured) {
      // Verify ownership or admin status
      const { data: existingJob, error: fetchError } = await supabaseAdmin
        .from("jobs")
        .select("employer_id")
        .eq("id", jobId)
        .single();

      if (fetchError || !existingJob) {
        return NextResponse.json(
          { success: false, error: "Job not found" },
          { status: 404 }
        );
      }

      // Allow update if owner or admin (you could add admin check here)
      if (existingJob.employer_id !== userId) {
        return NextResponse.json(
          { success: false, error: "Not authorized to update this job" },
          { status: 403 }
        );
      }

      const { data, error } = await supabaseAdmin
        .from("jobs")
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId)
        .select()
        .single();

      if (error) {
        console.error("Database error:", error);
        throw new Error("Failed to update job");
      }

      return NextResponse.json({ success: true, job: data });
    }

    // Mock response when database not configured
    return NextResponse.json({
      success: true,
      job: { id: jobId, ...updateData, updated_at: new Date().toISOString() },
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a job
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes("your-project");

    if (isSupabaseConfigured) {
      // Verify ownership
      const { data: existingJob, error: fetchError } = await supabaseAdmin
        .from("jobs")
        .select("employer_id")
        .eq("id", jobId)
        .single();

      if (fetchError || !existingJob) {
        return NextResponse.json(
          { success: false, error: "Job not found" },
          { status: 404 }
        );
      }

      if (existingJob.employer_id !== userId) {
        return NextResponse.json(
          { success: false, error: "Not authorized to delete this job" },
          { status: 403 }
        );
      }

      const { error } = await supabaseAdmin
        .from("jobs")
        .delete()
        .eq("id", jobId);

      if (error) {
        console.error("Database error:", error);
        throw new Error("Failed to delete job");
      }

      return NextResponse.json({
        success: true,
        message: "Job deleted successfully",
      });
    }

    // Mock response when database not configured
    return NextResponse.json({
      success: true,
      message: "Job deleted successfully (mock)",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
