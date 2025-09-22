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
    name: 'Sarah L.',
    location: 'California, USA',
    rating: 5,
    text: 'Was about to buy a dress from a seller but something felt off. A quick search on InstaSafe showed they had multiple scam reports. Saved me $150!',
    statusType: 'saved',
    amount: 150,
  },
  {
    id: '2',
    name: 'Mike R.',
    location: 'Texas, USA',
    rating: 4,
    text: 'I got scammed on a pair of "limited edition" sneakers. Lost $250 but my report helped get the account flagged for others. This community is essential.',
    statusType: 'lost',
    amount: 250,
  },
  {
    id: '3',
    name: 'Jessica P.',
    location: 'Toronto, Canada',
    rating: 5,
    text: 'InstaSafe is my first stop before any Instagram purchase now. The detailed testimonials and evidence are incredibly helpful. A must-use tool!',
    statusType: 'saved',
    amount: 80,
  },
  {
    id: '4',
    name: 'David K.',
    location: 'Florida, USA',
    rating: 4,
    text: 'Lost $500 to a fake electronics seller. Reported them here and found 20+ others with similar experiences. Together we\'re building a safer community.',
    statusType: 'lost',
    amount: 500,
  },
  {
    id: '5',
    name: 'Amanda T.',
    location: 'Ontario, Canada',
    rating: 5,
    text: 'InstaSafe helped me identify a scammer before I fell victim. The detailed reports from other users were incredibly helpful. Highly recommend checking here first!',
    statusType: 'saved',
    amount: 275,
  },
  {
    id: '6',
    name: 'Carlos M.',
    location: 'Arizona, USA',
    rating: 5,
    text: 'Wish I had found this site earlier. Lost $180 to a fake watch seller, but my report here has helped others avoid the same mistake. Community protection at its best.',
    statusType: 'lost',
    amount: 180,
  },
];
