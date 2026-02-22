import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const apiKey = process.env.DEV_TO_API_KEY;

  if (!apiKey) {
    console.warn('DEV_TO_API_KEY is not defined in environment variables. Falling back to empty posts array.');
    // Gracefully fallback so the app continues to work without failing
    return NextResponse.json([], { status: 200 });
  }

  try {
    const response = await fetch('https://dev.to/api/articles/me/published', {
      headers: {
        'api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Dev.to API error: ${response.status} ${response.statusText} - ${errorText}`);
      return NextResponse.json({ error: `Failed to fetch posts: ${response.statusText}` }, { status: response.status });
    }

    const posts = await response.json();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in posts API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
