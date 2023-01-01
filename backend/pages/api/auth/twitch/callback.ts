import { NextRequest, NextResponse } from 'next/server'

// can't use shared import
export const config = {
  runtime: 'edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest, response: any) => {
  try {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL ?? '/')
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
