interface RateLimitData {
  count: number;
  resetTime: number;
}

// In-memory storage for rate limiting
// Note: In production, consider using Redis or a database for persistence
const rateLimitStore = new Map<string, RateLimitData>();

// Clean up expired entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  message?: string;
}

export function rateLimit(
  identifier: string,
  limit: number = 30,
  windowMs: number = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Get or create rate limit data for this identifier
  let data = rateLimitStore.get(identifier);
  
  // If no data exists or the window has expired, create new entry
  if (!data || now > data.resetTime) {
    data = {
      count: 0,
      resetTime: now + windowMs
    };
  }
  
  // Check if limit exceeded
  if (data.count >= limit) {
    const timeUntilReset = Math.ceil((data.resetTime - now) / 1000 / 60); // minutes
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: data.resetTime,
      message: `Rate limit exceeded. Try again in ${timeUntilReset} minutes.`
    };
  }
  
  // Increment counter and update store
  data.count++;
  rateLimitStore.set(identifier, data);
  
  return {
    success: true,
    limit,
    remaining: limit - data.count,
    resetTime: data.resetTime
  };
}

export function getClientIP(request: Request): string {
  // Try to get IP from various headers (for different deployment environments)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback for local development
  return 'unknown';
}