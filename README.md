# My Portfolio (remade)

This repository has been remade as a minimal, content-driven portfolio.

What’s included:

- Next.js (app router) + TypeScript
- Tailwind CSS for styling
- Contentlayer + MDX for repo-based content (edit the `content/` folder)
- Minimal theme tokens in `styles/globals.css`
- CI: GitHub Actions workflow to run lint & build

How to run locally

Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

To build:

```powershell
npm run build
npm start
```

Editing content

- Add MDX files to `content/projects/*.mdx` for projects. They will be picked up by Contentlayer at build time.

Notes

- This is an overwrite of the previous project as requested. No backup was taken.