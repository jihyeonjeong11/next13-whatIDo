# This is my practices written next13 app router.

# 1. structure.

```
├── README.md
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   └── app
│       ├── components
│       │   ├── form-page
│       │   │   ├── index.tsx
│       │   │   └── schema
│       │   │       └── zodSchema.ts
│       │   └── use-worker
│       │       ├── StyledTaskBar.tsx
│       │       └── clock
│       │           ├── StyledClock.tsx
│       │           ├── clock.worker.ts
│       │           ├── functions.ts
│       │           └── index.tsx
│       ├── favicon.ico
│       ├── form-page
│       │   └── page.tsx
│       ├── globals.css
│       ├── hooks
│       │   └── useWorker.ts
│       ├── layout.tsx
│       ├── page.tsx
│       ├── types
│       │   └── index.ts
│       ├── use-worker
│       │   └── page.tsx
│       └── utils
│           ├── constants.ts
│           └── functions
│               └── index.ts
├── tailwind.config.ts
├── tsconfig.json
└── turbo.json
```

form-page: for practicing New React Hook forms.(V5/V6)
use-worker: for practicing web worker / window-like project in a browser, pirating from
[Dustin Brett] (https://dustinbrett.com/).

Monorepo!

https://blog.logrocket.com/build-monorepo-next-js/

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
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
