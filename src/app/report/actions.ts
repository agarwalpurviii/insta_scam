'use server';

import { analyzeScamReports, type AnalyzeScamReportsOutput } from "@/ai/flows/analyze-scam-reports-for-patterns";
import { scamReportSchema } from './schema';

export type ScamReportFormState = {
  message: string;
  isScam: boolean | null;
  reasoning: string | null;
  success: boolean;
}

async function toDataURI(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${file.type};base64,${buffer.toString('base64')}`;
}


export async function submitScamReport(
    prevState: ScamReportFormState,
    formData: FormData,
): Promise<ScamReportFormState> {
    const validatedFields = scamReportSchema.safeParse({
        instagramId: formData.get('instagramId'),
        category: formData.get('category'),
        scamDetails: formData.get('scamDetails'),
        paymentDetails: formData.get('paymentDetails'),
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
    
    const { instagramId, category, scamDetails, paymentDetails, evidence } = validatedFields.data;
    const reportDetails = `Instagram ID: ${instagramId}\nCategory: ${category}\nDetails: ${scamDetails}`;
    
    const evidenceImage = await toDataURI(evidence);

    try {
        const aiResult: AnalyzeScamReportsOutput = await analyzeScamReports({ 
            reportDetails,
            paymentDetails,
            evidenceImage,
        });

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
