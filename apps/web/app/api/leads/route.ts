import { NextResponse } from 'next/server';

const allowedOrigins = [
  'https://mavoratechnologies.com',
  'https://www.mavoratechnologies.com',
  'http://localhost:3000',
];

function getCorsHeaders(request: Request) {
  const origin = request.headers.get('origin') || '';
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200, headers: getCorsHeaders(request) });
}

export async function POST(request: Request) {
  const headers = getCorsHeaders(request);
  
  try {
    const body = await request.json();
    const { 
      fullName, 
      workEmail, 
      projectOverview, 
      selectedServices 
    } = body;

    if (!fullName || !workEmail || !projectOverview) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400, headers }
      );
    }

    console.log('Lead request received:', body);

    return NextResponse.json(
      { success: true, message: 'Request received successfully', data: body },
      { status: 201, headers }
    );
  } catch (error) {
    console.error('Error handling lead request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500, headers }
    );
  }
}