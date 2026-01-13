import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
  type: z.enum(["general", "employer", "candidate"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // In production, this would:
    // 1. Send email notification to admin
    // 2. Send confirmation email to user
    // 3. Store in database

    console.log("Contact form submission:", validatedData);

    // Simulate email sending
    // await sendEmail({
    //   to: "contact@humanlystaffing.com",
    //   ...emailTemplates.contactFormNotification({
    //     name: validatedData.name,
    //     email: validatedData.email,
    //     phone: validatedData.phone || "Not provided",
    //     subject: validatedData.subject,
    //     message: validatedData.message,
    //   }),
    // });

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
