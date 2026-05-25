# 🗺️ ycpad — Y Combinator Company Location Map Explorer

`ycpad` is a next-generation web application designed to map and explore **Y Combinator (YC)** companies across the globe. Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **MapLibre GL**, it offers a stunning, interactive geographical interface that dynamically visualizes where YC startups are located, with real-time dark/light theme synchronization and premium animations.

---

## ✨ Features

- **🚀 Modern Next.js 16 Stack**: Leverages the Next.js App Router, React 19, and Tailwind CSS 4.0 for fast loading, Turbopack development, and fluid styling.
- **🎨 Glassmorphic Dark/Light Mode**: Full integration with `next-themes` and `@hugeicons/react` that smoothly shifts both the UI and the GIS map tiles between custom light (`Positron`) and dark (`Dark Matter`) styles.
- **⚡ Custom Map Components (MapLibre GL)**: A highly-optimized, declarative React wrapper around MapLibre GL providing components for:
  - **Markers & Tooltips**: Dynamic markers with hover tooltips (`MarkerTooltip`) and interactive card popups (`MarkerPopup`).
  - **Bezier Curves (`MapArc`)**: Curved arcs linking geographical locations with custom curvature, samples, and feature state hover highlights.
  - **Routes (`MapRoute`)**: High-performance GeoJSON line rendering for paths and routes.
  - **Clustering (`MapClusterLayer`)**: Dynamic serverless clustering for thousands of coordinates with threshold-based color coding (green/yellow/red) and automated zoom boundaries.
  - **3D Compass & Location Controls (`MapControls`)**: Sleek overlays including HTML5 Geolocation tracking (`Locate`), fullscreen toggles, and a 3D-rotated compass dial synced directly with the map's tilt (pitch) and rotation (bearing).
- **📂 YC Data Processing Pipeline**:
  - Automatically fetches the comprehensive YC company directory dataset directly from open-source APIs (`yc-oss`).
  - Python scripts (`locations.py`) to parse, aggregate, and cache company coordinates and top startup clusters.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 16](https://nextjs.org/) (React 19, TypeScript)
- **Map Engine**: [MapLibre GL](https://maplibre.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Hugeicons React](https://hugeicons.com/) & [Lucide React](https://lucide.dev/)
- **Theme Management**: [Next Themes](https://github.com/pacocoursey/next-themes)
- **Data Scripting**: Python 3 (using `requests` and `collections.Counter`)

---

## 📂 Project Structure

```bash
ycpad/
├── app/
│   ├── data/
│   │   ├── cache/
│   │   │   └── data-cords.json     # Cached coordinates for major YC hubs (SF, Sunnyvale, NY, etc.)
│   │   ├── getCompany.ts           # API fetch layer for YC company directory
│   │   └── useCompany.ts           # React query/state Hook for client-side loading
│   ├── favicon.ico
│   ├── globals.css                 # Tailwind CSS 4 config, map overrides, and variables
│   ├── layout.tsx                  # Root wrapper (Geist Mono, Figtree font, and ThemeProvider)
│   └── page.tsx                    # Landing page featuring the Map component and theme toggle
├── components/
│   ├── ui/
│   │   ├── button.tsx              # Reusable shadcn/ui buttons
│   │   └── map.tsx                 # Core GIS mapping system (1800+ lines of MapLibre React wrappers)
│   └── theme-provider.tsx          # Client-side ThemeProvider context
├── scripts/
│   ├── locations.json              # Aggregated output count of YC companies by city
│   └── locations.py                # Python pipeline script to pull data and run analysis
├── package.json                    # Dependency details (Turbopack, MapLibre, Hugeicons)
├── tsconfig.json                   # TypeScript configuration
└── tailwind.config.mjs             # Tailwind post-css settings
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.x or later) and `npm` installed.

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Run the Development Server

Start the Next.js development server with Turbopack for lightning-fast hot reloads:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the map.

### 3. Build for Production

Build the production bundle and verify compile checks:

```bash
npm run build
npm start
```

### 4. Running the Data Pipeline (Optional)

If you want to run the python aggregator to parse the locations of the top YC companies:

```bash
cd scripts
python3 locations.py
```

This will fetch the dataset, calculate unique locations, count startups per hub, and overwrite `locations.json`.

---

## 📐 Map Component API Guide

The `components/ui/map.tsx` module exports a premium, highly composable mapping toolkit. Below is the API reference for developer utilization.

### 1. `<Map>`
The base container that initializes MapLibre GL and handles light/dark transitions.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `center` | `[number, number]` | Required | Coordinate center `[lng, lat]`. |
| `zoom` | `number` | Required | Initial zoom level. |
| `theme` | `"light" \| "dark"` | Auto-detects | Overrides theme detection. Synced with Tailwind's `.dark` class. |
| `projection` | `ProjectionSpecification` | `undefined` | Set `{ type: "globe" }` for 3D globe view. |
| `loading` | `boolean` | `false` | Shows a sleek glassmorphic loading animation overlay. |

> [!TIP]
> Use `<Map>` inside parent layouts or client pages wrapped in a relative height/width container, e.g., `<div className="relative h-screen w-full">`.

### 2. `<MapMarker>` & Friends
Places markers with custom React nodes directly on the map.

```tsx
import { MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, MarkerLabel } from "@/components/ui/map";

// Usage inside <Map>
<MapMarker longitude={-74.006} latitude={40.7128}>
  <MarkerContent>
    <div className="h-6 w-6 rounded-full bg-primary animate-pulse" />
  </MarkerContent>
  <MarkerTooltip>New York Hub</MarkerTooltip>
  <MarkerPopup closeButton>
    <h3 className="font-bold">New York City</h3>
    <p className="text-xs">Active startup location hub.</p>
  </MarkerPopup>
</MapMarker>
```

- **`<MarkerContent>`**: Container for the visible marker. If empty, defaults to a high-contrast blue ringed dot.
- **`<MarkerPopup>`**: Popover modal triggered when clicking on the marker.
- **`<MarkerTooltip>`**: Small floating label displayed strictly on cursor hover.
- **`<MarkerLabel>`**: Fixed text below (`position="bottom"`) or above (`position="top"`) the marker.

### 3. `<MapControls>`
Overlays map controls with high-fidelity Lucide elements.

```tsx
<MapControls 
  position="bottom-right" 
  showZoom={true} 
  showCompass={true} 
  showLocate={true} 
  showFullscreen={true} 
/>
```

- **3D Compass**: Computes rotation dynamically. Syncs with map `pitch` and `bearing` to represent physical 3D orientation.
- **HTML5 Locater**: Queries `navigator.geolocation` and flies the camera to user coordinates with an ease-in-out transition.

### 4. `<MapArc>`
Draws dynamic, curved Bézier lines between two locations (perfect for visualizing connections or migrations).

```tsx
const arcs = [
  { id: 1, from: [-122.4194, 37.7749], to: [-74.006, 40.7128] } // SF to NY
];

<MapArc 
  data={arcs} 
  curvature={0.2} 
  paint={{ "line-color": "#3b82f6", "line-width": 3 }} 
  hoverPaint={{ "line-color": "#ef4444", "line-width": 4 }}
/>
```

### 5. `<MapClusterLayer>`
Render thousands of data points smoothly without client-side lag using native MapLibre canvas clustering.

```tsx
<MapClusterLayer 
  data={geojsonFeatureCollection}
  clusterMaxZoom={14}
  clusterRadius={50}
  clusterColors={["#22c55e", "#eab308", "#ef4444"]} // Small, Medium, Large clusters
  pointColor="#3b82f6"
/>
```

---

## 🎨 Theme Synchronization Rationale

`ycpad` coordinates the dark and light transitions across the React application shell and the underlying WebGL canvas:
1. When next-themes flips the class on the `<html>` element, a `MutationObserver` in `map.tsx` detects the change.
2. The resolved theme triggers a transition on the MapLibre instance, swapping the style JSON:
   - **Light Mode**: CartoDB Positron style (`positron-gl-style`)
   - **Dark Mode**: CartoDB Dark Matter style (`dark-matter-gl-style`)
3. A `diff: true` configuration is supplied during `setStyle` to prevent full canvas re-renders, keeping marker and custom layers intact.

---

## 📄 License

This project is licensed under the MIT License. Created as a template for high-fidelity GIS dashboards.
