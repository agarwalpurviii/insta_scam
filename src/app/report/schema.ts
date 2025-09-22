import { z } from 'zod';

export const scamReportSchema = z.object({
  instagramId: z.string().min(1, { message: 'Instagram ID is required.' }).startsWith('@', { message: 'Instagram ID must start with @' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  scamDetails: z.string().min(50, { message: 'Please provide at least 50 characters of detail.' }),
  evidence: z.string().optional(),
});
