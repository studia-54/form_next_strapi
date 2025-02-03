import { NextResponse } from 'next/server'

//@ts-ignore
export function middleware(req) {
  const origin = req.headers.get('origin')

  const allowedOrigins = [
    'https://studia-54.com',
    'https://fiftyfourms.com',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000',
  ]

  const res = NextResponse.next()

  res.headers.set('Access-Control-Allow-Origin', '*')

  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')

  // Устанавливаем правильные настройки для iframe
  res.headers.set('Content-Security-Policy', "frame-ancestors 'self' *")

  return res
}

export const config = {
  matcher: '/:path*', // Применяется ко всем роутам
}
