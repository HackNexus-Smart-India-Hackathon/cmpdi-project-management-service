import nodemailer from "nodemailer";
import crypto from "crypto";
import { User } from "../models/User";

export const sendInvitationEmail = async (email) => {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");

    const user = await User.findOne({ where: { email } });
    if (user) {
      user.password_reset_token = resetToken;
      user.password_reset_expires = Date.now() + 3600000;
      await user.save();
    } else {
      console.log("User not found, cannot send invitation.");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Invitation to Join the Platform",
      text: `
        You have been invited to join the platform as an Investigator for a project.

        To set your password, please follow the link below:
        ${resetLink}

        Please set a secure password and keep it safe. Your credentials are:

        Username: ${email}

        If you did not request this invitation, please ignore this email.
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Invitation email sent successfully.");
  } catch (error) {
    console.error("Error sending invitation email:", error);
  }
};
