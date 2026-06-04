# Swiggy Clone

A full-stack food delivery web app built with **Next.js 16**, inspired by Swiggy's design and UX. Includes restaurant browsing, menu pages, cart management, and auth flows — all with mock data and real Swiggy CDN images.

---

## Live Demo

> Deploy link goes here after Netlify setup

---

## Features

- **Home page** — "What's on your mind?" cuisine carousel, featured restaurant carousel, filter chips (Pure Veg, Ratings 4.0+, Under 30 Min, Offers), Sort By dropdown, sticky filter bar on scroll with inline search
- **Restaurant detail** — Info header with rating/time/price stats, sticky category sidebar (desktop) + horizontal scrollable tab bar (mobile/tablet), food item cards with ADD → quantity stepper cart integration
- **Cart** — Item list with steppers, live bill breakdown (delivery fee, platform fee, GST), coupon codes, order placed success screen
- **Search page** — Instant search across restaurant names, cuisines, and locations
- **Auth pages** — Login and Signup with client-side validation, Google/Facebook buttons, success states
- **Location picker** — GPS detect via browser Geolocation API + OpenStreetMap reverse geocoding, manual location picker with presets
- **90+ restaurants** — 75 mock + 15 real restaurants from Swiggy's API with actual cloudinary image IDs
- **Fully responsive** — Mobile, tablet, and desktop layouts throughout

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (customized) + class-variance-authority |
| State | React Context + useReducer (cart, location) |
| Icons | Lucide React |
| Images | Next.js Image + Swiggy CDN |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages (thin wrappers)
│   ├── page.js                 # Home
│   ├── restaurant/[id]/        # Restaurant detail + menu
│   ├── restaurants/[cuisine]/  # Cuisine filtered page
│   ├── cart/                   # Cart & checkout
│   ├── search/                 # Search page
│   └── auth/login|signup/      # Auth pages
├── components/
│   ├── ui/                     # Button, Badge, Input, Card, LocationModal
│   └── layout/                 # Header, Footer
├── sections/                   # Feature-level compositions per page
│   ├── home/                   # CuisineSection, FeaturedCarousel, FilterBar, RestaurantCard
│   ├── restaurant/             # MenuSection, FoodItemCard, CartBar
│   ├── cart/                   # CartPage
│   └── auth/                   # LoginForm, SignupForm, AuthLayout
├── context/                    # CartContext, LocationContext
├── hooks/                      # useCart
├── config/                     # Cuisine categories, sort/filter options
└── lib/
    ├── data/                   # restaurants.js, menuItems.js (mock data)
    └── utils/                  # formatters.js, helpers.js
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Coupon Codes

Try these on the cart page:

| Code | Discount |
|------|----------|
| `WELCOME50` | 50% off up to ₹100 |
| `SWIGGY20` | 20% off up to ₹60 |
| `FREEDEL` | Free delivery |
| `FLAT100` | ₹100 flat off above ₹399 |

---

## Deployment

Configured for **Netlify** via `netlify.toml`.

1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com) → **Import from Git**
3. Build command: `npm run build` · Publish dir: `.next`
4. Click **Deploy** — auto-redeploys on every push to `main`

---

## Data

- Restaurant and cuisine images served from Swiggy's public CDN
- 15 restaurants use real `cloudinaryImageId` values from Swiggy's live API
- Menu data uses 10 cuisine templates mapped across all restaurants
- No backend or database — fully client-side with static mock data
