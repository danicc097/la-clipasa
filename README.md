# discord-twitch-webapp-test


See:

- https://vercel.com/docs/concepts/limits/overview#typical-monthly-usage-guidelines
- https://supabase.com/pricing (alt. fly.io, firestore)
- https://firebase.google.com/docs/firestore/quotas#free-quota
- alt. GCP micro instance
- alt. https://workers.cloudflare.com/ with honojs (creates one worker per api)

## TODO

- Prisma X supabase fixing migrations `Error: P3005 The database schema is not empty`:
  - https://github.com/prisma/prisma/issues/16853
  - https://supabase.com/docs/guides/integrations/prisma#configuring-the-project-to-use-postgresql


- [prisma data proxy cannot be used in local development ](https://github.com/prisma/prisma/issues/14398)
Checkout [supabase js client for edge](https://github.com/supabase/supabase/discussions/6321)

- Edge function 5mb limit. Discord upload max 8MiB.



