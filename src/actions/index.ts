'use server'

import * as auth from '@/lib/auth';


export async function signIn(provider: string) {

    return auth.signIn(provider);

} 
