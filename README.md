# La Clipasa

*Work in progress*

Migration of the weekly meme subreddit Twitch stream of https://www.reddit.com/r/Caliebre/
using:
- Vercel edge functions
- Mantine UI SPA with Vite
- Supabase + Prisma data proxy
- Twitch authentication

Check out the progress over at: https://laclipasa.vercel.app

## Alternatives

- https://firebase.google.com/docs/firestore/quotas#free-quota
- fly.io
- GCP micro instance
- https://workers.cloudflare.com/ with honojs

## TODO

- Discord as a CDN

- Prisma X supabase fixing migrations `Error: P3005 The database schema is not empty` :
  - (**not effective**)https://github.com/prisma/prisma/issues/16853
  - (**not effective**)https://supabase.com/docs/guides/integrations/prisma#configuring-the-project-to-use-postgresql


- [prisma data proxy cannot be used in local development
  ](https://github.com/prisma/prisma/issues/14398).
Checkout [supabase js client for
edge](https://github.com/supabase/supabase/discussions/6321)
- Checkout raw SQL with Postgres alternatives for the edge. Prisma proving to be quite a
  let-down.




