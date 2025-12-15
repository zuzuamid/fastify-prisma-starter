import * as fs from "fs";
import nodemailer from "nodemailer";
import * as path from "path";
import config from "../config";
const Util = require("util");
const ReadFile = Util.promisify(fs.readFile);
const Handlebars = require("handlebars");

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
    // Determine secure based on env port
    const secure = Number(config.mail_port) === 465;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: config.mail_host,
      port: Number(config.mail_port),
      secure: secure, // true for 465, false for 587 STARTTLS
      auth: {
        user: config.mail_username,
        pass: config.mail_password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Mail options
    const mailOptions: any = {
      from: `"${config.mail_from_name}" <${config.mail_from_address}>`,
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

// Commit 15

// Commit 77

// Commit 86

// Commit 144
