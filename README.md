# AmakaziWatch Frontend

> Kenya's first crowdsourced GBV awareness, reporting and prevention platform.

## Overview

AmakaziWatch frontend is a React application that provides a safe, empowering interface for survivors, NGOs, county officials, and administrators to access GBV reporting and support services.

## Tech Stack

* **Framework**: React 18 + Vite
* **Styling**: Tailwind CSS + Glass-morphism
* **State Management**: Zustand + React Query
* **Routing**: React Router v6
* **Maps**: Leaflet + React Leaflet
* **Icons**: Lucide React
* **Animations**: Framer Motion
* **API Client**: Axios
* **Deployment**: Cloudflare Pages / Vercel

## Features

* Anonymous reporting (step-by-step wizard)
* Safety tools (timer, safe word, escape plan)
* Encrypted document vault
* Peer support chat
* AI legal assistant (Kenyan law)
* NGO directory by county
* Role-based dashboards
* Dark/light mode
* English / Swahili support
* Offline support (PWA)
* Heatmaps for reports

## Installation

### Prerequisites

* Node.js 18+
* npm or yarn

### Setup

```bash
git clone https://github.com/winstone-1/Amakazi-watch-frontend.git
cd Amakazi-watch-frontend

npm install

cp .env.example .env

npm run dev
```

## Environment Variables

```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## Project Structure

```
src/
├── api/
├── components/
│   ├── common/
│   ├── dashboards/
│   └── chat/
├── context/
├── pages/
├── hooks/
├── store/
└── utils/
```

## Role-Based Dashboards

| Role            | Features                             |
| --------------- | ------------------------------------ |
| Survivor        | Reports, Safety, Vault, Peer Support |
| Counselor       | Sessions, Chat                       |
| Org Staff       | Inventory, Cases, Campaigns          |
| County Official | Analytics, Scorecards                |
| Admin           | User management, moderation          |

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

## Styling

### Glass-morphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### Color Palette

* Primary: #FF6B35
* Secondary: #2C3E50
* Accent: #27AE60
* Background: #FDF6EC
* Dark: #1A2A3A

## Deployment

### Cloudflare Pages

```bash
npm run build
wrangler pages deploy dist --project-name=amakazi-watch
```

Or deploy via dashboard.

## License

MIT License

**Author:** Winstone Mwangi
**GitHub:** @winstone-1
