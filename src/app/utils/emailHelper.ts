import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

import Handlebars from "handlebars";
import nodemailer from "nodemailer";

import config from "../../config";

const ReadFile = promisify(fs.readFile);

interface Attachment {
  filename: string;
  content: Buffer;
  encoding: string;
}

const sendEmail = async (
  to: string,
  html: string,
  subject: string,
  attachment?: Attachment
) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Hardcoded for now, should be in config
      port: 587, // Hardcoded for now, should be in config
      secure: false, // Use `false` for port 587, `true` for 465
      auth: {
        user: config.emailSender.email,
        pass: config.emailSender.app_pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Mail options
    const mailOptions: any = {
      from: `"Altium Medicare" <${config.emailSender.email}>`, // Using config.emailSender.email
      to,
      subject,
      html,
    };

    if (attachment) {
      mailOptions.attachments = [attachment];
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error: any) {
    console.error("Error sending email:", error.message || error);
    throw new Error("Failed to send email");
  }
};

const createEmailContent = async (data: object, templateType: string) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      `/src/templates/${templateType}.template.hbs`
    );
    const content = await ReadFile(templatePath, "utf8");
    const template = Handlebars.compile(content);
    return template(data);
  } catch (error) {
    console.error("Error creating email content:", error);
    throw new Error("Failed to create email content");
  }
};

export const EmailHelper = {
  sendEmail,
  createEmailContent,
};

// Improvement commit 162

// Improvement commit 182

// Improvement commit 196
