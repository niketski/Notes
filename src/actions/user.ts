'use server'

import userSchema from '@/model/user';
import { z } from 'zod';
import { uploadImage } from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

interface CreateUserFormState {
    errors: {
        name?: string[],
        email?: string[],
        password?: string[],
        avatar?: string[]
    }
}

export async function createUser(formState: CreateUserFormState, formData: FormData): Promise<CreateUserFormState> {
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
            errors: result.error.flatten().fieldErrors
        }
    }

    // check of the email has been used
    const existingUser = await userSchema.findOne({ email: inputEmail });
        
    if(existingUser) {
        return {
            errors: {
                email: ['The email has been used. Please use unique email']
            }
        }
    }

    try {

        // upload image file to cloudinary
        const image = await uploadImage(inputAvatar as File) as UploadApiResponse;
            
        // create new user
        const newUser = await userSchema.create({
            name: inputName,
            email: inputEmail,
            password: inputPassword,
            avatar: image.secure_url
        });

        await newUser.save();

        return {
            errors: {}
        }

    } catch(error: any) {

        console.log(error);

        return {
            errors: {}
        }

    }

}