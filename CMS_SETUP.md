# Content Admin Setup

This site now includes a Decap CMS admin UI at `/admin/`.

The CMS edits the existing Markdown collection in `src/content/posts`, so the
current Astro routes keep working:

- `contentType: event` appears under `/events/`
- `contentType: post`, `notice`, or `recap` appears under `/blog/`

## Production Authentication

The admin config is already pointed at:

```yaml
backend:
  name: github
  repo: DarkSoulWind/malay-association-uk
  branch: main
```

For production, Decap CMS still needs a GitHub OAuth provider. Because this site
is deployed as a static Cloudflare Pages site, that OAuth provider is not created
by Astro automatically.

Recommended options:

1. Use a hosted Decap-compatible GitHub OAuth service.
2. Add a small Cloudflare Worker OAuth proxy for GitHub.
3. Move CMS auth to a platform that provides Git Gateway.

Once OAuth is configured, authorised editors can visit
`https://malayassociation.co.uk/admin/`, sign in, and publish Markdown changes
back to GitHub. A Cloudflare Pages deployment should then rebuild the site from
the updated repository.

## Local Editing

`local_backend: true` is enabled in `public/admin/config.yml`. To use local CMS
editing, run the Astro dev server and a Decap-compatible local backend proxy,
then open `/admin/`.
