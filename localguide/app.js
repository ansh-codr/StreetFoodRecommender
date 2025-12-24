const STATUS = document.getElementById('status');
const RESULTS = document.getElementById('results');
const CITY_META = document.getElementById('cityMeta');
const FORM = document.getElementById('prefsForm');

const START = '<!--LOCALGUIDE_DATA_START-->';
const END = '<!--LOCALGUIDE_DATA_END-->';

function spiceRange(spicePref) {
  if (spicePref === 'mild') return { min: 1, max: 2 };
  if (spicePref === 'medium') return { min: 3, max: 3 };
  if (spicePref === 'hot') return { min: 4, max: 5 };
  return { min: 1, max: 5 };
}

function safeText(value) {
  return String(value ?? '').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function parseProductMd(markdownText) {
  const startIndex = markdownText.indexOf(START);
  const endIndex = markdownText.indexOf(END);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('Could not find LOCALGUIDE data markers in product.md');
  }

  const jsonText = markdownText
    .slice(startIndex + START.length, endIndex)
    .trim();

  return JSON.parse(jsonText);
}

function scorePlace(place, prefs) {
  let score = 0;
  const reasons = [];

  // Diet
  if (prefs.diet === 'veg') {
    if (place.veg === true) {
      score += 3;
      reasons.push('Matches veg preference.');
    } else {
      score -= 6;
      reasons.push('Does not match veg-only preference.');
    }
  } else if (prefs.diet === 'nonveg') {
    if (place.veg === false) {
      score += 3;
      reasons.push('Matches non-veg preference.');
    } else {
      score -= 2;
      reasons.push('Mostly veg; may not satisfy non-veg craving.');
    }
  }

  // Budget
  if (prefs.budget !== 'any') {
    if (place.budget === prefs.budget) {
      score += 2;
      reasons.push(`Fits your budget: ${prefs.budget}.`);
    } else {
      score -= 1;
    }
  }

  // Spice
  const range = spiceRange(prefs.spice);
  if (typeof place.spice === 'number') {
    if (place.spice >= range.min && place.spice <= range.max) {
      score += 2;
      reasons.push(`Spice level ${place.spice}/5 fits your preference.`);
    } else {
      score -= 1;
      reasons.push(`Spice level ${place.spice}/5 may not match your preference.`);
    }
  }

  // Time
  if (prefs.time !== 'any') {
    const times = Array.isArray(place.bestTime) ? place.bestTime : [];
    if (times.includes(prefs.time)) {
      score += 2;
      reasons.push(`Good pick for ${prefs.time}.`);
    } else {
      score -= 1;
    }
  }

  // Tags
  const desiredTags = prefs.tags;
  const placeTags = Array.isArray(place.tags) ? place.tags : [];
  const tagMatches = desiredTags.filter((t) => placeTags.includes(t));
  if (desiredTags.length > 0) {
    score += tagMatches.length * 1.5;
    if (tagMatches.length > 0) {
      reasons.push(`Matches tags: ${tagMatches.join(', ')}.`);
    } else {
      reasons.push('Does not match selected tags.');
      score -= 1;
    }
  }

  return { score, reasons };
}

function renderBadge(text) {
  return `<span class="badge">${safeText(text)}</span>`;
}

function renderResults(recommendations) {
  RESULTS.innerHTML = '';

  if (recommendations.length === 0) {
    RESULTS.innerHTML = '<li class="result">No matches. Try relaxing a filter.</li>';
    return;
  }

  for (const rec of recommendations) {
    const place = rec.place;
    const mustTry = Array.isArray(place.mustTry) ? place.mustTry : [];
    const badges = [
      place.area ? `Area: ${place.area}` : null,
      place.budget ? `Budget: ${place.budget}` : null,
      typeof place.spice === 'number' ? `Spice: ${place.spice}/5` : null,
      place.veg === true ? 'Veg' : place.veg === false ? 'Non-veg' : null
    ].filter(Boolean);

    const why = rec.reasons.slice(0, 4);

    const item = document.createElement('li');
    item.className = 'result';
    item.innerHTML = `
      <h3>${safeText(place.name)}</h3>
      <div class="meta">
        ${badges.map(renderBadge).join('')}
      </div>
      <div class="meta">
        ${mustTry.length ? renderBadge(`Must try: ${mustTry.join(', ')}`) : ''}
      </div>
      <ul class="why">
        ${why.map((r) => `<li>${safeText(r)}</li>`).join('')}
        ${place.notes ? `<li><strong>Local tip:</strong> ${safeText(place.notes)}</li>` : ''}
      </ul>
    `;

    RESULTS.appendChild(item);
  }
}

async function loadContext() {
  STATUS.textContent = 'Loading product.md…';
  const res = await fetch('../product.md', { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load product.md: ${res.status}`);
  const md = await res.text();
  const data = parseProductMd(md);

  const city = data.city && data.city !== 'CITY_NAME' ? data.city : 'your city';
  CITY_META.textContent = `City: ${city}`;
  STATUS.textContent = 'Ready.';

  return data;
}

function getPrefs() {
  const diet = document.getElementById('diet').value;
  const budget = document.getElementById('budget').value;
  const spice = document.getElementById('spice').value;
  const time = document.getElementById('time').value;

  const tags = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(
    (el) => el.value
  );

  return { diet, budget, spice, time, tags };
}

let CONTEXT;

async function init() {
  try {
    CONTEXT = await loadContext();
    renderResults([]);
  } catch (err) {
    STATUS.textContent = `Error: ${err.message}`;
  }
}

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!CONTEXT) return;

  const prefs = getPrefs();
  const places = Array.isArray(CONTEXT.places) ? CONTEXT.places : [];

  const ranked = places
    .map((place) => {
      const scored = scorePlace(place, prefs);
      return { place, score: scored.score, reasons: scored.reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  renderResults(ranked);
});

init();
