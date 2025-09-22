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
        instagramUsername: formData.get('instagramUsername'),
        displayName: formData.get('displayName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        website: formData.get('website'),
        scamType: formData.get('scamType'),
        amountLost: formData.get('amountLost'),
        incidentDate: formData.get('incidentDate'),
        scamDetails: formData.get('scamDetails'),
        evidence: formData.get('evidence'),
        reporterName: formData.get('reporterName'),
        reporterEmail: formData.get('reporterEmail'),
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
    
    const { instagramUsername, displayName, phone, email, website, scamType, amountLost, incidentDate, scamDetails, evidence } = validatedFields.data;
    
    try {
        const evidenceDataUri = evidence ? await toDataURI(evidence) : undefined;
        
        let reportDetails = `Instagram ID: @${instagramUsername}\nCategory: ${scamType}\nDetails: ${scamDetails}`;
        if (displayName) reportDetails += `\nDisplay Name: ${displayName}`;
        if (phone) reportDetails += `\nPhone: ${phone}`;
        if (email) reportDetails += `\nEmail: ${email}`;
        if (website) reportDetails += `\nWebsite: ${website}`;
        if (amountLost) reportDetails += `\nAmount Lost: $${amountLost}`;
        if (incidentDate) reportDetails += `\nIncident Date: ${incidentDate}`;


        const aiInput: AnalyzeScamReportsInput = {
            reportDetails,
            evidenceImage: evidenceDataUri,
        };
        
        const aiResult: AnalyzeScamReportsOutput = await analyzeScamReports(aiInput);

        // Store the report after successful analysis
        addScamReport({
            instagramId: instagramUsername,
            category: scamType,
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
