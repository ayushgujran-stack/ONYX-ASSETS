import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const TARGET_EMAIL = "onyxassets@outlook.com";
const TARGET_PHONE = "+91 91139 25641";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const record = {
      id: `inq_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      name: String(data?.name || "Visitor").trim(),
      email: String(data?.email || "").trim(),
      phone: String(data?.phone || "").trim(),
      residence: String(data?.residence || "Opulence by Onyx").trim(),
      format: String(data?.format || "Consultation").trim(),
      date: String(data?.date || "Flexible").trim(),
      timeOfDay: String(data?.timeOfDay || "").trim(),
      notes: String(data?.notes || "").trim(),
    };

    // 1. Optional live transactional email delivery when RESEND_API_KEY is configured in deployment
    let emailDispatched = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from:
              process.env.RESEND_FROM_EMAIL ||
              "Onyx Assets Advisory <onboarding@resend.dev>",
            to: [TARGET_EMAIL],
            subject: `New Inquiry: ${record.residence} — ${record.name}`,
            text: [
              `New Lead for Onyx Assets LLP`,
              `Residence: ${record.residence}`,
              `Client Name: ${record.name}`,
              `Phone / WhatsApp: ${record.phone}`,
              record.email ? `Email: ${record.email}` : null,
              `Format: ${record.format}`,
              `Date: ${record.date} ${record.timeOfDay}`,
              record.notes ? `Notes: ${record.notes}` : null,
            ]
              .filter(Boolean)
              .join("\n"),
          }),
        });
        emailDispatched = res.ok;
      } catch (err) {
        console.warn("Resend dispatch failed:", err);
      }
    }

    // 2. Optional CRM / Automation Webhook (Make / Zapier / n8n)
    let webhookDispatched = false;
    if (process.env.INQUIRY_WEBHOOK_URL) {
      try {
        const res = await fetch(process.env.INQUIRY_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        webhookDispatched = res.ok;
      } catch (err) {
        console.warn("Webhook dispatch failed:", err);
      }
    }

    // 3. Persist inquiry cleanly to /tmp/onyx_inquiries.jsonl so leads are retained on node runtime
    try {
      const logPath = path.join("/tmp", "onyx_inquiries.jsonl");
      fs.appendFileSync(logPath, JSON.stringify(record) + "\n", "utf8");
    } catch {
      // Ignore read-only filesystem edge cases gracefully
    }

    const whatsappPrefill = `https://wa.me/919113925641?text=${encodeURIComponent(
      `*Onyx Assets Advisory Request*\n*Residence:* ${record.residence}\n*Name:* ${record.name}\n*Phone:* ${record.phone}\n*Preferred:* ${record.date} ${record.timeOfDay}`
    )}`;

    return NextResponse.json({
      success: true,
      id: record.id,
      recipient: TARGET_EMAIL,
      hotline: TARGET_PHONE,
      emailDispatched,
      webhookDispatched,
      whatsappUrl: whatsappPrefill,
      receivedAt: record.receivedAt,
      message: "Inquiry recorded and routed for executive response.",
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
