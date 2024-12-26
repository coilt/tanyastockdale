import nodemailer from 'nodemailer';

export async function post({ request }) {
  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  // Set up Nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "cameraboi@gmail.com",
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\nMessage: ${message}`,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}