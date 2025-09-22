import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const scamReportSchema = z.object({
  instagramId: z.string().min(1, { message: 'Instagram ID is required.' }).startsWith('@', { message: 'Instagram ID must start with @' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  scamDetails: z.string().min(50, { message: 'Please provide at least 50 characters of detail.' }),
  evidence: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
