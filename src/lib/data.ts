import type { ScamAccount, Testimonial } from './types';

export const scamAccounts: ScamAccount[] = [
  {
    id: '1',
    instagramId: '@fake_sneaker_hub',
    category: 'Fashion & Apparel',
    status: 'verified_scam',
    reportCount: 28,
    lastReported: '2024-07-28',
    testimonials: [
      {
        id: 't1-1',
        author: 'User123',
        date: '2024-07-28',
        content: 'Paid for shoes, never received them. Seller blocked me after I asked for tracking info.',
        evidenceLinks: ['https://picsum.photos/seed/ev1/400/200'],
      },
      {
        id: 't1-2',
        author: 'JaneDoe',
        date: '2024-07-25',
        content: 'The sneakers I received were cheap knockoffs, not authentic as advertised. Seller refuses a refund.',
        evidenceLinks: ['https://picsum.photos/seed/ev2/400/200', 'https://picsum.photos/seed/ev3/400/200'],
      },
    ],
  },
  {
    id: '2',
    instagramId: '@gadget_deals_scam',
    category: 'Electronics',
    status: 'verified_scam',
    reportCount: 15,
    lastReported: '2024-07-26',
    testimonials: [
      {
        id: 't2-1',
        author: 'TechGuru',
        date: '2024-07-26',
        content: 'Advertised a brand new phone at a very low price. After payment, the account was deleted.',
        evidenceLinks: [],
      },
    ],
  },
  {
    id: '3',
    instagramId: '@artisan_jewelry_hoax',
    category: 'Jewelry & Accessories',
    status: 'under_investigation',
    reportCount: 3,
    lastReported: '2024-07-29',
    testimonials: [
      {
        id: 't3-1',
        author: 'GemLover',
        date: '2024-07-29',
        content: 'Received a plastic ring instead of the silver one shown in pictures. Quality is terrible.',
        evidenceLinks: ['https://picsum.photos/seed/ev4/400/200'],
      },
    ],
  },
    {
    id: '4',
    instagramId: '@pet_supplies_con',
    category: 'Pets',
    status: 'verified_scam',
    reportCount: 42,
    lastReported: '2024-07-20',
    testimonials: [
        {
            id: 't4-1',
            author: 'DogMom',
            date: '2024-07-20',
            content: 'Ordered a custom dog bed. It has been 2 months and nothing has arrived. No response to my DMs.',
            evidenceLinks: [],
        },
        {
            id: 't4-2',
            author: 'CatPerson',
            date: '2024-07-18',
            content: "They are using photos from legitimate stores and pretending it's their product. Total scam.",
            evidenceLinks: ['https://picsum.photos/seed/ev5/400/200'],
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
        evidenceLinks: [report.evidenceDataUri],
    };

    if (existingAccount) {
        existingAccount.reportCount++;
        existingAccount.lastReported = currentDate;
        existingAccount.testimonials.push(newTestimonial);
    } else {
        const newAccount: ScamAccount = {
            id: `${scamAccounts.length + 1}`,
            instagramId: `@${report.instagramId}`,
            category: report.category,
            status: 'under_investigation',
            reportCount: 1,
            lastReported: currentDate,
            testimonials: [newTestimonial],
        };
        scamAccounts.unshift(newAccount);
    }
}