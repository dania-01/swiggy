# Swiggy Clone

A pixel-close frontend clone of Swiggy's food delivery web app built with Next.js 16 App Router. Focuses on matching Swiggy's real UI patterns — sticky headers, cuisine carousels, restaurant grids, menu pages with cart integration, and auth flows.

---

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Runtime** | React 19 |
| **Language** | JavaScript (ES2024, no TypeScript) |
| **Styling** | Tailwind CSS v4 (CSS-first config, no tailwind.config.js) |
| **UI Primitives** | shadcn/ui — copied into project and customized (not installed as a package) |
| **Variant System** | class-variance-authority (cva) for component variant management |
| **Base Primitives** | @base-ui/react (Button primitive used by shadcn) |
| **Icons** | Lucide React |
| **Image Optimization** | Next.js `<Image>` with Swiggy CDN remote patterns |
| **State Management** | React Context + useReducer (no Redux, no Zustand) |
| **Geocoding** | Browser Geolocation API + Nominatim (OpenStreetMap) reverse geocoding |
| **Font** | Gilroy → Arial → Helvetica Neue (Swiggy's exact font stack) |

---

## Architecture

```
src/
├── app/                         # App Router — pages stay thin (data fetch + render section)
│   ├── page.js                  # Home
│   ├── restaurant/[id]/         # Dynamic — SSR, generateMetadata
│   ├── restaurants/[cuisine]/   # Dynamic — cuisine filtered listing
│   ├── cart/                    # Cart & checkout
│   ├── search/                  # Instant search
│   ├── auth/login|signup/       # Auth pages
│   ├── icon.svg                 # Auto-served as favicon by Next.js App Router
│   └── not-found.js             # Custom 404
│
├── components/
│   ├── ui/                      # Stateless atoms — Button, Badge, Input, Card,
│   │                            # VegIndicator, LocationModal (all customized for
│   │                            # Swiggy's #FF5200 orange design system)
│   └── layout/                  # Header (sticky, scroll-aware), Footer
│
├── sections/                    # Feature-level compositions — loaded by pages
│   ├── home/                    # CuisineSection, FeaturedCarousel, FilterBar,
│   │                            # RestaurantCard, RestaurantGrid, HomeSection
│   ├── restaurant/              # RestaurantPage, MenuSection, FoodItemCard, CartBar
│   ├── cart/                    # CartPage
│   ├── restaurants/             # CuisinePage
│   └── auth/                    # LoginForm, SignupForm, AuthLayout
│
├── context/
│   ├── CartContext.js           # Global cart — useReducer, same-restaurant enforcement
│   └── LocationContext.js       # Global delivery location — shared between Header + Cart
│
├── hooks/
│   └── useCart.js               # Convenience hook wrapping CartContext
│
├── config/
│   └── index.js                 # CUISINE_CATEGORIES, SORT_OPTIONS, FILTER_CHIPS
│
└── lib/
    ├── data/
    │   ├── restaurants.js       # 90 restaurants — mock + real Swiggy cloudinary IDs
    │   └── menuItems.js         # 10 cuisine menu templates mapped across all restaurants
    └── utils/
        ├── formatters.js        # formatPrice, formatRating, formatDeliveryTime (range)
        └── helpers.js           # filterRestaurants, getRestaurantById, getFeatured
```

---

## Key Implementation Details

### Tailwind CSS v4
Uses the new CSS-first config — no `tailwind.config.js`. Theme tokens and Swiggy's design system colors are defined directly in `globals.css` via `@theme inline`. CSS variable shorthand syntax: `text-(--swiggy-orange)` instead of `text-[var(--swiggy-orange)]`.

### Component System
shadcn/ui components are copied into `src/components/ui/` and fully owned — not a dependency. Each component is extended with Swiggy-specific variants via `cva`:
- `Button` — `primary`, `outline`, `ghost`, `add` (green ADD food button), `stepper` (quantity controls)
- `Badge` — `rating`, `discount`, `promoted`, `filter`, `filter-active`
- `VegIndicator` — green/red dot in square border (Swiggy's veg/non-veg indicator)

### Cart State
`CartContext` uses `useReducer` with three actions: `ADD_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`. `ADD_ITEM` enforces single-restaurant ordering — if a user adds an item from a different restaurant, the reducer auto-clears the existing cart (matches real Swiggy behavior). `totalItems` and `totalPrice` are derived values computed in the provider.

### Sticky Filter Bar Transformation
`FilterBar` uses `IntersectionObserver` on a sentinel element placed above it. When the sentinel leaves the viewport, the bar switches from the expanded layout (sort + filter chips + result count) to a compact sticky layout (Sort By + search input) — matching Swiggy's scroll behavior exactly.

### Restaurant Menu Navigation
`MenuSection` uses a second `IntersectionObserver` to track which category section is in view and highlights the corresponding sidebar item (desktop) or auto-scrolls the tab strip (mobile/tablet). Two separate layouts: sticky left sidebar on `lg+`, horizontal scrollable tab bar on `< lg`.

### Location Detection
`LocationModal` calls `navigator.geolocation.getCurrentPosition()` then hits `nominatim.openstreetmap.org/reverse` for human-readable address. Location state lives in `LocationContext` so both the Header pill and the Cart delivery address row stay in sync.

### Image Strategy
- Swiggy's CDN: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/{imageId}`
- Cuisine category images: `MERCHANDISING_BANNERS` paths (real Swiggy promotional assets)
- 15 real restaurants use actual `cloudinaryImageId` values from Swiggy's live API
- 75 mock restaurants cycle through a pool of 20 distinct food images for visual variety

### Route Types (from `next build`)
```
○ Static   — /, /cart, /search, /auth/login, /auth/signup, /not-found
ƒ Dynamic  — /restaurant/[id], /restaurants/[cuisine]
```

---

## Data Layer

No backend. All data is static and imported directly — no `fetch`, no API calls at runtime.

```
restaurants.js     →   90 restaurants   (id, name, imageId, cuisines, rating,
                                          deliveryTime, priceForTwo, discount,
                                          isVeg, promoted, locality, areaName)

menuItems.js       →   10 cuisine templates  (northIndian, southIndian, pizza,
                                              burger, biryani, chinese, dessert,
                                              rolls, momos, coffee)
                        Each template: categories[] → items[]
                        RESTAURANT_MENU_MAP maps restaurant IDs to templates
```

---

## Getting Started

```bash
npm install
npm run dev      # Turbopack dev server → http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

---

## Deployment

Configured for Netlify via `netlify.toml`. Uses `@netlify/plugin-nextjs` for SSR support on dynamic routes.

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Connect the GitHub repo on Netlify — auto-deploys on every push to `main`.
