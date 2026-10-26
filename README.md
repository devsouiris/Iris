This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Search and analytics

- `NEXT_PUBLIC_SITE_URL` overrides the canonical origin used by metadata, `/robots.txt`, and `/sitemap.xml`. It defaults to `https://www.iirisdigital.com.br`.
- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the GA4 web stream ID (`G-...`) to load Google Analytics on all pages. No analytics script is loaded when this variable is absent.
- After deployment, confirm that `/robots.txt` and `/sitemap.xml` are publicly accessible, submit the sitemap in Google Search Console, and verify analytics events in GA4 Realtime or Tag Assistant.

## Database and authentication

- The contact form writes to Supabase Postgres through the transaction pooler. Set `POSTGRES_URL` to the pooled connection string; `DATABASE_URL` remains a fallback for existing deployments. Keep this value server-side.
- Supabase Auth prefers `NEXT_PUBLIC_IRIS_SUPABASE_URL` and `NEXT_PUBLIC_IRIS_SUPABASE_PUBLISHABLE_KEY` for the new IRIS Digital project. The standard `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` remain fallbacks for other environments. The IRIS-specific names avoid collision with write-only values from the previous Vercel setup.
- The schema is recorded in `drizzle/0000_right_ravenous.sql` and `drizzle/0001_rapid_ikaris.sql`. Apply it once to a new database before directing production traffic there.
- Keep database passwords and API secrets in Vercel environment variables or a gitignored local env file, never in the repository.
