import { NextResponse } from 'next/server';
import { seoTopics } from '@/data/seo-topics';

export const dynamic = 'force-static';
export const revalidate = 604800; // 7-day CDN cache

export async function GET() {
  const suggestions = seoTopics.map((t) => ({
    topic: t.topic,
    label: t.label,
    shortLabel: t.shortLabel,
    icon: t.icon,
  }));

  return NextResponse.json({ success: true, suggestions });
}
