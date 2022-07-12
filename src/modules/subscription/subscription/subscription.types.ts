export class Subscription {
  subscription_name?: string;
  subscription_description?: string;
}

export class SubscriptionFilterQuery {
  page?: number;
  limit?: number;
  subscription_name?: string;
  subscription_description?: string;
}
