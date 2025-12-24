# Blog Outline — Kiro Week 5: The Local Guide

## Title ideas
- The Local Guide: A Street Food Recommender Powered by `product.md`
- Teaching an AI My City’s Street Food Using a Custom Context File

## 1) Problem
- Generic recommenders don’t know *my* city’s street-food nuances.
- I want something that feels local: time-of-day, spice tolerance, budget, veg/non-veg, and local tips.

## 2) Solution (what I built)
- A lightweight web prototype that recommends street-food spots.
- It **reads local knowledge from `product.md`** and ranks places based on user preferences.

## 3) How the custom context works
- `product.md` contains a JSON dataset (between markers) describing:
  - city + currency
  - places/areas
  - must-try items
  - tags, best time, budget, spice
  - local tips
- The app loads `product.md` at runtime and uses it as source of truth.

## 4) How Kiro accelerated development (must-have)
- Prompts you can quote in the post:
  - “Create a simple recommender UI with diet/budget/spice/time filters.”
  - “Design a context schema in `product.md` with places/tags/spice.”
  - “Implement ranking based on user preferences + explain reasons.”
- Mention iteration speed: schema tweaks in `product.md` immediately change recommendations.

## 5) Demo (include screenshots)
- Screenshot 1: `product.md` showing local dataset
- Screenshot 2: UI form filled
- Screenshot 3: recommendations list with reasons and local tips
- Optional: short screen recording

## 6) Run instructions
- `python3 -m http.server 8000`
- Open `/localguide/`

## 7) What I’d improve next
- Add more real places and local tags.
- Optional hosting with GitHub Pages.
