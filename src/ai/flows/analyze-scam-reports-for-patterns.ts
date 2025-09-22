'use server';

/**
 * @fileOverview Analyzes submitted scam reports to identify patterns indicative of scam operations.
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
  Analyze the provided report details and the attached image evidence to determine if there are patterns indicative of scam operations.
  Return whether it is a potential scam and provide your reasoning.

  Report Details: {{{reportDetails}}}
  {{#if paymentDetails}}Payment Details: {{{paymentDetails}}}{{/if}}
  Evidence Image:
  {{media url=evidenceImage}}
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
