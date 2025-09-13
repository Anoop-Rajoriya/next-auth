import nodemailer from "nodemailer";

export default async function sendMail({ to, subject, text, html }) {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  // Send email
  const info = await transport.sendMail({
    from: '"Next.js App" <no-reply@nextjsapp.com>',
    to,
    subject,
    text,
    html,
  });

  return info;
}
