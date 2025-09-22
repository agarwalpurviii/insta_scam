import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const scamReportSchema = z.object({
  instagramUsername: z
    .string()
    .min(1, { message: 'Instagram Username is required.' })
    .refine((value) => !value.startsWith('@'), {
      message: 'Please enter the Instagram ID without the "@" symbol.',
    })
    .refine((value) => !/\s/.test(value), {
      message: 'Instagram ID cannot contain spaces.',
    }),
  displayName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  
  scamType: z.string().min(1, { message: 'Please select a scam type.' }),
  amountLost: z.coerce.number().min(0, { message: "Amount must be a positive number." }).optional(),
  incidentDate: z.string().optional(),

  scamDetails: z.string().min(20, { message: 'Please provide at least 20 characters of detail.' }),

  evidence: z
    .any()
    .refine((file) => !file || file instanceof File, "Invalid file format.")
    .refine((file) => !file || file.size === 0 || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || file.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .transform(file => (file && file.size > 0) ? file : undefined)
    .optional(),
});
