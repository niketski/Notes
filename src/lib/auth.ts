import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

const { handlers: { GET, POST }, signIn, signOut } = NextAuth(authConfig);

export { GET, POST, signIn, signOut };