export type HomeTestimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  statusType: 'lost' | 'saved';
  amount: number;
};

export const homeTestimonials: HomeTestimonial[] = [
  {
    id: '1',
    name: 'David K.',
    location: 'Florida, USA',
    rating: 4,
    text: 'Lost $500 to a fake electronics seller. Reported them here and found 20+ others with similar experiences. Together we\'re building a safer community.',
    statusType: 'lost',
    amount: 500,
  },
  {
    id: '2',
    name: 'Amanda T.',
    location: 'Ontario, Canada',
    rating: 5,
    text: 'ScamGuard helped me identify a scammer before I fell victim. The detailed reports from other users were incredibly helpful. Highly recommend checking here first!',
    statusType: 'saved',
    amount: 275,
  },
  {
    id: '3',
    name: 'Carlos M.',
    location: 'Arizona, USA',
    rating: 5,
    text: 'Wish I had found this site earlier. Lost $180 to a fake watch seller, but my report here has helped others avoid the same mistake. Community protection at its best.',
    statusType: 'lost',
    amount: 180,
  },
];
