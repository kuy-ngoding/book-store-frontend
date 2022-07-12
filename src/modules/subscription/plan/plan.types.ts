import { Feature } from "../feature/feature.types";

export interface Plan {
  _id?: string;
  plan_name?: string;
  plan_description?: string;
  plan_coin_per_month?: number;
  plan_features?: PlanFeature[];
}

export interface PlanFeature {
  feature?: Feature;
  feature_id?: string;
  quota?: number;
  is_available?: boolean;
}

export class PlanFilterQuery {
  page?: number;
  limit?: number;
  plan_name?: string;
  plan_description?: string;
}
