export type PlacementSnapshot = {
  year: number;
  placementRate: string;
  averagePackage: string;
  topCompanies: string[];
};

export type CollegeReview = {
  id: number;
  author: string;
  rating: number;
  comment: string;
};

export type College = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  overview: string;
  courses: string[];
  placements: PlacementSnapshot[];
  reviews: CollegeReview[];
  acceptanceRate: string;
  examPreferences: string[];
};
