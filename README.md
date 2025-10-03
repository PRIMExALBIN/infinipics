# Infinipics - Premium AI-Generated Aesthetic Photos Platform

**Where Every Pixel Tells a Story**

Futuristic, minimalist, dark-themed platform with endless high-quality AI photos.

## 🎨 Design System

- **Color Palette**: Dark theme with neon gradients (violet → blue → cyan)
- **Background**: `bg-gray-900` to `bg-black`
- **Text**: `text-gray-100` with `text-gray-400` for secondary
- **Accents**: Neon glows, subtle gradients
- **Typography**: Inter font family

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Hosting**: Cloudinary/ImgBB
- **Deployment**: Vercel

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example`
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
infinipics/
├── app/                    # Next.js app router pages
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── collections/        # Collections grid
│   ├── random/             # Random generator
│   ├── search/             # Search functionality
│   └── admin/              # Admin panel
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components
│   └── features/           # Feature components
├── lib/                    # Utilities & configs
├── types/                  # TypeScript definitions
└── public/                 # Static assets
```

## 🌟 Features

- **Infinite Scroll**: Trigger load more at 80% scroll
- **Hover Effects**: Scale transforms, glow shadows
- **Random Generator**: One-click generation with history
- **Search & Filters**: Real-time search with category filtering
- **Admin Panel**: Image upload, prompt management, analytics
- **Responsive Design**: Mobile-first with responsive breakpoints

## 📱 Responsive Breakpoints

- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns
- Large: 5 columns

## 🎯 Success Metrics

- Performance: Lighthouse score >90
- SEO: Proper meta tags, structured data
- UX: Smooth animations, fast loading
- Mobile: Touch-friendly, responsive
- Accessibility: WCAG 2.1 AA compliant