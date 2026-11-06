# Tianzhe Chu Website

Personal academic website built with Vite and TypeScript, deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Static subpages and public assets live under `public/` so their deployed URLs stay stable.

### Scaling blog counters

The English and Chinese articles use the same `public/blogs/scaling/engagement.js`
endpoint and storage keys. Views are deduplicated for 30 minutes per browser;
likes use a persistent random browser ID. No sign-in is required. Clearing browser
storage or changing devices can count again; these are anonymous engagement counts,
not verified unique people. Counts start from the feature's launch.

The persistent D1 backend is managed through Sites:
- Project: `appgprj_6aed6c2be8f08191a83b9c5db3761cf4`
- Endpoint: https://tianzhe-scaling-counter.ami-labs-7159.chatgpt.site/api/counts
- Local backend checkout: `../scaling-blog-counter`
- The backend's `.openai/hosting.json` retains its identity; reuse it for updates.

Backend tests must use the local D1 preview, not the production counter. For frontend
QA, replace the endpoint only in the built `dist/blogs/scaling/engagement.js` with
`http://127.0.0.1:8787/api/counts`, then rebuild before deployment. Backend migration
and publishing follow the Sites skill; GitHub Pages continues to host the blog.
