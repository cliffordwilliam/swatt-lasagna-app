This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Todo

- [x] Remove the items page, no need to GET items, unless later they want it
- [x] Add a new GET Pembeli and Penerima page with sub ID detail page. (Create a detail page where we can see the penerima and pembeli orders, and have a graph for it to show trend)
- [x] Add a new POST Pembeli and Penerima page
- [x] Add a new POST order page - (Remake the items-list but this one has a button that when you press it will add the id to a list, where you will use this list to make connection after you POST order, once oerder is POST then you kick to Orders GET page)
- [x] Get orders should have a different pattern, not like items, so it just shows trend, from a range of time, or maybe make this as the homepage
