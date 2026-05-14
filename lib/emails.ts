import nodemailer from "nodemailer";

// Create a reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
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
    console.error("Approval Email Error:", error);
    return { success: false, error };
  }
}

export async function sendSubmissionConfirmation(
  to: string,
  fullName: string,
  isAbstract: boolean = false,
) {
  try {
    const subject = isAbstract
      ? `Abstract Submission Received - ICSHSM 2026`
      : `Registration Confirmation - ICSHSM 2026`;

    const content = isAbstract
      ? `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 0; background-color: #f9fafb;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #9b1d20 0%, #7a1619 100%); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">ICSHSM 2026</h1>
            <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">International Conference</p>
          </div>

          <!-- Body -->
          <div style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            <h2 style="color: #059669; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Abstract Received Successfully!</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear <strong>${fullName}</strong>,</p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for submitting your abstract to the <strong>International Conference on Social Sciences, Humanities, and Strategic Management (ICSHSM 2026)</strong>.
            </p>

            <!-- Status Box -->
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left: 4px solid #059669; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Current Status</p>
              <p style="margin: 8px 0 0 0; color: #047857; font-size: 20px; font-weight: 800;">Under Review</p>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; font-size: 16px; font-weight: 700; margin: 0 0 15px 0;">What Happens Next?</h3>
              <ul style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Our review committee will carefully evaluate your abstract</li>
                <li>You will receive a notification within <strong>7-10 business days</strong></li>
                <li>Accepted abstracts will receive presentation guidelines</li>
                <li>We will contact you via this email address for any updates</li>
              </ul>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
              If you have any questions or need to update your submission, please contact us at <a href="mailto:info@icshsm.org" style="color: #9b1d20; text-decoration: none; font-weight: 600;">info@icshsm.org</a>
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
              We look forward to your participation!
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0; font-weight: 600;">
              Best regards,<br>
              <span style="color: #9b1d20;">ICSHSM 2026 Organizing Committee</span>
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f3f4f6; padding: 25px 30px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0;">
              This is an automated confirmation email. Please do not reply directly to this message.<br>
              For inquiries, contact us at <a href="mailto:info@icshsm.org" style="color: #9b1d20; text-decoration: none;">info@icshsm.org</a>
            </p>
            <p style="color: #9ca3af; font-size: 11px; margin: 15px 0 0 0;">
              © 2026 ICSHSM. All rights reserved.
            </p>
          </div>
        </div>
      `
      : `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 0; background-color: #f9fafb;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #9b1d20 0%, #7a1619 100%); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">ICSHSM 2026</h1>
            <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">International Conference</p>
          </div>

          <!-- Body -->
          <div style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
            <h2 style="color: #059669; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Registration Received Successfully!</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear <strong>${fullName}</strong>,</p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for registering for the <strong>International Conference on Social Sciences, Humanities, and Strategic Management (ICSHSM 2026)</strong>. We have successfully received your registration and payment proof.
            </p>

            <!-- Status Box -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Current Status</p>
              <p style="margin: 8px 0 0 0; color: #b45309; font-size: 20px; font-weight: 800;">Payment Under Review</p>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; font-size: 16px; font-weight: 700; margin: 0 0 15px 0;">What Happens Next?</h3>
              <ul style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Our team will verify your payment proof within <strong>24-48 hours</strong></li>
                <li>Once approved, you will receive a confirmation email with your registration details</li>
                <li>Conference access credentials and joining instructions will be sent closer to the event date</li>
                <li>Keep an eye on your inbox for important updates and announcements</li>
              </ul>
            </div>

            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1e40af; font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">📋 Important Information</h3>
              <p style="color: #1e3a8a; font-size: 14px; line-height: 1.6; margin: 0;">
                <strong>Conference Mode:</strong> Virtual (Online)<br>
                <strong>Platform:</strong> Details will be shared upon approval<br>
                <strong>Support:</strong> <a href="mailto:info@icshsm.org" style="color: #9b1d20; text-decoration: none; font-weight: 600;">info@icshsm.org</a>
              </p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
              If you have any questions or need assistance, please don't hesitate to contact us at <a href="mailto:info@icshsm.org" style="color: #9b1d20; text-decoration: none; font-weight: 600;">info@icshsm.org</a>
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
              We look forward to your participation in ICSHSM 2026!
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0; font-weight: 600;">
              Best regards,<br>
              <span style="color: #9b1d20;">ICSHSM 2026 Organizing Committee</span>
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f3f4f6; padding: 25px 30px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0;">
              This is an automated confirmation email. Please do not reply directly to this message.<br>
              For inquiries, contact us at <a href="mailto:info@icshsm.org" style="color: #9b1d20; text-decoration: none;">info@icshsm.org</a>
            </p>
            <p style="color: #9ca3af; font-size: 11px; margin: 15px 0 0 0;">
              © 2026 ICSHSM. All rights reserved.
            </p>
          </div>
        </div>
      `;

    await transporter.sendMail({
      from: `"ICSHSM 2026 Conference" <${SENDER_EMAIL}>`,
      to,
      subject,
      html: content,
    });
    return { success: true };
  } catch (error) {
    console.error("Submission Email Error:", error);
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
    console.error("Newsletter Welcome Error:", error);
    return { success: false, error };
  }
}

export async function sendBulkNewsletter(
  subject: string,
  html: string,
  recipients: string[],
) {
  try {
    const results = [];
    let successCount = 0;
    let failCount = 0;

    // Gmail limits bulk emails, so we send them one by one or in small batches
    for (const to of recipients) {
      try {
        await transporter.sendMail({
          from: `"ICSHSM 2026" <${SENDER_EMAIL}>`,
          to,
          subject,
          html,
        });
        successCount++;
      } catch (emailError) {
        console.error(`Failed to send to ${to}:`, emailError);
        failCount++;
      }
    }

    return {
      success: true,
      successCount,
      failCount,
      total: recipients.length,
    };
  } catch (error) {
    console.error("Bulk Newsletter Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
