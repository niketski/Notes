'use server'

import userSchema from '@/model/user';
import { z } from 'zod';
import { uploadImage } from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import bcrypt from 'bcrypt';

interface UserSignupFormState {
    errors: {
        name?: string[],
        email?: string[],
        password?: string[],
        avatar?: string[],
        _form?: string
    },
    data?: string
    success: boolean
}

export async function userSignup(formState: UserSignupFormState, formData: FormData): Promise<UserSignupFormState> {
    console.clear();
    
    // set data validation for each field using zod
    const acceptedImageFileTypes = ['image/png', 'image/jpeg'];
    const userDataSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }).min(3, { message: 'The name must be at least 3 characters' }),
        email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email' }),
        password: z.string().min(1, { message: 'Password is required' }).min(5, { message: 'Please use a strong password' }),
        avatar: z.instanceof(File, { message: 'Please provide a valid image file' }).refine(avatar => acceptedImageFileTypes.includes(avatar.type))
    });

    const inputName  = formData.get('name');
    const inputEmail = formData.get('email');
    const inputPassword   = formData.get('password');
    const inputAvatar = formData.get('avatar')   ;
    const result = userDataSchema.safeParse({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        avatar: inputAvatar
    });

    // validate field errors
    if(!result.success) {

        return {
            ...formState,
            errors: result.error.flatten().fieldErrors,

        }
    }

    // check of the email has been used
    const existingUser = await userSchema.findOne({ email: inputEmail });
        
    if(existingUser) {
        return {
            ...formState,
            errors: {
                email: ['The email has been used. Please use unique email']
            },
        }
    }

    try {

        // upload image file to cloudinary
        const image = await uploadImage(inputAvatar as File) as UploadApiResponse;

        // create hash password 
        const hashedPassword = await bcrypt.hash(inputPassword as string, 10);
            
        // create new user
        const newUser = await userSchema.create({
            name: inputName,
            email: inputEmail,
            password: hashedPassword,
            avatar: image.secure_url
        });

        await newUser.save();

        return {
            ...formState,
            errors: {},
            data: JSON.stringify(newUser),
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
                    _form: 'Failed to create user'
                }
            }

        }
        

    }

}