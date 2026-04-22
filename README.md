# ICSHSM 2026

The official website application for the **International Conference on Emerging Trends in Management, Technology, Social & Health Sciences 2026**, organized by Lincoln University College, Malaysia.

## Overview

This project replaces a legacy Elementor-based WordPress site with a modern, fast, and extremely responsive Next.js application. 
It utilizes a clean, bespoke "Red and White" design system conforming to the official university and conference branding.

## Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **Package Manager**: pnpm

## Highlights & Features

- **Component-Driven Architecture**: Modulized features ranging from `ContactInfoCards`, `GoogleMap`, `SquigglyLine` separators to a fully responsive `NavBar` using native CSS variables.
- **Native Custom Forms**: Abstract submissions and Participant Registrations are now handled natively inside slick React forms, discarding previous iframe bottlenecks.
- **Optimized Assets**: Dynamic mapping of native UI images, implementing Next.js `next/image` to prevent CLS and LCP issues.
- **Responsive Layout**: Reconfigured grid systems for mobile-first rendering with proper viewport breakpoint triggers (utilizing hamburger menus at `xl` break-points tailored for long navigation links).
- **Data Abstraction**: Content data (e.g., `keyMembersData`, `navData`) is abstracted from the UI files to allow for rapid updates without cluttering component logic.

## Getting Started

1. **Install dependencies:**
   Make sure you are using `pnpm` as per the project specification.
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application in action.

## Project Structure

```text
├── app/                  # Next.js App Router (pages: home, contact, key-members, gallery, etc.)
├── components/
│   ├── features/         # Domain-specific components (abstracts, call-for-papers, contact, etc.)
│   ├── layout/           # Global structural UI (NavBar, Footer, Hero)
│   └── ui/               # Reusable base UI elements (Button, ErrorState, SquigglyLine)
├── lib/
│   ├── data/             # Static abstract data configurations (navData, keyMembersData)
│   └── utils/            # Utility functions like `cn` (clsx+tailwind-merge)
├── public/               # Static assets (images, PDFs, documents)
└── package.json          # Dependencies and scripts (strict pnpm usage)
```

## Contributing Guidelines

- When generating or tweaking styles, adhere strictly to the global visual themes (`bg-white` foundations and `#9b1d20` primary tracking elements) to maintain brand consistency.
- Keep structural modifications modular; do not inject massively bloated React components. Break UI and Logic down logically into sub-folders within `components/features/`.
- Ensure native forms retain robust error states and validation flags. 

---
*Developed by the ICSHSM Digital Operations Team / Lincoln University College, Nigeria.*
