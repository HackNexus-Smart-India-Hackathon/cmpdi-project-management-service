import nodemailer from "nodemailer";

export const sendInvitationEmail = async (email, projectTitle) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cmpdisih@gmail.com",
        pass: "fmqpnyrrwnlwpukw",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Invitation to Join Project: ${projectTitle}`,
      html: `
        <p>Dear Investigator,</p>
        <p>You have been invited to join the project <strong>${projectTitle}</strong>.</p>
        <p>Please log in to the portal to access the project details and confirm your participation.</p>
        <p>Best regards,<br/>Project Management Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Invitation email sent to ${email}`);
  } catch (error) {
    console.error(
      `Failed to send invitation email to ${email}: ${error.message}`
    );
    throw new Error("Failed to send invitation email");
  }
};

export const sendRegistrationLink = async (email, name, registrationLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Set to true for port 465
      auth: {
        user: "cmpdisih@gmail.com",
        pass: "fmqpnyrrwnlwpukw", // App-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Invitation to Register for Project Portal`,
      html: `
        <p>Dear ${name},</p>
        <p>You have been invited to join our project management portal as an investigator.</p>
        <p>Please click the link below to complete your registration:</p>
        <p><a href="${registrationLink}" target="_blank">${registrationLink}</a></p>
        <p>Once registered, you can access your assigned projects and collaborate with the team.</p>
        <p>Best regards,<br/>Project Management Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Registration link email sent to ${email}`);
  } catch (error) {
    console.log(error);
    console.error(
      `Failed to send registration email to ${email}: ${error.message}`
    );
    throw new Error("Failed to send registration email");
  }
};
