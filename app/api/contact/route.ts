import { site } from "@/content/site";

// Sends contact-form messages through Resend (https://resend.com).
// Set RESEND_API_KEY in .env.local (and on your host) to enable it.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({}));

  if (
    typeof name !== "string" || !name.trim() || name.length > 200 ||
    typeof email !== "string" || !EMAIL_RE.test(email) ||
    typeof message !== "string" || message.trim().length < 10 || message.length > 1000
  ) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email is not configured" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: site.email,
      reply_to: email,
      subject: `New message from ${name}`,
      html: `<p><strong>${escape(name)}</strong> &lt;${escape(email)}&gt;</p><p>${escape(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  return res.ok
    ? Response.json({ ok: true })
    : Response.json({ error: "Failed to send" }, { status: 502 });
}
