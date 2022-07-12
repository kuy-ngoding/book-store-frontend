export class Feature {
  _id?: string;
  feature_name?: string;
  feature_description?: string;
  feature_icon_url?: string;
}

export class FeatureFilterQuery {
  page?: number;
  limit?: number;
  feature_name?: string;
  feature_description?: string;
  feature_icon_url?: string;
}
