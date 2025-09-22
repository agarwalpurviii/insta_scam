import type { ScamAccount, Testimonial } from './types';

export const scamAccounts: ScamAccount[] = [
  {
    id: '1',
    instagramId: '@luxury_fake_bags',
    displayName: 'Luxury Designer Outlet',
    category: 'Fashion & Apparel',
    scamType: 'Fake Products',
    status: 'verified_scam',
    reportCount: 47,
    lastReported: '2024-07-28',
    amountLost: 23450,
    followers: '125K',
    lastActive: '3 days ago',
    verifiedBy: 12,
    testimonials: [
      {
        id: 't1-1',
        author: 'User123',
        date: '2024-07-28',
        content: 'I paid $250 for "limited edition" sneakers. After I sent the money via CashApp, the seller sent me a fake tracking number and then blocked me a week later when I called them out.',
        evidenceLinks: ['sneaker1', 'ev1', 'ev9', 'ev20'],
      },
      {
        id: 't1-2',
        author: 'JaneDoe',
        date: '2024-07-25',
        content: 'The sneakers I received were cheap knockoffs, not authentic as advertised. The stitching was terrible and the logo was crooked. The seller refuses a refund and claims they are real.',
        evidenceLinks: ['damagedsneaker1', 'sneaker2', 'ev10', 'ev21'],
      },
    ],
  },
  {
    id: '2',
    instagramId: '@quick_cash_deals',
    displayName: 'Electronics Warehouse',
    category: 'Electronics',
    scamType: 'Never Shipped',
    status: 'verified_scam',
    reportCount: 31,
    lastReported: '2024-07-26',
    amountLost: 18900,
    followers: '89K',
    lastActive: '1 week ago',
    verifiedBy: 8,
    testimonials: [
      {
        id: 't2-1',
        author: 'TechGuru',
        date: '2024-07-26',
        content: 'Advertised a brand new iPhone 15 for $400. After I paid through a bank transfer, the account was deleted. I should have known it was too good to be true. All their followers were bots.',
        evidenceLinks: ['iphone1', 'ev1', 'ev11', 'ev14'],
      },
    ],
  },
  {
    id: '3',
    instagramId: '@fashion_outlet_2024',
    displayName: 'Fashion Outlet Store',
    category: 'Fashion & Apparel',
    scamType: 'Fake Products',
    status: 'under_investigation',
    reportCount: 5,
    lastReported: '2024-08-02',
    amountLost: 2100,
    followers: '22K',
    lastActive: '5 days ago',
    verifiedBy: 2,
    testimonials: [
      {
        id: 't3-1',
        author: 'GemLover',
        date: '2024-07-29',
        content: 'Received a cheap, plastic ring instead of the "handmade sterling silver" one shown in pictures. The quality is terrible and it turned my finger green. Seller is ignoring my messages.',
        evidenceLinks: ['jewelry1', 'ev4', 'ev12', 'ev3'],
      },
    ],
  },
    {
    id: '4',
    instagramId: '@pet_supplies_con',
    displayName: 'Premium Pet Gear',
    category: 'Pets',
    scamType: 'Never Shipped',
    status: 'verified_scam',
    reportCount: 42,
    lastReported: '2024-07-20',
    amountLost: 3120,
    followers: '45K',
    lastActive: '2 weeks ago',
    verifiedBy: 15,
    testimonials: [
        {
            id: 't4-1',
            author: 'DogMom',
            date: '2024-07-20',
            content: 'Ordered a custom embroidered dog bed for $80. It has been 2 months and nothing has arrived. No response to my DMs or emails. Their comments are full of other angry customers.',
            evidenceLinks: ['pet1', 'ev1', 'ev15'],
        },
        {
            id: 't4-2',
            author: 'CatPerson',
            date: '2024-07-18',
            content: "They are using photos from legitimate stores like Chewy and Petco and pretending it's their product. This is a complete scam operation.",
            evidenceLinks: ['pet2', 'ev5', 'ev19'],
        },
    ],
  },
  {
    id: '5',
    instagramId: '@crypto_guru_invest',
    displayName: 'Crypto Millionaire Mentor',
    category: 'Financial',
    scamType: 'Investment Scam',
    status: 'verified_scam',
    reportCount: 68,
    lastReported: '2024-08-01',
    amountLost: 125000,
    followers: '210K',
    lastActive: '1 day ago',
    verifiedBy: 25,
    testimonials: [
      {
        id: 't5-1',
        author: 'FutureRich',
        date: '2024-08-01',
        content: 'Promised 10x returns in a week on a crypto investment. After I sent $1000 in Bitcoin, they showed me a fake dashboard with huge profits, then demanded more money for "taxes". I refused and they blocked me.',
        evidenceLinks: ['finance1', 'ev1', 'ev13', 'ev18', 'ev20'],
      },
    ],
  },
  {
    id: '6',
    instagramId: '@miracle_health_tonic',
    displayName: 'Dr. Amy\'s Wellness',
    category: 'Health & Beauty',
    scamType: 'Fake Products',
    status: 'under_investigation',
    reportCount: 12,
    lastReported: '2024-07-31',
    amountLost: 850,
    followers: '15K',
    lastActive: '4 days ago',
    verifiedBy: 4,
    testimonials: [
      {
        id: 't6-1',
        author: 'SeekingHealth',
        date: '2024-07-30',
        content: 'Bought a "miracle" weight loss tea. It was just cheap green tea in fancy packaging. Made no difference and they refuse to refund. Their claims are completely baseless and dangerous.',
        evidenceLinks: ['health1', 'ev7', 'ev16', 'ev21'],
      },
    ],
  },
  {
    id: '7',
    instagramId: '@luxe_decor_deals',
    displayName: 'Luxury Decor For Less',
    category: 'Home Goods',
    scamType: 'Fake Products',
    status: 'verified_scam',
    reportCount: 25,
    lastReported: '2024-07-22',
    amountLost: 5600,
    followers: '68K',
    lastActive: '10 days ago',
    verifiedBy: 9,
    testimonials: [
      {
        id: 't7-1',
        author: 'HomeStyle',
        date: '2024-07-22',
        content: 'The armchair I received looked nothing like the photos. It was made of cheap particle board and the fabric was torn. It collapsed after a week. The seller claims it was damaged in shipping but it was just garbage.',
        evidenceLinks: ['home1', 'ev17', 'ev3'],
      },
    ],
  },
];

export const getScamAccountById = (id: string): ScamAccount | undefined => {
  return scamAccounts.find(account => account.id === id);
}

type AddScamReportInput = {
    instagramId: string;
    category: string;
    scamDetails: string;
    evidenceDataUri: string;
};

export function addScamReport(report: AddScamReportInput) {
    const existingAccount = scamAccounts.find(
        (acc) => acc.instagramId.toLowerCase() === `@${report.instagramId.toLowerCase()}`
    );

    const currentDate = new Date().toISOString().split('T')[0];

    const newTestimonial: Testimonial = {
        id: `t-${Date.now()}`,
        author: 'Anonymous', // In a real app, this would come from user session
        date: currentDate,
        content: report.scamDetails,
        evidenceLinks: report.evidenceDataUri ? [report.evidenceDataUri] : [],
    };

    if (existingAccount) {
        existingAccount.reportCount++;
        existingAccount.lastReported = currentDate;
        existingAccount.testimonials.push(newTestimonial);
    } else {
        const newAccount: ScamAccount = {
            id: `${scamAccounts.length + 1}`,
            instagramId: `@${report.instagramId}`,
            displayName: 'N/A',
            category: report.category,
            scamType: 'Other',
            status: 'under_investigation',
            reportCount: 1,
            lastReported: currentDate,
            testimonials: [newTestimonial],
            amountLost: 0,
            followers: 'N/A',
            lastActive: 'Just now',
            verifiedBy: 1,
        };
        scamAccounts.unshift(newAccount);
    }
}
