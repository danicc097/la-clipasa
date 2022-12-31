import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async (request: NextRequest, response: any) => {
  try {
    return NextResponse.redirect(process.env.BASE_URL ?? '/')
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
