import { NextResponse } from 'next/server';

export async function POST() {
  const exp = Math.round(Date.now() / 1000) + 60 * 130; 
  const options = {
    properties: {
      exp,
    },
  };

  // Set the Daily.co endpoint and API key
  const endpoint = 'https://api.daily.co/v1/rooms/';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.DAILY_API_KEY}`, // Ensure this is defined in your environment variables
  };
 
  try {
    // Make the API request to create a room
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(options),
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
