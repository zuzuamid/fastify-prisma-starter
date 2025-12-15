import { UserRole } from "@prisma/client";

export interface IAuth {
  email: string;
  password: string;
  clientInfo: {
    device: string; // Device type
    browser: string; // Browser name
    ipAddress: string; // User IP address
    pcName?: string; // Optional PC name
    os?: string; // Optional OS name (Windows, MacOS, etc.)
    userAgent?: string; // Optional user agent string
  };
}

export interface IJwtPayload {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin: Date;
  profilePhoto?: string | undefined;
}

// Improvement commit 12

// Improvement commit 40

// Improvement commit 54

// Improvement commit 96
