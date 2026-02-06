export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BANNED = "BANNED",
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  status: UserStatus;
  avatarUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
