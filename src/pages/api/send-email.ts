import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


interface ISendEmail {
  email: string;
  html: string;
  subject: string;
  name: string;
}

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as SMTPTransport.Options);