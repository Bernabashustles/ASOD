import { oneTapClient, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://127.0.0.1:9000",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    organizationClient({
      teams: {
        enabled: true,
      },
    }),
    ...(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? [oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      promptOptions: {
        maxAttempts: 1,
      },
    })] : []),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  resetPassword,
  forgetPassword,
  verifyEmail
} = authClient;
