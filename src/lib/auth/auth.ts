import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/drizzle/db';
import { nextCookies } from 'better-auth/next-js';
import { sendPasswordResetEmail } from '@/lib/emails/password-reset-email';
import { sendEmailVerificationEmail } from '@/lib/emails/email-verification';
import { createAuthMiddleware } from '@better-auth/core/middleware';
import { sendWelcomeEmail } from '@/lib/emails/welcome-email';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({ user, url });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailVerificationEmail({ user, url });
    },
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
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith('/sign-up')) {
        const user = ctx.context.newSession?.user ?? {
          name: ctx.body.name,
          email: ctx.body.email,
        };

        if (user != null) {
          await sendWelcomeEmail(user);
        }
      }
    }),
  },
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
