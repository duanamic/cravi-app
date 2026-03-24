import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function isAllowedImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    const allowed = [
      'instagram.com',
      'cdninstagram.com',
      'fbcdn.net',
      'supabase.co',
    ]
    return (
      ['https:', 'http:'].includes(parsed.protocol) &&
      allowed.some((domain) => parsed.hostname.endsWith(domain))
    )
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  // Auth check — reject unauthenticated requests
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const url = request.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  // URL validation — only allow known image CDNs (prevents open proxy / SSRF)
  if (!isAllowedImageUrl(url)) {
    return new NextResponse('URL not allowed', { status: 403 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Referer': 'https://www.instagram.com/',
      },
    })
    if (!res.ok) return new NextResponse('Failed to fetch image', { status: 502 })
    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return new NextResponse('Error fetching image', { status: 500 })
  }
}
