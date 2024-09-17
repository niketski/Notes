'use server'

import userSchema, { IUserSchema } from '@/model/user';
import { error } from 'console';
import mongoose, { MongooseError, Error } from 'mongoose';
import { z } from 'zod';

interface CreateUserFormState {
    errors: {
        name?: string,
        email?: string,
        password?: string,
        avatar?: string
    }
}

interface FieldErrors {
    [key: string] : string
}

export async function createUser(formState: CreateUserFormState, formData: FormData): Promise<CreateUserFormState> {

    // set data validation for each field using zod
    const userDataSchema = z.object({
        name: z.string().min(3, { message: 'The name must be at least 3 characters.' }),
        email: z.string().email({ message: 'Please enter a valid email.' }),
        password: z.string().min(8, { message: 'Please use a strong password.' }),
        avatar: z.string()
    });

    const userData = userDataSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        avatar: formData.get('avatar')
    });


    // get user input from sign up form
    const name     = formData.get('name');
    const email    = formData.get('email');
    const password = formData.get('password');
    const avatar   = formData.get('avatar');
    let fieldErrors: FieldErrors = {};

    console.log(formData);
    
    return {
        errors: {
            name: 'asdasdds'
        }
    }

}