'use server'

export async function createUser(formData: FormData) {

    // get user input from sign up form
    const name     = formData.get('name');
    const email    = formData.get('email');
    const password = formData.get('password');
    const avatar   = formData.get('avatar');

    if(avatar && avatar instanceof File) {

       

    }
    

    return {
        message: 'The data has been received.'
    }

}