import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Mock notifications data - in production, this would come from the database
const notifications = [
  {
    id: "1",
    userId: "user_test",
    type: "application",
    title: "Application Received",
    message: "You received a new application for Senior Software Engineer",
    read: false,
    createdAt: new Date().toISOString(),
    link: "/employer/applications",
  },
  {
    id: "2",
    userId: "user_test",
    type: "job",
    title: "Job Posted",
    message: "Your job 'Product Manager' is now live",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    link: "/employer/jobs",
  },
];

export async function GET(_request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // In production, fetch from database
    // const { data, error } = await supabase
    //   .from("notifications")
    //   .select("*")
    //   .eq("user_id", userId)
    //   .order("created_at", { ascending: false })
    //   .limit(20);

    return NextResponse.json({
      success: true,
      notifications: notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

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
    const { notificationId: _notificationId, action } = body;

    if (action === "markRead") {
      // In production, update database
      // await supabase
      //   .from("notifications")
      //   .update({ read: true })
      //   .eq("id", notificationId)
      //   .eq("user_id", userId);

      return NextResponse.json({ success: true, message: "Notification marked as read" });
    }

    if (action === "markAllRead") {
      // In production, update all user notifications
      // await supabase
      //   .from("notifications")
      //   .update({ read: true })
      //   .eq("user_id", userId);

      return NextResponse.json({ success: true, message: "All notifications marked as read" });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update notification" },
      { status: 500 }
    );
  }
}

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
    const notificationId = searchParams.get("id");

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: "Notification ID required" },
        { status: 400 }
      );
    }

    // In production, delete from database
    // await supabase
    //   .from("notifications")
    //   .delete()
    //   .eq("id", notificationId)
    //   .eq("user_id", userId);

    return NextResponse.json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete notification" },
      { status: 500 }
    );
  }
}
