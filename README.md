# 💧 Talegaon Dabhade Water Grid — Municipal SCADA Platform

> **An enterprise-grade, data-dense municipal water supply monitoring and SCADA control web application for Talegaon Dabhade Municipal Council (Pune District, Maharashtra), engineered with React, TypeScript, Tailwind CSS, Framer Motion, GSAP, and a Singly Linked List Data Structure.**

---

## 🚀 Vercel Production Deployment Setup

The project is fully pre-configured for **zero-config deployment to Vercel**:

- Includes [`vercel.json`](file:///c:/Users/jay%20ashok%20magar/Documents/GitHub/urja-mitra-solar/sample/vercel.json) with Vite SPA build settings (`npm run build`, `dist` directory output, and client-side rewrites).
- Configured with `@vercel/analytics` for live SCADA performance telemetry.

### Deploying to Vercel

```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Deploy directly from workspace directory
cd "c:\Users\jay ashok magar\Documents\GitHub\urja-mitra-solar\sample"
vercel
```

---

## 🏛️ System Overview & Design Language

- **Floating Glass Pill Navigation**: GSAP-driven `PillNav` wrapped inside `GlassSurface` for neumorphic glass depth.
- **Full-Viewport Video Hero**: Ambient background video with mobile-optimized line-wrapped heading (*Monitor · Manage · Sustain*).
- **Executive SCADA Dashboard**: High-contrast KPI cards, sortable data table, mobile card stack, live telemetry alerts, and an interactive **Singly Linked List Grid Schematic** (`HEAD ➔ Node 101 ➔ ... ➔ NULL`).

---

## 🗂️ Municipal Reference Dataset

| Source ID | Station Name | Location / Ward | Capacity (L) | Current Level (L) | Status | Last Updated |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| **101** | Talegaon Talav (Dabhade Lake) Treatment | Ward 1 - Old Town, Dabhade Wada | 18,000 | 14,200 | 🔵 Moderate (78.9%) | 08 Oct 2026, 22:09 IST |
| **102** | Indrayani River Intake Station | Kund Mala Road, Indrayani Basin | 30,000 | 23,500 | 🔵 Moderate (78.3%) | 08 Oct 2026, 22:09 IST |
| **103** | MIDC Phase 1 Elevated Storage (ESR) | Navlakh Umbre MIDC Corridor | 22,000 | 9,500 | 🟡 Low (43.2%) | 08 Oct 2026, 22:09 IST |
| **104** | Yashwantnagar & Station Road Water Tower | Ward 4 - Talegaon Station Zone | 9,000 | 2,400 | 🟡 Low (26.7%) | 08 Oct 2026, 22:09 IST |
| **105** | Varale Hill Master Balancing Reservoir | Ward 12 - Varale Gaon Hilltop | 16,000 | 13,800 | 🟢 Optimal (86.3%) | 08 Oct 2026, 22:09 IST |

---

## 💻 Tech Stack & Dependencies

- **Frontend Framework**: React 18, TypeScript, Vite
- **Styling & Motion**: Tailwind CSS, Framer Motion, GSAP, Backdrop Blur Glassmorphism
- **Icons**: Lucide React
- **Deployment**: Vercel (`@vercel/analytics`, `vercel.json`)