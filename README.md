# The Local Guide — Street Food Recommender

A tiny prototype that recommends street food spots using a **custom context file**: `product.md`.

## Run locally
From the repo root:

```bash
python3 -m http.server 8000
```

Then open:
- http://localhost:8000/localguide/

## Make it “local” (important)
- Edit `product.md` and set your real city name (replace `CITY_NAME`).
- Replace the sample `places` with 8–12 real spots/areas from your city.

## Optional: GitHub Pages (1-click demo link)
You can host this as a static site.

1. Push to GitHub (done)
2. In GitHub repo: **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` and folder: `/ (root)`
5. Your demo URL will look like:
	- `https://ansh-codr.github.io/StreetFoodRecommender/localguide/`

## Customize for your city
Edit `product.md` and update:
- `city`
- the `places` list

The app reads `product.md` directly at runtime.

## Challenge notes
- `.kiro/` is included at the repo root (required).
- The recommender relies on `product.md` for local nuance and data.

## Blog helpers
- Blog outline: `docs/blog-outline.md`
- Screenshot checklist: `docs/screenshot-checklist.md`
