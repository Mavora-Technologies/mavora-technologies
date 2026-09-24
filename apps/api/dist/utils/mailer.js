import * as nodemailer from 'nodemailer';
export const sendLeadConfirmationEmail = async ({ to, fullName, service }) => {
    const password = process.env.SMTP_PASS;
    if (!password || password === 'YOUR_ACTUAL_EMAIL_PASSWORD') {
        console.error('❌ Mailer Error: SMTP_PASS is missing or set to placeholder in .env!');
        return;
    }
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'mail.mavoratechnologies.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== 'false', // true for 465
        auth: {
            user: process.env.SMTP_USER || 'info@mavoratechnologies.com',
            pass: password,
        },
        tls: {
            rejectUnauthorized: false, // Fixes cPanel SSL certificate validation timeouts
        },
        connectionTimeout: 10000, // 10 second timeout limit
    });
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e2e8f0;">
        <h2 style="color: #0284c7; margin-top: 0;">Mavora Technologies</h2>
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Thank you for reaching out to Mavora Technologies. We have logged your request regarding <strong>${service}</strong>.</p>
        <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #475569;">
            Our technical team will review your message details and follow up with an initial feedback report within <strong>24 business hours</strong>.
          </p>
        </div>
        <p>If you have additional briefs or urgency, simply reply directly to this email.</p>
        <br/>
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 4px 0 0 0; font-weight: bold;">Engineering & Solutions Team</p>
        <p style="margin: 0; color: #64748b; font-size: 13px;">Mavora Technologies Ltd</p>
      </div>
    </div>
  `;
    try {
        console.log(`📧 Attempting to dispatch email to: ${to}...`);
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Mavora Technologies" <info@mavoratechnologies.com>',
            to,
            subject: 'We have received your message | Mavora Technologies',
            html: htmlContent,
        });
        console.log('✅ Email sent successfully! Message ID:', info.messageId);
    }
    catch (error) {
        console.error('❌ Failed to send SMTP email:', error);
    }
};
