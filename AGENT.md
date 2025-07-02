# AGENT.md - Tanya Stockdale Portfolio

## Build/Dev Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm start` - Start production server
- TypeCheck: `npx astro check`
- Format: `npx prettier --write .`

## Architecture & Structure
- **Framework**: Astro 5 with SSR (server output mode)
- **Frontend**: Multi-framework (Astro + Vue + React)
- **Styling**: TailwindCSS + shadcn/ui components
- **Animation**: GSAP, Framer Motion, Lenis smooth scroll
- **Content**: Ghost CMS integration (@tryghost/content-api)
- **Deployment**: Node adapter for standalone server

## Code Style & Conventions
- **Language**: TypeScript with strict config
- **Imports**: Use `@/` alias for src paths
- **Components**: `.astro` for pages/layouts, `.tsx` for UI components, `.vue` for interactive components
- **Styling**: TailwindCSS classes, cn() utility for conditional classes
- **Types**: Define interfaces, use React.ComponentProps for component props
- **File Structure**: src/{components,pages,layouts,lib,types,styles,content,assets}
- **Formatting**: Prettier with astro plugin, no semicolons
