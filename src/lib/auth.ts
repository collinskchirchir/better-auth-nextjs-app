import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db"; // your drizzle instance

export const auth = betterAuth({
    emailAndPassword:{
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
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