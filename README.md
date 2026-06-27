<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/3261e01b-cc6d-4d92-be9a-b8d477886684

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This app is built with Vite, so GitHub Pages must serve the production build output in `dist/`.

1. Make sure the app builds locally:
   `npm run build`
2. Push this repo to GitHub.
3. In your repository settings, set Pages to deploy from `GitHub Actions`.
4. Add a custom domain in GitHub Pages settings if you want one.

The Vite config uses a relative base path, so the site works both at the repo Pages URL and at a custom domain.
