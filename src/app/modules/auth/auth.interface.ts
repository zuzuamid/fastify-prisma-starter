import { UserRole } from "../user/user.interface";

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
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  last_login: Date;
  profile_photo?: string;
}

// Commit 37

// Commit 106

// Commit 125

// Commit 135
