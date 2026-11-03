# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Do not edit or delete the block above — `next dev` rewrites it; keep it committed.

## What this is

Next.js 16 App Router client for "BookNook" (library / book-lending app). The backend is a **separate repo**: `../BookNook-Server` (Express + MongoDB, default `http://localhost:5000`). This repo is client-only and its own git root.

Routes: `/`, `/books`, `/books/[bookId]`, `/books/add`, `/login`, `/register`, `/my-books`, `/my-borrows`. The only route handler is better-auth at `/api/auth/[...all]`.

## Commands

- `npm run dev` — dev server (Turbopack).
- `npm run lint` — ESLint only. **There is no typecheck, test, or format script. No test framework is installed, and no tests exist.**
- `npm run build` — production build. It also runs the TypeScript check, so it's the closest thing to full verification. Run it plus `npm run lint` before considering work done.
- **Lint fails at baseline**: 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (both shadcn-generated), plus a pile of warnings. Don't treat those as your regressions — only new errors matter.

## Stack facts that will surprise you

- **Next 16 + React 19 + React Compiler** (`babel-plugin-react-compiler`, enabled in `next.config.ts`). Do not add `useMemo`/`React.memo`/`useCallback` for performance — the compiler handles it; only add for correctness.
- **`cacheComponents: true`** (+ `partialPrefetching`) — caching/prefetching semantics differ from classic Next. Consult `node_modules/next/dist/docs/` (see block above) before using `fetch`, `cache()`, `use cache`, or Suspense in server components. Build output shows which routes are Static vs Partial Prerender.
- **Tailwind CSS v4** — no `tailwind.config.*`; all theming lives in `src/app/globals.css` via `@theme inline` and CSS variables. Add utilities, not config.
- **shadcn/ui, style `base-nova`** — built on **`@base-ui/react`, not Radix**. Never hand-write Radix imports. UI primitives live in `src/components/ui/`; add new ones with `npx shadcn add <component>` rather than writing from scratch, and don't edit existing `ui/` files unless the task is to change them.
- **`cn` is the npm `cn` package** — `src/lib/utils.ts` just re-exports it (not the usual `clsx` + `twMerge` combo). Import `cn` from `@/lib/utils`.

## Backend, env, auth

- All book/borrow data is fetched from the Express backend via `NEXT_PUBLIC_BASE_SERVER_URL`, **with no fallback** — a missing var yields `fetch("undefined/...")`. Server pages use `{ cache: "no-store" }`; client pages fetch in `useEffect`. There is no data library (no React Query/SWR) and no local API layer beyond `/api/auth`.
- `.env` exists (gitignored; no `.env.example`). Var names: `NEXT_PUBLIC_BASE_SERVER_URL`, `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.
- Auth is better-auth **running inside this Next app**: `src/lib/auth.ts` connects directly to MongoDB (`MONGODB_URI`), mounted at `src/app/api/auth/[...all]/route.ts`. The Express server does not run auth.
- **`src/lib/auth-client.ts` creates two clients.** The exported `authClient` (with a `baseURL` aimed at the Express server) is **unused**; every call site imports `signIn`/`signUp`/`signOut`/`useSession` from a second `createAuthClient()` with no baseURL, i.e. same-origin → this app's own `/api/auth`. Don't "fix" this by switching call sites to `authClient` — that would send auth requests to the Express server, which doesn't serve better-auth.
- No `middleware.ts` — pages needing a session guard client-side with `useSession()` (e.g. `/my-books`, `/books/add`). There is no server-side route protection.

## Conventions

- Path alias: `@/*` → `src/*`. Use it, including in `components.json` shadcn aliases.
- Root layout uses the Next 16 typed `LayoutProps<"/">` prop type (generated into `.next/types`) — mimic it for new layouts.
- Client-only heavy UI (e.g. Swiper in `src/components/shared/HeroSection.tsx`) is loaded via `dynamic(..., { ssr: false })` from a client wrapper with a `loading` placeholder. Follow this pattern for browser-only libraries.
- `next/image` on external Unsplash URLs uses `unoptimized` (see `HeroSlider.tsx`) — keep that or images break.
- Components: `src/components/ui/` = shadcn-generated primitives; `src/components/shared/` = app-level components; `src/hooks/` = custom hooks; shared types in `src/types/`.
