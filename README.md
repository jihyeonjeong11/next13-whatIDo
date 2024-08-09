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

- form-page: for practicing New React Hook forms.(V5/V6)
- use-worker: for practicing web worker / window-like project in a browser, pirating from
  [Dustin Brett] (https://dustinbrett.com/).
- use-window: for making dynamic component render structure along with features(Rnd, and so on)

- 10-22 : useRnd study starting
- added react-rnd along with rndwindow, need to add useRnd
- added windowTransition for exit open animation

- need to handle some base component for window(for inherit sizing. currently it's just magic numbers.)
- done.

10-22 need to use client syntax for all new tsxs.
11-12 need linkELement(for storing ref) and session for size
11-12 change Component inside Process! need to check inside of useFileManager!
CHECKING DIRECTORY.TS(DEFAULTSETTING)

11-14 check rndwindow
const rndWindowElements =
rndEntry?.resizableElement?.current?.children || [];

Fixing next13 errors!

My page keeps refreshing! : I needed to make all React.FC to function declaration.
ClassName did not match :
compiler: {
styledComponents: true,
},
on next.config.js.

Performance overview:

withChildren:

rerender time: approx 2ms without rerender.

withoutChildren:

rerender time: approx 600ms with rerender.

withMemo

rerender time: approx 1.7ms without rerender.

next to do:

blog above. //done

05/08: Took performance pictures not using context and using context!
with Context HOC, children components not intended to be rerendered, are rerendered. (TodoHandle and TodoForm)

05/09: Found out the contextFactory pattern is not showing any better comparing plain context pattern.
Because... since the consumer has reliability rendering two additional components, todoHandle and todoForm. these two keeps rerendering when context value changes.
Or maybe I'm using it wrong. need more study to use it properly.

05/10: added why-react-query to complete template context and useQuery,

Now We can check the benefit of contextFactory function!

Next, TKDodo blog with context & loading and error

lighthouse / performance tab check(FCP LCP) with build

blog above.

test them.

exp: wrapper render and add loading

get code review from reddit maybe?

exp: use context

todo: add more styles.

https://kentcdodds.com/blog/optimize-react-re-renders
for velog insight meterial

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

07/09:

cool portfolio

using vanta for 3d background
it gives performance issue as written below:
we need to revisit my master,DaedalOs! for usage of web workered background canvas with vanta.

https://github.com/anantJjain/Portfolio?tab=readme-ov-file
https://www.reddit.com/r/react/comments/wn0vyh/has_anyone_used_vantajs_for_dynamic_backgrounds/

I can make it two different ways. use Vanta and three from npm(usual), and using it in web worker(DaedalOs way.)
can check performance comparison.
08/06:

https://www.reddit.com/r/react/comments/wn0vyh/has_anyone_used_vantajs_for_dynamic_backgrounds/

Experiences using vanta background with performance issue:
solution: Use vanta in web worker to detach them in a main thread. Draw it in a custom canvas.
