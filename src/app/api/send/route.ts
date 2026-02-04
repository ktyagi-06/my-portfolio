
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // ✅ DEBUG — check env loading
    console.log("SMTP_USER exists:", !!process.env.SMTP_USER);
    console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);
    console.log("SMTP_TO exists:", !!process.env.SMTP_TO);

    // ✅ fail fast if env missing
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_TO) {
      return Response.json(
        { success: false, error: "SMTP env variables not set" },
        { status: 500 }
      );
    }

    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS via STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Portfolio Contact — ${name}`,
      text: `
Name: ${name}
Email: ${email}

${message}
      `,
    });

    return Response.json({ success: true });

  } catch (err: any) {
    console.error("MAIL ERROR:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

