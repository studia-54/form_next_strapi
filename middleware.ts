import { NextResponse } from 'next/server'

//@ts-ignore
export function middleware(request) {
  const response = NextResponse.next()

  // Настройка CORS для вашего родительского сайта
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')

  // Обработка preflight запросов (OPTIONS)
  if (request.method === 'OPTIONS') {
    //@ts-ignore
    response.status = 204
    return response
  }

  return response
}

export const config = {
  matcher: '/api/:path*', // Применяется только к API-запросам
}
