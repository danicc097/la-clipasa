# discord-twitch-webapp-test


See:

- https://vercel.com/docs/concepts/limits/overview#typical-monthly-usage-guidelines
- https://supabase.com/pricing
- https://firebase.google.com/docs/firestore/quotas#free-quota

## TODO

- ssr on edge vs separate spa deployment (edge SSR maybe hits some kind
  of limit).
  in case of separate SPA might need:
   - https://github.com/lfades/edge-cors (unless something builtin found)
- https://vercel.com/docs/concepts/monorepos in case of separate spa
- Files can be uploaded to discord. Note maximum request size when sending a
  message is 8MiB. Embeds will probably not be created automatically, based on
  <blockquote>When creating a message, apps must provide a value for at least one of
  content, embeds, sticker_ids, components, or files[n].<blockquote>



