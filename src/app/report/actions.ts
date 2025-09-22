'use server';

import { analyzeScamReports, type AnalyzeScamReportsInput, type AnalyzeScamReportsOutput } from "@/ai/flows/analyze-scam-reports-for-patterns";
import { addScamReport } from "@/lib/data";
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
        const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(' ');
        return {
            message: errorMessages || 'Invalid form data. Please check your inputs.',
            isScam: null,
            reasoning: null,
            success: false,
        };
    }
    
    const { instagramId, category, scamDetails, paymentDetails, evidence } = validatedFields.data;
    
    try {
        const evidenceDataUri = await toDataURI(evidence);
        
        const reportDetails = `Instagram ID: @${instagramId}\nCategory: ${category}\nDetails: ${scamDetails}`;
        
        const aiInput: AnalyzeScamReportsInput = {
            reportDetails,
            evidenceImage: evidenceDataUri,
        };

        if (paymentDetails) {
            aiInput.paymentDetails = paymentDetails;
        }
        
        const aiResult: AnalyzeScamReportsOutput = await analyzeScamReports(aiInput);

        // Store the report after successful analysis
        addScamReport({
            instagramId,
            category,
            scamDetails,
            evidenceDataUri: evidenceDataUri
        });

        return {
            message: "Report submitted successfully for analysis.",
            isScam: aiResult.isPotentialScam,
            reasoning: aiResult.reasoning,
            success: true,
        };

    } catch (error) {
        console.error('AI analysis or data storage failed:', error);
        return {
            message: 'Failed to analyze or store the report. Please try again later.',
            isScam: null,
            reasoning: null,
            success: false,
        };
    }
}
