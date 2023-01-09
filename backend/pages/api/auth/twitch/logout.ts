import { NextRequest, NextResponse } from 'next/server'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest) => {
  try {
    // TODO remove cookie
    return NextResponse.json(JSON.stringify('logged out'))
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
