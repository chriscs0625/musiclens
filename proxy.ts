import { NextRequest, NextResponse } from 'next/server'

// TODO: Replace with Upstash Redis for true persistence across edge instances
const RATE_LIMIT = 20
const WINDOW_MS = 60_000
const ipRequestMap = new Map<string, { count: number; windowStart: number }>()

export function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const now = Date.now()
  const record = ipRequestMap.get(ip)

  if (!record || now - record.windowStart > WINDOW_MS) {
    ipRequestMap.set(ip, { count: 1, windowStart: now })
    return NextResponse.next()
  }

  if (record.count >= RATE_LIMIT) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  record.count++
  return NextResponse.next()
}

export const config = {
  matcher: '/api/lyrics',
}
