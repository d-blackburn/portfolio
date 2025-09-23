# Portfolio Website

A personal portfolio website built with Astro and React, integrated with Hygraph CMS for content management.

## Features

- Modern UI built with MUI Joy components
- Responsive design for all device sizes
- Content management through Hygraph CMS
- Static site generation with build-time data fetching
- Fast performance with zero runtime API calls

## Hygraph Integration

This project uses Hygraph as a headless CMS to manage content.

### Retrigger deployment on Hygraph content changes

This repository is already configured to deploy when a repository_dispatch event with type `hygraph_update` is received (see `.github/workflows/deploy.yml`). To make Hygraph content changes retrigger a deployment of the current version/site:

1) Create a GitHub Personal Access Token (classic) with `repo` scope for this repository. Store it securely; you'll use it in the Hygraph webhook Authorization header.

2) In your GitHub repository, ensure the workflow is enabled and has permissions (default from this repo is fine). The workflow listens to:
   - push to `main`
   - manual `workflow_dispatch`
   - `repository_dispatch` with type `hygraph_update`

3) In Hygraph, create a Webhook that triggers on content Publish/Unpublish/Update events (choose according to your needs). Set:
   - Method: POST
   - URL: `https://api.github.com/repos/<OWNER>/<REPO>/dispatches`
   - Headers:
     - `Accept: application/vnd.github+json`
     - `Authorization: Bearer <YOUR_GITHUB_PAT>`
     - `X-GitHub-Api-Version: 2022-11-28` (optional but recommended)
   - Body (JSON):
     ```json
     {
       "event_type": "hygraph_update",
       "client_payload": {
         "source": "hygraph",
         "action": "content_change"
       }
     }
     ```

   Replace `<OWNER>` and `<REPO>` accordingly. You can also use GitHub’s fine-grained PAT scoped to “Repository dispatch: Read and write”.

4) Save the webhook and test from Hygraph. On success, you should see a new GitHub Actions run for the workflow "Deploy to GitHub Pages" with event `repository_dispatch`.

Notes:
- This path redeploys the current codebase against the latest Hygraph content; it does not create a new tag or release when triggered via `repository_dispatch` (by design in the workflow).
- The build uses two secrets that should already be configured in the repo settings → Secrets and variables → Actions:
  - `PUBLIC_HYGRAPH_ENDPOINT`
  - `PUBLIC_HYGRAPH_TOKEN`

If you prefer triggering via GitHub’s `workflow_dispatch` API instead, you can POST to `https://api.github.com/repos/<OWNER>/<REPO>/actions/workflows/deploy.yml/dispatches` with body `{ "ref": "main" }` using the same Authorization header. However, `repository_dispatch` is simpler when you want a custom event type from Hygraph.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
