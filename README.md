# Maitri Dhatri — Food Redistribution (Frontend)

Pure MERN React app (JS) built with Vite and React Router. State via React Context + custom hooks, API via Axios, CSS Modules for styling, optional client-side maps via Leaflet.

## Requirements
- Node 18+

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create `.env` (already provided here):
```
VITE_API_URL=http://localhost:4000
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_MAP_ATTRIBUTION=&copy; OpenStreetMap contributors
```

3. Run dev server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build && npm run preview
```

## Notes
- Auth: email/password with JWT; token stored in memory and localStorage.
- No third-party services (Cloudinary, Firebase, etc.).
- Maps are optional and client-side only (Leaflet + react-leaflet).
