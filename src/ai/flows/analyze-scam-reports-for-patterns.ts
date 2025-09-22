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
  Analyze the provided report details to determine if there are patterns indicative of scam operations.
  Return whether it is a potential scam and provide your reasoning.

  Report Details: {{{reportDetails}}}
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
