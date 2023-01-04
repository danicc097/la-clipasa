import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest) => {
  // individual post visualization when clicking on post or visiting it
  // (visit renders same thing as modal, which should include moderation actions, etc. already)
  // This is the only route that will GET discord embed by message id to save
  //  some space and avoid waiting for embed generation upon post creation
  try {
    switch (request.method) {
      case 'GET': {
        // all posts with infinite scroll (https://react-query-v3.tanstack.com/guides/infinite-queries)
        break
      }
      case 'POST': {
        break
      }
      case 'PATCH': {
        break
      }
    }
  } catch (error) {}
}
