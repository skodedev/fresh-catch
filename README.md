# Fresh Catch

Static React landing page (in-browser Babel) — premium seafood storefront for the UAE.

Source lives in [`frontend/f1/`](frontend/f1). The homepage entry is `Freshcatch Homepage.html`; Vercel serves it at `/` via [`vercel.json`](frontend/f1/vercel.json).

## Local

```bash
cd frontend/f1
python3 -m http.server 8000
# open http://localhost:8000/Freshcatch%20Homepage.html
```

## Deploy

Pushes to `main` deploy to Vercel via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Required repo secrets:

- `VERCEL_TOKEN` — create at https://vercel.com/account/tokens
- `VERCEL_ORG_ID` — see `frontend/f1/.vercel/project.json` (`orgId`)
- `VERCEL_PROJECT_ID` — see `frontend/f1/.vercel/project.json` (`projectId`)

Manual deploy: `cd frontend/f1 && vercel --prod`.
