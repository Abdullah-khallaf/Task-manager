import nodemailer from "nodemailer";
import config from "../config/config.js";

const sendEmails = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "fbc679708f1bb2",
      pass: "eb5ad5ff675ce2",
    },
  });

  const mailOptions = {
    from: "hashem <hashem@email>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
  console.log("mail is sent successfuly");
};

export default sendEmails;
