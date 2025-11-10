import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/drizzle/db';
import { nextCookies } from 'better-auth/next-js'; // your drizzle instance

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  // user: {
  //     additionalFields: {
  //         firstName:{
  //             type: "string",
  //             required: true,
  //         },
  //         lastName:{
  //             type: "string",
  //             required: true,
  //         },
  //         role: {
  //             type: "string",
  //             required: false,
  //             // defaultValue: "user",
  //             // input: false, // don't allow user to set role
  //         },
  //     },
  // },
});