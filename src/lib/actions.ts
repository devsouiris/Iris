"use server";

import { db } from "./db";
import { contactRequests } from "./db/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().trim().min(2, "O nome é muito curto").max(120, "O nome é muito longo").refine((value) => !/[\r\n]/.test(value), "Nome inválido"),
  email: z.email("E-mail inválido").max(255, "O e-mail é muito longo"),
  subject: z.string().trim().min(2, "O assunto é muito curto").max(160, "O assunto é muito longo").refine((value) => !/[\r\n]/.test(value), "Assunto inválido"),
  message: z.string().trim().min(10, "A mensagem deve ter pelo menos 10 caracteres").max(5000, "A mensagem é muito longa"),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

// Configure Nodemailer transporter
// NOTE: For Gmail, use an App Password (https://myaccount.google.com/apppasswords)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email (e.g., devsouiris@gmail.com)
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

export async function sendContactRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    const validated = contactSchema.parse({ name, email, subject, message });
    
    // 1. Save to Database
    await db.insert(contactRequests).values({
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
    });

    // 2. Send Email (if credentials are set)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
        from: { name: validated.name, address: process.env.EMAIL_USER },
        to: "devsouiris@gmail.com",
        replyTo: validated.email,
        subject: `[CONTATO IRIS] ${validated.subject}`,
        text: `Nome: ${validated.name}\nE-mail: ${validated.email}\nAssunto: ${validated.subject}\n\nMensagem:\n${validated.message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #d9772f; border-bottom: 2px solid #d9772f; padding-bottom: 10px;">Novo Contato IRIS</h2>
          <p><strong>Nome:</strong> ${escapeHtml(validated.name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(validated.email)}</p>
          <p><strong>Assunto:</strong> ${escapeHtml(validated.subject)}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(validated.message)}</p>
          </div>
        `,
        });
      } catch {
        console.error("Contact saved, but notification email failed");
      }
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Error handling contact request:", error);
    return { success: false, error: "Ocorreu um erro ao enviar sua mensagem. Tente novamente." };
  }
}
