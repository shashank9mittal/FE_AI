'use server';

import { generateText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export async function triageSupportTicket(userText: string) {
  'use server';

  const { output } = await generateText({
    model: openai('gpt-4o-mini'), // Use a cheap model for simple classification
    
    output: Output.object({
      schema: z.object({
        reasoning: z.string().describe('Explain why you chose this category'),
        category: z.enum(['Refund', 'Tech Support', 'Spam']),
      }),
    }),

    prompt: `Classify the following support ticket.
    
    Ticket: "${userText}"`,
  });

  // Logic: Route based on the AI's decision
  // Note: We perform the redirect AFTER the AI finishes.
  switch (output.category) {
    case 'Refund':
      redirect('/triage/refund');
    case 'Tech Support':
      redirect('/triage/tech');
    case 'Spam':
      redirect('/triage/spam');
    default:
      redirect('/triage/unknown');
  }
}