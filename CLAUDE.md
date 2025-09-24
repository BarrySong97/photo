# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` or `pnpm dev`
- **Build for production**: `npm run build` (runs TypeScript compilation and Vite build)
- **Lint code**: `npm run lint` (ESLint with auto-fix)
- **Preview production build**: `npm run preview`

## Architecture Overview

This is a React SPA built with modern tooling:

**Core Stack**:
- **Vite** - Build tool and development server
- **React 18** with TypeScript
- **TanStack Router** - File-based routing with type safety
- **HeroUI v2** - Component library (similar to NextUI)
- **Tailwind CSS v4** - Styling with HeroUI theme integration
- **Framer Motion** - Animations

**Project Structure**:
- `src/routes/` - File-based routing (TanStack Router generates `routeTree.gen.ts`)
- `src/pages/` - Page components (index, about, blog, docs, pricing)
- `src/components/` - Reusable UI components (navbar, theme-switch, icons, primitives)
- `src/layouts/` - Layout components
- `src/config/site.ts` - Site configuration including navigation items
- `src/provider.tsx` - HeroUI provider with TanStack Router integration

**Key Architectural Notes**:
- Uses HeroUIProvider with custom router integration for navigation
- TypeScript path aliases configured (`@/*` maps to `./src/*`)
- Dark mode support via Tailwind CSS class strategy
- Auto-generated route tree from file structure
- Strict TypeScript configuration with unused parameter/local checking

**Package Manager**: Uses pnpm (lock file present), with special `.npmrc` configuration needed for HeroUI packages.

## Component Development

Components follow HeroUI patterns. Check existing components in `src/components/` for styling conventions. The project uses:
- `clsx` for conditional classes
- `tailwind-variants` for component variants
- HeroUI components from `@heroui/react` namespace