'use server';

import { generateText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// 1. Define the Shape of the data using Zod
// This tells the AI exactly what JSON structure we require.
const receiptSchema = z.object({
  storeName: z.string().describe('The name of the store or merchant'),
  date: z.string().describe('The date of purchase, formatted as YYYY-MM-DD'),
  items: z.array(
    z.object({
      name: z.string().describe('Description of the item'),
      quantity: z.number().describe('Quantity purchased'),
      price: z.number().describe('Price per unit'),
      totalPrice: z.number().describe('Total price for this line item'),
    })
  ),
  subtotal: z.number().describe('The subtotal before tax'),
  tax: z.number().nullable().describe('The tax amount'),
  total: z.number().describe('The final total paid'),
});

// 2. Define the Server Action
export async function parseReceipt(rawText: string) {
  'use server';

  const {output} = await generateText({
    model: openai('gpt-4o'),
    output: Output.object({
      schema: receiptSchema
    }),
    prompt: `Analyze the following messy receipt text and extract the structured data: 
    
    "${rawText}"`,
  });

  return output;
}