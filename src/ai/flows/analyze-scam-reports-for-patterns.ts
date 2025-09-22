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
  reasoning: z
    .string()
    .describe('The reasoning behind the scam analysis, highlighting the identified patterns.'),
  imageAnalysis: z.object({
      summary: z.string().describe('A summary of the findings from the reverse image search.'),
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
  prompt: `You are an AI assistant specializing in identifying scam patterns from user-submitted reports.
  Analyze the provided report details to determine if there are patterns indicative of scam operations.

  {{#if evidenceImage}}
  Crucially, perform a reverse image search on the provided evidence image to determine if it's a stock photo, stolen from another brand, or appears on other websites. This is a critical part of your analysis.
  Based on all available information, provide your analysis.

  Report Details: {{{reportDetails}}}
  {{#if paymentDetails}}Payment Details: {{{paymentDetails}}}{{/if}}
  
  Evidence Image to analyze and reverse search:
  {{media url=evidenceImage}}
  {{else}}
  Analyze the following report details. No image was provided.
  Report Details: {{{reportDetails}}}
  {{#if paymentDetails}}Payment Details: {{{paymentDetails}}}{{/if}}
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
