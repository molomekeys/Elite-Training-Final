import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    STRIPE_SECRET_KEY:z.string().min(1),
    SENDGRID_API_KEY:z.string().min(1),
    DATABASE_URL: z.string().url(),
    STRIPE_SIGNIN_SECRET:z.string().min(1),
    ACCESS_TOKEN:z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:z.string(),
  NEXT_PUBLIC_apiKey: z.string(),
  NEXT_PUBLIC_authDomain: z.string(),
  NEXT_PUBLIC_projectId: z.string(),
  NEXT_PUBLIC_storageBucket: z.string(),
  NEXT_PUBLIC_messagingSenderId: z.string(),
  NEXT_PUBLIC_appId: z.string(),
  

  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    SENDGRID_API_KEY:process.env.SENDGRID_API_KEY,
    NEXT_PUBLIC_apiKey:  process.env.NEXT_PUBLIC_apiKey,
  NEXT_PUBLIC_authDomain:  process.env.NEXT_PUBLIC_authDomain,
  NEXT_PUBLIC_projectId:   process.env.NEXT_PUBLIC_projectId,
  NEXT_PUBLIC_storageBucket:  process.env.NEXT_PUBLIC_storageBucket,
  NEXT_PUBLIC_messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId ,
  NEXT_PUBLIC_appId:   process.env.NEXT_PUBLIC_appId,
  STRIPE_SIGNIN_SECRET:process.env.STRIPE_SIGNIN_SECRET,
  ACCESS_TOKEN:process.env.ACCESS_TOKEN
  },
});
