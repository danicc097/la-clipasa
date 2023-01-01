import { NextRequest, NextResponse } from 'next/server'

// can't use shared import
export const config = {
  runtime: 'edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest, response: any) => {
  try {
    // TODO previews URL will be broken
    // but can extract slug and craft a sibling deployed package url from process.env.NEXT_PUBLIC_URL
    // see:
    // https://github.com/vercel/vercel/discussions/6045
    // https://vercel.com/docs/concepts/deployments/generated-urls
    return NextResponse.redirect(process.env.UI_URL ?? '/')
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
