import { NextResponse } from 'next/server';

const robotsText = `User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://sssamacademy.tech/sitemap.xml
Host: ssssamacademy.tech
`;

export function GET() {
  return new NextResponse(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
