import escapeHTMLChars from '@/helpers/escapeHTMLChars';
import nodemailer from 'nodemailer';

export default async function SendMail(MailType) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mail = await transporter.sendMail(MailType);

  return mail.messageId;
}

export function ClientMail(data) {
  const fullname = escapeHTMLChars(data.fullname);
  const email = escapeHTMLChars(data.email);
  const message = escapeHTMLChars(data.message);

  const mailBody = `
        <p>Full Name: <b><i>${fullname}</i></b></p>
        <p>Email: <b><i>${email}</i></b></p>
        <p>Message:</p> <p>${message}</p>
        `;

  return {
    from: `"${fullname}:" <${process.env.SMTP_USERNAME}>`,
    to: `${process.env.SMTP_USERNAME}, ${process.env.BCC_EMAIL}`,
    subject: `Portfolio Contact Form - ${fullname}`,
    html: mailBody,
  };
}
