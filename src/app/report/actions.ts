'use server';

import { analyzeScamReports, type AnalyzeScamReportsOutput } from "@/ai/flows/analyze-scam-reports-for-patterns";
import { z } from 'zod';

export const scamReportSchema = z.object({
  instagramId: z.string().min(1, { message: 'Instagram ID is required.' }).startsWith('@', { message: 'Instagram ID must start with @' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  scamDetails: z.string().min(50, { message: 'Please provide at least 50 characters of detail.' }),
  evidence: z.string().optional(),
});

export type ScamReportFormState = {
  message: string;
  isScam: boolean | null;
  reasoning: string | null;
  success: boolean;
}

export async function submitScamReport(
    prevState: ScamReportFormState,
    formData: FormData,
): Promise<ScamReportFormState> {
    const validatedFields = scamReportSchema.safeParse({
        instagramId: formData.get('instagramId'),
        category: formData.get('category'),
        scamDetails: formData.get('scamDetails'),
        evidence: formData.get('evidence'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data. Please check your inputs.',
            isScam: null,
            reasoning: null,
            success: false,
        };
    }
    
    const { instagramId, category, scamDetails, evidence } = validatedFields.data;
    const reportDetails = `Instagram ID: ${instagramId}\nCategory: ${category}\nDetails: ${scamDetails}\nEvidence: ${evidence || 'None'}`;

    try {
        const aiResult: AnalyzeScamReportsOutput = await analyzeScamReports({ reportDetails });

        return {
            message: "Report submitted successfully for analysis.",
            isScam: aiResult.isPotentialScam,
            reasoning: aiResult.reasoning,
            success: true,
        };

    } catch (error) {
        console.error('AI analysis failed:', error);
        return {
            message: 'Failed to analyze the report. Please try again later.',
            isScam: null,
            reasoning: null,
            success: false,
        };
    }
}
