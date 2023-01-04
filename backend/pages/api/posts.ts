import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest) => {
  try {
    switch (req.method) {
      case 'GET': {
        // all posts with infinite scroll (https://react-query-v3.tanstack.com/guides/infinite-queries)
        break
      }
    }
  } catch (error) {}
}
