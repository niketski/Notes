import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './db';
import userModel from '@/model/user';

const { handlers: { GET, POST }, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        CredentialsProvider({
            name: 'Login',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter your password'
                }
            },
            async authorize(credentials) {

                const existingUser = await userModel.findOne({ email: credentials.email });

                if(existingUser) {

                    return existingUser;

                } else {

                    return false;

                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        }),
    ],
    pages: {
        error: '/qweqweq',    // Custom error page
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            console.log('sign in');
            
            return true;

        },
        async redirect({ baseUrl }) {
          // Customize the redirect behavior
          return baseUrl; // You can return the base URL or another custom URL
        },
      },
});

export { GET, POST, signIn, signOut };