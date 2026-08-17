# Unique Youth Association — Ganesh Chaturthi Website

A responsive Next.js + Supabase starter for a colony/community Ganesh Chaturthi website.

## Features

- Festive Ganesh Chaturthi landing page
- "Welcome to Unique Youth Association" hero
- Members page with photos, names and roles
- Gallery page
- Admin dashboard foundation
- Supabase database schema
- Supabase-ready image URLs
- Responsive mobile design
- Public pages read directly from Supabase

## 1. Install

```bash
npm install
```

## 2. Configure Supabase

Create a Supabase project.

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Use the publishable/anon browser-safe key only. Never put a Supabase secret/service-role key in `NEXT_PUBLIC_*`.

Open Supabase SQL Editor and run:

`supabase/schema.sql`

Then create two public Storage buckets:

- `member-photos`
- `gallery`

For production, add proper Storage policies and authenticated admin write policies.

## 3. Run

```bash
npm run dev
```

Open:

`http://localhost:3000`

## 4. Live updates

The public site reads members/gallery directly from Supabase. After the database changes are saved, a fresh page load sees the updated content.

For true instant updates while a page is already open, add Supabase Realtime subscriptions to the client components. The schema is ready for this.

## 5. Deployment

Deploy this project to Vercel and add the same environment variables in the Vercel project settings.

Every deployment can keep the same public URL. Database/content changes do not require a new deployment.

## Suggested production flow

1. Create Supabase project.
2. Run `supabase/schema.sql`.
3. Configure Storage.
4. Add Supabase Auth admin user.
5. Protect `/admin` with middleware.
6. Wire Add/Edit/Delete forms to Supabase.
7. Deploy to Vercel.
8. Share the public URL in the colony group.

## Important

The included admin pages are a UI/database foundation, not a production-secured CMS yet. Before exposing `/admin` publicly, implement Supabase Auth + route protection + authenticated database/storage policies.
