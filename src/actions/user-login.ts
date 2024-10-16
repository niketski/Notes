'use server'

import z from 'zod';
import userModel from '@/model/user';
import bcrypt from 'bcrypt';
import { IUserSchema } from '@/model/user';
import { signIn } from '@/lib/auth';

interface userLoginFormState {
    errors: {
        email?: string[],
        password?: string[]
        _form?: string
    },
    success: boolean
}

export default async function userLogin(formState: userLoginFormState, formData: FormData): Promise<userLoginFormState> {
    console.clear();
    // set validation for each field using zod
    const userInputSchema = z.object({
        email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please use a valid email' }),
        password: z.string().min(1, { message: 'Password is required' })
    });

    const inputEmail = formData.get('email');
    const inputPassword = formData.get('password');
    const result = userInputSchema.safeParse({
        email: inputEmail,
        password: inputPassword
    });

    // validate field errors
    if(!result.success) {

        return {
            ...formState,
            errors: result.error.flatten().fieldErrors,

        }
    }

    try {

        //check if the user exist by email
        const existingUser = await userModel.findOne<IUserSchema>({ email: inputEmail });

        if(!existingUser) {
            return {
                ...formState,
                errors: {
                    _form: 'The user doesn\'t exist or invalid email and password.'
                }
            }
        }

        // throw error if the user doesn't have password
        if(!existingUser.password) {
            return {
                ...formState,
                errors: {
                    _form: 'The user doesn\'t exist.'
                }
            }
        }

        // check if valid password
        const isCorrectPassword = await bcrypt.compare(inputPassword as string, existingUser.password);

        if(!isCorrectPassword) {
            return {
                ...formState,
                errors: {
                    password: ['Invalid password']
                }
            }
        }
        
        await signIn('credentials', {
            redirect: false,
            email: inputEmail,
            password: inputPassword
        });

        return {
            ...formState,
            errors: {},
            success: true
        }

        
        

    } catch(error: unknown) {

        if(error instanceof Error) {
            
            return {
                ...formState,
                errors: {
                    _form: error.message
                }
            }

        } else {

            return {
                ...formState,
                errors: {
                    _form: 'Failed to login'
                }
            }

        }
    }

    
}