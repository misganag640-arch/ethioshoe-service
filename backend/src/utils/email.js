import nodemailer from 'nodemailer';
export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.SMTP_USER) return console.log('[email skipped]', to, subject);
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: +process.env.SMTP_PORT,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return t.sendMail({ from: `EthioShoe <${process.env.SMTP_USER}>`, to, subject, html });
};
