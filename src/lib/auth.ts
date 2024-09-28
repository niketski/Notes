import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './db';

const { handlers: { GET, POST }, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(client),
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
        signIn: '/sign-up',  // Custom sign-in page
        error: '/qweqweq',    // Custom error page
    },
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {

        //     // check if the user has the same email exist in our database
        //     const isExistingUser = await userModel.findOne({ email: user.email });

        //     // create use to our databse if the current user doesn't exist
        //     if(!isExistingUser) {

        //         const newUser = await userModel.create({
        //             name: user.name,
        //             email: user.email,
        //         });

        //     }
        //     console.log('current: ', user);
        //     console.log('existing: ', isExistingUser);

        //     return true;

        // },
        async redirect({ baseUrl }) {
          // Customize the redirect behavior
          return baseUrl; // You can return the base URL or another custom URL
        },
      },
});

export { GET, POST, signIn, signOut };