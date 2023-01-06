import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

// will be called directly so no cors
export default async (request: NextRequest) => {
  try {
    console.log(request.url)
    // TODO previews URL will be broken
    // but can extract slug and craft a sibling deployed package url from https://$NEXT_PUBLIC_VERCEL_URL
    // NEXT_PUBLIC_VERCEL_URL (The URL of the deployment. Example: my-site-7q03y4pi5.vercel.app)
    // If using branch dev -> will get deterministic preview names on push
    // based on NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG and NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER
    // vite gets VITE_VERCEL_URL, VITE_VERCEL_GIT_REPO_SLUG, ...
    // for env vars available on vercel see https://vercel.com/docs/concepts/projects/environment-variables
    // see:
    // https://github.com/vercel/vercel/discussions/6045
    // https://vercel.com/docs/concepts/deployments/generated-urls

    // cannot create user or update user here, twitch sets token in hash so
    // its not accessible.
    // will explicitly  POST /users from the client which will upsert
    // (https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-or-create-records)
    // the user on twitchId to save up calls

    return NextResponse.redirect(process.env.UI_URL ?? '/')
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
