'use server';

/**
 * @fileOverview Analyzes submitted scam reports to identify patterns indicative of scam operations, including performing a reverse image search on evidence.
 *
 * - analyzeScamReports - A function that analyzes scam reports for patterns.
 * - AnalyzeScamReportsInput - The input type for the analyzeScamReports function.
 * - AnalyzeScamReportsOutput - The return type for the analyzeScamReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeScamReportsInputSchema = z.object({
  reportDetails: z
    .string()
    .describe('Detailed report of scam activity including user testimonials, scam details, and evidence.'),
  paymentDetails: z.string().optional().describe('Payment details if available (e.g., payment app, username).'),
  evidenceImage: z
    .string()
    .optional()
    .describe(
      "An image of evidence, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeScamReportsInput = z.infer<typeof AnalyzeScamReportsInputSchema>;

const AnalyzeScamReportsOutputSchema = z.object({
  isPotentialScam: z
    .boolean()
    .describe('Whether the analysis indicates a potential scam operation based on identified patterns.'),
  overallReasoning: z
    .string()
    .describe('A summary of the reasoning behind the scam analysis, highlighting the most critical identified patterns.'),
  riskScore: z.number().min(0).max(100).describe('A numerical risk score from 0 (low risk) to 100 (high risk).'),
  detailedAnalysis: z.object({
      engagementAnalysis: z.string().describe("Analysis of the seller's follower quality and engagement rate. Note if engagement seems artificially low or high."),
      postQualityAnalysis: z.string().describe("Analysis of the seller's post quality, including image originality (reverse image search), consistency, and caption quality."),
      interactionAuthenticityAnalysis: z.string().describe("Analysis of the authenticity of comments and the seller's reply behavior."),
  }).describe("A detailed breakdown of the analysis across different categories."),
  recommendation: z.string().describe("A final recommendation to the user (e.g., 'Proceed with extreme caution', 'Avoid this seller')."),
  imageAnalysis: z.object({
      summary: z.string().describe('A summary of the findings from the reverse image search on the evidence image.'),
      potentialSources: z.array(z.object({
        url: z.string().describe('The URL of a potential source for the image.'),
        description: z.string().describe('A brief description of the source or why it is relevant.'),
      })).describe('A list of potential original sources for the image, if any were found.'),
  }).optional().describe("The results of the reverse image search on the evidence image.")
});
export type AnalyzeScamReportsOutput = z.infer<typeof AnalyzeScamReportsOutputSchema>;

export async function analyzeScamReports(input: AnalyzeScamReportsInput): Promise<AnalyzeScamReportsOutput> {
  return analyzeScamReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeScamReportsPrompt',
  input: {schema: AnalyzeScamReportsInputSchema},
  output: {schema: AnalyzeScamReportsOutputSchema},
  prompt: `You are an AI assistant specializing in advanced forensic analysis of Instagram seller profiles to detect scams. Your analysis must be deep and based on qualitative signals, not just raw numbers.

  Analyze the provided report using the following fraud-resistant rules:

  **1. Follower & Engagement Analysis:**
  - Evaluate the quality of followers and engagement. A low engagement rate (<0.5%) on an account with many followers is a major red flag. Legit small shops often have 1-10% engagement.
  - Note any signs of bot followers (weird usernames, no profile pics) if mentioned in the report.
  - Determine if the engagement mentioned (likes, comments) seems authentic or generic.

  **2. Post Quality & Consistency Analysis:**
  - If an evidence image is provided, perform a reverse image search on it. Determine if it's a stock photo, stolen from another brand, or appears on other suspicious websites. This is a critical step.
  - Evaluate post consistency. Scammers often post many items at once and then go silent. Legit sellers post gradually.
  - Evaluate post captions. Scammy captions are often vague ("DM to buy 🔥"), use generic emojis, and lack detailed product info.

  **3. Interaction Authenticity Analysis:**
  - Analyze the types of comments and replies mentioned in the report. Real buyers ask specific questions. Fake comments are generic ("Nice pic!").
  - Scammers often ignore questions, use copy-paste replies, or become hostile.

  **4. Payment Method Analysis:**
  - Red Flag: The seller only accepts non-reversible payment methods like CashApp, Zelle, crypto, or direct bank transfers. Mention this as a high-risk factor if present.

  **Your Task:**
  Based on the report below, perform a comprehensive analysis. Provide a risk score from 0-100, a final recommendation, a summary of your reasoning, and a detailed breakdown for each analysis category.

  **Report to Analyze:**
  {{#if evidenceImage}}
  - **Report Details:** {{{reportDetails}}}
  {{#if paymentDetails}}- **Payment Details:** {{{paymentDetails}}}{{/if}}
  - **Evidence Image to analyze and reverse search:** {{media url=evidenceImage}}
  {{else}}
  - **Report Details:** {{{reportDetails}}}
  {{#if paymentDetails}}- **Payment Details:** {{{paymentDetails}}}{{/if}}
  - **Evidence Image:** None provided.
  {{/if}}
  `,
});

const analyzeScamReportsFlow = ai.defineFlow(
  {
    name: 'analyzeScamReportsFlow',
    inputSchema: AnalyzeScamReportsInputSchema,
    outputSchema: AnalyzeScamReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
