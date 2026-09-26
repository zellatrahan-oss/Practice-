# Chi Beta Omega (ΧΒΩ): Alpha Chapter at Florida State

A parody website for Chi Beta Omega, a fictional professional business fraternity at Florida State University, built in plain HTML, CSS, and a little vanilla JS. There's no build step: open `index.html` in a browser and it works. It can be hosted anywhere, including GitHub Pages (see `.github/workflows/pages.yml`).

Chi Beta Omega, its crest, and its motto are invented. The site is not affiliated with Florida State University or any real fraternity. Every person named on it is fictional, Harry Black included.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, stat band, mission, quick links, "four ways to grow" cards, the Spring Formal band, testimonials, and the Asset Recovery map |
| `about.html` | About: chapter story, mission and addendum, values, officers and adviser, honors table, house rules |
| `events.html` | Events & Competitions: the 2026–27 chapter calendar, meeting standards, competitive event categories |
| `formal.html` | The Spring Formal: Article VII in full, the plus-one eligibility checker, the procurement timeline, dress code, budget, night-of rules, FAQ, tickets |
| `join.html` | Rush: why join, the four-step pledge process, itemized dues, FAQ, contacts |

The navbar, footer, and inline SVG icon sprite are copied into every page. When you edit one, edit it in all five files.

## Brand

**Colors.** Garnet and gold. The tokens are at the top of `css/styles.css`. The token names (`--navy`, `--blue`) were kept from the original template so no component styles had to change.

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#3a1420` | Ink garnet: headings, dark sections |
| `--blue` | `#782f40` | Garnet: links, icons, subheads |
| `--gold` | `#ceb888` | Accents, primary buttons (with ink garnet text) |
| `--cobalt` | `#9b4257` | Accents on dark garnet |
| `--black` | `#2d2b2b` | Body text |

`--garnet` and `--garnet-deep` are the Spring Formal accent: they drive the `.formal` band on the home page and the garnet hero, verdict panel, and rules on `formal.html`, so the party reads as its own thing without leaving the palette.

Gold isn't used for text on white backgrounds, because it doesn't have enough contrast to be readable.

**Typography.** Figtree for body text and Playfair Display for display headings, both loaded from Google Fonts. The logos use Georgia so they render without a web font.

**Logo.** Every brand asset is a hand-written SVG in `assets/brand/`:

```
assets/brand/
├── crest.svg              Full crest with the motto ribbon (footer)
├── wordmark.svg           Shield + "CHI BETA OMEGA" for light backgrounds (header)
├── wordmark-reverse.svg   Same, for dark backgrounds (hero)
├── favicon.svg            Shield only, square
└── apple-touch-icon.png   180px render of the favicon
```

Motto: *Per aspera ad dividenda*, through hardship to dividends.

## Code structure

```
css/styles.css   Brand tokens, base styles, components, responsive rules
js/main.js       Mobile menu, header hairline, footer year, plus the three interactive features below
```

`styles.css` runs in one pass: tokens, base and layout, then a component per block, each under its own banner comment. Components in use include `.hero`, `.stat-band`, `.split`, `.mission`, `.card-grid`, `.officer-grid`, `.event-list`, `.steps`, `.timeline`, `.table-wrap`, `.notice`, `.quote-grid`, `.formal`, `.countdown`, `.checker` / `.verdict`, `.rules`, `.recovery`, `.faq` (a styled `<details>`), `.contact-grid`, and `.cta`.

## Interactive bits

Each is its own IIFE in `js/main.js`, driven by data attributes and guarded by an early return, so any page can include it or not.

- **Formal countdown** — `[data-countdown]` holds the target timestamp (`2027-04-10T21:00:00`); the script fills `[data-countdown-days|hours|minutes|seconds]` every second and clamps at zero. It appears on the home page and on `formal.html`.
- **Plus-one eligibility checker** — `formal.html#checker`. A `change` listener on `[data-checker]` reads `data-verdict`, `data-stamp`, `data-headline`, `data-body`, and `data-cite` off the chosen radio and rewrites `[data-checker-verdict]` into `verdict--approved`, `--conditional`, or `--denied`. Nine options; add another by adding a radio with those five attributes.
- **Asset Recovery** — the map on the home page. Each `.map-region` carries a `data-location`; clicking or pressing Enter/Space on one dispatches a search, and only `LAST_KNOWN` in `main.js` is a hit. `[data-recovery-reset]` clears it.

## Deploying

Pushing to `main` triggers `.github/workflows/pages.yml`, which uploads the repository root as-is and deploys it to GitHub Pages. Nothing is compiled, so what's in the repo is what ships.
