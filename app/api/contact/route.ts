import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  const nom = sanitize(raw.nom);
  const email = sanitize(raw.email);
  const type = sanitize(raw.type);
  const entreprise = sanitize(raw.entreprise);
  const telephone = sanitize(raw.telephone);
  const message = sanitize(raw.message);

  // Required fields
  if (!nom || !type) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  // At least email or telephone must be provided
  if (!email && !telephone) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  // Validate email format if provided
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "Format d'email invalide." }, { status: 400 });
  }

  // Field length limits
  if (nom.length > 100) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }
  if (type.length > 200) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin-bottom:24px;border-bottom:2px solid #ffb400;padding-bottom:12px">
        Nouvelle demande — ${type}
      </h2>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;color:#666;width:120px">Nom</td>
          <td style="padding:8px 0;font-weight:500">${nom}</td>
        </tr>
        ${email ? `
        <tr>
          <td style="padding:8px 0;color:#666">Email</td>
          <td style="padding:8px 0;font-weight:500">
            <a href="mailto:${email}" style="color:#ffb400">${email}</a>
          </td>
        </tr>` : ""}
        ${entreprise ? `
        <tr>
          <td style="padding:8px 0;color:#666">Entreprise</td>
          <td style="padding:8px 0;font-weight:500">${entreprise}</td>
        </tr>` : ""}
        ${telephone ? `
        <tr>
          <td style="padding:8px 0;color:#666">Téléphone</td>
          <td style="padding:8px 0;font-weight:500">${telephone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding:8px 0;color:#666">Service</td>
          <td style="padding:8px 0;font-weight:500">${type}</td>
        </tr>
      </table>
      ${message ? `
      <div style="margin-top:24px;background:#f5f5f5;border-radius:6px;padding:16px">
        <p style="margin:0 0 8px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px">Message</p>
        <p style="margin:0;white-space:pre-wrap">${message}</p>
      </div>` : ""}
      <p style="margin-top:24px;font-size:12px;color:#999">
        Reçu via bmkstudio.be/contact
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "Bmk Studio <onboarding@resend.dev>",
    to: "bmkfotography@gmail.com",
    replyTo: email || undefined,
    subject: `[Bmk Studio] Nouvelle demande — ${type}`,
    html,
  });

  if (error) {
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
