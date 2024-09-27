import dbConnect from '@/lib/db-connect';

export async function register() {

    await dbConnect();

    console.log('connected to the database successfully.');
    
}