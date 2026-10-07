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

## SEO

Set `NEXT_PUBLIC_SITE_URL` to the public production origin (default: `https://poidem.cz`). It is used for canonical URLs, social metadata, `/sitemap.xml`, and `/robots.txt`.

## Daily event cleanup

`scripts/delete-past-events.mjs` deletes events whose local date is before yesterday
in `Europe/Prague` (the day before yesterday and older). Events from yesterday,
today, and future dates are kept, and related `event_prices` are
deleted by the existing foreign key cascade. The database session timezone does
not affect the cutoff.

On a server with Node.js 20.6+ and the project dependencies installed, set
`DATABASE_URL` in the project's `.env` file (or environment). To run manually:

```bash
npm run events:cleanup
```

For daily execution at 04:00 Prague time, open `crontab -e` for the application
user and add the entries from `cron/delete-past-events.crontab`. Replace
`/srv/poidem-cz` and `/usr/bin/node` with the absolute server paths. This requires
a cron implementation supporting `CRON_TZ`, such as
[Cronie](https://github.com/cronie-crond/cronie/blob/master/man/crontab.5).
`Europe/Prague` accounts for summer and winter time automatically. For cron
implementations without `CRON_TZ`, configure the scheduler's timezone as
`Europe/Prague` before using `0 4 * * *`; setting only the command's `TZ` does not
change the execution schedule.

The crontab is a server configuration template; adding it to the repository does
not install or enable the job. For serverless hosting, configure an external
scheduler with `Europe/Prague` timezone support to run this script where it can
access the database.
