## Shubham Chakrawarti – Portfolio

This is the source code for my personal portfolio: an AI/ML, Data, and Full Stack focused website built with React, TypeScript, Tailwind, and a Node/Express backend. It is deployed on Vercel and designed to be fast, modern, and recruiter‑friendly.

### Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS (with Shadcn UI components)
- Framer Motion for animations
- Node.js + Express server
- Vercel for hosting and deployment

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the full application in development mode (API + frontend):

```bash
npm run dev
```

3. Or, run only the client for UI work:

```bash
npm run dev:client
```

Then open the printed localhost URL in your browser.

### Scripts

- `npm run dev` – run the Express server in development mode
- `npm run dev:client` – run the Vite dev server for the React client
- `npm run check` – TypeScript typecheck
- `npm run build` – build client and server for production
- `npm start` – run the built server

### Production Build

To create a production build locally:

```bash
npm run check
npm run build
```

This generates the client in `dist/public` and the server bundle in `dist`.

### Vercel Deployment

The project includes `vercel.json` and `vercel-server-entry.js` so it can be deployed directly to Vercel as a full‑stack app.

Typical deploy flow:

```bash
npm run check
npm run build
npx vercel --prod
```

### Resume Download

The “Download CV” button in the hero section always points to `/resume.pdf`. The actual file lives at:

```text
client/public/resume.pdf
```

To update the resume, just replace that file with a new PDF.

### License

This repository contains my personal portfolio. You are welcome to take inspiration from the structure and styling, but please do not copy branding, content, or personal assets as‑is.

