'use server';

import { reverseImageSearch, type ReverseImageSearchInput, type ReverseImageSearchOutput } from "@/ai/flows/reverse-image-search-flow";

export type ImageSearchFormState = {
  message: string;
  summary: string | null;
  sources: { url: string; description: string }[];
  success: boolean;
}

async function toDataURI(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function verifyImageAction(
  prevState: ImageSearchFormState,
  formData: FormData,
): Promise<ImageSearchFormState> {
  const imageFile = formData.get('productImage') as File;

  if (!imageFile || imageFile.size === 0) {
    return {
      message: 'Please upload an image to search.',
      summary: null,
      sources: [],
      success: false,
    };
  }

  try {
    const imageDataUri = await toDataURI(imageFile);

    const aiInput: ReverseImageSearchInput = {
      imageDataUri,
    };
    
    const aiResult: ReverseImageSearchOutput = await reverseImageSearch(aiInput);

    return {
      message: 'Image analysis complete.',
      summary: aiResult.summary,
      sources: aiResult.potentialSources,
      success: true,
    };

  } catch (error) {
    console.error('Reverse image search failed:', error);
    return {
      message: 'Failed to analyze the image. The AI model may be temporarily unavailable. Please try again later.',
      summary: null,
      sources: [],
      success: false,
    };
  }
}
