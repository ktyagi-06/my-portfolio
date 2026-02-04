import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // important — false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // bypass cert chain issue
  },
});



    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      subject: `Portfolio Contact — ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

${message}
      `,
    });

    return Response.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
