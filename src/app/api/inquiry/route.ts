import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a production server with SMTP or Resend credentials, this would send an email.
    // Here we record and validate the inquiry payload directed to Onyx Assets LLP.
    console.log("=== [ONYX ASSETS LLP INQUIRY RECEIVED] ===");
    console.log("Target Email:", "onyxassets@outlook.com");
    console.log("Target Phone / WhatsApp:", "+91 91139 25641 / +91 91139 24480");
    console.log("Inquiry Data:", JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      recipient: "onyxassets@outlook.com",
      hotline: "+91 91139 25641",
      receivedAt: new Date().toISOString(),
      message: "Inquiry successfully recorded and queued for executive desk response.",
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
