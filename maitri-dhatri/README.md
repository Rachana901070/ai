# Maitri Dhatri (React + Vite)

React 18, React Router, Tailwind, Zustand, React Query, Axios, react-leaflet, Recharts, lucide-react, Vitest.

## Requirements

- Node 18+

## Setup

1. Install deps

```bash
npm i
```

2. Create `.env.local` (or copy `.env.example`)

```env
VITE_API_URL=http://localhost:4000
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_MAP_ATTRIBUTION=&copy; OpenStreetMap contributors
VITE_CLOUDINARY_CLOUD_NAME=demo
VITE_CLOUDINARY_UPLOAD_PRESET=unsigned_preset
```

3. Run dev

```bash
npm run dev
```

Open `http://localhost:5173`.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run preview` - preview production build
- `npm run test` - run tests

## Routes

- `/`
- `/auth/login`
- `/donor/dashboard`
- `/donor/new`
- `/donor/donations/:id`
- `/collector/requests`
- `/collector/active`
- `/admin/map`
- `/admin/users`
- `/admin/analytics`
- `/settings`

## Features

- QueryClientProvider; Zustand stores: auth, ui, geo
- Auth login stores JWT; `useAuth()` and `RoleGuard`
- Donor: Donation form (Cloudinary images), nearby map radius 10km, detail timeline
- Collector: Requests list + map (distance, ETA), accept (optimistic), active pickup with proof upload
- Admin: Live map (markers), Users table, Analytics KPIs (Recharts)

## Notes

- Leaflet CSS imported in `src/main.jsx`.
- API assumed to exist at `VITE_API_URL` with endpoints for auth/posts/pickups/admin.
