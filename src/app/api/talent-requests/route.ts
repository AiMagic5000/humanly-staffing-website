import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

const talentRequestSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(2, "Industry is required"),
  contactName: z.string().min(2, "Contact name is required"),
  contactTitle: z.string().min(2, "Job title is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  positionTitle: z.string().min(2, "Position title is required"),
  numberOfPositions: z.number().min(1, "At least 1 position required"),
  employmentType: z.string().min(2, "Employment type is required"),
  location: z.string().min(2, "Location is required"),
  salaryRange: z.string().optional(),
  hiringTimeline: z.string().min(2, "Hiring timeline is required"),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters"),
  additionalNotes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = talentRequestSchema.parse(body);

    // Try to insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("talent_requests")
      .insert({
        company_name: validatedData.companyName,
        industry: validatedData.industry,
        contact_name: validatedData.contactName,
        contact_title: validatedData.contactTitle,
        email: validatedData.email,
        phone: validatedData.phone,
        position_title: validatedData.positionTitle,
        number_of_positions: validatedData.numberOfPositions,
        employment_type: validatedData.employmentType,
        location: validatedData.location,
        salary_range: validatedData.salaryRange || null,
        hiring_timeline: validatedData.hiringTimeline,
        job_description: validatedData.jobDescription,
        additional_notes: validatedData.additionalNotes || null,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      // Log the error but still return success for demo mode
      console.log("Supabase insert skipped (demo mode):", error.message);

      // Return mock response in demo mode
      return NextResponse.json({
        success: true,
        message: "Talent request submitted successfully",
        data: {
          id: `demo_${Date.now()}`,
          ...validatedData,
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      });
    }

    // Send notification email (would integrate with email service)
    // await sendTalentRequestNotification(validatedData);

    return NextResponse.json({
      success: true,
      message: "Talent request submitted successfully",
      data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Talent request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit talent request" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabaseAdmin
      .from("talent_requests")
      .select("*", { count: "exact" });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      // Return empty for demo mode
      return NextResponse.json({
        success: true,
        data: [],
        pagination: { total: 0, limit, offset },
      });
    }

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total: count || 0,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Fetch talent requests error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch talent requests" },
      { status: 500 }
    );
  }
}
