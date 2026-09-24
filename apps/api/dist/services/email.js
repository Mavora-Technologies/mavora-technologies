import nodemailer from 'nodemailer';
const port = Number(process.env.SMTP_PORT) || 465;
const isSecure = process.env.SMTP_SECURE === 'true' || port === 465;
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.mavoratechnologies.com',
    port,
    secure: isSecure,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Prevents self-signed cert blocks on custom mail hosts
    },
});
export async function sendLeadConfirmationEmail(toEmail, fullName) {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('⚠️ SMTP credentials not configured in environment. Skipping email.');
            return;
        }
        const mailOptions = {
            from: process.env.SMTP_FROM || `"Mavora Technologies" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: 'We Received Your Message — Mavora Technologies',
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0284c7;">Thank you for reaching out, ${fullName}!</h2>
          <p>We have successfully received your inquiry. Our engineering and strategy team is reviewing your details.</p>
          <p>You can expect a direct response within 24 business hours.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 0.875rem; color: #64748b;">
            Mavora Technologies Ltd.<br />
            <a href="https://mavoratechnologies.com" style="color: #0284c7;">mavoratechnologies.com</a>
          </p>
        </div>
      `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`✉️ Lead confirmation email sent to ${toEmail}: ${info.messageId}`);
    }
    catch (error) {
        console.error('❌ Failed to send lead confirmation email:', error);
    }
}
export async function sendProjectRequestConfirmationEmail(toEmail, fullName) {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS)
            return;
        const mailOptions = {
            from: process.env.SMTP_FROM || `"Mavora Technologies" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: 'Project Inquiry Received — Mavora Technologies',
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0284c7;">Project Scope Received!</h2>
          <p>Hello ${fullName},</p>
          <p>Thank you for submitting your project request to Mavora Technologies. We have logged your specifications and assigned a project manager to evaluate your requirements.</p>
          <p>We will prepare an initial assessment and contact you shortly.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 0.875rem; color: #64748b;">
            Mavora Technologies Ltd.
          </p>
        </div>
      `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`✉️ Project confirmation email sent to ${toEmail}: ${info.messageId}`);
    }
    catch (error) {
        console.error('❌ Failed to send project confirmation email:', error);
    }
}
export async function sendConsultationConfirmationEmail(toEmail, fullName, preferredDate) {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS)
            return;
        const mailOptions = {
            from: process.env.SMTP_FROM || `"Mavora Technologies" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: 'Consultation Request Confirmed — Mavora Technologies',
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0284c7;">Consultation Request Received</h2>
          <p>Hello ${fullName},</p>
          <p>We have logged your request for a technical consultation targeting <strong>${preferredDate}</strong>.</p>
          <p>Our team is checking calendar availability and will reply with a calendar invitation shortly.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 0.875rem; color: #64748b;">
            Mavora Technologies Ltd.
          </p>
        </div>
      `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`✉️ Consultation confirmation email sent to ${toEmail}: ${info.messageId}`);
    }
    catch (error) {
        console.error('❌ Failed to send consultation confirmation email:', error);
    }
}
