# The Local Guide — Street Food Recommender (Custom Context)

This `product.md` file is the **single source of truth** for local street-food knowledge used by the recommender.

## How to customize
- Replace `CITY_NAME` with your city.
- Edit/extend the JSON dataset between the markers.
- Keep fields consistent (same spelling/casing), so the app can parse it.

## Local nuance (write like a local)
- Typical price bands: `low` (street), `mid` (small cafe), `high` (sit-down).
- Spice scale: `1` (mild) → `5` (very spicy).

<!--LOCALGUIDE_DATA_START-->
{
  "city": "CITY_NAME",
  "country": "India",
  "currency": "INR",
  "language": {
    "primary": "en",
    "localTerms": {
      "tadka": "tempering (hot oil + spices)",
      "thela": "street cart",
      "chutney": "spiced condiment",
      "chaat": "tangy/sweet/savory snack mix"
    }
  },
  "tags": [
    "chaat",
    "fried",
    "sweet",
    "savory",
    "quick",
    "sit-down",
    "refreshing",
    "late-night",
    "breakfast"
  ],
  "places": [
    {
      "name": "Station Chaat Corner",
      "area": "Central",
      "mustTry": ["pani puri", "sev puri"],
      "veg": true,
      "spice": 3,
      "budget": "low",
      "bestTime": ["evening"],
      "tags": ["chaat", "quick", "savory"],
      "notes": "Ask for ‘teekha’ only if you like heat. Balance with sweet chutney."
    },
    {
      "name": "Old Town Kebab Lane",
      "area": "Old City",
      "mustTry": ["seekh kebab roll"],
      "veg": false,
      "spice": 4,
      "budget": "low",
      "bestTime": ["late-night", "evening"],
      "tags": ["fried", "quick", "late-night", "savory"],
      "notes": "Best with onions + lime. Avoid if you want mild food."
    },
    {
      "name": "Market Dosa Stall",
      "area": "South Market",
      "mustTry": ["masala dosa", "filter coffee"],
      "veg": true,
      "spice": 2,
      "budget": "mid",
      "bestTime": ["breakfast", "morning"],
      "tags": ["breakfast", "sit-down", "savory"],
      "notes": "Crispy dosa + coconut chutney is the safe pick."
    },
    {
      "name": "College Vada Pav Cart",
      "area": "University Road",
      "mustTry": ["vada pav"],
      "veg": true,
      "spice": 3,
      "budget": "low",
      "bestTime": ["afternoon", "evening"],
      "tags": ["fried", "quick", "savory"],
      "notes": "Add dry garlic chutney if you want it ‘proper local’."
    },
    {
      "name": "Lane of Momos",
      "area": "North Corner",
      "mustTry": ["steamed momos", "chilli momos"],
      "veg": true,
      "spice": 4,
      "budget": "low",
      "bestTime": ["evening"],
      "tags": ["quick", "savory"],
      "notes": "Steamed is lighter; chilli is for spice lovers."
    },
    {
      "name": "Summer Nimbu Pani Stand",
      "area": "Riverside",
      "mustTry": ["nimbu pani"],
      "veg": true,
      "spice": 1,
      "budget": "low",
      "bestTime": ["afternoon"],
      "tags": ["refreshing", "quick"],
      "notes": "Ask for less sugar if you prefer it tangy."
    },
    {
      "name": "Sweet Jalebi Point",
      "area": "Main Bazaar",
      "mustTry": ["jalebi", "rabri"],
      "veg": true,
      "spice": 1,
      "budget": "low",
      "bestTime": ["morning", "evening"],
      "tags": ["sweet", "quick"],
      "notes": "Fresh jalebi is crisp outside, soft inside."
    },
    {
      "name": "Night Poha & Tea",
      "area": "East Gate",
      "mustTry": ["poha", "chai"],
      "veg": true,
      "spice": 2,
      "budget": "low",
      "bestTime": ["late-night", "morning"],
      "tags": ["breakfast", "quick", "savory", "late-night"],
      "notes": "Poha is comfort food; add lemon for brightness."
    }
  ],
  "writingStyle": {
    "tone": "friendly, local, practical",
    "format": "short bullets",
    "mustInclude": ["what to order", "why it fits", "price band", "best time"],
    "avoid": ["overhyping", "unsafe claims", "made-up specifics"]
  },
  "safety": {
    "general": [
      "Prefer stalls with high turnover.",
      "If you have allergies, ask about ingredients and cross-contamination.",
      "Use bottled/filtered water if sensitive."
    ]
  }
}
<!--LOCALGUIDE_DATA_END-->
