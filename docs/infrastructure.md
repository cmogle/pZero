# Infrastructure

Deployment and backend are configured as follows. **Do not commit secrets;** env vars are set in Vercel (and locally in `.env` for dev).

## Projects

| Provider  | Purpose   | Project ID / reference |
|-----------|-----------|-------------------------|
| Vercel    | Hosting   | `prj_T96WUHbbbJqJ2FD3Yn5NKrTCiGoU` |
| Supabase  | Data/Auth | `zhljzwcjidtpshgkdiqr` |

## Environment variables

Set in **Vercel** (and in local `.env` for development):

| Variable                     | Purpose |
|-----------------------------|---------|
| `SUPABASE_URL`              | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase API key (never expose to client) |

Secrets are managed in Vercel project settings and in local `.env` (gitignored).
