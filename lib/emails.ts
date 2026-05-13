import nodemailer from 'nodemailer';

// Create a reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const SENDER_EMAIL = process.env.GMAIL_USER || "idrisahmed@lincoln.edu.my";

export async function sendApprovalEmail(to: string, fullName: string) {
  try {
    await transporter.sendMail({
      from: `"ICSHSM 2026" <${SENDER_EMAIL}>`,
      to,
      subject: "Registration Approved - ICSHSM 2026",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #059669;">Congratulations!</h2>
          <p>Dear ${fullName},</p>
          <p>Your registration for the <strong>International Conference on Social Sciences, Humanities, and Strategic Management (ICSHSM 2026)</strong> has been officially approved.</p>
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Status:</strong> Approved</p>
          </div>
          <p>We look forward to seeing you at the conference!</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Approval Email Error:', error);
    return { success: false, error };
  }
}

export async function sendSubmissionConfirmation(to: string, fullName: string, isAbstract: boolean = false) {
  try {
    await transporter.sendMail({
      from: `"ICSHSM 2026" <${SENDER_EMAIL}>`,
      to,
      subject: isAbstract ? `Abstract Received - ${fullName}` : `Registration Received - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb;">Submission Received</h2>
          <p>Dear ${fullName},</p>
          <p>Thank you for your ${isAbstract ? 'abstract submission' : 'registration'} for <strong>ICSHSM 2026</strong>.</p>
          <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Status:</strong> Under Review</p>
          </div>
          <p>Our team will review your submission and contact you shortly with further instructions.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Submission Email Error:', error);
    return { success: false, error };
  }
}

export async function sendNewsletterWelcome(to: string) {
  try {
    await transporter.sendMail({
      from: `"ICSHSM 2026" <${SENDER_EMAIL}>`,
      to,
      subject: "Welcome to ICSHSM 2026 Newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #8b5cf6;">Welcome Aboard!</h2>
          <p>Hello,</p>
          <p>Thank you for subscribing to the <strong>ICSHSM 2026</strong> newsletter.</p>
          <p>You will now receive the latest updates, announcements, and deadlines directly in your inbox.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">You are receiving this because you subscribed on our website.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Newsletter Welcome Error:', error);
    return { success: false, error };
  }
}

export async function sendBulkNewsletter(subject: string, html: string, recipients: string[]) {
  try {
    // Gmail limits bulk emails, so we send them one by one or in small batches
    for (const to of recipients) {
      await transporter.sendMail({
        from: `"ICSHSM 2026" <${SENDER_EMAIL}>`,
        to,
        subject,
        html,
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Bulk Newsletter Error:', error);
    return { success: false, error };
  }
}
