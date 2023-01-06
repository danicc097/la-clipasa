import { NextRequest, NextResponse } from 'next/server'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest, response: any) => {
  try {
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
    return NextResponse.redirect(process.env.UI_URL ?? '/')
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
