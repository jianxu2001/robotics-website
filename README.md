# SCR Robot Website

Premium bilingual industrial robotics website built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Inquiry Delivery

The contact forms submit to `POST /api/inquiry`. The API supports two delivery methods:

1. Resend email delivery
2. Generic webhook delivery

Set these environment variables in Vercel or your hosting platform:

```bash
RESEND_API_KEY=your_resend_api_key
INQUIRY_TO_EMAIL=jianxu2001@gmail.com
INQUIRY_FROM_EMAIL=SCR Robot Website <inquiry@your-verified-domain.com>
```

Optional webhook delivery:

```bash
CONTACT_WEBHOOK_URL=https://your-webhook-endpoint.example.com/inquiry
CONTACT_WEBHOOK_SECRET=optional_bearer_token
```

For Resend, verify your sending domain first, then use that domain in `INQUIRY_FROM_EMAIL`.

## Production Checks

```bash
npm run lint
npm run build
```
