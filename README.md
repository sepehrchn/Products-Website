# Ariana Global Trade

A premium B2B export website for Iranian agricultural commodities. This site is designed for international importers, distributors, and wholesale markets.

## Key Features

- **Bilingual Support**: Toggle between English and Persian (Farsi) instantly.
- **RTL Support**: The entire layout mirrors correctly for Persian reading (Right-To-Left).
- **Premium Aesthetics**: High-end design with smooth animations using Framer Motion.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **SEO Optimized**: Includes professional metadata for global search rankings.

## Main Product Lines

- **Premium Saffron**: Grade 1 and Sargol cuts from Khorasan.
- **Iranian Spices**: High-quality export-grade spices.
- **Dried Fruits**: Dates, figs, and apricots from Fars and Kerman.
- **Smart Chatbot**: Hybrid Local-first + AI assistant for instant customer inquiries.

## Technical Details

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) with OpenAI
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript

## Deployment

This site is optimized for deployment on **Vercel**.

### Environment Variables

To enable the AI Chatbot fallback, you must add the following environment variable in your Vercel project settings:

- `OPENAI_API_KEY`: Your OpenAI API key.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
