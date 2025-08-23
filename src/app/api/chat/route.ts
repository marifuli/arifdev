import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getIntership';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { rateLimit, getClientIP } from '@/lib/rate-limiter';
// import { getSports } from './tools/getSport';

export const maxDuration = 30;

// ❌ Pas besoin de l'export ici, Next.js n'aime pas ça
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimitResult = rateLimit(clientIP, 30); // 30 requests per day
    
    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({
          error: "Not Found",
          // error: 'Rate limit exceeded',
          // message: rateLimitResult.message,
          // resetTime: rateLimitResult.resetTime,
          // remaining: rateLimitResult.remaining
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            // 'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            // 'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            // 'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            // 'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    const { messages } = await req.json();
    console.log('[CHAT-API] Incoming messages:', messages);
    console.log('[CHAT-API] Rate limit check passed for IP:', clientIP, 'Remaining:', rateLimitResult.remaining);

    messages.unshift(SYSTEM_PROMPT);

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      // getSports,
      getCrazy,
      getInternship,
    };

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      toolCallStreaming: true,
      tools,
      maxSteps: 2,
    });

    const response = result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });

    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());

    return response;
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}
