import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env["NODE_ENV"],
  port: process.env["PORT"],
  jwt: {
    jwt_secret: process.env["JWT_SECRET"],
    expires_in: process.env["EXPIRES_IN"],
    refresh_token_secret: process.env["REFRESH_TOKEN_SECRET"],
    refresh_token_expires_in: process.env["REFRESH_TOKEN_EXPIRES_IN"],
    reset_pass_secret: process.env["RESET_PASS_TOKEN"],
    reset_pass_token_expires_in: process.env["RESET_PASS_TOKEN_EXPIRES_IN"],
  },
  stripe_secret_key: process.env["STRIPE_SECRET_KEY"],
  reset_pass_link: process.env["RESET_PASS_LINK"],
  emailSender: {
    email: process.env["EMAIL"],
    app_pass: process.env["APP_PASS"],
  },
  cloudinary: {
    cloud_name: process.env["CLOUD_NAME"] || "",
    api_key: process.env["CLOUD_API_KEY"] || "",
    api_secret: process.env["CLOUD_API_SECRET"] || "",
  },
  db: {},
};

// Improvement commit 3

// Improvement commit 8

// Improvement commit 75

// Improvement commit 90

// Improvement commit 108

// Improvement commit 190
