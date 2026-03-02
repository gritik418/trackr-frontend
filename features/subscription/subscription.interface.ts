import { Plan, PlanInterval, PlanType } from "../plans/plans.interface";

export interface ClaimEarlyAccessDto {
  planId: string;
  orgId: string;
}

export interface ClaimEarlyAccessResponse {
  success: boolean;
  message: string;
}

enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  TRIAL = "TRIAL",
  PAST_DUE = "PAST_DUE",
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planType: PlanType;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  trialEndDate: Date;
  autoRenew: boolean;
  price: number;
  currency: string;
  interval: PlanInterval;
  features: any;
  limits: any;
  createdAt: Date;
  updatedAt: Date;
  plan: Plan;
  expiresAt: string | null;
}

export interface GetActiveSubscriptionDto {
  message: string;
  success: boolean;
  subscription: Subscription;
}
