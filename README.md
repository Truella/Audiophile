# Audiophile E-commerce Website

An e-commerce website built with Next.js, featuring a complete checkout flow
with backend integration and automated email notifications.

## Links

- **Live Site**: [[Audiophile Live](https://audiophile-orpin-three.vercel.app/)]
- **Repository**:
  [[Audiophile Repo](https://audiophile-orpin-three.vercel.app/)]

## 📋 Project Overview

This is a fully functional e-commerce website for audio equipment, built to
match the
[[Figma](https://www.figma.com/design/AmgZwl5xWRzbmXcoy7J10K/audiophile-ecommerce-website--Copy-?node-id=0-1&p=f&t=3KoF09OCCVTH8lsK-0)]
design specifications. The project includes a complete shopping experience from
browsing products to receiving order confirmation emails.

### Key Features

- ✨ Responsive design (mobile, tablet, desktop)
- 🛒 Full shopping cart functionality
- 💳 Complete checkout flow with validation
- 📧 Automated order confirmation emails
- 💾 Backend order storage with Convex
- ♿ Accessible forms and navigation
- 🎨 Modern UI with smooth animations

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Convex
- **Email**: NodeMailer
- **Deployment**: Vercel

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Convex account ([convex.dev](https://convex.dev))

### Step 1: Clone the Repository

```bash
git clone [https://github.com/Truella/Audiophile.git]
cd audiophile-ecommerce
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Environment Variables

Create a `.env.local` file in the root directory:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment
EMAIL_USER=your_registered_mail
EMAIL_PASSWORD=app_password

```

### Step 4: Set Up Convex

```bash
# Initialize Convex
npx convex dev

# Follow prompts to create/link your Convex project
# This will populate your NEXT_PUBLIC_CONVEX_URL
```

### Step 6: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Add all environment variables from `.env.local` to your Vercel project:

1. Go to Project Settings > Environment Variables
2. Add each variable
3. Redeploy if needed

### Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Convex deployment is production-ready
- [ ] Email sending tested
- [ ] Checkout flow tested end-to-end
- [ ] Responsive design verified on all devices

## Known Issues / Limitations

- Payment processing is simulated (no real payment gateway)
- Inventory management not implemented
- User accounts not included in this version
- Order tracking is placeholder functionality

---
