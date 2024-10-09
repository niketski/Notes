import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './db';
import userModel from '@/model/user';
import { NextAuthConfig } from 'next-auth';

export const nextAuthConfig: NextAuthConfig = {
    adapter: MongoDBAdapter(client),
    session: {
        strategy: 'jwt'
    },
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

                console.log('existing: ', existingUser);
                
                if(existingUser) {

                    return existingUser;

                } else {

                    return null;

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
    callbacks: {
    //    async session({ session, user, token }) {


    //         return session;
        
    //    },
        async jwt({ token, user, account, profile, isNewUser }) {

            console.log('callback: jwt', token);
            console.log(user);

            if(user) {
                token.id = user.id;
            }

            return token;
        },
        // async signIn({ user, account, profile, email, credentials }) {

        //     console.log('callback: sign in');
            
        //     return true;

        // },
        // async redirect({ baseUrl }) {
        //     console.log('callback: redirect');

        //   // Customize the redirect behavior
        //   return baseUrl; // You can return the base URL or another custom URL
        // },
      },
};


const { handlers: { GET, POST }, signIn, signOut } = NextAuth(nextAuthConfig);

export { GET, POST, signIn, signOut };