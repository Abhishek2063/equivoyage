import sendgrid from "@sendgrid/mail";
import { registrationEmail } from "../email_contents/registration";
/**
 * Sends an email using the SendGrid API.
 * @param {object} options - The email options including 'to', 'subject', 'text', and 'html'.
 * @returns {Promise<object>} - A promise resolving to the response from SendGrid API.
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Set the SendGrid API key
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    // Compose the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    // Use async/await to handle the promise returned by the 'send' function
    const response = await sendgrid.send(mailOptions);

    // Return the response from SendGrid API
    return response;
  } catch (error) {
    // Throw any errors that occur during the email sending process
    throw error;
  }
};

export const registrationEmailContent = (payload) => {
  const emailData = registrationEmail(
    payload.firstName,
    payload.lastName,
    payload.email,
    payload.password
  );
  const subject = "Registration Successfull.";
  const text = " User credientials.";
  sendEmail({ to: payload.email, subject, text, html: emailData });
};
