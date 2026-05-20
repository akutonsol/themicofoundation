# Mico Foundation Website

Official website for The Mico Foundation - preserving educational heritage and empowering futures.

## 🚀 Tech Stack

- **Framework:** Next.js 16.2.4
- **CMS:** Sanity.io
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/mico-foundation.git
cd mico-foundation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=348z9r03
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token_here
```

**To get your Sanity API Token:**
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions
5. Copy the token to `.env.local`

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## 🎨 Sanity Studio

Access Sanity Studio at [http://localhost:3001/studio](http://localhost:3001/studio)

### CMS-Managed Sections:
- ✅ Hero Section
- ✅ Trusted By (Sponsor Logos)
- ✅ Legacy Impact Section
- 🚧 Projects (coming soon)
- 🚧 Community (coming soon)
- 🚧 Testimonials (coming soon)

## 📁 Project Structure

```
mico-foundation/
├── public/
│   └── images/
│       ├── home/          # CMS-managed images
│       └── home-static/   # Static design elements
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── home/        # Homepage sections
│   │   └── ui/          # Reusable UI components
│   └── sanity/
│       ├── lib/         # Sanity client & queries
│       └── schemaTypes/ # CMS schemas
├── scripts/             # Import scripts
└── sanity.config.js    # Sanity configuration
```

## 🔄 Importing Content to CMS

**Note:** Import scripts require Editor API token. If you encounter permission errors, add content manually in Sanity Studio.

### Manual Content Entry (Recommended):
1. Go to http://localhost:3001/studio
2. Select the section (Hero, Trusted By, Legacy Impact)
3. Fill in the fields
4. Upload images from `public/images/home/`
5. Click "Publish"

### Via Import Scripts (Optional):
```bash
npm run import:trustedby  # Import sponsor logos
npm run import:legacy     # Import legacy section
```

## 🌐 Deployment

### Deploy to Vercel
```bash
npm run build
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run import:trustedby` - Import sponsor logos
- `npm run import:legacy` - Import legacy section content

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Yes |
| `SANITY_API_TOKEN` | Sanity API token (Editor) | For imports only |

## 🐛 Troubleshooting

### Import scripts fail with "Insufficient permissions"
**Solution:** Add content manually in Sanity Studio or create a new API token with Editor permissions.

### Build fails with schema errors
**Solution:** Make sure all schema files are properly imported in `src/sanity/schemaTypes/index.js`

### Images not loading
**Solution:** Check that images are in `public/images/home/` for CMS content or `public/images/home-static/` for design elements.

## Features

### Donation System
- ✅ Multi-step donation form
- ✅ Project selection
- ✅ Sanity CMS integration
- ✅ PDF receipt generation
- ✅ Email notifications (donor + admin)
- ✅ Auto-download receipts

### Content Management
- ✅ Dynamic projects from Sanity
- ✅ Hero section management
- ✅ Community impact stats
- ✅ Team messages



## 📄 License

Copyright © 2024 The Mico Foundation. All rights reserved.

## 🤝 Contributing

This is a private project for The Mico Foundation.

## 📧 Contact

For questions or support, contact: [your-email@micofoundation.org]
