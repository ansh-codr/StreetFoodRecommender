# The Local Guide — Street Food Recommender

A tiny prototype that recommends street food spots using a **custom context file**: `product.md`.

## Run locally
From the repo root:

```bash
python3 -m http.server 8000
```

Then open:
- http://localhost:8000/localguide/

## Customize for your city
Edit `product.md` and update:
- `city`
- the `places` list

The app reads `product.md` directly at runtime.

## Challenge notes
- `.kiro/` is included at the repo root (required).
- The recommender relies on `product.md` for local nuance and data.
