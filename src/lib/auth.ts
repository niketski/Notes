import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';

const { handlers: { GET, POST }, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        })
    ],
    pages: {
        signIn: '/',  // Custom sign-in page
        error: '/',    // Custom error page
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
          // Customize the redirect behavior
          return baseUrl; // You can return the base URL or another custom URL
        },
      },
});

export { GET, POST, signIn, signOut };