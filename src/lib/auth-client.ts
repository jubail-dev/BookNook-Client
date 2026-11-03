import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL:
  process.env.NODE_ENV === "production"
    ? "https://book-nook-client-lilac.vercel.app"
    : "http://localhost:3000",
     plugins: [
    jwtClient() 
  ]
})

export const { signIn, signUp, signOut, useSession } = authClient;