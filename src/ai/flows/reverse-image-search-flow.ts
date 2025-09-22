'use server';

/**
 * @fileOverview Performs a reverse image search to find the potential origin of an image.
 *
 * - reverseImageSearch - A function that takes an image and finds its source online.
 * - ReverseImageSearchInput - The input type for the reverseImageSearch function.
 * - ReverseImageSearchOutput - The return type for the reverseImageSearch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ReverseImageSearchInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A product image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ReverseImageSearchInput = z.infer<typeof ReverseImageSearchInputSchema>;

const ReverseImageSearchOutputSchema = z.object({
  summary: z.string().describe('A summary of the findings from the reverse image search.'),
  potentialSources: z.array(z.object({
    url: z.string().describe('The URL of a potential source for the image.'),
    description: z.string().describe('A brief description of the source or why it is relevant.'),
  })).describe('A list of potential original sources for the image.'),
});
export type ReverseImageSearchOutput = z.infer<typeof ReverseImageSearchOutputSchema>;


export async function reverseImageSearch(input: ReverseImageSearchInput): Promise<ReverseImageSearchOutput> {
  return reverseImageSearchFlow(input);
}


const prompt = ai.definePrompt({
  name: 'reverseImageSearchPrompt',
  input: { schema: ReverseImageSearchInputSchema },
  output: { schema: ReverseImageSearchOutputSchema },
  prompt: `You are a highly advanced reverse image search engine. Your task is to analyze the provided image and find its original source or other instances of it online.

  Focus on identifying e-commerce listings, brand websites, or social media posts where this image might have originated. Determine if the image is a stock photo or from a known brand.

  Based on your findings, provide a summary of whether the image appears to be unique or widely used, and list the most likely original sources you've found with descriptions.

  Image to analyze:
  {{media url=imageDataUri}}
  `,
});


const reverseImageSearchFlow = ai.defineFlow(
  {
    name: 'reverseImageSearchFlow',
    inputSchema: ReverseImageSearchInputSchema,
    outputSchema: ReverseImageSearchOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
