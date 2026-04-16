import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(to: string, fullName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "ICSHSM 2026 <onboarding@resend.dev>", // Transition to your domain later
      to: [to],
      subject: "Registration Approved - ICSHSM 2026",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
          <h2 style="color: #9b1d20;">Registration Approved!</h2>
          <p>Dear <strong>${fullName}</strong>,</p>
          <p>We are pleased to inform you that your registration for the <strong>1st International Conference on Sustainable Healthcare and Health Systems Management (ICSHSM 2026)</strong> has been approved.</p>
          <p>Your payment proof has been verified, and your seat is now secured.</p>
          <p style="margin-top: 30px;">
            <strong>Event Details:</strong><br>
            Date: 10th & 11th November 2026<br>
            Venue: Virtual Platform (Lincoln University College, Nigeria)
          </p>
          <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
            If you have any questions, please reply to this email or contact us at <a href="mailto:admin@icshsm.org">admin@icshsm.org</a>.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 0.8em; color: #999; text-align: center;">
            Organized by Lincoln University College, Nigeria.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Email Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email Exception:", err);
    return { success: false, error: err };
  }
}

export async function sendSubmissionConfirmation(to: string, fullName: string, type: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "ICSHSM 2026 <onboarding@resend.dev>",
      to: [to],
      subject: `Registration Received - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
          <h2 style="color: #9b1d20;">Registration Received</h2>
          <p>Dear <strong>${fullName}</strong>,</p>
          <p>Thank you for registering for ICSHSM 2026 as a <strong>${type}</strong>.</p>
          <p>We have received your submission and payment proof. Our team will review your application and notify you via email once it has been approved.</p>
          <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
            Please allow 48-72 hours for the verification process.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 0.8em; color: #999; text-align: center;">
            Sustainable Healthcare and Health Systems Management (ICSHSM 2026)
          </p>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
