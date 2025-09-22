export type Testimonial = {
  id: string;
  author: string;
  date: string;
  content: string;
  evidenceLinks: string[];
};

export type ScamAccount = {
  id: string;
  instagramId: string;
  displayName: string;
  category: string;
  scamType: string;
  status: 'verified_scam' | 'under_investigation';
  reportCount: number;
  lastReported: string;
  testimonials: Testimonial[];
  amountLost: number;
  followers: string;
  lastActive: string;
  verifiedBy: number;
};
