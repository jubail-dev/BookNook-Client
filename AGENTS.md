# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Do not edit or delete the block above — `next dev` rewrites it; keep it committed.

## What this is

Next.js 16 App Router frontend for "BookNook" (books e-commerce). Early stage: one page (`src/app/page.tsx` → `HeroSection`), no routing beyond the root, no API/data layer yet. Backend is a separate repo: `../BookNook-Server` (Express + MongoDB). This repo is client-only and is its own git root.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint only. **There is no typecheck, test, or format script.** No test framework is installed.
- `npm run build` — production build; the closest thing to full verification. Run it (and `npm run lint`) before considering work done.

## Stack facts that will surprise you

- **Next 16 + React 19 + React Compiler** (`babel-plugin-react-compiler`, enabled in `next.config.ts`). Do not add `useMemo`/`React.memo`/`useCallback` for performance — the compiler handles it; only add for correctness.
- **`cacheComponents: true`** — caching/prefetching semantics differ from classic Next. Consult `node_modules/next/dist/docs/` (see block above) before using `fetch`, `cache()`, `use cache`, or Suspense in server components.
- **Tailwind CSS v4** — no `tailwind.config.*`; all theming lives in `src/app/globals.css` via `@theme inline` and CSS variables. Add utilities, not config.
- **shadcn/ui, style `base-nova`** — built on **`@base-ui/react`, not Radix**. Never hand-write Radix imports. UI primitives live in `src/components/ui/`; add new ones with `npx shadcn add <component>` rather than writing from scratch, and don't edit existing `ui/` files unless the task is to change them.
- **`cn` is the npm `cn` package** — `src/lib/utils.ts` just re-exports it (not the usual `clsx` + `twMerge` combo). Import `cn` from `@/lib/utils`.

## Conventions

- Path alias: `@/*` → `src/*`. Use it, including in `components.json` shadcn aliases.
- Root layout uses the Next 16 typed `LayoutProps<"/">` prop type (generated into `.next/types`) — mimic it for new layouts.
- Client-only heavy UI (e.g. Swiper in `src/components/shared/HeroSection.tsx`) is loaded via `dynamic(..., { ssr: false })` from a client wrapper with a `loading` placeholder. Follow this pattern for browser-only libraries.
- `next/image` on external Unsplash URLs uses `unoptimized` — keep that or images break.
- Components: `src/components/ui/` = shadcn-generated primitives; `src/components/shared/` = app-level components; `src/hooks/` = custom hooks.
- `.env*` files are gitignored; none exist in this repo yet. API base URL for the backend is not wired anywhere yet — if you add one, use a `NEXT_PUBLIC_*` env var.
