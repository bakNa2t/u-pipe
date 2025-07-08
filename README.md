# Upipe

A YouTube clone app built with modern web technologies, allowing users to upload, share, and stream videos. The app features a responsive design with a customizable appearance theme and language support.

## Development with:

<!-- ![NextJS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) -->

- [NextJS](https://nextjs.org/docs)
- [Shadcn-ui](https://ui.shadcn.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Clerk](https://clerk.com/docs)
- [Bun](https://bun.sh/docs/)
- [tRPC](https://trpc.io/)
- [Mux](https://www.mux.com/)
- [Uploadthing](https://uploadthing.com/docs)
- [Upstash](https://upstash.com)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon](https://neon.com/)
- [Next-intl](https://next-intl.dev/docs/getting-started)

## Functionality:

- mobile-responsive design;
- intuitive, customizable UI using Tailwind CSS and ShadCN components;
- authentication (sign-in / sign-up) with Clerk;
- streaming videos using Mux;
- video upload and storage with Uploadthing and Upstash;
- video metadata storage with Drizzle ORM and Neon;
- user subscriptions with Upstash;
- video sharing and comment system;
- support for multiple languages (English and Russian) using i18next;

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 16.x)

1. Clone the repository

```
https://github.com/bakNa2t/u-pipe.git
```

2. Install the dependencies

```
bun install
```

3. Set up the environment variables.
   Create a <code>.env.local</code> file and add your API keys, database credentials, and other necessary environment variables.

```
# Clerks keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in or your custom path
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up or your custom path
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/ or your custom path
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/ or your custom path
CLERK_SIGNING_SECRET="YOUR_CLERK_SIGNING_SECRET"

# Neon database credentials
DATABASE_URL="YOUR_NEON_DATABASE_URL"

# Upstash keys
UPSTASH_REDIS_REST_URL="YOUR_UPSTASH_REDIS_REST_URL"
UPSTASH_REDIS_REST_TOKEN="YOUR_UPSTASH_REDIS_REST_TOKEN"

# Mux keys
MUX_TOKEN_ID="YOUR_MUX_TOKEN_ID"
MUX_TOKEN_SECRET="YOUR_MUX_TOKEN_SECRET"
MUX_WEBHOOK_SECRET="YOUR_MUX_WEBHOOK_SECRET"

# Uploadthing key
UPLOADTHING_TOKEN="YOUR_UPLOADTHING_TOKEN"

# Upstash workflow
UPSTASH_WORKFLOW_URL="YOUR_UPSTASH_WORKFLOW_URL"

QSTASH_TOKEN="YOUR_QSTASH_TOKEN"
QSTASH_CURRENT_SIGNING_KEY="YOUR_QSTASH_CURRENT_SIGNING_KEY"
QSTASH_NEXT_SIGNING_KEY="YOUR_QSTASH_NEXT_SIGNING_KEY"

# OpenAI key
OPENAI_API_KEY="YOUR_OPENAI_API_KEY" if you want to use OpenAI

# For public deployment
NEXT_PUBLIC_APP_URL="YOUR_PUBLIC_APP_URL"
```

4. Run the development server

```
npm run dev
```

5. Open your browser and navigate to http://localhost:3000.

click here to visit => [_**Upipe**_](https://github.com/bakNa2t/u-pipe.git)
